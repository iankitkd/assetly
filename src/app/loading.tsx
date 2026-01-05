import { CircularProgress, Container } from '@mui/material';

export default function loading() {
  return (
    <Container maxWidth="xl" sx={{display: "flex", justifyContent: "center", alignItems: "center", p: 4}}>
      <CircularProgress />
    </Container>
  )
}
