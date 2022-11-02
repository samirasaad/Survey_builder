import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const SharedTooltip = ({ title ,tooltipTargetElement}) => {
  return (
    <BootstrapTooltip title={title}>
      {tooltipTargetElement}
    </BootstrapTooltip>
  );
};
export default SharedTooltip;
