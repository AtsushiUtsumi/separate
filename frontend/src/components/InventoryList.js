import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getInventory, getParts, updateInventory, deleteInventoryItem } from '../services/api';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [parts, setParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inventoryResponse, partsResponse] = await Promise.all([
        getInventory(),
        getParts(),
      ]);
      setInventory(inventoryResponse.data.inventory);
      setParts(partsResponse.data.parts);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateInventory({
        part_id: selectedItem.part_id,
        quantity: parseInt(formData.quantity),
        location: formData.location,
      });
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      console.error('在庫の更新に失敗しました:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('この在庫情報を削除してもよろしいですか？')) {
      try {
        await deleteInventoryItem(id);
        fetchData();
      } catch (error) {
        console.error('在庫の削除に失敗しました:', error);
      }
    }
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setFormData({
      quantity: item.quantity,
      location: item.location,
    });
    setOpenDialog(true);
  };

  const getPartName = (partId) => {
    const part = parts.find(p => p.id === partId);
    return part ? part.name : '不明';
  };

  const filteredInventory = inventory.filter(item => {
    const partName = getPartName(item.part_id).toLowerCase();
    return partName.includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="検索"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>部品名</TableCell>
              <TableCell>在庫数</TableCell>
              <TableCell>保管場所</TableCell>
              <TableCell>最終更新日時</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{getPartName(item.part_id)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {new Date(item.last_updated).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog(item)}
                  >
                    更新
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>在庫情報更新</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              部品: {selectedItem && getPartName(selectedItem.part_id)}
            </Typography>
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

export default InventoryList; 