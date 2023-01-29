import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function AppBarBreadcrumbs ({ url = '' }) {
  const [path, setPath] = useState([]);

  useEffect(() => {
    let u = url.split('/');
    u.shift();

    u = u.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

    u = u.map((item) => {
      if (isNaN(parseInt(item))) {
        return item;
      }

      return '';
    });

    u = u.filter((item) => (item !== ''));

    setPath(u);
  }, [url]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center'
      }}
      color={'inherit'}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {
        path.map((item, index) => {
          return (
            <Typography
              key={index}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontWeight={index === url.length - 1 ? 'normal' : 'bold'}
            >
              {item}
            </Typography>
          );
        })
      }
    </Breadcrumbs>
  );
}