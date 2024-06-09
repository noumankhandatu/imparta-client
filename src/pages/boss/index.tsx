import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import EmployeesList from "../../components/boss/EmployeesList";
import TaskForm from "../../components/boss/TaskForm";
import TasksList from "../../components/boss/TasksList";

interface User {
  id: string;
  username: string;
  role: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedUserId: string;
  isCompleted: boolean;
}

const BossComponents: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Task[]>("https://localhost:7009/api/task");
        setTasks(res?.data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://localhost:7009/api/user/"
        );
        const filteredUsers = response.data.filter(
          (user) => user.role === "user"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTasks();
    fetchUsers();

    // Set greeting based on time of the day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning ☀️");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon 🌤️");
    } else {
      setGreeting("Good Evening 🌙");
    }
  }, []);

  const handleTaskSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post<Task>("https://localhost:7009/api/task", {
        title: taskTitle,
        description: taskDescription,
        isCompleted: false,
        assignedUserId: assignedUserId,
      });
      if (res.status === 201) {
        toast.success("Task created successfully!");
        setTasks([...tasks, res.data]);
        setTaskTitle("");
        setTaskDescription("");
        setAssignedUserId("");
      } else {
        toast.error("Check connectivity");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h5" align="center" sx={{ mt: 3 }}>
        {greeting}, <span>Welcome Back to Imparta 😊</span>
        <Divider sx={{ my: 3 }} />
      </Typography>
      <TaskForm
        users={users}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        assignedUserId={assignedUserId}
        setAssignedUserId={setAssignedUserId}
        loading={loading}
        handleTaskSubmit={handleTaskSubmit}
      />
      <div style={{ height: 100 }} />

      <TasksList
        users={users}
        tasks={tasks}
        loading={loading}
        onTaskUpdate={handleTaskUpdate}
        onDelete={handleDelete}
      />
      <div style={{ height: 100 }} />

      <EmployeesList users={users} />
    </Box>
  );
};

export default BossComponents;
