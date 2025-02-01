import React from 'react';
import { cn } from '@/utils/cn';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return <form ref={ref} className={cn('space-y-6', className)} {...props} />;
});

Form.displayName = 'Form';

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
}

export function FormField({ children, label, error }: FormFieldProps) {
  return (
    <div className='space-y-2'>
      {label && <label className='text-sm font-medium leading-none'>{label}</label>}
      {children}
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
}
