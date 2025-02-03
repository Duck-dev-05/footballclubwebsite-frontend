import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchAvailableSlots = useCallback(async () => {
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
  }, [selectedDate, selectedMember]);

  useEffect(() => {
    if (selectedDate && selectedMember) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedMember, fetchAvailableSlots]);

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
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(
        <div key={`day-${i}`} className="calendar-day">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="team-calendar">
      {renderCalendarHeader()}
      <div className="calendar-days">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default TeamCalendar;