'use client'
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';

const SendPasswordResetEmail = () => {
  const [serverError, setServerError] = useState<any>({});
  const [serverMsg, setServerMsg] = useState<any>({});

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
      // document.getElementById('password-reset-email-form')?.reset();
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
    <Grid container justifyContent='center' >
    <Grid item xs={12} sm={8} md={6}>
      <h1 className="text-center text-4xl mt-9 mb-9">Reset Password</h1>
      <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit} className="m-10 p-10 bg-white ">
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        {serverError?.email && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{serverError.email[0]}</Typography>}
        <Box textAlign='center'>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
        </Box>
        {serverError?.non_field_errors && <Alert severity='error'>{serverError.non_field_errors[0]}</Alert>}
        {serverMsg.msg && <Alert severity='success'>{serverMsg.msg}</Alert>}
      </Box>
    </Grid>
  </Grid>
  );
};

export default SendPasswordResetEmail;
