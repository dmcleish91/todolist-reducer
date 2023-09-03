'use client';
import { PlusSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dispatch } from 'react';
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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editTodo) {
      dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: editTodo.id, title: newTodo } });
      setEditTodo(null);
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    }
    setNewTodo('');
  }

  return (
    <form className='flex flex-row gap-2 w-[380px]' onSubmit={handleSubmit}>
      <Input placeholder='Add new item...' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <Button variant='outline' size='icon'>
        <PlusSquare />
      </Button>
    </form>
  );
}
