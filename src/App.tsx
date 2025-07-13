import React from 'react';
import { useFirestore } from './hooks/useFirestore';
import { useAuth } from './hooks/useAuth';
import TaskList from './components/TaskList';

function App() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const { tasks, addTask, deleteTask } = useFirestore(user?.uid || null);

  if (loading) return <p>Loading...</p>;

  if (!user)
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Task Tracker</h2>
        <button onClick={signInWithGoogle}>Login with Google</button>
      </div>
    );

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Welcome, {user.displayName}</h2>
      <button onClick={logout}>Logout</button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.task as HTMLInputElement;
          if (input.value.trim()) {
            addTask({ title: input.value.trim(), completed: false });
            input.value = '';
          }
        }}
      >
        <input name="task" placeholder="Enter task" required />
        <button type="submit">Add Task</button>
      </form>

      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
