import { Box, Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router";

export default function Login() {
    return (
        <Paper sx={{ padding: 3, minWidth: "60%" }}>
            <Stack spacing={3}>
                <Typography variant="h4">Login</Typography>
                <TextField label="Email" variant="outlined" fullWidth required />
                <TextField label="Password" variant="outlined" fullWidth required />
                <Link component={LinkRouter} to="/register">Don't have an account?</Link>
                <Box>
                    <Button variant="contained" color="primary" size="large">Login</Button>
                </Box>
            </Stack>
        </Paper>
    );
}