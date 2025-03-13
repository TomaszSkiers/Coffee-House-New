import React from "react";
import heroImage from "/hero-image.webp";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const HeroBox = styled(Box)({
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HeroImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export const Hero = () => {
  return (
    <HeroBox>
      <HeroImage src={heroImage} alt="Coffee House Hero image" />
    </HeroBox>
  );
};
