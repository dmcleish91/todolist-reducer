'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Todo, { TodoItem } from './todo';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Dispatch } from 'react';
import { ACTIONS, Action } from '@/app/page';
import { AnimatePresence, motion } from 'framer-motion';

type TodoListProps = {
  todos: TodoItem[];
  dispatch: Dispatch<Action>;
  setEditTodo: Dispatch<TodoItem | null>;
};

const MotionTodo = motion(Todo);

export default function TodoList({ todos, dispatch, setEditTodo }: TodoListProps) {
  return (
    <motion.div className='w-[380px]'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>{todos.length > 0 ? 'Current Items' : 'No Items'}</CardTitle>
          <CardDescription className='text-center'>
            You have {todos.length === 0 ? 'no' : todos.length} pending {todos.length === 1 ? 'item' : 'items'}.
          </CardDescription>
        </CardHeader>
        {todos.length > 0 && (
          <CardContent className='grid gap-2'>
            <AnimatePresence initial={false}>
              {todos.map((todo) => {
                return <MotionTodo key={todo.id} todo={todo} setEditTodo={setEditTodo} dispatch={dispatch} />;
              })}
            </AnimatePresence>
          </CardContent>
        )}
        {todos.length > 0 && (
          <CardFooter>
            <Button className='w-full' onClick={() => dispatch({ type: ACTIONS.RESET_TODO })}>
              <X className='mr-2 h-4 w-4' /> Remove All
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
