import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ExploreIcon from '@mui/icons-material/Explore';
import DomainIcon from '@mui/icons-material/Domain';
import BalanceIcon from '@mui/icons-material/Balance';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CastleIcon from '@mui/icons-material/Castle';
import { ListItem } from './ListItem';

export const mainListItems = (
  <React.Fragment>
    <ListItem label={'Overview'} to={'/overview'} icon={<HomeIcon />} />
    <ListItem label={'News'} to={'/news'} icon={<ArticleIcon />} />
    <ListItem label={'World'} to={'/world'} icon={<ExploreIcon />} />
    <ListItem label={'Region'} to={'/region'} icon={<DomainIcon />} />
    <ListItem label={'Market'} to={'/market'} icon={<BalanceIcon />} />
    <ListItem label={'Party'} to={'/party'} icon={<GroupIcon />} />
    <ListItem label={'Job'} to={'/job'} icon={<BusinessCenterIcon />} />
    <ListItem label={'Wars'} to={'/wars'} icon={<CastleIcon />} />
  </React.Fragment>
);