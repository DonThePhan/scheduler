import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const { interview, interviewers, onSave, onCancel } = props;

  const [ student, setStudent ] = useState((interview && interview.student) || '');
  const [ interviewer, setInterviewer ] = useState((interview && interview.interviewer) || null);

  function studentChangeHandler(e) {
    setStudent(e.target.value);
  }

  function interviewerChangeHandler(id) {
    setInterviewer(id);
  }

  function reset() {
    setStudent('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={student ? student : 'Enter Student Name'}
            value={student}
            onChange={studentChangeHandler}
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={interviewerChangeHandler} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
