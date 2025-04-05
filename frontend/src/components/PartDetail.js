import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPart, deletePart } from '../services/api';

const PartDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);

  useEffect(() => {
    fetchPart();
  }, [id]);

  const fetchPart = async () => {
    try {
      const response = await getPart(id);
      setPart(response.data.part);
    } catch (error) {
      console.error('部品情報の取得に失敗しました:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('この部品を削除してもよろしいですか？')) {
      try {
        await deletePart(id);
        navigate('/parts');
      } catch (error) {
        console.error('部品の削除に失敗しました:', error);
      }
    }
  };

  if (!part) {
    return <Typography>読み込み中...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">部品詳細</Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/parts/${id}/edit`)}
              sx={{ mr: 1 }}
            >
              編集
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              削除
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              部品名
            </Typography>
            <Typography variant="body1">{part.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              部品番号
            </Typography>
            <Typography variant="body1">{part.part_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              説明
            </Typography>
            <Typography variant="body1">{part.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              価格
            </Typography>
            <Typography variant="body1">
              ¥{part.price.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              登録日時
            </Typography>
            <Typography variant="body1">
              {new Date(part.created_at).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PartDetail; 