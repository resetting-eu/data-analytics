'use client'

import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext({});

const TasksDispatchContext = createContext({});

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        label: action.label,
        level: action.level,
        value: action.value,
        status: action.status,
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return {...t, ...action.task};
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, label: 'Menu level 0', level: 0, value: -1, status: '' },
  { id: 1, label: 'Menu level 1', level: 1, value: -1, status: '' },
  { id: 2, label: 'Menu level 2', level: 2, value: -1, status: '' },
];
