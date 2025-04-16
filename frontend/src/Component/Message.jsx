import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

const Message = ({ content, username, timestamp, isOwn, isSticker, emotion }) => {
  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (name) => {
    const colors = ['#1976d2', '#dc004e', '#9c27b0', '#00796b', '#e65100'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const renderContent = () => {
    if (isSticker) {
      return (
        <Box sx={{ width: 150, height: 150 }}>
          <img src={content} alt="sticker" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Box>
      );
    }

    return (
      <Typography variant="body1" sx={{ my: 1 }}>
        {content}
        {emotion && (
          <Typography component="span" sx={{ ml: 1, fontSize: '1.2em' }}>
            {emotion}
          </Typography>
        )}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 2,
        gap: 1,
        flexDirection: isOwn ? 'row' : 'row-reverse'
      }}
    >
      <Avatar
        sx={{
          bgcolor: getRandomColor(username),
          alignSelf: 'flex-end'
        }}
      >
        {getInitials(username)}
      </Avatar>
      <Paper
        elevation={1}
        sx={{
          maxWidth: '70%',
          p: 2,
          bgcolor: isOwn ? '#1976d2' : '#f5f5f5',
          color: isOwn ? 'white' : 'inherit',
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {username}
        </Typography>
        {renderContent()}
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {timestamp}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;