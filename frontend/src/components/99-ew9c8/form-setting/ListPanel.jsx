// src/ListPanel.js
import { Button, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import Icon from 'src/@core/components/icon'

const ListPanel = ({ title, items, setItems}) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim()) {
            if(items.some(i => i == newItem)) return;
            setItems([...items, newItem]);
            setNewItem(''); // Clear the input field
        }
    };

    const removeItem = (item) => {
        return () => {
            const updatedItems = items.filter(i => i != item)
            setItems([...updatedItems])
        }
    }

    return (
        <Box style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <Typography sx={{fontWeight: 'bold', pb: 2 }}>{ title }</Typography>
            <Box>
                {
                    items.length > 0 && items.map((item, index) => 
                        <Box key={item} sx={{ display: 'flex' }}>
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    mr: 3,
                                }} 
                                onClick={removeItem(item)}>
                                <Icon icon='tabler:trash' />
                            </Box>
                            <Typography>{item}</Typography>
                        </Box>
                    )
                }
            </Box>
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <TextField
                    sx={{ mr: 2, P: 0 }}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="أضف أداة جديدة"
                />
                <Button 
                    variant='contained'
                    onClick={handleAddItem}>يضيف</Button>
            </Box>
        </Box>
    );
};

export default ListPanel;
