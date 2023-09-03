'use client';
import { Variants, motion } from 'framer-motion';
import { ListChecks } from 'lucide-react';
import TodoList from '@/components/todolist';
import TodoForm from '@/components/todoform';
import { TodoItem } from '@/components/todo';
import { useEffect, useReducer, useState } from 'react';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo',
  RESET_TODO: 'reset-todo',
} as const;

type UpdateAction = {
  type: 'add-todo' | 'toggle-todo' | 'delete-todo';
  payload: string | number;
};

type ResetAction = {
  type: 'reset-todo';
};

type EditAction = {
  type: 'edit-todo';
  payload: { id: string; title: string };
};

export type Action = UpdateAction | ResetAction | EditAction;

function reducer(state: TodoItem[], action: Action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...state, newTodo(action.payload as string)];
    case ACTIONS.DELETE_TODO:
      return [...state.filter((todo) => todo.id !== action.payload)];
    case ACTIONS.TOGGLE_TODO:
      return [...state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo))];
    case ACTIONS.EDIT_TODO:
      return [
        ...state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo)),
      ];
    case ACTIONS.RESET_TODO:
      return [];
    default:
      return state;
  }
}

function newTodo(title: string): TodoItem {
  return {
    id: Date.now().toString(),
    title,
    completed: false,
  };
}

const titleVariants: Variants = {
  hidden: { y: '-100vw', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 18, delay: 0.3 } },
};
export default function Home() {
  const initialValue = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  };
  const [todos, dispatch] = useReducer(reducer, [], initialValue);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editTodoItem, setEditTodoItem] = useState<TodoItem | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editTodoItem) {
      setNewTodoTitle(editTodoItem.title);
    } else {
      setNewTodoTitle('');
    }
  }, [editTodoItem]);

  return (
    <div className='flex min-h-screen items-center flex-col gap-4 overflow-hidden'>
      <div className='flex flex-col gap-4 xl:pt-72 pt-24'>
        <motion.div
          variants={titleVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-row items-center justify-center gap-4'>
          <p className='text-3xl'>TODOLIFE</p>
          <ListChecks className='h-7 w-7' />
        </motion.div>
        <TodoForm
          newTodo={newTodoTitle}
          setNewTodo={setNewTodoTitle}
          editTodo={editTodoItem}
          setEditTodo={setEditTodoItem}
          dispatch={dispatch}
        />
      </div>
      <TodoList todos={todos} setEditTodo={setEditTodoItem} dispatch={dispatch} />
    </div>
  );
}
