import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItem } from './ListItem';

export const secondaryListItems = (
  <React.Fragment>
    <ListItem
      label={'Settings'}
      to={'/settings'}
      icon={<SettingsIcon />}
    />
  </React.Fragment>
);