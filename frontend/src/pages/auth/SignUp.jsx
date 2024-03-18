import { useState } from "react"
import { useSignup } from "../../hooks/useSignup";
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();
  const handelSubmit = async (e) => {
    e.preventDefault();
    await signup(nom, prenom, email, password);
  }
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 450,
    margin: "20px auto"
  };
  return (

    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <form onSubmit={handelSubmit}>
            <Grid align={"center"} sx={{ mb: "10px", mt: "10px" }}>
              <Box display={"flex"} alignItems={"center"} gap={"15px"} marginBottom={"10px"} justifyContent={"center"}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>K</Avatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>Y</Avatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>K</Avatar>
              </Box>
              <h2>Sign Up</h2>
            </Grid>
            <TextField onChange={(e) => setNom(e.target.value)} value={nom} type="text" placeholder="Nom" label="Nom" required name="nom" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
            <TextField onChange={(e) => setPrenom(e.target.value)} value={prenom} type="text" placeholder="Prenom" label="prenom" required name="prenom" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
            <TextField onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email" label="Email" required name="email" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
            <TextField onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" label="Password" required name="password" fullWidth variant="standard" sx={{ margin: "10px 0px" }} />
            <Button type="submit" sx={{ bgcolor: deepOrange[500], mt: 5, mb: 2 }} fullWidth variant="contained" disabled={isLoading}>Sign Up </Button>
          </form>
          <Typography sx={{ mb: "10px", mt: "10px" }}>
            Do you have an account ?
            <Link rel="stylesheet" to="/login" style={{marginLeft:"5px"}}>
              Login ?
            </Link>
          </Typography>
          {/* {error && <div>{error}</div>} */}
        </Paper>
      </Grid>


    </>
  )
}

export default SignUp
