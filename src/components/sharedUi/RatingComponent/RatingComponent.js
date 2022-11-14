import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Star from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

const RatingComponent = ({ ratingLimit, ratingIcon, readOnly }) => {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: ratingIcon === "hearts" ? "#ff6d75" : "#faaf00",
    },
    "& .MuiRating-iconHover": {
      color: ratingIcon === "hearts" ? "#ff3d47" : "#faaf00",
    },
  });
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        name="rating"
        defaultValue={0}
        max={ratingLimit}
        readOnly={readOnly}
        icon={
          ratingIcon === "hearts" ? (
            <FavoriteIcon fontSize="inherit" color="red" />
          ) : (
            <Star fontSize="inherit" />
          )
        }
        emptyIcon={
          ratingIcon === "hearts" ? (
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
