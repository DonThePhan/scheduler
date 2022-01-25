import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // run on page load ONLY
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => {
        return { ...prev, days, appointments, interviewers };
      });
    });
  }, []);

  const updateSpots = function(state, appointments) {
    const days = [ ...state.days ].map((day) => {
      const appointmentsArray = day.appointments;
      const spots = appointmentsArray.filter((apt_id) => appointments[apt_id].interview === null).length;
      return { ...day, spots };
    });
    return days;
  };

  function setDay(day) {
    setState((prev) => {
      return { ...prev, day: day };
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => {
        return {
          ...prev,
          appointments,
          days: updateSpots(prev, appointments)
        };
      });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => {
        const appointments = {
          ...prev.appointments,
          [id]: { ...prev.appointments[id], interview: null }
        };

        return {
          ...prev,
          days: updateSpots(prev, appointments),
          appointments
        };
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
