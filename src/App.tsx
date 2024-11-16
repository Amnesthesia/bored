import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material';
import { GraphQLProvider } from './graphql/apollo';
import { Events } from './Events';
import { DopamineMenu } from './Dopamine';
import { Settings } from 'luxon';
import './style.css';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { APIKeyProvider } from './APIKeyProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/adventure',
    element: <Events />
  },
  {
    path: '/dopamine',
    element: <DopamineMenu />
  }
]);

function Home() {
  const navigate = useNavigate();
  return (
    <Grid2 container justifyContent='space-between' spacing={3}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
            title='Dopamine Menu'
            sx={{ bgcolor: green[500], color: grey[100] }}
            titleTypographyProps={{ variant: 'h6' }}
          />

          <CardContent>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Bite sized things you can do when your mind is blank
            </Typography>
          </CardContent>
          <CardActions>
            <Stack direction='row' justifyContent='center' width='100%'>
              <Button size='large' onClick={() => navigate('/dopamine')}>
                Lets go
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
            title='Adventure Menu'
            sx={{ bgcolor: red[700], color: grey[100] }}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Half-day or full-day activities you can do during the week, or on the weekend
            </Typography>
          </CardContent>
          <CardActions>
            <Stack direction='row' justifyContent='center' width='100%'>
              <Button size='large' onClick={() => navigate('/adventure')}>
                Lets go
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default function App() {
  React.useEffect(() => {
    Settings.defaultZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, []);

  return (
    <Container maxWidth='xl'>
      <Box sx={{ my: 4 }}>
        <APIKeyProvider>
          <GraphQLProvider>
            <RouterProvider router={router} />
          </GraphQLProvider>
        </APIKeyProvider>
      </Box>
    </Container>
  );
}
