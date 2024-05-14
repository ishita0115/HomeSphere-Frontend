'use client'
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from 'react';

interface ServerError {
  password?: string[];
  password2?: string[];
  non_field_errors?: string[];
}

interface ServerMsg {
  msg?: string;
}

const ResetPassword = ( { params }: { params: { slug: string[] } }) => {
  const [server_error, setServerError] = useState<ServerError>({});
  const [server_msg, setServerMsg] = useState<ServerMsg>({});
  const router = useRouter();
  const { slug } = params;
  const id = slug[0]
  const token = slug[1]
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/reset-password/${id}/${token}/`, actualData, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      setServerMsg(response.data);
      setServerError({});
      // document.getElementById('password-reset-form')?.reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setServerMsg({});
          setServerError(error.response.data.errors || { non_field_errors: ["An error occurred"] });
        } else {
          console.error('An error occurred:', error.message);
          setServerMsg({});
          setServerError({ non_field_errors: ["An unexpected error occurred"] });
        }
      }
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          {server_error?.password && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography>}
          <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm New Password' type='password' />
          {server_error?.password2 && <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography>}
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
          {server_error?.non_field_errors && <Alert severity='error'>{server_error?.non_field_errors[0]}</Alert>}
          {server_msg?.msg && <Alert severity='success'>{server_msg?.msg}</Alert>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
