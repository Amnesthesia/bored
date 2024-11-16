import React, { useEffect } from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { Category } from '../graphql/types';
import { CategoryIcon } from './CategoryIcon';
import { debounce, startCase, xor } from 'lodash';

interface CategorySelectProps {
  value: Category[];
  onChange(newValue: Category[]): void;
}

export function CategorySelect(props: CategorySelectProps) {
  const { value, onChange } = props;
  const [internal, setInternal] = React.useState<Category[]>([]);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(internal), 1000);
  }, [internal, onChange]);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  return (
    <Stack direction='row' sx={{ p: 1 }} gap={1}>
      {Object.values(Category).map((v) => (
        <Chip
          key={v}
          label={startCase(v)}
          size='small'
          icon={<CategoryIcon category={v} />}
          onClick={() => setInternal(xor(internal || [], [v]))}
          variant={internal?.includes(v) ? 'filled' : 'outlined'}
        />
      ))}
    </Stack>
  );
}
