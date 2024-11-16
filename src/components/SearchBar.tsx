import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange(newValue: string): void;
}

export default function SearchBar(props: React.PropsWithChildren<SearchBarProps>) {
  const { children, value, onChange } = props;

  const [internalValue, setInternal] = React.useState('');
  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  return (
    <Stack direction='column' width='100%'>
      <Stack direction='row' width='100%'>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search near location...'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setInternal(e.target.value)}
          value={internalValue}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            onChange(internalValue);
          }}
          onSubmit={(e) => e.preventDefault()}
        />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Stack>
      {children ? <Divider /> : null}
      {children}
    </Stack>
  );
}
