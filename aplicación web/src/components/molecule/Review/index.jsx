import { Grid, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { IconUser } from "../IconSelector";

const Review = ({ image, description, userName, qualification }) => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={2}>
        <IconUser id={image}></IconUser>
      </Grid>
      <Grid item xs>
        <Stack>
          <Stack>
            <Typography variant="h5">
              {userName} calificó con{" "}
              <Rating readOnly precision={0.1} value={qualification} />
            </Typography>
          </Stack>
          <Typography variant="body1">{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Review;
