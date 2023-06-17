import { Container, Box, Tab } from "@mui/material";
import * as React from 'react';
import {TabContext, TabList, TabPanel} from '@mui/lab';

const Supply = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container component="section" maxWidth="lg">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Приходы" value="1" />
                        <Tab label="Приходы по датам" value="2" />
                        <Tab label="Приходы по поставщикам" value="3" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default Supply;

