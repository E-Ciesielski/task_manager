import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import AddIcon from '@mui/icons-material/Add';

export default function AppLayout() {
    const [projects, setProjects] = useState([{ id: 0, name: 'Task manager' }, { id: 1, name: 'Fitness web app' }, { id: 2, name: 'Predictions' }])
    return (
        <Grid container>
            <Grid size={2}>
                <Box
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
                </Box>
                <nav aria-label="projects">
                    <Box sx={{ px: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                }}
                            >
                                Projects
                            </Typography>
                            <AddIcon />
                        </Box>
                        <List>
                            {projects.map(project => (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={project.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </nav>
            </Grid>
            <Grid size={10}>
                <Box sx={{ p: 2 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
}
