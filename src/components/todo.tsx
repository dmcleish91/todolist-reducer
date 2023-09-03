import { CheckCircle, Circle, Pencil, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dispatch } from 'react';
import { ACTIONS, Action } from '@/app/page';
import { motion } from 'framer-motion';

type TodoProps = {
  todo: TodoItem;
  dispatch: Dispatch<Action>;
  setEditTodo: Dispatch<TodoItem | null>;
} & React.ComponentPropsWithRef<'div'>;

export type TodoItem = {
  id: string;
  completed: boolean;
  title: string;
};

const MotionButton = motion(Button);

export default function Todo({ todo, dispatch, setEditTodo }: TodoProps) {
  return (
    <div className=' flex items-center space-x-4 rounded-md border p-4'>
      <Button variant={'ghost'} onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: todo.id })}>
        {todo.completed ? <CheckCircle /> : <Circle />}
      </Button>

      {/* <CheckCircle /> */}
      <div className='flex-1 space-y-1'>
        <p className='text-sm font-medium leading-none'>{todo.title}</p>
        <p className='text-sm text-muted-foreground'>{todo.completed ? 'completed' : 'not completed'}</p>
      </div>

      <MotionButton
        variant={'ghost'}
        size={'icon'}
        onClick={() => setEditTodo(todo)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <Pencil />
      </MotionButton>

      <MotionButton
        variant={'ghost'}
        size={'icon'}
        onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: todo.id })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        <X />
      </MotionButton>
    </div>
  );
}
