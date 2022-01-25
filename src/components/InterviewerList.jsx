import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((oneInt) => {
          return (
            <InterviewerListItem
              key={oneInt.id}
              name={oneInt.name}
              avatar={oneInt.avatar}
              selected={oneInt.id === value}
              setInterviewer={() => onChange(oneInt.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}
