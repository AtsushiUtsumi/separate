import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          車部品在庫管理システム
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          部品の管理と在庫の追跡を効率的に行うことができます
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              部品管理
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              部品情報の登録、編集、削除を行います
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/parts')}
              sx={{ mt: 2 }}
            >
              部品管理へ
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              在庫管理
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              在庫情報の確認と更新を行います
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/inventory')}
              sx={{ mt: 2 }}
            >
              在庫管理へ
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 