'use client';
import { PlusSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dispatch, useEffect, useRef } from 'react';
import { ACTIONS, Action } from '@/app/page';
import { TodoItem } from './todo';

type TodoFormProps = {
  newTodo: string;
  editTodo: TodoItem | null;
  setNewTodo: Dispatch<string>;
  setEditTodo: Dispatch<TodoItem | null>;
  dispatch: Dispatch<Action>;
};

export default function TodoForm({ newTodo, editTodo, setNewTodo, setEditTodo, dispatch }: TodoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTodo === '') {
      console.log('Todo is empty');
      return;
    }

    if (editTodo) {
      dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: editTodo.id, title: newTodo } });
      setEditTodo(null);
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    }
    setNewTodo('');
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 700);
  }, []);

  return (
    <form className='flex flex-row gap-2 w-[380px]' onSubmit={handleSubmit}>
      <Input
        placeholder='Add new item...'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        ref={inputRef}
      />
    </form>
  );
}
