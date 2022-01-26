import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_DELETE = 'ERROR_DELETE';
const ERROR_SAVE = 'ERROR_SAVE';

export default function Appointment(props) {
  const { id, time, interview, cancelInterview, interviewers, allInterviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW)).catch((err) => {
      transition(ERROR_SAVE, true);
    });
  }

  function destroy(id) {
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={allInterviewers[interview.interviewer]}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back()} />}
      {mode === EDIT && (
        <Form
          onSave={save}
          name={interview && interview.student}
          interviewer={interview && interview.interviewer}
          interviewers={interviewers}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === DELETING && <Status message="DELETING..." />}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={() => destroy(id)}>
          Are you sure you would like to Delete?
        </Confirm>
      )}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={() => transition(SHOW, true)} />}
      {mode === ERROR_SAVE && <Error message="Could not book appointment" onClose={() => transition(SHOW, true)} />}
    </article>
  );
}
