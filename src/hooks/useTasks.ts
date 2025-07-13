import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { User } from 'firebase/auth';

interface Task {
  id: string;
  text: string;
}

export const useTasks = (user: User | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, `users/${user.uid}/tasks`), orderBy('text'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(data);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (text: string) => {
    if (!user) return;
    await addDoc(collection(db, `users/${user.uid}/tasks`), { text });
  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, `users/${user.uid}/tasks`, id));
  };

  return { tasks, addTask, deleteTask };
};