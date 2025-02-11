import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SubmitDialogProps {
  onSubmit: () => void;
  isDisabled?: boolean;
  title: string;
  description: string;
}

const SubmitDialog = ({ onSubmit, isDisabled = false, title, description }: SubmitDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          isDisabled ? 'bg-gray-200 text-gray-500' : 'bg-primary-600 text-white hover:bg-primary-700',
          'mb-4 w-full rounded-xl py-4 text-lg font-semibold xl:py-5 xl:text-xl',
        )}
        disabled={isDisabled}
      >
        제출하기
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>제출하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmitDialog;
