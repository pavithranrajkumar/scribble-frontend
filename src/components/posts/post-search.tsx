import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export function PostSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get('q') || '');
  const debouncedValue = useDebounce(value, 300);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set('q', debouncedValue);
    } else {
      params.delete('q');
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [debouncedValue, navigate, searchParams]);

  return (
    <div className='relative'>
      <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
      <Input type='search' placeholder='Search posts...' value={value} onChange={(e) => setValue(e.target.value)} className='pl-9' />
    </div>
  );
}
