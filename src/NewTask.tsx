import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export default function NewTask() {
    const [priority, setPriority] = useState('Low');
    const [taskType, setTaskType] = useState('Feature');

    const handlePriorityChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };

    const handleTaskTypeChange = (event: SelectChangeEvent) => {
        setTaskType(event.target.value as string);
    };

    return (
        <Stack>
            <form>
                <Stack spacing={3}>
                    <Typography variant="h4">
                        New task
                    </Typography>
                    <TextField id="name" label="Name" variant="outlined" fullWidth required />
                    <Stack spacing={3} direction="row">
                        <FormControl fullWidth required>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="priority"
                                value={priority}
                                label="Priority"
                                onChange={handlePriorityChange}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth required>
                            <InputLabel id="task-type-label">Type</InputLabel>
                            <Select
                                labelId="task-type-label"
                                id="task-type"
                                value={taskType}
                                label="Type"
                                onChange={handleTaskTypeChange}
                            >
                                <MenuItem value="Feature">Feature</MenuItem>
                                <MenuItem value="Bug">Bug fix</MenuItem>
                                <MenuItem value="Refactor">Refactor</MenuItem>
                                <MenuItem value="Doc">Documentation</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <TextField id="description" label="Description (optional)" variant="outlined" fullWidth multiline maxRows={15} minRows={5} />
                    <Box>
                        <Button variant="contained" color="primary">Create task</Button>
                    </Box>
                </Stack>
            </form>
        </Stack>
    );
}