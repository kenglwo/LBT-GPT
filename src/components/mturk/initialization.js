import React from 'react';
import { Container, Typography, Box } from '@mui/material';


const InitializationScreen = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Initializing Survey...
        </Typography>
      </Box>
    </Container>
  );
};

export default InitializationScreen;
