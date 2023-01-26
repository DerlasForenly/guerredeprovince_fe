import { connect } from 'react-redux';
import Article from './Article';
import { Pagination, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ArticleListing ({
                           url = '',
                           loadArticles,
                           articles = [],
                           pagesMeta = { currentPage: 1 },
                           setPage
                         }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url === '' || !setPage || !loadArticles) {
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: url + `?page=${pagesMeta.currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadArticles(response.data);

      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadArticles, pagesMeta.currentPage, setPage, url]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack
      sx={{ width: '100%' }}
      justifyContent="space-between"
      spacing={1}
      alignItems="center"
    >
      <Stack
        spacing={1}
        divider={<Divider sx={{ width: '100%' }} />}
        sx={{ width: '100%' }}
      >
        {
          articles.map((item, index) => {
            return <Article article={item} key={index} />;
          })
        }
        <div></div>
      </Stack>
      <Pagination
        count={pagesMeta.lastPage}
        size="small"
        onChange={onPageChange}
      />
    </Stack>
  );
}

export default connect(null, null)(ArticleListing);