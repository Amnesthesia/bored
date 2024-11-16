import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';
import * as React from 'react';
import { CategoryIcon } from './CategoryIcon';
import type { Event } from '../graphql/types';
import { Button } from '@mui/material';

export function EventsTable(props: { events: Event[] }) {
  const { events } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width={50} />
          <TableCell>Title</TableCell>
          <TableCell>When</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Cost</TableCell>
          <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Location</TableCell>
          <TableCell>Link</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events?.map((ev) => (
          <TableRow key={ev.title}>
            <TableCell width={50}>
              <CategoryIcon category={ev.category} />
            </TableCell>
            <TableCell title={ev.description || ''}>{ev.title}</TableCell>
            <TableCell>
              {ev.datetime
                ? DateTime.fromISO(ev.datetime)
                    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
                    .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                : null}{' '}
              ({ev.duration})
            </TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{ev.cost}</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{ev.location}</TableCell>
            <TableCell>
              <Button variant='text' href={ev.link || ''} target='_blank' rel='noopener noreferrer'>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
