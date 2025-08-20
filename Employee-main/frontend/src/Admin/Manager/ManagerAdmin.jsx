
import Heder from '../../componets/Heder';
import React, { useState} from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import StaffDialog from '../../componets/StaffDialog';
import StaffTable from '../../componets/StaffTable';
import { useStaff } from "../../context/StaffContext";
import DeleteDialog from '../../componets/DeleteDialog';

const StyledTableRow = styled('tr')(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export default function ManagerAdmin() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("edit"); // "add" | "edit"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment] = useState(null);

  const { managers, departments, fetchManagers } = useStaff();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const token = localStorage.getItem('token');



  // دمج المدراء مع نوع
  const allStaff = [
    ...managers.map(man => ({ ...man, staffType: 'manager' })),
  ];

  // فلترة حسب البحث
  const filteredStaff = allStaff.filter(staff => {
    const matchesSearch =
      staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment
      ? staff.departmentId === selectedDepartment
      : true;
    return matchesSearch && matchesDepartment;
  });

  // عرض بيانات مدير للتعديل
  const handleView = (manager) => {
    setSelectedStaff({ ...manager });
    setDialogMode("edit");
    setOpenDialog(true);
  };

  // تحديث بيانات مدير
  const handleUpdate = async () => {
    if (!selectedStaff) return;

    const url = `http://localhost:3001/api/managers/updateManager/${selectedStaff._id}`;
    const updateData = {
      name: selectedStaff.name,
      email: selectedStaff.email,
      phone: selectedStaff.phone,
      salary: selectedStaff.salary,
      departmentId: selectedStaff.departmentId,
    };

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        setOpenDialog(false);
        fetchManagers();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update manager");
      }
    } catch (err) {
      alert("Error while updating manager");
      console.error("خطأ في تحديث بيانات المدير", err);
    }
  };

  // إضافة مدير جديد
  const handleAdd = async () => {
    if (!selectedStaff) return;

    const url = `http://localhost:3001/api/managers/addManager`;
    const newManager = {
      name: selectedStaff.name,
      email: selectedStaff.email,
      phone: selectedStaff.phone,
      salary: selectedStaff.salary,
      departmentId: selectedStaff.departmentId,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newManager)
      });

      if (res.ok) {
        setOpenDialog(false);
        fetchManagers();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add manager");
      }
    } catch (err) {
      alert("Error while adding manager");
      console.error("خطأ في إضافة مدير", err);
    }
  };

  // تحديث الحقول في Dialog
  const handleChange = (field, value) => {
    setSelectedStaff(prev => ({
      ...prev,
      [field]: value
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

  const handleDelete = async (manager) => {
    if (!manager) return;

    try {
      const res = await fetch(`http://localhost:3001/api/managers/deleteManager/${manager._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        fetchManagers();
      } else {
        alert("Failed to delete manager");
      }
    } catch (err) {
      alert("Error while deleting manager");
      console.error("خطأ في الحذف", err);
    }
  };

  return (
    <>
      <Heder
        title="Home"
        lin="/Admin"
        tit="Exit"
        li="/"
        list={["Admins", "adminRecesit", "Managers", "Employees"]}
      />

      <Box sx={{ p: 2, mt: 8, height: "100%", justifyContent: "center", display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mb: 1,
                p: 1,
                flexWrap: "wrap"
              }}
            >
              <Button
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2, px: 4, py: 2 }}
                onClick={() => {
                  setSelectedStaff({ name: "", email: "", phone: "", salary: "", departmentId: "" });
                  setDialogMode("add");
                  setOpenDialog(true);
                }}
              >
                Add Manager
              </Button>

              <Box sx={{ flex: 1, minWidth: 250 }}>
                <TextField
                  placeholder="Search managers"
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

            <StaffTable
              filteredStaff={filteredStaff}
              departments={departments}
              handleView={handleView}
              openDeleteConfirm={openDeleteConfirm}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Dialog لإضافة/تعديل مدير */}
      {selectedStaff && (
        <StaffDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedStaff={selectedStaff}
          departments={departments}
          handleChange={handleChange}
          handleUpdate={dialogMode === "edit" ? handleUpdate : handleAdd}
          mode={dialogMode}
        />
      )}

      {/* نافذة تأكيد الحذف */}
      <DeleteDialog
        staffToDelete={staffToDelete}
        deleteDialogOpen={deleteDialogOpen}
        closeDeleteConfirm={closeDeleteConfirm}
        confirmDelete={confirmDelete}
      />

      <Box sx={{ backgroundColor: "#6A1B9A", color: "white", p: 3 }}> </Box>
    </>
  );
}

