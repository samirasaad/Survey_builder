import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-option-tabpanel-${index}`}
      aria-labelledby={`vertical-option-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
         {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const VerticalTabs = ({ tabsList, value, handleTabChange }) => {
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {tabsList.map((opt) => (
            <Tab
            key={`vertical-option-tab-${opt.id}`}
              label={`${opt.title}`}
              id={`vertical-option-tab-${opt.id}`}
              aria-controls={`vertical-option-tabpanel-${opt.id}`}
            />
          ))}
        </Tabs>

        {tabsList.map((opt) => (
          <TabPanel value={value} index={opt.id}  key={`vertical-option-tabpanel-${opt.id}`}>
            {opt.content}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default VerticalTabs;
