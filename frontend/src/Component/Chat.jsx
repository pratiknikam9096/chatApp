import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Popover,
  Grid,
} from '@mui/material';
import { Send, Smile, Sticker } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import Message from './Message';

const STICKER_PACKS = [
  {
    name: 'Cute Animals',
    stickers: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',
    ]
  },
  {
    name: 'Nature',
    stickers: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    ]
  }
];

const Chat = ({ username, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [stickerAnchorEl, setStickerAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        content: newMessage.trim(),
        username,
        timestamp: new Date().toLocaleTimeString(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setEmojiAnchorEl(null);
  };

  const handleStickerClick = (stickerUrl) => {
    const message = {
      id: Date.now(),
      content: stickerUrl,
      username,
      timestamp: new Date().toLocaleTimeString(),
      isOwn: true,
      isSticker: true,
    };
    setMessages([...messages, message]);
    setStickerAnchorEl(null);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat Room
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          flex: 1,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            mb: 3,
            p: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        <Paper
          component="form"
          onSubmit={handleSend}
          sx={{
            p: 2,
            display: 'flex',
            gap: 2,
          }}
        >
          <IconButton
            onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
            size="small"
          >
            <Smile />
          </IconButton>
          <IconButton
            onClick={(e) => setStickerAnchorEl(e.currentTarget)}
            size="small"
          >
            <Sticker />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!newMessage.trim()}
            endIcon={<Send size={20} />}
          >
            Send
          </Button>
        </Paper>
      </Container>

      <Popover
        open={Boolean(emojiAnchorEl)}
        anchorEl={emojiAnchorEl}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Popover>

      <Popover
        open={Boolean(stickerAnchorEl)}
        anchorEl={stickerAnchorEl}
        onClose={() => setStickerAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 320 }}>
          <Typography variant="h6" gutterBottom>
            Stickers
          </Typography>
          {STICKER_PACKS.map((pack) => (
            <Box key={pack.name} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {pack.name}
              </Typography>
              <Grid container spacing={1}>
                {pack.stickers.map((sticker) => (
                  <Grid item xs={4} key={sticker}>
                    <Paper
                      sx={{
                        p: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                      onClick={() => handleStickerClick(sticker)}
                    >
                      <img
                        src={sticker}
                        alt="sticker"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          aspectRatio: '1',
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default Chat;