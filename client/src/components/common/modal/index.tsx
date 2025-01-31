import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface Modalprops {
  triggerName: string;
  triggerColor: 'primary' | 'secondary' | 'gray';
  children: ReactNode;
}

const Modal = ({ triggerName, triggerColor, children }: Modalprops) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerColor}>{triggerName}</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogTitle className="text-center text-lg font-bold">{triggerName}</DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="flex w-full flex-col items-center">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
