
import React, { useState } from 'react';
import {
  Box, Grid,  Button, TextField, TableRow,InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Heder from '../../componets/Heder';
import StaffTable from '../../componets/StaffTable';
import DepartmentTable from '../../componets/DepartmentTable';
import StaffDialog from '../../componets/StaffDialog';
import DeleteDialog from '../../componets/DeleteDialog';
import { useStaff } from "../../context/StaffContext";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export default function Employ() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  // delete confirm dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const token = localStorage.getItem('token');
  const {  managers,departments,fetchManagers,employees,  fetchEmployees, } = useStaff();
  // Merge employees & managers with a type flag
  const allStaff = [
    ...employees.map((emp) => ({ ...emp, staffType: 'employee' })),
    ...managers.map((man) => ({ ...man, staffType: 'manager' })),
  ];
  // Filter by search and department
  const filteredStaff = allStaff.filter((staff) => {
    const term = (searchTerm || '').toLowerCase();
    const matchesSearch =
      (staff.name || '').toLowerCase().includes(term) ||
      (staff.email || '').toLowerCase().includes(term) ||
      (staff.phone || '').toLowerCase().includes(term);

    const matchesDepartment = selectedDepartment ? staff.departmentId === selectedDepartment : true;
    return matchesSearch && matchesDepartment;
  });
  // View/edit dialog handlers
  const handleView = (staff) => {
    setSelectedStaff({ ...staff });
    setOpenDialog(true);
  };
  const handleUpdate = async () => {
    if (!selectedStaff) return;

    const urlBase =
      selectedStaff.staffType === 'employee'
        ? 'http://localhost:3001/api/Employees/updateEmployee/'
        : 'http://localhost:3001/api/managers/updateManager/';

    const updateData = {
      name: selectedStaff.name,
      email: selectedStaff.email,
      phone: selectedStaff.phone,
      salary: selectedStaff.salary,
      departmentId: selectedStaff.departmentId,
    };

    try {
      const res = await fetch(`${urlBase}${selectedStaff._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        setOpenDialog(false);
        if (selectedStaff.staffType === 'employee') fetchEmployees();
        else fetchManagers();
      } else {
        const errorData = await res.json();
        console.error('Update failed:', errorData);
      }
    } catch (err) {
      console.error('Error updating data', err);
    }
  };
  const handleChange = (field, value) => {
    setSelectedStaff((prev) => ({
      ...prev,
      [field]: value,
    }));
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
  const handleDelete = async (staff) => {
    if (!staff) return;

    const urlBase =
      staff.staffType === 'employee'
        ? 'http://localhost:3001/api/Employees/deleteEmployee/'
        : 'http://localhost:3001/api/managers/deleteManager/';

    try {
      const res = await fetch(`${urlBase}${staff._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        if (staff.staffType === 'employee') fetchEmployees();
        else fetchManagers();
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error('Error deleting', err);
    }
  };
  const totalEmployees = departments.reduce((sum, dep) => sum + dep.numberOfEmployees, 0);

  return (
    <>
      <Heder title="Home" lin="/Admin" tit="Exit" li="/" list={["Admins", "adminRecesit", "Managers", "Employees"]} />
      <Box sx={{ p: 2, mt: 8, height: '100%', justifyContent: 'center', display: 'flex' }}>
        <Grid container spacing={2} justifyContent={'center'}>
          {/* Top bar */}
          <Grid item size={8}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1, p: 1, flexWrap: 'wrap' }}>
              <Link to={'/Admin'}>
                <Button size="large" variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, px: 4, py: 2 }}>
                  Add Employee
                </Button>
              </Link>

              <Box sx={{ flex: 1, minWidth: 250 }}>
                <TextField
                  placeholder="Search employees and managers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: '#BA68C8', borderRadius: 2, maxWidth: 400, width: '100%' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Staff table */}
          <Grid item xs={12} md={8}>
         <StaffTable
          filteredStaff={filteredStaff} departments={departments} handleView={handleView} openDeleteConfirm={openDeleteConfirm}
         />
          </Grid>

          {/* Departments list */}
          <Grid item xs={12} md={4} mt={2}>
           <DepartmentTable  departments={departments} totalEmployees={totalEmployees} setSelectedDepartment={setSelectedDepartment}/>
          </Grid>
        </Grid>
      </Box>
      {/* Edit Dialog */}
      {selectedStaff && (
       <StaffDialog openDialog={openDialog} setOpenDialog={setOpenDialog} selectedStaff={selectedStaff} departments={departments} handleChange={handleChange} handleUpdate={handleUpdate}/>
      )}
      {/* Delete Confirmation Dialog */}
     <DeleteDialog staffToDelete={staffToDelete} deleteDialogOpen={deleteDialogOpen} closeDeleteConfirm={closeDeleteConfirm} confirmDelete={confirmDelete}/>
      <Box sx={{backgroundColor:"#6A1B9A",color:"white",p:3}}> </Box>

    </>
  );
}

