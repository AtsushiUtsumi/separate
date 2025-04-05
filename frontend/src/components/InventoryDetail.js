import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getInventoryItem, getPart, updateInventory, deleteInventoryItem } from '../services/api';

const InventoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);
  const [part, setPart] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [inventoryResponse, partResponse] = await Promise.all([
        getInventoryItem(id),
        getPart(inventoryResponse.data.inventory.part_id),
      ]);
      setInventory(inventoryResponse.data.inventory);
      setPart(partResponse.data.part);
      setFormData({
        quantity: inventoryResponse.data.inventory.quantity,
        location: inventoryResponse.data.inventory.location,
      });
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateInventory({
        part_id: inventory.part_id,
        quantity: parseInt(formData.quantity),
        location: formData.location,
      });
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      console.error('在庫の更新に失敗しました:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('この在庫情報を削除してもよろしいですか？')) {
      try {
        await deleteInventoryItem(id);
        navigate('/inventory');
      } catch (error) {
        console.error('在庫の削除に失敗しました:', error);
      }
    }
  };

  if (!inventory || !part) {
    return <Typography>読み込み中...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">在庫詳細</Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
              sx={{ mr: 1 }}
            >
              更新
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
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              在庫数
            </Typography>
            <Typography variant="body1">{inventory.quantity}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              保管場所
            </Typography>
            <Typography variant="body1">{inventory.location}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              最終更新日時
            </Typography>
            <Typography variant="body1">
              {new Date(inventory.last_updated).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>在庫情報更新</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="在庫数"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                quantity: e.target.value
              }))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="保管場所"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: e.target.value
              }))}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryDetail; 