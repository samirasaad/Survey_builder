import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Star from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const RatingComponent = ({
  readOnly,
  questionObj,
  hasLabels,
  handleRatingChange,
}) => {
  const [hover, setHover] = useState(1);
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color:
        questionObj?.basicInfo?.ratingIcon === "hearts" ? "#ff3d47" : "#faaf00",
    },
    "& .MuiRating-iconHover": {
      color:
        questionObj?.basicInfo?.ratingIcon === "hearts" ? "#ff3d47" : "#faaf00",
    },
  });

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {hasLabels && hover && (
        <p sx={{ ml: 2 }}>
          {questionObj?.basicInfo?.labels[
            hover !== -1 ? hover : questionObj?.basicInfo?.rate
          ]?.val || ""}
        </p>
      )}

      <StyledRating
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        onChange={(e, newVal) => handleRatingChange(e, newVal)}
        name="rating"
        defaultValue={0}
        value={questionObj?.basicInfo?.rate}
        max={questionObj?.basicInfo?.ratingLimit}
        readOnly={readOnly}
        icon={
          questionObj?.basicInfo?.ratingIcon === "hearts" ? (
            <FavoriteIcon fontSize="inherit" color="red" />
          ) : (
            <Star fontSize="inherit" />
          )
        }
        emptyIcon={
          questionObj?.basicInfo?.ratingIcon === "hearts" ? (
            <FavoriteBorderIcon fontSize="inherit" />
          ) : (
            <Star fontSize="inherit" />
          )
        }
      />
    </Box>
  );
};

export default RatingComponent;
