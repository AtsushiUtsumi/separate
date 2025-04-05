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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getParts, deletePart } from '../services/api';

const PartsList = () => {
  const [parts, setParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await getParts();
      setParts(response.data.parts);
    } catch (error) {
      console.error('部品一覧の取得に失敗しました:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('この部品を削除してもよろしいですか？')) {
      try {
        await deletePart(id);
        fetchParts();
      } catch (error) {
        console.error('部品の削除に失敗しました:', error);
      }
    }
  };

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.part_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/parts/new')}
        >
          新規登録
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>部品名</TableCell>
              <TableCell>部品番号</TableCell>
              <TableCell>価格</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.name}</TableCell>
                <TableCell>{part.part_number}</TableCell>
                <TableCell>¥{part.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/parts/${part.id}`)}
                  >
                    詳細
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(part.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PartsList; 