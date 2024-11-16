import React from 'react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MovieIcon from '@mui/icons-material/Movie';
import PaletteIcon from '@mui/icons-material/Palette';
import NatureIcon from '@mui/icons-material/Nature';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Tooltip from '@mui/material/Tooltip';
import { Category } from '../graphql/types';
import { startCase } from 'lodash';
import { People } from '@mui/icons-material';

export const CATEGORY_ICONS = {
  [Category.Arts]: PaletteIcon,
  [Category.Cinema]: MovieIcon,
  [Category.Community]: People,
  [Category.Comedy]: TheaterComedyIcon,
  [Category.Cultural]: AccountBalanceIcon,
  [Category.Food]: LocalDiningIcon,
  [Category.Music]: MusicNoteIcon,
  [Category.Nature]: NatureIcon,
  [Category.Sports]: SportsSoccerIcon
};

export interface CategoryIconProps extends React.ComponentProps<typeof PaletteIcon> {
  category: Category;
}

export function CategoryIcon(props: CategoryIconProps) {
  const { category, ...rest } = props;
  const Icon = CATEGORY_ICONS?.[category];
  if (!Icon) return null;

  return (
    <Tooltip title={startCase(category)}>
      <Icon {...rest} />
    </Tooltip>
  );
}
