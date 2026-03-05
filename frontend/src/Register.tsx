import { Box, Button, Paper, Stack, TextField, Typography, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router";

export default function Register() {
    return (
        <Paper sx={{ padding: 3, minWidth: "60%" }}>
            <Stack spacing={3}>
                <Typography variant="h4">Register</Typography>
                <TextField label="Email" variant="outlined" fullWidth required />
                <TextField label="Password" variant="outlined" fullWidth required />
                <TextField label="Confirm password" variant="outlined" fullWidth required />
                <Link component={LinkRouter} to="/login">Already have an account? Login here</Link>
                <Box>
                    <Button variant="contained" color="primary" size="large">Register</Button>
                </Box>
            </Stack>
        </Paper>
    );
}