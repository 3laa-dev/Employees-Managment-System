import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import Heder from '../componets/Heder';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Admins(){
  const [admins, setAdmins] = useState([]);  // لازم تكون داخل هنا

  //جلب بيانات الإدمنز
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token is missing");
          return;
        }
  
        const res = await fetch('http://localhost:3001/api/admin/getAllAdmins', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await res.json();
        console.log("Fetched admins:", data);
        setAdmins(data.data.admins); // تأكد من أن الاسم الصحيح هنا هو admins
      } catch (err) {
        console.error("فشل في تحميل الإدمنز", err);
      }
    };
  
    fetchDepartments();
  }, []);

  return(
    <>
  
      <Heder title="Home" lin="/Admin" tit="Exit" li="/" list={["Admins", "adminRecesit", "Managers", "Employees"]} />
<Box justifyContent={"center"} display={"flex"} p={5}>
  <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#6A1B9A" }}>       
            <TableRow>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}> Admin Name</TableCell>
              <TableCell sx={{ color: "white" }}>Admin Email</TableCell>
              <TableCell sx={{ color: "white" }}>is Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(admins) && admins.map((admin,i) => (
              <StyledTableRow key={admin._id || i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.isActive ? 'Yes' : 'No'}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
</Box>
     <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>
   
    </>
  )
}
