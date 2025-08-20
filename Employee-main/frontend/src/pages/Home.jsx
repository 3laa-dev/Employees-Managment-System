import { useTheme } from "@mui/material/styles";
import Heder from "../componets/Heder";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import Footer from "../componets/Footer";
export default function Home() {
  const theme = useTheme();

  return (
    <>
    
      <Heder title="Create" lin="/SignUpForm" tit="Login" li="/SignUp" />
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "40px", sm: "60px", md: "80px" },
            color: theme.palette.primary.main // اللون الأساسي من الثيم
          }}
        >
          Hello World
        </Typography>
      </Box>
      <Footer/>
    </>
  );
}
