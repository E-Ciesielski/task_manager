import { Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
    const [value, setValue] = useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Stack spacing={2}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    color: "text.primary",
                }}
            >
                Predictions
            </Typography>
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
            <Paper sx={{ height: 400, width: '100%' }}>

            </Paper>
        </Stack>
    );
}