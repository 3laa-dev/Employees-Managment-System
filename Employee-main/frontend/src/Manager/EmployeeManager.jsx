

// import React, { useState, useEffect ,useContext } from 'react';
// import {
//   Box, Grid, Paper, Typography, Button, TextField,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
//   Select, MenuItem, FormControl, InputLabel
// } from '@mui/material';
// import { ManagerContext } from '../context/ManagerContext';
// import { styled } from '@mui/material/styles';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';
// import { Link } from 'react-router-dom';
// import Heder from '../componets/Heder';
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
//   '&:last-child td, &:last-child th': { border: 0 },
// }));

// export default function EmployeeManager() {
//   const { manager, departmentName } = useContext(ManagerContext);
//   const [employees, setEmployees] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!manager) return;

//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch(`http://localhost:3001/api/Employees/getAllEmployees`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (res.ok && data.data && data.data.Employees) {
//           const filtered = data.data.Employees
//             .filter(emp => emp.departmentId === manager.departmentId)
//             .map(emp => ({ ...emp, staffType: "employee" }));

//           const managerWithType = { ...manager, staffType: "manager" };
//           setEmployees([managerWithType, ...filtered]);
//         } else {
//           setEmployees([{ ...manager, staffType: "manager" }]);
//         }
//       } catch (err) {
//         console.error("فشل في تحميل الموظفين", err);
//       }
//     };
//     fetchEmployees();
//   }, [manager]);

//   const filteredStaff = employees.filter(staff =>
//     staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     staff.phone?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (staff) => {
//     setSelectedStaff({ ...staff });
//     setOpenDialog(true);
//   };

//   const handleUpdate = async () => {
//     if (!selectedStaff) return;

//     const urlBase =
//       selectedStaff.staffType === "manager"
//         ? `http://localhost:3001/api/managers/updateManager/${manager._id}`
//         : `http://localhost:3001/api/Employees/updateEmployee/${selectedStaff._id}`;

//     const updateData = {
//       name: selectedStaff.name,
//       email: selectedStaff.email,
//       phone: selectedStaff.phone,
//       ...(selectedStaff.staffType === "employee" && { departmentId: selectedStaff.departmentId })
//     };

//     try {
//       const res = await fetch(urlBase, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(updateData)
//       });

//       if (res.ok) {
//         // تحديث مباشر للـ state بعد الحفظ
//         if (selectedStaff.staffType === "manager") {
//           // setManagerData(prev => ({ ...prev, ...updateData }));
//           setEmployees(prev =>
//             prev.map(emp => emp.staffType === "manager" ? { ...emp, ...updateData } : emp)
//           );
//         } else {
//           setEmployees(prev =>
//             prev.map(emp => emp._id === selectedStaff._id ? { ...emp, ...updateData } : emp)
//           );
//         }
//         setOpenDialog(false);
//       } else {
//         const errorData = await res.json();
//         console.error("فشل تحديث البيانات:", errorData);
//       }
//     } catch (err) {
//       console.error("خطأ في تحديث البيانات", err);
//     }
//   };

//   const handleDelete = async (staff) => {
//     if (!staff) return;

//     try {
//       const res = await fetch(`http://localhost:3001/api/Employees/deleteEmployee/${staff._id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.ok) {
//         setEmployees(prev => prev.filter(emp => emp._id !== staff._id));
//       } else {
//         console.error("فشل الحذف");
//       }
//     } catch (err) {
//       console.error("خطأ في الحذف", err);
//     }
//   };

