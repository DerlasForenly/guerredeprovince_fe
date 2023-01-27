import Typography from '@mui/material/Typography';

export default function RatingLabel ({ value = 0, variant = 'body1' }) {
  let color = value >= 0 ? 'green' : 'red';
  let signedValue = value > 0 ? '+' + value : value;


  return (
    <Typography component="h2" variant={variant} color={color} fontWeight={'bold'}>
      {signedValue}
    </Typography>
  );
}