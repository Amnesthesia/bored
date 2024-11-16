import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { startCase } from 'lodash';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { DopamineType } from '../graphql/types';

export const DOPAMINE_ICONS = {
  [DopamineType.DeepEngagement]: SportsEsportsIcon,
  [DopamineType.ModerateActivities]: DirectionsRunIcon,
  [DopamineType.QuickBoost]: FlashOnIcon
};

export interface CategoryIconProps extends React.ComponentProps<typeof SportsEsportsIcon> {
  type: DopamineType;
}

export function DopamineIcon(props: CategoryIconProps) {
  const { type, ...rest } = props;
  const Icon = DOPAMINE_ICONS?.[type];
  if (!Icon) return null;

  return (
    <Tooltip title={startCase(type)}>
      <Icon {...rest} />
    </Tooltip>
  );
}