//   const handleChange = (field, value) => {
//     setSelectedStaff(prev => ({ ...prev, [field]: value }));
//   };
//   return (
//     <>
//       <Heder title="Home" lin="Manager" tit="Exit" li="/" list={["Employee"]} />
//       <Box sx={{ p: 2, mt: 8, height: "100%", justifyContent: "center", display: "flex" }}>
//         <Grid container spacing={2} justifyContent={"center"}>
//           <Grid item size={8}>
//             <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1, p: 1, flexWrap: "wrap" }}>
//               <Link to={"/Manager"}>
//                 <Button size="large" variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, px: 4, py: 2 }}>
//                   add employ
//                 </Button>
//               </Link>
//               <Box sx={{ flex: 1, minWidth: 250 }}>
//                 <TextField
//                   placeholder="البحث في الموظفين"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     bgcolor: "#BA68C8",
//                     borderRadius: 2,
//                     maxWidth: 400,
//                     width: "100%",
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item  size={8} >
//             <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: { md: 800, sm: 500 }, mt: 2 }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>#</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Name</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Email</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Phone</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Department</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Type</TableCell>
//                     <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStaff.length > 0 ? (
//                     filteredStaff.map((staff, i) => (
//                       <StyledTableRow key={staff._id}>
//                         <TableCell>{i + 1}</TableCell>
//                         <TableCell>{staff.name}</TableCell>
//                         <TableCell>{staff.email}</TableCell>
//                         <TableCell>{staff.phone}</TableCell>
//                         <TableCell>{departmentName}</TableCell>
//                         <TableCell>{staff.staffType === "manager" ? "مدير" : "موظف"}</TableCell>
//                         <TableCell>
//                           <Button onClick={() => handleView(staff)} variant="outlined" color="secondary" sx={{ mr: 1 }}>
//                             <RemoveRedEyeIcon />
//                           </Button>
//                           <Button
//   onClick={() => handleDelete(staff)}
//   variant="outlined"
//   color="error"
//   disabled={staff.staffType === "manager"} // إذا مدير يصبح غير فعال
// >
//   <DeleteIcon />
// </Button>

//                         </TableCell>
//                       </StyledTableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={7} align="center">
//                         <Typography variant='h5'>لا يوجد موظفين</Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>
//         </Grid>
//       </Box>

//       {selectedStaff && (
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>تعديل بيانات الموظف</DialogTitle>
//           <DialogContent dividers>
//             <TextField fullWidth margin="normal" label="الاسم" value={selectedStaff.name || ''} onChange={e => handleChange('name', e.target.value)} />
//             <TextField fullWidth margin="normal" label="البريد الإلكتروني" type="email" value={selectedStaff.email || ''} onChange={e => handleChange('email', e.target.value)} />
//             <TextField fullWidth margin="normal" label="رقم الهاتف" value={selectedStaff.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
//             <TextField fullWidth margin="normal" disabled label="salary" value={selectedStaff.salary || ''} onChange={e => handleChange('salary', e.target.value)} />
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="department-label">Department</InputLabel>
//               <Select labelId="department-label" value={departmentName} disabled>
//                 {departmentName && (
//                   <MenuItem value={departmentName}>{departmentName}</MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)} color="secondary">إلغاء</Button>
//             <Button onClick={handleUpdate} color="primary" startIcon={<SaveIcon />}>حفظ</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//      <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>

