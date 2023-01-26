import { LinearProgress, Stack } from '@mui/material';
import Title from '../../components/baseComponents/Title';
import Paper from '@mui/material/Paper';
import * as React from 'react';

export default function RecommendedArticle () {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
      <Stack>
        <Title>Recommended article</Title>
        <LinearProgress />
      </Stack>
    </Paper>
  );
}