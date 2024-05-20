import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(nom, prenom, email, password);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper elevation={10} style={{ padding: 20 }}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Box display="flex" alignItems="center" gap="15px" justifyContent="center">
                  <Avatar sx={{ bgcolor: blue[500] }}>A</Avatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>N</Avatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>D</Avatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>A</Avatar>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h2">
                  Sign Up
                </Typography>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <TextField
                  onChange={(e) => setNom(e.target.value)}
                  value={nom}
                  type="text"
                  placeholder="Nom"
                  label="Nom"
                  required
                  name="nom"
                  fullWidth
                  variant="standard"
                  sx={{ margin: "10px 0px" }}
                />
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <TextField
                  onChange={(e) => setPrenom(e.target.value)}
                  value={prenom}
                  type="text"
                  placeholder="Prenom"
                  label="Prenom"
                  required
                  name="prenom"
                  fullWidth
                  variant="standard"
                  sx={{ margin: "10px 0px" }}
                />
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  label="Email"
                  required
                  name="email"
                  fullWidth
                  variant="standard"
                  sx={{ margin: "10px 0px" }}
                />
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  label="Password"
                  required
                  name="password"
                  fullWidth
                  variant="standard"
                  sx={{ margin: "10px 0px" }}
                />
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Button
                  type="submit"
                  sx={{ bgcolor: deepOrange[500], mt: 5, mb: 2 }}
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Typography sx={{ mb: "10px", mt: "10px" }}>
                  Do you have an account?
                  <Link to="/login" style={{ marginLeft: "5px" }}>
                    Login
                  </Link>
                </Typography>
              </Grid>
              {/* {error && <div>{error}</div>} */}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
