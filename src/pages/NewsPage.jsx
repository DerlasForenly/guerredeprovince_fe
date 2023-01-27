import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Stack, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import RecommendedArticle from '../components/NewsPage/RecommendedArticle';
import PromotedArticle from '../components/NewsPage/PromotedArticle';
import SubscriptionArticles from '../components/NewsPage/SubscriptionArticles';
import LastArticles from '../components/NewsPage/LastArticles';
import MyNewspaper from '../components/NewsPage/MyNewspaper';

const NewsPage = () => {
  return <Container sx={{ mt: 4, mb: 4 }}>
    <Stack direction={'row'} spacing={2}>
      <Stack direction={'column'} spacing={2}>
        <MyNewspaper />
        <PromotedArticle />
        <RecommendedArticle />
      </Stack>
      <TwoTabsArticleListing
        firstLabel={'My subscriptions'}
        firstElement={<SubscriptionArticles />}
        secondLabel={'My articles'}
        secondElement={'Soon'}
      />
      <TwoTabsArticleListing
        firstLabel={'Top articles'}
        firstElement={'Soon'}
        secondLabel={'Last articles'}
        secondElement={<LastArticles />}
        defaultTab={'2'}
      />
    </Stack>
  </Container>;
};

export default connect(null, null)(NewsPage);

function TwoTabsArticleListing ({
                                  firstLabel = '',
                                  secondLabel = '',
                                  firstElement,
                                  secondElement,
                                  defaultTab = '1',
                                }) {
  const [value, setValue] = useState('1');

  useEffect(() => {
    setValue(defaultTab);
  }, [defaultTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ p: 1, paddingBottom: 0, display: 'flex', flexDirection: 'column', width: 400, height: 'fit-content' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={firstLabel} value={'1'} sx={{ width: '50%' }} />
            <Tab label={secondLabel} value={'2'} sx={{ width: '50%' }} />
          </TabList>
        </Box>
        <TabPanel value={'1'} sx={{ p: 1 }}>
          {firstElement}
        </TabPanel>
        <TabPanel value={'2'} sx={{ p: 1 }}>
          {secondElement}
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number,
  value: PropTypes.number,
  children: PropTypes.node
};
