import React, { useState } from "react";
import { Box, Tab, Typography, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import Create from './Create';

export default function Dashboard() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Typography variant="h3" sx={{ margin: "2%" }} align="center">EMPLOYER DASHBOARD</Typography>
        <Button
          sx={{ margin: "2% 3%" }}
          variant="outlined"
          component={Link}
          to="/"  // Ensure it navigates to the home page
        >
          Home
        </Button>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Post" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1"><Create /></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
