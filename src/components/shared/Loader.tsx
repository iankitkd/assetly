import { Box, CircularProgress } from '@mui/material'

export default function Loader() {
  return (
    <Box maxWidth="xl" textAlign="center" py={4}>
      <CircularProgress />
    </Box>
  )
}
