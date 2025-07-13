// src/components/TaskList.tsx

import React from 'react';
import type { Task } from '../hooks/useFirestore';

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (tasks.length === 0) return <p style={{ color: '#444' }}>No tasks yet. Add one!</p>;

  return (
    <ul style={{ marginTop: '1rem' }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#f0f0f0',
            color: '#000',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            alignItems: 'center'
          }}
        >
          <span>{task.title}</span>
          <button
            onClick={() => onDelete(task.id!)}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer'
            }}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
