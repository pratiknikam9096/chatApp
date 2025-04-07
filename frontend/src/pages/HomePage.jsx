import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Login from "../components/Login";
import Signup from "../components/Signup";

function HomePage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="LOGIN" value="1" />
            <Tab label="SIGNUP" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{<Login/>}</TabPanel>
        <TabPanel value="2">{<Signup/>}</TabPanel>
      </TabContext>
    </div>
  );
}

export default HomePage;
