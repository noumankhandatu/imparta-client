import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
interface User {
  id: string;
  username: string;
}

interface TaskFormProps {
  users: User[];
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  assignedUserId: string;
  setAssignedUserId: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleTaskSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  users,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  assignedUserId,
  setAssignedUserId,
  loading,
  handleTaskSubmit,
}) => {
  useEffect(() => {
    AOS.init({
      offset: 20,
    });
    AOS.refresh();
  }, []);
  return (
    <Box
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-delay="600"
      sx={{ mt: 4 }}
    >
      <Typography variant="h4">
        <b className="colors">Create Task </b>
      </Typography>
      <div style={{ height: 30 }} />
      <TextField
        label="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        multiline
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        select
        label="Assign to"
        value={assignedUserId}
        onChange={(e) => setAssignedUserId(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.username}
          </MenuItem>
        ))}
      </TextField>
      <div style={{ height: 30 }} />

      <Button
        color="secondary"
        variant="contained"
        onClick={handleTaskSubmit}
        disabled={!taskTitle || !taskDescription || !assignedUserId || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
