import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

export type Task = {
  id?: string;
  title: string;
  completed: boolean;
};

export const useFirestore = (userId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(
      collection(db, `users/${userId}/tasks`),
      (snapshot) => {
        const loadedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, 'id'>),
        }));
        console.log("📥 Fetched tasks:", loadedTasks);
        setTasks(loadedTasks);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (task: Omit<Task, 'id'>) => {
    if (!userId) return;
    try {
      console.log("📝 Writing task to Firestore:", task);
      await addDoc(collection(db, `users/${userId}/tasks`), task);
      console.log("✅ Task successfully added.");
    } catch (err) {
      console.error("❌ Firestore write failed:", err);
    }
  };

  const deleteTask = async (id: string) => {
    if (!userId) return;
    await deleteDoc(doc(db, `users/${userId}/tasks`, id));
  };

  return { tasks, addTask, deleteTask };
};
