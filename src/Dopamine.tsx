import { ChevronRight, Image as ImageIcon, DoubleArrow } from '@mui/icons-material';
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Grid2,
  LinearProgress,
  Paper,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import groupBy from 'lodash/groupBy';
import * as React from 'react';
import { Category, DopamineType, useActivitiesQuery, type Activity } from './graphql/types';
import { CategoryIcon } from './components/CategoryIcon';
import { DopamineIcon } from './components/DopamineIcon';
import SearchBar from './components/SearchBar';
import { CategorySelect } from './components/CategorySelect';
import { shuffle, startCase } from 'lodash';
import { purple, red, grey, blue, green } from '@mui/material/colors';

interface MenuProps {
  type: DopamineType;
  title: string;
  items: Activity[];
}

function getColor(type: DopamineType) {
  if (type === DopamineType.DeepEngagement) return purple;
  if (type === DopamineType.QuickBoost) return blue;
  return green;
}

function Menu(props: MenuProps) {
  const { type, title, items: i } = props;

  const items = React.useMemo(() => shuffle(i), [i]);
  const color = getColor(type);

  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: color[500], color: grey[100] }}
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar sx={{ bgcolor: grey[100] }} aria-label='recipe'>
            <DopamineIcon {...{ type }} sx={{ color: color[500] }} />
          </Avatar>
        }
        title={startCase(title)}
      />
      <CardContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {items?.map((item, idx) => (
            <ListItem key={item.title} sx={{ bgcolor: idx === 0 ? color[500] : undefined }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: idx === 0 ? grey[100] : color[500], color: idx === 0 ? color[500] : grey[100] }}>
                  {item.type && idx !== 0 && <DopamineIcon type={item.type} />}
                  {idx === 0 && <DoubleArrow />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={
                  idx === 0
                    ? {
                        sx: { fontWeight: 'bold', color: grey[100] }
                      }
                    : undefined
                }
                secondaryTypographyProps={
                  idx === 0
                    ? {
                        sx: { color: grey[100] }
                      }
                    : undefined
                }
                primary={item?.title}
                secondary={item?.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export function DopamineMenu() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { data, loading, error } = useActivitiesQuery({
    variables: {
      params: {
        categories: categories.length === Object.values(Category).length || categories.length === 0 ? null : categories,
        limit: 40
      }
    }
  });

  const items = groupBy(data?.activities, 'type');

  console.debug({ data, loading, error, items });

  return (
    <>
      <AppBar sx={{ bgcolor: grey[100] }}>
        <Toolbar>
          <CategorySelect value={categories} onChange={setCategories} />
        </Toolbar>
        {loading && <LinearProgress color='primary' />}
      </AppBar>
      <Grid2 container justifyContent='space-between' spacing={2} sx={{ pt: 8 }}>
        {Object.entries(items).map(([title, items]) => (
          <Grid2 key={title} size={{ xs: 12, lg: 4, xl: 4 }}>
            <Menu type={title as DopamineType} {...{ title, items }} key={title} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
