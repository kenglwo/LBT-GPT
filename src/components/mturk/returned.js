import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';


const ReturnedScreen = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Returned Survey
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
          You may now close this page.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReturnedScreen;
