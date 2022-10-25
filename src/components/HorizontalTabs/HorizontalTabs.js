import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`option-tabpanel-${index}`}
      aria-labelledby={`option-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const HorizontalTabs = ({ tabsList, handleTabChange, currentTab ,withIcons}) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {tabsList.map((opt) => (
            <Tab
            icon={opt.icon }
              label={`${opt.title}`}
              id={`option-tab-${opt.id}`}
              aria-controls={`option-tabpanel-${opt.id}`}
            />
          ))}
        </Tabs>
      </Box>
      {tabsList.map((opt) => (
        <TabPanel value={currentTab} index={opt.id}>
          {opt.content}
        </TabPanel>
      ))}
    </>
  );
};

export default HorizontalTabs;
