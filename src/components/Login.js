import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ColumnFlexBox, FlexBox } from '../helper-components';

const Login = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const [name, setName] = useState('');
  const [loginError, setLoginError] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLogin = () => {
    if (name === '') {
      setLoginError(true);
      return;
    }
    navigate('/list', { replace: true, state: { loginName: name } });
    setName('');
  };

  const renderLogin = () => {
    return (
      <FlexBox
        width='100vw'
        height='100vh'
        alignItems='center'
        justifyContent='center'
        bgcolor={theme.palette.secondary.light}
        p='128px'
      >
        <ColumnFlexBox
          bgcolor='rgba(255, 255, 255, 0.5)'
          flexDirection='column'
          p='24px'
          alignItems='flex-end'
          gap='24px'
          borderRadius='8px'
        >
          <TextField
            style={{ width: '20vw' }}
            error={loginError}
            value={name}
            placeholder='Please enter your name'
            onChange={handleNameChange}
            helperText={loginError ? 'Please enter a name' : ''}
          />

          <Button
            style={{ width: 'max-content' }}
            variant='contained'
            onClick={handleLogin}
          >
            Login
          </Button>
        </ColumnFlexBox>
      </FlexBox>
    );
  };

  return <>{renderLogin()}</>;
};

export default Login;
