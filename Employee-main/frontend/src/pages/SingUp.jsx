
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment
} from '@mui/material';
import Heder from '../componets/Heder';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useTheme, styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  '.MuiFormControlLabel-label': {
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
  '&.Mui-checked .MuiFormControlLabel-label': {
    color: theme.palette.primary.main,
    fontWeight: '700',
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  const checked = radioGroup ? radioGroup.value === props.value : false;
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('first');  // role state: 'first' = Admin, 'second' = Manager
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

const handleLogin = async () => {
  setLoading(true);
  setError('');

  try {
    // choose API URL based on role
    const loginUrl =
      role === 'first'
        ? 'http://localhost:3001/api/admin/login'
        : 'http://localhost:3001/api/managers/login';

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log("Response data:", data);

    // extract token
    const token = data.data?.token || data.data?.manager?.token;

    if (token) {
      localStorage.setItem('token', token);
      console.log("✅ Token stored:", token);

      // redirect based on role
      if (role === 'first') {
        window.location.href = '/Employees';
      } else if (role === 'second') {
        window.location.href = '/Employee';
      }
    } else {
      console.warn("⚠️ token not found in response");
    }

    // handle errors if response is not ok
    if (!response.ok) {
      if (data.error === 'email_not_found') {
        setError('Email not found');
      } else if (data.error === 'incorrect_password') {
        setError('Incorrect password');
      } else {
        setError('An error occurred. Please try again');
      }
    }

  } catch (err) {
    setError('Failed to connect to the server');
    console.error(err);
  }

  setLoading(false);
};

  return (
    <>
      <Heder title="Home" lin="/" tit="Create" li="/SignUpForm" />

      <Box
        sx={{
          display: 'flex',
          height: '100%',
          padding: '80px',
        }}
        justifyContent={"center"}
      >
        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          p: 4,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 5, maxWidth: 800,
          width: "100%"
        }} >

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4
            }}
          >
            <Box sx={{ maxWidth: 400, width: '100%' }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                color="primary"
              >
                Login
              </Typography>
              <Typography variant="body2" mb={3} color="text.secondary">
                Enter your details to log in to the forum and participate
              </Typography>

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <RadioGroup
                name="use-radio-group"
                value={role}           
                onChange={(e) => setRole(e.target.value)}  
                row
                sx={{ mt: 2, mb: 3, justifyContent: 'space-between' }}
              >
                <MyFormControlLabel value="first" label="Admin" control={<Radio color="primary" />} />
                <MyFormControlLabel value="second" label="Manager" control={<Radio color="primary" />} />
              </RadioGroup>

              {error && (
                <Typography color="error" mt={1}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'login...' : 'login'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                <Box sx={{ flex: 1, height: '1px', backgroundColor: theme.palette.divider }} />
                <Typography variant="body1" sx={{ mx: 2, whiteSpace: 'nowrap' }}>
                  or
                </Typography>
                <Box sx={{ flex: 1, height: '1px', backgroundColor: theme.palette.divider }} />
              </Box>

              <Box style={{ gap: "20px" }} display="flex" justifyContent="center">
                <FacebookOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                <InstagramIcon sx={{ color: theme.palette.secondary.main }} />
                <LinkedInIcon sx={{ color: theme.palette.primary.main }} />
              </Box>

              <Typography textAlign="center" mt={4}>
                Don’t have an account?{' '}
                <Link
                  to="/SignUpForm"
                  style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
                >
                  Create
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
         <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>
    </>
  );
};

export default SignUp;