//     </>
//   );
// }
import React, { useState, useEffect ,useContext } from 'react';
import {
  Box, Grid, Paper, Typography, Button, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { ManagerContext } from '../context/ManagerContext';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import Heder from '../componets/Heder';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export default function EmployeeManager() {
  const { manager, departmentName } = useContext(ManagerContext);
  const [employees, setEmployees] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!manager) return;

    const fetchEmployees = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/Employees/getAllEmployees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.data && data.data.Employees) {
          const filtered = data.data.Employees
            .filter(emp => emp.departmentId === manager.departmentId)
            .map(emp => ({ ...emp, staffType: "employee" }));

          const managerWithType = { ...manager, staffType: "manager" };
          setEmployees([managerWithType, ...filtered]);
        } else {
          setEmployees([{ ...manager, staffType: "manager" }]);
        }
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };
    fetchEmployees();
  }, [manager]);

  const filteredStaff = employees.filter(staff =>
    staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (staff) => {
    setSelectedStaff({ ...staff });
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    if (!selectedStaff) return;

    const urlBase =
      selectedStaff.staffType === "manager"
        ? `http://localhost:3001/api/managers/updateManager/${manager._id}`
        : `http://localhost:3001/api/Employees/updateEmployee/${selectedStaff._id}`;

    const updateData = {
      name: selectedStaff.name,
      email: selectedStaff.email,
      phone: selectedStaff.phone,
      ...(selectedStaff.staffType === "employee" && { departmentId: selectedStaff.departmentId })
    };

    try {
      const res = await fetch(urlBase, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        if (selectedStaff.staffType === "manager") {
          setEmployees(prev =>
            prev.map(emp => emp.staffType === "manager" ? { ...emp, ...updateData } : emp)
          );
        } else {
          setEmployees(prev =>
            prev.map(emp => emp._id === selectedStaff._id ? { ...emp, ...updateData } : emp)
          );
        }
        setOpenDialog(false);
      } else {
        const errorData = await res.json();
        console.error("Failed to update data:", errorData);
      }
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  const handleDelete = async (staff) => {
    if (!staff) return;

    try {
      const res = await fetch(`http://localhost:3001/api/Employees/deleteEmployee/${staff._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setEmployees(prev => prev.filter(emp => emp._id !== staff._id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleChange = (field, value) => {
    setSelectedStaff(prev => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <Heder title="Home" lin="Manager" tit="Exit" li="/" list={["Employee","Manager"]} />
      <Box sx={{ p: 2, mt: 8, height: "100%", justifyContent: "center", display: "flex" }}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item size={8}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1, p: 1, flexWrap: "wrap" }}>
              <Link to={"/Manager"}>
                <Button size="large" variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, px: 4, py: 2 }}>
                  add employee
                </Button>
              </Link>
              <Box sx={{ flex: 1, minWidth: 250 }}>
                <TextField
                  placeholder="Search employees"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: "#BA68C8",
                    borderRadius: 2,
                    maxWidth: 400,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item  size={8} >
            <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: { md: 800, sm: 500 }, mt: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>#</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Name</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Email</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Phone</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Department</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Type</TableCell>
                    <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff, i) => (
                      <StyledTableRow key={staff._id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>{staff.phone}</TableCell>
                        <TableCell>{departmentName}</TableCell>
                        <TableCell>{staff.staffType === "manager" ? "Manager" : "Employee"}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleView(staff)} variant="outlined" color="secondary" sx={{ mr: 1 }}>
                            <RemoveRedEyeIcon />
                          </Button>
                          <Button
                            onClick={() => handleDelete(staff)}
                            variant="outlined"
                            color="error"
                            disabled={staff.staffType === "manager"} 
                          >
                            <DeleteIcon />
                          </Button>

                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant='h5'>No employees</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

      {selectedStaff && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Employee Data</DialogTitle>
          <DialogContent dividers>
            <TextField fullWidth margin="normal" label="Name" value={selectedStaff.name || ''} onChange={e => handleChange('name', e.target.value)} />
            <TextField fullWidth margin="normal" label="Email" type="email" value={selectedStaff.email || ''} onChange={e => handleChange('email', e.target.value)} />
            <TextField fullWidth margin="normal" label="Phone" value={selectedStaff.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
            <TextField fullWidth margin="normal" disabled label="Salary" value={selectedStaff.salary || ''} onChange={e => handleChange('salary', e.target.value)} />
            <FormControl fullWidth margin="normal">
              <InputLabel id="department-label">Department</InputLabel>
              <Select labelId="department-label" value={departmentName} disabled>
                {departmentName && (
                  <MenuItem value={departmentName}>{departmentName}</MenuItem>
                )}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleUpdate} color="primary" startIcon={<SaveIcon />}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    
       <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>  
    
    </>
  );
}
