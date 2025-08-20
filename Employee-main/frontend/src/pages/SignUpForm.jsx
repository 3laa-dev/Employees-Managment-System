// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   InputAdornment,
// } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import Heder from '../componets/Heder';
// import { useTheme } from '@mui/material/styles';

// const SignUpForm = () => {
//   const theme = useTheme();
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async () => {
//     if (!name || !email || !password || !confirmPassword) {
//       alert('يرجى تعبئة جميع الحقول');
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert('كلمتا المرور غير متطابقتين');
//       return;
//     }
//     try {
//       const response = await fetch('http://localhost:3001/api/admin/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         alert('تم التسجيل بنجاح');
//         console.log(result);
//       } else {
//         alert(result.message || 'فشل التسجيل');
//       }
//     } catch (error) {
//       console.error('حدث خطأ في الاتصال:', error);
//       alert('تعذر الاتصال بالخادم');
//     }
//   };

//   return (
//     <>
//       <Heder title="Home" lin="/" tit="Login" li="/SignUp" />
//       <Box
//         sx={{
//           display: 'flex',
//           height: '100%',
//           padding: '80px',
//         }}
//         justifyContent={"center"}
//       >

//         <Box
//           sx={{
//             flex: 1,
//             display: 'flex',
//             justifyContent: 'center',
//             p: 4,
//             backgroundColor: theme.palette.background.paper,
//             borderRadius: 2,
//             boxShadow: 5,  maxWidth:800,
//           width:"100%"
//           }}
//         >
//           <Box sx={{ maxWidth: 400, width: '100%' }}>
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               mb={1}
//               color="primary"
//               textAlign="center"
//             >
//               قم بإنشاء حساب
//             </Typography>

//             <Typography
//               variant="body2"
//               mb={3}
//               color="text.secondary"
//               textAlign="center"
//             >
//               سجل حسابك وانضم إلى منتدى المعرفة وشارك مواضيعك معنا
//             </Typography>

//             <TextField
//               fullWidth
//               value={name}
//               margin="normal"
//               label="Name"
//               onChange={(event) => setName(event.target.value)}
//               variant="outlined"
//               color="primary"
//             />

//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               margin="normal"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <EmailIcon color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               color="primary"
//             />

//             <TextField
//               fullWidth
//               type="password"
//               label="password"
//               variant="outlined"
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <LockIcon color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               color="primary"
//             />

//             <TextField
//               fullWidth
//               type="password"
//               label=" password"
//               variant="outlined"
//               margin="normal"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <LockIcon color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               color="primary"
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 1, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
//               onClick={handleSubmit}
//             >
//               Login 
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//        <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>
      
//     </>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Heder from '../componets/Heder';
import { useTheme } from '@mui/material/styles';

const SignUpForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful');
        console.log(result);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <>
      <Heder title="Home" lin="/" tit="Login" li="/SignUp" />
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          padding: '80px',
        }}
        justifyContent={"center"}
      >

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            p: 4,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 5,  maxWidth:800,
          width:"100%"
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%' }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={1}
              color="primary"
              textAlign="center"
            >
              Create an Account
            </Typography>

            <Typography
              variant="body2"
              mb={3}
              color="text.secondary"
              textAlign="center"
            >
              Register your account and join the knowledge forum to share your topics with us
            </Typography>

            <TextField
              fullWidth
              value={name}
              margin="normal"
              label="Name"
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              color="primary"
            />

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              color="primary"
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
              color="primary"
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              color="primary"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
              onClick={handleSubmit}
            >
              Sign Up 
            </Button>
          </Box>
        </Box>
      </Box>
       <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>
      
    </>
  );
};

export default SignUpForm;
