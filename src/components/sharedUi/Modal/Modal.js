import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SharedModal = ({
  renderModalContent,
  isOpen = false,
  handleModalState,
}) => {
  return (
    <div>
      <Modal
        aria-describedby="modal-description"
        open={isOpen}
        onClose={(e) => handleModalState(e, false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 900,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>{renderModalContent()}</Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default SharedModal;
