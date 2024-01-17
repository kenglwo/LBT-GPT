import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';


const KeyScreen = ({ sInfo }) => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Thank You
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
          Enter this survey code on the Prolific website: C1DCOMR2
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default KeyScreen;
