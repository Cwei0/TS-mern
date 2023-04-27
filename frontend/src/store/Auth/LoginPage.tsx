import { Input } from "@mui/joy";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./LoginPage.css"

const LoginPage = () => {
    return ( 
        <div className="login-body">
            <Container sx={{py: 10, margin: "0 auto", display: "flex", justifyContent: "center" }} >
                <Grid className="login-container" container spacing={3} sx={{margin: "0 auto", backgroundColor: "white", pr: 10, pl: 7}}>
                    <Typography variant="h3" className="title" sx={{m: "80px auto 0 auto", fontWeight: 600}}>
                        Log in
                    </Typography>
                    <Grid item xs={12}>
                        <Input 
                            placeholder="email"
                            type="email"
                            className="login-input"
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <Input 
                            placeholder="password"
                            type="password"
                            className="login-input"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth className="custom-btn">Login</Button>
                    </Grid>

                    <Grid item sx={{my: 3}}>
                        <Link to="/signup">Don't have an account?</Link>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
 
export default LoginPage;