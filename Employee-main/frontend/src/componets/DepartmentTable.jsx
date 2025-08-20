import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function DepartmentTable({ departments, totalEmployees, setSelectedDepartment }) {
  return (
    <TableContainer component={Paper} sx={{ overflow: 'auto', maxHeight: { md: 800, sm: 500 }, p: 2,borderRadius:"2%",boxShadow:"0px 8px 13px rgba(0,0,0,0.5)"
           }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#6A1B9A' }}>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>#</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Departments</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#6A1B9A' }}>Employees</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.map((dep, i) => (
                    <StyledTableRow key={i} hover onClick={() => setSelectedDepartment(dep._id)} sx={{ cursor: 'pointer' }}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{dep.name}</TableCell>
                      <TableCell>{dep.numberOfEmployees}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter
                  sx={{ backgroundColor: '#BA68C8', color: 'white', position: 'sticky', bottom: 0, zIndex: 10 }}
                >
                  <TableRow sx={{ backgroundColor: '#BA68C8', cursor: 'pointer' }} hover onClick={() => setSelectedDepartment(null)}>
                    <TableCell>#</TableCell>
                    <TableCell>All Employees</TableCell>
                    <TableCell>{totalEmployees}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
  );
}
