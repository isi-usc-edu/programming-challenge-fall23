import {Box, Button, TextField} from "@mui/material";
import React, {useState} from "react";
const AddProduct = ({addProduct}) => {
    const [taskName, setTaskName] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        addProduct({title: taskName, isChecked: false})
        setTaskName('')
    }

  return (
      <form onSubmit={handleSubmit} >
          <TextField
              required
              label={"Task Name"}
              // defaultValue={"Task Name"}
              value={taskName}
              onInput={(e) => setTaskName(e.target.value)}
          />
          <Button
              // onClick={addNewProduct}
              type="submit"
          >
              Add
          </Button>
      </form>
  )
}

export default AddProduct