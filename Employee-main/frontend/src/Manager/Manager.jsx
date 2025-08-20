
import React, { useState,useContext } from 'react';
import {
  Select, InputLabel, MenuItem, FormControl,
  InputAdornment, TextField, Button, Box, Typography
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AddIcon from '@mui/icons-material/Add';
import EuroIcon from '@mui/icons-material/Euro';
import Heder from "../componets/Heder";
import { ManagerContext } from '../context/ManagerContext';
export default function Manager() {
  const { manager, departmentName } = useContext(ManagerContext);
  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empSalary, setEmpSalary] = useState('');
  const [loading, setLoading] = useState(false);


  // const handleAddEmployee = async () => {
  //   if (!empName || !empEmail || !empPhone || !department || !empSalary) {
  //     alert("يرجى ملء جميع الحقول");
  //     return;
  //   }

  //   const token = localStorage.getItem('token');
  //   if (!token) return alert("يرجى تسجيل الدخول أولاً");

  //   setLoading(true);
  //   try {
  //     const res = await fetch('http://localhost:3001/api/Employees/addEmployee', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //       body: JSON.stringify({
  //         name: empName,
  //         email: empEmail,
  //         phone: empPhone,
  //         departmentId: department,
  //         salary: empSalary
  //       })
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       alert("تمت إضافة الموظف بنجاح");
  //       setEmpName('');
  //       setEmpEmail('');
  //       setEmpPhone('');
  //       setEmpSalary('');
  //     } else {
  //       alert(data.message || "فشل في إضافة الموظف");
  //     }
  //   } catch (error) {
  //     console.error("خطأ أثناء إضافة الموظف:", error);
  //   }
  //   setLoading(false);
  // };
 const handleAddEmployee = async () => {
    if (!empName || !empEmail || !empPhone || !manager?.departmentId || !empSalary) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/Employees/addEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: empName,
          email: empEmail,
          phone: empPhone,
          departmentId: manager.departmentId,
          salary: empSalary,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("تمت إضافة الموظف بنجاح");
        setEmpName(''); setEmpEmail(''); setEmpPhone(''); setEmpSalary('');
      } else alert(data.message || "فشل في إضافة الموظف");
    } catch (error) {
      console.error("خطأ أثناء إضافة الموظف:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Heder title="Home" lin="/" tit="Exit" li="/"  list={[ "Employee"]}/>
      <Box display="flex" justifyContent="center" height="90vh" alignItems="center" textAlign="center">
        <Box>
          <Typography variant="h5" mb={2}>Add Employee</Typography>

          <Box
            sx={{
              maxWidth: 400,
              width: '100%',
              p: 3,
              borderRadius: 2,
              boxShadow: '0px 8px 13px rgba(0, 0, 0, 0.5)',
              backgroundColor: 'white',
            }}
          >
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>
              }}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={empPhone}
              onChange={(e) => setEmpPhone(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><PhoneInTalkIcon /></InputAdornment>
              }}
            />
            <TextField
              fullWidth
              label="Salary"
              margin="normal"
              value={empSalary}
              onChange={(e) => setEmpSalary(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><EuroIcon /></InputAdornment>
              }}
            />

            {/* قسم المدير معروض فقط وليس قابل للتغيير */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                value={departmentName}
                disabled
              >
                {departmentName && (
                  <MenuItem value={departmentName}>{departmentName}</MenuItem>
                )}
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleAddEmployee}
              disabled={loading}
            >
              Add <AddIcon />
            </Button>
          </Box>
        </Box>
      </Box>
     <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>
      
    </>
  );
}
