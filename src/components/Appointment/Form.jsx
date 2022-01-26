import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const { name: studentName, interviewer: interviewerId, interviewers, onSave, onCancel } = props;

  const [ name, setName ] = useState(studentName || '');
  const [ interviewer, setInterviewer ] = useState(interviewerId || null);
  const [ error, setError ] = useState('');

  function reset() {
    setName('');
    setError('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }

    setError('');
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={'Enter Student Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
