import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import {blue, deepOrange} from "@mui/material/colors";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 450,
    margin: "20px auto"
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align={"center"} sx={{ mb: "10px", mt: "10px" }}>
            <Box display={"flex"} alignItems={"center"} gap={"15px"} marginBottom={"10px"} justifyContent={"center"}>
              <Avatar sx={{ bgcolor: blue[500] }}>A</Avatar>
              <Avatar sx={{ bgcolor: blue[500] }}>N</Avatar>
              <Avatar sx={{ bgcolor: blue[500] }}>D</Avatar>
              <Avatar sx={{ bgcolor: blue[500] }}>A</Avatar>
            </Box>
            <h2>Sign in</h2>
          </Grid>
          <TextField onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email" label="Email" required name="email" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
          <TextField onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" label="Password" required name="password" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
          <Button type="submit" sx={{ bgcolor: deepOrange[500], mt: 5, mb: 2 }} fullWidth variant="contained" disabled={isLoading}>Login</Button>
        </form>
        <Typography sx={{ mb: "10px", mt: "10px" }}>
          <Link rel="stylesheet" href="#">
            Forgot password ?
          </Link>
        </Typography>
        <Typography sx={{ mb: "10px", mt: "10px" }}>
          Do you have an account ?
          <Link rel="stylesheet" to="/signup">
            Sign Up ?
          </Link>
        </Typography>
        {/* {error && <div>{error}</div>} */}
      </Paper>
    </Grid>
  );
};

export default Login;
