import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

interface EmployeesListProps {
  users: User[];
}

const EmployeesList: React.FC<EmployeesListProps> = ({ users }) => {
  return (
    <div>
      <div style={{ height: 70 }} />
      <Typography sx={{ textAlign: "left" }} variant="h4">
        <b className="colors">Your Employees</b>
      </Typography>
      <Divider sx={{ my: 3 }} />
      <div style={{ height: 70 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <PersonIcon />
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign={"center"} mt={4} mb={4} variant="h6">
                    No Employee found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeesList;
