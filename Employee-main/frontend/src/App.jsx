import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ManagerProvider } from './context/ManagerContext';
import Home from './pages/Home';
import SignUpForm from "./pages/SignUpForm";
import SignUp from "./pages/SingUp";
import Admin from "./Admin/Admin";
import Admins from "./Admin/Admins";
import Footer from './componets/Footer';
import AdminRe from "./Admin/AdminRe";
import Employ from "./Admin/Employ/Employ";
import ManagerAdmin from "./Admin/Manager/ManagerAdmin";
import Manager from "./Manager/Manager";
import EmployeeManager from "./Manager/EmployeeManager";
import { StaffProvider } from "./context/StaffContext";
import './App.css';

// 🎨 إنشاء الثيم البنفسجي
const theme = createTheme({
  palette: {
    primary: {
      main: "#6A1B9A", // بنفسجي غامق
    },
    secondary: {
      main: "#BA68C8", // بنفسجي فاتح
    },
    background: {
      default: "#FFFFFF", // خلفية الصفحات
    },
    text: {
      primary: "#2C2C2C", // نصوص أساسية
      secondary: "#555555", // نصوص ثانوية
    },
  },
  typography: {
    fontFamily: "Cairo, Roboto, Arial, sans-serif", // خط عربي/إنجليزي
  },
});

function App() {
  return (
 
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* يضبط الخلفية والنصوص حسب الثيم */}
      <StaffProvider>
       <ManagerProvider>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUpForm" element={<SignUpForm />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admins" element={<Admins />} />
        <Route path="/adminRecesit" element={ <AdminRe/>}/>
        <Route path="/Employees" element={ <Employ/>}/>
        <Route path="/Managers" element={ <ManagerAdmin/>}/>
        <Route path="/Manager" element={<Manager/>}/>
        <Route path="/Employee" element={ <EmployeeManager/>}/>
      </Routes>
</ManagerProvider> 
      </StaffProvider>
    </ThemeProvider>
  );
}

export default App;
