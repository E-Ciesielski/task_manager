import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function NewProject() {
    return (
        <Stack spacing={3}>
            <Typography variant="h4">
                New project
            </Typography>
            <TextField id="name" label="Name" variant="outlined" fullWidth required />
            <TextField id="description" label="Description (optional)" variant="outlined" fullWidth multiline maxRows={15} minRows={5} />
            <Box>
                <Button variant="contained" color="primary">Create project</Button>
            </Box>
        </Stack>
    );
}