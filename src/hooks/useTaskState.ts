import { create } from 'zustand'

import { ITask, ITaskToEdit } from '../types/tasks';

interface IState {
    tasks          : ITask[];
    currentTask    : ITaskToEdit;
    setTasks       : (tasks: ITask[]) => void;
    setCurrentTask : (task: ITaskToEdit) => void
}

export const useTaskState = create<IState>((set) => ({
  tasks          : [],
  currentTask    : {id: '', title: ''},
  setTasks       : (tasks: ITask[]) => set((state) => ({ ...state, tasks })),
  setCurrentTask : (currentTask: ITaskToEdit) => set((state) => ({...state, currentTask})),
}))
