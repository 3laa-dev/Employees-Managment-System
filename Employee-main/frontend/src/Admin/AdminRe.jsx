
import Heder from '../componets/Heder';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box,Grid } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../componets/DeleteDialog';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AdminRe(){
  const [admins, setAdmins] = useState([]);
  // delete confirm dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const token = localStorage.getItem('token');

  // جلب البيانات
  const fetchAdmins = async () => {
    try {
      if (!token) {
        console.error("Token is missing");
        return;
      }
      const res = await fetch('http://localhost:3001/api/admin/getRequests', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setAdmins(data.data.admins || []);
    } catch (err) {
      console.error("فشل في تحميل الإدمنز", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // تفعيل الإدمن
  const handleActivate = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/admin/activeThis/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: true })
      });
      if (res.ok) {
        fetchAdmins(); // تحديث القائمة بعد التفعيل
      } else {
        console.error("فشل التفعيل");
      }
    } catch (err) {
      console.error("خطأ في التفعيل", err);
    }
  };

  // حذف إدمن محدد
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/admin/deleteAdmin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdmins(); // تحديث القائمة بعد الحذف
      } else {
        console.error("فشل الحذف");
      }
    } catch (err) {
      console.error("خطأ في الحذف", err);
    }
  };

  // حذف كل الإدمنز
  const handleDeleteAll = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/deleteAllReq', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setAdmins([]); // تفريغ الجدول فوراً
      } else {
        console.error("فشل حذف الجميع");
      }
    } catch (err) {
      console.error("خطأ في حذف الجميع", err);
    }
  };
  // Delete with confirmation
  const openDeleteConfirm = (staff) => {
    setStaffToDelete(staff);
    setDeleteDialogOpen(true);
  };
  const closeDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    setStaffToDelete(null);
  };
  const confirmDelete = async () => {
    if (!staffToDelete) return;
    await handleDelete(staffToDelete);
    closeDeleteConfirm();
  };

  return(
    <>
      <Heder title="Home" lin="/Admin" tit="Exit" li="/" list={["Admins", "adminRecesit", "Managers", "Employees"]} />
     <Box sx={{ p: 2, mt: 8, height: "100%", justifyContent: "center", display: "flex" }}>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Grid item size={8} width={900}>
      <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: { md: 800, sm: 500 }, mt: 2, }}>
        <Table stickyHeader>
          <TableHead sx={{  }}>       
            <TableRow>
              <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>#</TableCell>
              <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}> Admin Name</TableCell>
              <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>Admin Email</TableCell>
              <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>is Active</TableCell>
               <TableCell sx={{ color: "white",backgroundColor: "#6A1B9A" }}>
                    <Button
          variant="contained"
          onClick={handleDeleteAll}
        >
          Delete All
        </Button>
               </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(admins) && admins.map((admin, i) => (
              <StyledTableRow key={admin._id || i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.isActive ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleActivate(admin._id)} 
                    disabled={admin.isActive} 
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="success"
                  >
                    <CheckBoxIcon />
                  </Button>
                  <Button 
                    onClick={() => openDeleteConfirm(admin._id)} 
                    variant="outlined"
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      </Grid>
      </Box>
           <DeleteDialog staffToDelete={staffToDelete} deleteDialogOpen={deleteDialogOpen} closeDeleteConfirm={closeDeleteConfirm} confirmDelete={confirmDelete}/>
         <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>

    </>
  )
}
