
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I have a question about product #1234.', sender: 'user' },
    { id: 2, text: 'Of course, how can I help you?', sender: 'supplier' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Simulate supplier response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), text: 'I am checking on that for you.', sender: 'supplier' }]);
      }, 1500);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>Chat with Supplier</Typography>
      <Paper elevation={3} sx={{ height: 'calc(100vh - 220px)', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper elevation={1} sx={{ p: 1.5, bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.300', color: message.sender === 'user' ? 'primary.contrastText' : 'inherit', maxWidth: '70%', borderRadius: '16px' }}>
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
            <SendIcon fontSize="large" />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatPage;
