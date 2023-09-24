import {Box, TextField} from "@mui/material";
import React from "react";
const AddProduct = ({}) => {
  return (
      <Box
          component="form"
          sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
      >
          <TextField
              required
              label={"Task Name"}
              defaultValue={"Task Name"}
              />
      </Box>
  )
}

export default AddProduct