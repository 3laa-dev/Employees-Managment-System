import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography ,Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));
export default function StaffTable({ filteredStaff, departments, handleView, openDeleteConfirm }) {
  return (
    <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: { md: 800, sm: 500 }, p: 2 }}>
      <Table stickyHeader>
        <TableHead>
                  <TableRow sx={{ backgroundColor: '#6A1B9A' }}>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>#</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Phone</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Department</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Type</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Actions</TableCell>
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
                        <TableCell>{departments.find((dep) => dep._id === staff.departmentId)?.name || 'Unassigned'}</TableCell>
                        <TableCell>{staff.staffType === 'employee' ? 'Employee' : 'Manager'}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleView(staff)} variant="outlined" color="secondary" sx={{ mr: 1 }}>
                            <RemoveRedEyeIcon />
                          </Button>
                          <Button onClick={() => openDeleteConfirm(staff)} variant="outlined" color="error">
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="h5">No employees or managers</Typography>
                      </TableCell>
                    </TableRow>
                  )}
         </TableBody>
      </Table>
    </TableContainer>
  );
}
