import React from 'react';

import DayList from './DayList';
import Appointment from './Appointment';
import 'components/Application.scss';
import { getAppointmentsForDay, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        interviewers={getInterviewersForDay(state, state.day)}
        allInterviewers={state.interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} setDay={setDay} value={state.day} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
