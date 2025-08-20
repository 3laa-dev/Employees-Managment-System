
import React, { useState } from 'react';
import {
  Select, InputLabel, MenuItem, FormControl,
  InputAdornment, TextField, Button, ButtonGroup, Box
} from '@mui/material';
import Heder from '../componets/Heder';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AddIcon from '@mui/icons-material/Add';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EuroIcon from '@mui/icons-material/Euro';
import { useStaff } from "../context/StaffContext";

export default function Admin() {
  const [activeButton, setActiveButton] = useState('employ');

  // ===== State الموظف =====
  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empSalary, setEmpSalary] = useState('');
  const [department, setDepartment] = useState('');

  // ===== State القسم =====
  const [depName, setDepName] = useState('');
  const [selectedManager, setSelectedManager] = useState('');

  // ===== State المدير =====
  const [manName, setManName] = useState('');
  const [manEmail, setManEmail] = useState('');
  const [manPassword, setManPassword] = useState('');
  const [manPhone, setManPhone] = useState('');
  const [manSalary, setManSalary] = useState('');
    const {    managers,   departments,} = useStaff();
  // إضافة موظف
  const handleAddEmployee = async () => {
    if (!empName || !empEmail || !empPhone || !department || !empSalary) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return alert("يرجى تسجيل الدخول أولاً");

    try {
      const res = await fetch('http://localhost:3001/api/Employees/addEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: empName,
          email: empEmail,
          phone: empPhone,
          departmentId: department,
          salary: empSalary
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("تمت إضافة الموظف بنجاح");
        setEmpName('');
        setEmpEmail('');
        setEmpPhone('');
        setEmpSalary('');
        setDepartment('');
      } else {
        alert(data.message || "فشل في إضافة الموظف");
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة الموظف:", error);
    }
  };

  // إضافة قسم
  const handleAddDepartment = async () => {
    if (!depName || !selectedManager) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return alert("يرجى تسجيل الدخول أولاً");

    try {
      const res = await fetch('http://localhost:3001/api/Departments/addDepartment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: depName,
          numberOfEmployees: 0,
          managerId: selectedManager
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("تمت إضافة القسم بنجاح");
        setDepName('');
        setSelectedManager('');
      } else {
        alert(data.message || "فشل في إضافة القسم");
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة القسم:", error);
    }
  };

  // إضافة مدير
  const handleAddManager = async () => {
    if (!manName || !manEmail || !manPassword || !manPhone || !manSalary) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return alert("يرجى تسجيل الدخول أولاً");

    try {
      const res = await fetch('http://localhost:3001/api/managers/addManager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: manName,
          email: manEmail,
          password: manPassword,
          salary: manSalary,
          phone: manPhone
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("تمت إضافة المدير بنجاح");
        setManName('');
        setManEmail('');
        setManPassword('');
        setManPhone('');
        setManSalary('');
      } else {
        alert(data.message || "فشل في إضافة المدير");
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة المدير:", error);
    }
  };

  return (
    <>
      <Heder title="Home" lin="/Admin" tit="Exit" li="/" list={["Admins", "adminRecesit", "Managers", "Employees"]} />
      <Box display="flex" justifyContent="center" height="90vh" alignItems="center" textAlign="center">
        <Box>
          <ButtonGroup variant="contained" sx={{ borderRadius: 2, boxShadow: '0px 8px 10px rgba(0,0,0,0.5)' }}>
            <Button onClick={() => setActiveButton('employ')}variant={activeButton === 'employ' ? "outlined" : "contained"}>Employ</Button>
            <Button onClick={() => setActiveButton('department')}variant={activeButton === 'department' ? "outlined" : "contained"}>Department</Button>
            <Button onClick={() => setActiveButton('manager')}variant={activeButton === 'manager' ? "outlined" : "contained"}>Manager</Button>
          </ButtonGroup>

          {/* Form الموظف */}
          {activeButton === 'employ' && (
                       <Box mt={2} display="flex" justifyContent="center">
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
              <TextField fullWidth value={empName} onChange={(e) => setEmpName(e.target.value)} label="Name" margin="normal" />
              <TextField fullWidth value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} label="Email" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment> }} />
              <TextField fullWidth value={empPhone} onChange={(e) => setEmpPhone(e.target.value)} label="Phone" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><PhoneInTalkIcon /></InputAdornment> }} />
              <TextField fullWidth value={empSalary} onChange={(e) => setEmpSalary(e.target.value)} label="Salary" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><EuroIcon /></InputAdornment> }} />

              <FormControl fullWidth margin="normal">
                <InputLabel>Choose a department</InputLabel>
                <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <MenuItem value=""><em>Choose</em></MenuItem>
                  {departments.map(dep => <MenuItem key={dep._id} value={dep._id}>{dep.name}</MenuItem>)}
                </Select>
              </FormControl>

              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAddEmployee}>Add <AddIcon /></Button>
            </Box>
            </Box>
          )}

          {/* Form القسم */}
          {activeButton === 'department' && (
            <Box mt={2}>
              <TextField fullWidth value={depName} onChange={(e) => setDepName(e.target.value)} label="Department Name" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><EngineeringIcon /></InputAdornment> }} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Choose Manager</InputLabel>
                <Select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                  <MenuItem value=""><em>Choose</em></MenuItem>
                  {managers.map(manager => (
                    <MenuItem key={manager._id} value={manager._id}>{manager.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAddDepartment}>Add <AddIcon /></Button>
            </Box>
          )}

          {/* Form المدير */}
          {activeButton === 'manager' && (
                                  <Box mt={2} display="flex" justifyContent="center">
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
              <TextField fullWidth value={manName} onChange={(e) => setManName(e.target.value)} label="Name" margin="normal" />
              <TextField fullWidth value={manEmail} onChange={(e) => setManEmail(e.target.value)} label="Email" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment> }} />
              <TextField fullWidth value={manPassword} onChange={(e) => setManPassword(e.target.value)} label="Password" margin="normal" />
              <TextField fullWidth value={manPhone} onChange={(e) => setManPhone(e.target.value)} label="Phone" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><PhoneInTalkIcon /></InputAdornment> }} />
              <TextField fullWidth value={manSalary} onChange={(e) => setManSalary(e.target.value)} label="Salary" margin="normal"
                InputProps={{ endAdornment: <InputAdornment position="end"><EuroIcon /></InputAdornment> }} />
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAddManager}>Add <AddIcon /></Button>
            </Box>
            </Box>
          )}
        </Box>
      </Box>
         <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>

    </>
  );
}
