import { Paper, Rating, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isArray, isObject } from "../../utils/utils";
import AccountAvartar from "../../assets/images/avatar-admin.png";
const Reviewsdetail = ({ entity }) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    isObject(entity) && setState(() => ({ ...entity }));
  }, [entity]);
  return (
    <Paper
      sx={{
        position: "absolute",
        width: "100%",
        maxWidth: "600px",
        padding: "16px 20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      {isObject(state) ? (
        <>
          <Box
            sx={{
              display: "flex",
              marginBottom: "20px",
              "& > img": {
                width: "50px",
                height: "50px",
                marginRight: "8px",
              },
            }}
          >
            <img src={AccountAvartar} />
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > strong": {
                  paddingLeft: "5px",
                },
              }}
            >
              <strong>{state.user.user.fullname}</strong>
              <Rating value={state.star} readOnly />
            </Typography>
          </Box>
          <div>
            <Typography>{state.content}</Typography>
            {isArray(state.images) ? (
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  "& > img": {
                    width: "62px",
                    height: "62px",
                  },
                }}
              >
                {state.images.map((item, index) => (
                  <img key={index} src={item} />
                ))}
              </Box>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default Reviewsdetail;
