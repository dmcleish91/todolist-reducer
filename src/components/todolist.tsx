'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Todo, { TodoItem } from './todo';
import { Dispatch } from 'react';
import { Action } from '@/app/page';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type TodoListProps = {
  todos: TodoItem[];
  dispatch: Dispatch<Action>;
  setEditTodo: Dispatch<TodoItem | null>;
};

export default function TodoList({ todos, dispatch, setEditTodo }: TodoListProps) {
  return (
    <div className='w-[380px]'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>{todos.length > 0 ? 'Items for Today' : 'No items'}</CardTitle>
          <CardDescription className='text-center'>
            You have {todos.length === 0 ? 'no' : todos.length} pending {todos.length === 1 ? 'item' : 'items'}.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-2'>
          <AnimatePresence initial={false} mode='sync'>
            {todos.map((todo) => {
              return (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <Todo todo={todo} setEditTodo={setEditTodo} dispatch={dispatch} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
