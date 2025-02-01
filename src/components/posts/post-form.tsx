import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { postSchema, type PostInput } from '@/lib/validations/post';

interface PostFormProps {
  defaultValues?: PostInput;
  onSubmit: (data: PostInput) => void;
  isLoading?: boolean;
}

export function PostForm({ defaultValues, onSubmit, isLoading }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label='Title' error={errors.title?.message}>
        <Input {...register('title')} error={!!errors.title} />
      </FormField>

      <FormField label='Description' error={errors.description?.message}>
        <textarea
          {...register('description')}
          className={`w-full min-h-[200px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.description ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
          }`}
        />
      </FormField>

      <Button type='submit' className='w-full' isLoading={isLoading}>
        {defaultValues ? 'Update Post' : 'Create Post'}
      </Button>
    </Form>
  );
}
