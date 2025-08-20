import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function DeleteDialog({ staffToDelete,deleteDialogOpen,closeDeleteConfirm,confirmDelete }) {
  if (!staffToDelete) return null;
  return (
    <Dialog open={deleteDialogOpen} onClose={closeDeleteConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete ${staffToDelete?.name || 'this person'}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm} color="secondary">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
  );
}
