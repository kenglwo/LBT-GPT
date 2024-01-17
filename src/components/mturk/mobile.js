import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';


const MobileScreen = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Unsupported Device
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            This survey does not support <strong>Mobile</strong> devices. Please complete this survey on a <strong>Desktop</strong> device.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MobileScreen;
