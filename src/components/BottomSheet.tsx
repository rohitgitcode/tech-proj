import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  children: ReactNode;
  isOpen?: boolean;
  height?: 'auto' | 'half' | 'full';
  className?: string;
}

const BottomSheet = ({ children, isOpen = true, height = 'auto', className }: BottomSheetProps) => {
  const heightClasses = {
    auto: 'max-h-[70vh]',
    half: 'h-[50vh]',
    full: 'h-[85vh]',
  };

  if (!isOpen) return null;

  return (
    <div className={cn('bottom-sheet slide-up z-40', heightClasses[height], className)}>
      {/* Drag Handle */}
      <div className="flex justify-center py-3">
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
      </div>
      
      {/* Content */}
      <div className="px-4 pb-24 overflow-y-auto hide-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
