import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Search as SearchIcon,
  Loop as LoopIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import LogoutMenu from "../../components/menu";
import AOS from "aos";
import "aos/dist/aos.css";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const User: React.FC = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  let data: { id: string } | null = null;
  const userDataString = localStorage.getItem("userdata");
  if (userDataString) {
    data = JSON.parse(userDataString);
  }
  console.log(data?.id, "data");

  const [greeting, setGreeting] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // Set greeting based on time of the day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning ☀️");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon 🌤️");
    } else {
      setGreeting("Good Evening 🌙");
    }

    // Fetch tasks from the API using user ID
    const fetchData = async () => {
      try {
        if (data?.id) {
          const response = await axios.get(
            `https://localhost:7009/api/task/user/${data.id}`
          );
          setTasks(response.data); // Assuming response.data is an array of tasks
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks. Please try again later.");
      }
    };

    fetchData();
  }, [data?.id]); // Run effect when data.id changes

  // Search functionality
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting functionality
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setTasks([...tasks].reverse());
  };

  return (
    <Box
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="600"
      sx={{ p: 6 }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <div>
          <Typography variant="h5" sx={{ mt: 3 }}>
            {greeting},
          </Typography>
          <Typography sx={{ mt: 3 }}>
            Let's check if we got some assigned tasks 😊
          </Typography>
        </div>

        <LogoutMenu />
      </Box>
      <Divider sx={{ my: 3 }} />
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
      {/* Render tasks table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={handleSort}>
                Title{" "}
                {sortOrder === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {task.isCompleted ? "Completed" : "Not Completed"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTasks.length === 0 && (
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            No Tasks available
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default User;
