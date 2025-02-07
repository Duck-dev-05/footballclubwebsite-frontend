import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress
} from '@mui/material';
import api from '../../config/axios';
import './TeamCalendar.css';

const TeamCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    start: '',
    end: '',
    type: 'match', // match, training, or event
    description: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/calendar/events');
      setEvents(response.data.map(event => ({
        ...event,
        backgroundColor: getEventColor(event.type),
        className: `event-${event.type}`
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'match':
        return '#e74c3c'; // Red
      case 'training':
        return '#3498db'; // Blue
      default:
        return '#2ecc71'; // Green
    }
  };

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    setEventForm({
      title: '',
      start: arg.dateStr,
      end: arg.dateStr,
      type: 'match',
      description: '',
      location: ''
    });
    setOpenDialog(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setEventForm({
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
      type: arg.event.extendedProps.type || 'match',
      description: arg.event.extendedProps.description || '',
      location: arg.event.extendedProps.location || ''
    });
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedEvent) {
        await api.put(`/calendar/events/${selectedEvent.id}`, eventForm);
      } else {
        await api.post('/calendar/events', eventForm);
      }
      fetchEvents();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        await api.delete(`/calendar/events/${selectedEvent.id}`);
        fetchEvents();
        setOpenDialog(false);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Box className="team-calendar" position="relative">
      {loading && (
        <div className="calendar-loading">
          <CircularProgress />
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventClassNames={(arg) => [
          `event-${arg.event.extendedProps.type || 'other'}`
        ]}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={eventForm.type}
                onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                label="Event Type"
              >
                <MenuItem value="match">Match</MenuItem>
                <MenuItem value="training">Training</MenuItem>
                <MenuItem value="event">Other Event</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Location"
              value={eventForm.location}
              onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
              fullWidth
            />

            <TextField
              label="Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              label="Start Date"
              type="datetime-local"
              value={eventForm.start}
              onChange={(e) => setEventForm({ ...eventForm, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="End Date"
              type="datetime-local"
              value={eventForm.end}
              onChange={(e) => setEventForm({ ...eventForm, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamCalendar; 