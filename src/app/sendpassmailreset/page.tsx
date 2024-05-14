'use client'
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';

const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/send-reset-password-email/', actualData, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      setServerMsg(response.data);
      setServerError({});
      document.getElementById('password-reset-email-form')?.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setServerMsg({});
          setServerError(error.response.data.errors);
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          {server_error.email && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography>}
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
          </Box>
          {server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>}
          {server_msg.msg && <Alert severity='success'>{server_msg.msg}</Alert>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SendPasswordResetEmail;
