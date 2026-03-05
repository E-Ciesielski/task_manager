import { Button, Chip, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const [value, setValue] = useState('one');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    function createData(
        name: string,
        priority: string,
        type: string,
    ) {
        return { name, priority, type };
    }

    const rows = [
        createData('Add auth', "High", "Feature"),
        createData('Create prediction form', "High", "Feature"),
        createData('Optimize table rendering', "Low", "Refactoring"),
        createData('Fix login form bug', "Medium", "Bug"),
        createData('Show progress on prediction submit', "Medium", "Feature"),
        createData('Add api docs', "Low", "Docs"),

    ];

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: "text.primary",
                    }}
                >
                    Predictions
                </Typography>
                <Button variant="contained" onClick={() => navigate("/new-task")}>Add task</Button>
            </Stack>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Backlog" />
                <Tab value="two" label="In progress" />
                <Tab value="three" label="Done" />
            </Tabs>
            <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    <Chip label={row.priority} />
                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="secondary">Details</Button>
                                    <Button variant="outlined" color="primary" sx={{ marginLeft: 2 }}>Start</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}