import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Paper
                component={Link}
                to="/"
                sx={{
                    textDecoration: "none",
                    display: "block",
                    px: 2,
                    py: 1.5,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: "primary.main",
                    }}
                >
                    DevFlow
                </Typography>
            </Paper>
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}>
                <Outlet />
            </Box>
        </Stack >
    );
}