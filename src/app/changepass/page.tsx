'use client'
import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useSelector } from 'react-redux';

const ChangePassword: React.FC = () => {
  const [server_error, setServerError] = useState<Record<string, any>>({});
  const [server_msg, setServerMsg] = useState<Record<string, any>>({});
  const token = useSelector((state: any) => state.auth.token.access);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/changepassword/', actualData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setServerMsg(response.data);
      setServerError({});
      (document.getElementById("password-change-form") as HTMLFormElement).reset();
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
    <div className='flex justify-center items-center'>
      <Box className='p-4 border rounded-lg shadow xs:w-3/4 sm:w-3/4 lg:w-3/6 md:3/6 bg-white' style={{ height: '500px' }}>
        <h1 className='text-center mb-8 mt-3 text-xl'>Change Password</h1>
        <form onSubmit={handleSubmit} noValidate id="password-change-form" className=''>
        <Typography variant="body1" gutterBottom>
              New Password:
            </Typography>
          <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
          {server_error.password && <Typography className='text-red-500 text-sm pl-2'>{server_error.password[0]}</Typography>}
          <div className='mt-8'>
          <Typography variant="body1" gutterBottom className='mt-5'>
              Confirm New Password:
            </Typography>
          <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
          {server_error.password2 && <Typography className='text-red-500 text-sm pl-2'>{server_error.password2[0]}</Typography>}
          </div>
          
          <Box className='text-center mt-8'>
            <Button type="submit" variant="contained" className='px-5'> Update </Button>
          </Box>
          {server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>}
          {server_msg.msg && <Alert severity='success'>{server_msg.msg}</Alert>}
        </form>
      </Box>
    </div>
  );
};

export default ChangePassword;
