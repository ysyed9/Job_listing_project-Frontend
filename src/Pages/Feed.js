import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, TextField, Typography, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [query, setQuery] = useState('');
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPost(response.data);
    };

    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/allPosts`);
      setPost(response.data);
    };

    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  return (
    <Grid container spacing={2} sx={{ margin: '2%' }}>
      <Grid item xs={12}>
        <Button sx={{ margin: '1% 2%' }} variant="outlined">
          <Link to="/">Home</Link>
        </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            sx={{ width: '75%', padding: '2% auto' }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post &&
        post.map((p) => (
          <Grid key={p.id} item xs={12} md={6} lg={4}>
            <Card sx={{ padding: '3%', overflow: 'hidden', width: '84%' }}>
              <Typography variant="h5" sx={{ fontSize: '2rem', fontWeight: '600' }}>
                {p.profile}
              </Typography>
              <Typography sx={{ color: '#585858', marginTop: '2%' }} variant="body1">
                Description: {p.desc}
              </Typography>
              <Typography variant="h6">Years of Experience: {p.exp} years</Typography>
              <Typography variant="body1">Skills: </Typography>
              {p.techs.map((s, i) => (
                <Typography variant="body1" key={i}>
                  {s} {' '}
                </Typography>
              ))}
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Feed;
