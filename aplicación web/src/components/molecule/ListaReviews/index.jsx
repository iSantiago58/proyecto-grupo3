import { Container } from "@mui/material";
import React from "react";
import Review from "../Review";

const ListaReviews = ({ reviews = [] }) => {
  return (
    <Container>
      {reviews.map(function (review) {
        return (
          <Review
            image={review.guestImage}
            description={review.description}
            userName={review.guestName}
            qualification={review.qualification}
          ></Review>
        );
      })}
    </Container>
  );
};
export default ListaReviews;
