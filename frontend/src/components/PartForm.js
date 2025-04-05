import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createPart, getPart, updatePart } from '../services/api';

const PartForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    part_number: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    if (id) {
      fetchPart();
    }
  }, [id]);

  const fetchPart = async () => {
    try {
      const response = await getPart(id);
      const part = response.data.part;
      setFormData({
        name: part.name,
        part_number: part.part_number,
        description: part.description,
        price: part.price,
      });
    } catch (error) {
      console.error('部品情報の取得に失敗しました:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseInt(formData.price)
      };

      if (id) {
        await updatePart(id, data);
      } else {
        await createPart(data);
      }
      navigate('/parts');
    } catch (error) {
      console.error('部品の保存に失敗しました:', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? '部品情報編集' : '新規部品登録'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="部品名"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="部品番号"
            name="part_number"
            value={formData.part_number}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="説明"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="価格"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {id ? '更新' : '登録'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/parts')}
            >
              キャンセル
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PartForm; 