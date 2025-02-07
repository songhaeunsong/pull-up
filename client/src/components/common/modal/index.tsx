import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface Modalprops {
  triggerName: string;
  triggerColor: 'primary' | 'secondary' | 'gray' | 'transparent';
  children: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}

const Modal = ({ triggerName, triggerColor, children, onOpenChange }: Modalprops) => {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerColor}>{triggerName}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] bg-white sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="flex w-full flex-col items-center text-sm">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
