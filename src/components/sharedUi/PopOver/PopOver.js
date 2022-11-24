// import * as React from "react";
// import Box from "@mui/material/Box";
// import Switch from "@mui/material/Switch";
// import Paper from "@mui/material/Paper";
// import Grow from "@mui/material/Grow";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import LogicConditions from "../../LogicConditions/LogicConditions";

// // const icon = (
// //   <Paper sx={{ m: 1 }} elevation={4}>
// //     <Box component="svg">
// //       <Box
// //         component="polygon"
// //         sx={{
// //           fill: (theme) => theme.palette.common.white,
// //           stroke: (theme) => theme.palette.divider,
// //           strokeWidth: 1,
// //         }}
// //         points="0,100 50,00, 100,100"
// //       />
// //     </Box>
// //   </Paper>

// // );

// export default function PopoverComponent({ isOpen, handlePopOverModalState }) {
//   //   const [checked, setChecked] = React.useState(false);

//   //   const handleChange = () => {
//   //     setChecked((prev) => !prev);
//   //   };

//   return (
//     <Box className="popover-wrapper p-0">
//       <Grow
//         className="w-50 content"
//         in={isOpen}
//         style={{ transformOrigin: "0 0 0" }}
//         {...(isOpen ? { timeout: 1000 } : {})}
//       >
//         {/* {<span onClick={handlePopOverModalState}>close</span>} */}
//         {<LogicConditions />}
//       </Grow>
//     </Box>

//   );
// }

import * as React from "react";
import Popover from "@mui/material/Popover";
import "./PopOver.scss";

export default function BasicPopover({
  renderPopOverContent,
  handlePopOverModalState,
  id,
  isOpen,
}) {
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <div className="popover-wrapper">
      <Popover
        className="popover-content"
        id={id}
        open={isOpen}
        // anchorEl={anchorEl}
        onClose={handlePopOverModalState}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {renderPopOverContent()}
      </Popover>
    </div>
  );
}
