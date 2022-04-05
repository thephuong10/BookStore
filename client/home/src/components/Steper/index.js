import React, { useState, useEffect } from "react";
import Typography from "../Typography";
import { SteperStyled, StepStyled, StepIconStyled } from "./styles";

const createSteps = (steps, activeStep) =>
  steps.map((item, index) => ({
    label: item || index + 1,
    id: index,
    status:
      activeStep === index
        ? "active"
        : activeStep > index
        ? "success"
        : "default",
  }));
let first = true;
const Steper = ({ steps = [], activeStep = 0, css = "" }) => {
  const [steper, setSteper] = useState(() => createSteps(steps, activeStep));
  useEffect(() => {
    if (!first) {
      setSteper(() => createSteps(steps, activeStep));
    }
    first = false;
  }, [activeStep]);
  return (
    <SteperStyled css={css}>
      {steper.map((item, index) => (
        <StepStyled status={item.status} key={index}>
          <StepIconStyled>
            {item.status === "success" ? (
              <i className="bx bx-check"></i>
            ) : (
              <span>{index + 1}</span>
            )}
          </StepIconStyled>
          <Typography
            css={`
              color: currentColor;
            `}
          >
            {item.label || index + 1}
          </Typography>
        </StepStyled>
      ))}
    </SteperStyled>
  );
};
export default Steper;
