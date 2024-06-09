import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface EditTaskFormProps {
  taskId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  pickAssingedUser: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedUserId: string;
  isCompleted: boolean;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  taskId,
  title: initialTitle,
  description: initialDescription,
  isCompleted: initialIsCompleted,
  onClose,
  onUpdate,
  pickAssingedUser,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put<Task>(
        `https://localhost:7009/api/task/${taskId}`,
        {
          title,
          description,
          isCompleted,
          assignedUserId: pickAssingedUser,
        }
      );
      onUpdate(res.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                color="primary"
              />
            }
            label="Completed"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="secondary">
            Update Task
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskForm;
