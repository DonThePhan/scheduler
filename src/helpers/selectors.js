export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const foundDay = state.days.find((stateDay) => stateDay.name === day);
  if (!foundDay) {
    return [];
  }

  const dayAppointments = [];
  for (let appointment of foundDay.appointments) {
    dayAppointments.push(state.appointments[appointment]);
  }

  return dayAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  interview.interviewer = state.interviewers[interview.interviewer];

  return interview;
}

export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const foundDay = state.days.find((stateDay) => stateDay.name === day);
  if (!foundDay) {
    return [];
  }

  const dayInterviewers = [];
  for (let interviewer of foundDay.interviewers) {
    dayInterviewers.push(state.interviewers[interviewer]);
  }
  return dayInterviewers;
}
