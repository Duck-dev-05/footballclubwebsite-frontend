import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendar, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../CSS/TeamCalendar.css';

const TeamCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Time slots configuration
  const DEFAULT_TIME_SLOTS = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  useEffect(() => {
    // Check if user is authorized to view this page
    const userRole = localStorage.getItem('userRole');
    const isAuthorized = userRole === 'player' || userRole === 'admin';
    
    if (!isAuthorized) {
      navigate('/signin', { 
        state: { 
          message: 'Please sign in as a team member to access the calendar.' 
        } 
      });
      return;
    }

    fetchTeamMembers();
  }, [navigate]);

  useEffect(() => {
    if (selectedDate && selectedMember) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedMember]);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5046/api/players');
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setTeamMembers(data);
    } catch (err) {
      setError('Failed to load team members. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDate || !selectedMember) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5046/api/bookings/available-slots?date=${selectedDate.toISOString()}&playerId=${selectedMember.id}`
      );
      if (!response.ok) throw new Error('Failed to fetch available slots');
      const bookedSlots = await response.json();
      
      // Filter out booked slots from default slots
      const available = DEFAULT_TIME_SLOTS.filter(
        slot => !bookedSlots.includes(slot)
      );
      setAvailableSlots(available);
    } catch (err) {
      setError('Failed to load available slots. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedMember || !selectedSlot) {
      setError('Please select all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Please log in to book an appointment');
      }

      const response = await fetch('http://localhost:5046/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          playerId: selectedMember.id,
          userId: userId,
          date: selectedDate.toISOString(),
          timeSlot: selectedSlot
        })
      });

      if (!response.ok) throw new Error('Booking failed');

      setBookingSuccess(true);
      setSelectedSlot(null);
      fetchAvailableSlots(); // Refresh available slots

      // Reset success message after 3 seconds
      setTimeout(() => setBookingSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderCalendarHeader = () => (
    <div className="calendar-controls">
      <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h3>
        <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h3>
      <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );

  const renderCalendarDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
          onClick={() => !isPast && setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderTeamMembers = () => (
    <div className="team-members">
      <h3>
        <FontAwesomeIcon icon={faUser} className="member-icon" />
        Select Team Member
      </h3>
      <div className="member-list">
        {teamMembers.map(member => (
          <div
            key={member.id}
            className={`member-card ${selectedMember?.id === member.id ? 'selected' : ''}`}
            onClick={() => setSelectedMember(member)}
          >
            <img src={member.imageUrl} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeSlots = () => (
    <div className="time-slots">
      <h3>
        <FontAwesomeIcon icon={faClock} className="time-icon" />
        Available Time Slots
      </h3>
      <div className="slot-list">
        {availableSlots.map(slot => (
          <button
            key={slot}
            className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      {selectedSlot && (
        <button 
          className="book-button" 
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      )}
    </div>
  );

  return (
    <div className="team-calendar">
      <div className="calendar-header-section">
        <h2>Team Calendar</h2>
        <p className="calendar-description">
          Manage your team appointments and schedules
        </p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {bookingSuccess && <div className="success-message">Booking successful!</div>}
      
      {renderCalendarHeader()}

      <div className="calendar-grid">
        <div className="calendar-header">Sun</div>
        <div className="calendar-header">Mon</div>
        <div className="calendar-header">Tue</div>
        <div className="calendar-header">Wed</div>
        <div className="calendar-header">Thu</div>
        <div className="calendar-header">Fri</div>
        <div className="calendar-header">Sat</div>
        {renderCalendarDays()}
      </div>

      <div className="booking-section">
        {renderTeamMembers()}
        {selectedDate && selectedMember && renderTimeSlots()}
      </div>
    </div>
  );
};

export default TeamCalendar; 