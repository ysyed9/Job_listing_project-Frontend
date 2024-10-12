import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initial = { profile: '', exp: 0, techs: [], desc: '' };

const Create = () => {
  const skillSet = ['Javascript', 'Java', 'Python', 'Django', 'Rust'];
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));

    navigate('/employee/feed');
  };

  const handleChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, techs: [...prevForm.techs, e.target.value] }));
  };

  return (
    <Paper sx={{ padding: '2%' }} elevation={3}>
      <Typography sx={{ margin: '3% auto' }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <TextField
            sx={{ width: '50%', margin: '2% auto' }}
            required
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
            label="Job Profile"
            variant="outlined"
            value={form.profile}
          />
          <TextField
            sx={{ width: '50%', margin: '2% auto' }}
            required
            type="number"
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={form.exp}
          />
          <TextField
            sx={{ width: '50%', margin: '2% auto' }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            label="Job Description"
            variant="outlined"
            value={form.desc}
          />
          <Box sx={{ margin: '1% auto' }}>
            <h3>Please mention required skills</h3>
            <ul>
              {skillSet.map((name, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    onChange={handleChange}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </li>
              ))}
            </ul>
          </Box>
          <Button sx={{ width: '50%', margin: '2% auto' }} variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
