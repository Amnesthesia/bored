import { AppBar, Box, Grid2, Toolbar, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { CategorySelect } from './components/CategorySelect';
import { EventsTable } from './components/EventTable';
import SearchBar from './components/SearchBar';
import { Category, TimeFrame, useEventsQuery } from './graphql/types';
import { isWeekend } from './utils';
import { grey } from '@mui/material/colors';

export function Events() {
  const [searchTerm, setSearchTerm] = React.useState('Noosa');
  const [categories, setCategories] = React.useState<Category[]>([]);

  const weekEvents = useEventsQuery({
    variables: {
      params: {
        area: searchTerm,
        radius: 30,
        timeframe: TimeFrame.Week,
        categories: categories.length === Object.values(Category).length || categories.length === 0 ? null : categories,
        limit: 25
      }
    }
  });
  const weekendEvents = useEventsQuery({
    variables: {
      params: {
        area: searchTerm,
        radius: 70,
        timeframe: TimeFrame.Weekend,
        categories: categories.length === Object.values(Category).length || categories.length === 0 ? null : categories,
        limit: 25
      }
    }
  });

  return (
    <>
      <AppBar sx={{ bgcolor: grey[100] }}>
        <Toolbar>
          <SearchBar value={searchTerm} onChange={setSearchTerm}>
            <CategorySelect value={categories} onChange={setCategories} />
          </SearchBar>
        </Toolbar>
        {(weekEvents.loading || weekendEvents.loading) && <LinearProgress color='success' />}
      </AppBar>

      <Grid2 container sx={{ mt: 12 }} flexDirection='row' justifyContent='space-between' spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TableContainer component={Paper}>
            <Box sx={{ m: 1 }}>
              <Typography variant='h5' sx={{ m: 1, mt: 3 }}>
                {isWeekend() ? 'This weekend' : 'This Week'}
              </Typography>
            </Box>
            <EventsTable events={(isWeekend() ? weekendEvents : weekEvents)?.data?.events || []} />
          </TableContainer>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TableContainer component={Paper}>
            <Box sx={{ m: 1 }}>
              <Typography variant='h5' sx={{ m: 1, mt: 3 }}>
                {isWeekend() ? 'Next week' : 'This Weekend'}
              </Typography>
            </Box>
            <EventsTable events={(isWeekend() ? weekEvents : weekendEvents)?.data?.events || []} />
          </TableContainer>
        </Grid2>
      </Grid2>
    </>
  );
}
