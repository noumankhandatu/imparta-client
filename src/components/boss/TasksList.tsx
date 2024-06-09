import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  TextField,
  Box,
  IconButton,
  Container,
  Divider,
} from "@mui/material";
import EditTaskForm from "./EditTaskForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LoopIcon from "@mui/icons-material/Loop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedUserId: string;
  isCompleted: boolean;
}

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

interface TasksListProps {
  tasks: Task[];
  loading: boolean;
  users: User[] | unknown;
  onTaskUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  loading,
  onTaskUpdate,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"title" | "isCompleted">("title");

  const toggleSort = (column: "title" | "isCompleted") => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Sort tasks based on sorting criteria
  const sortedTasks = tasks.slice().sort((a, b) => {
    if (sortBy === "title") {
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === "isCompleted") {
      return sortDirection === "asc"
        ? Number(a.isCompleted) - Number(b.isCompleted)
        : Number(b.isCompleted) - Number(a.isCompleted);
    }
    return 0;
  });

  // Filter tasks based on search term
  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseEditForm = () => {
    setSelectedTask(null);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    onTaskUpdate(updatedTask);
    setSelectedTask(null);
  };

  const handleDeleteClick = async (taskId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7009/api/task/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(taskId);
      } else {
        console.error("Failed to delete the task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container maxWidth={"100%"}>
      <Box>
        <Typography sx={{ textAlign: "left" }} variant="h4">
          <b className="colors">List Tasks </b>
        </Typography>
        <Divider sx={{ my: 3 }} />
        <div style={{ height: 70 }} />

        <Box sx={{ position: "relative" }}>
          <TextField
            className="shadow br"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            label="Search Tasks"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setSearchTerm("")}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {searchTerm ? <LoopIcon /> : <SearchIcon />}
                </IconButton>
              ),
            }}
          />
          {searchTerm && <div className="circle-animation"></div>}
        </Box>
        <div style={{ height: 70 }} />
      </Box>

      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : tasks.length === 0 ? (
        <Typography variant="body1">No tasks created</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">
                    Title
                    {sortBy === "title" && (
                      <IconButton
                        size="small"
                        onClick={() => toggleSort("title")}
                      >
                        {sortDirection === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    )}
                  </Typography>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Typography variant="subtitle1">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </TableCell>
                  <TableCell>
                    {task.isCompleted ? "Completed" : "Not Completed"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ border: "1px solid orange", mr: 3 }}
                      onClick={() => handleEditClick(task)}
                    >
                      <EditIcon color="success" />
                    </IconButton>
                    <IconButton
                      sx={{ border: "1px solid orange" }}
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTasks.length === 0 && (
            <Typography style={{ textAlign: "center", marginTop: 30 }}>
              No Tasks Remain
            </Typography>
          )}
        </TableContainer>
      )}
      {selectedTask && (
        <EditTaskForm
          taskId={selectedTask.id}
          title={selectedTask.title}
          description={selectedTask.description}
          isCompleted={selectedTask.isCompleted}
          onClose={handleCloseEditForm}
          onUpdate={handleTaskUpdate}
          pickAssingedUser={selectedTask.assignedUserId}
        />
      )}
    </Container>
  );
};

export default TasksList;
