import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  TextField,  Select,  MenuItem,  FormControl,  InputLabel} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function StaffDialog({ openDialog, setOpenDialog, selectedStaff, departments, handleChange, handleUpdate }) {
  if (!selectedStaff) return null;

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Edit {selectedStaff.staffType === 'employee' ? 'Employee' : 'Manager'}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={selectedStaff.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={selectedStaff.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              value={selectedStaff.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Salary"
              value={selectedStaff.salary || ''}
              onChange={(e) => handleChange('salary', e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedStaff.departmentId || ''}
                onChange={(e) => handleChange('departmentId', e.target.value)}
                label="Department"
              >
                {departments.map((dep) => (
                  <MenuItem key={dep._id} value={dep._id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
  );
}
