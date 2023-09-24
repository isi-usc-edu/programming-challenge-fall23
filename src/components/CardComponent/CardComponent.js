import React, { useState } from 'react';
import { FormControl, TextField, Button, Typography, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GroceryCard from '../GroceryCard/GroceryCard';
import { createTheme } from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const theme = createTheme();

function CardComponent(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [todoText, setTodoText] = useState(props.todo.todo);
  const todoobj = props.todo;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInput('');
    setError('');
  };

  const updateTodo = () => {
    if (input.trim() === '') {
      setError('Please enter a valid item.');
    } else {
      setTodoText(input);
      handleClose();
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="todo__modal">
        <div className="modal__content">
          <Button color="inherit" className="closeButton" onClick={handleClose}>
            <CloseIcon />
          </Button>
          <FormControl className="form">
            <Typography className="modal__header">Update Item</Typography>
            <TextField
              placeholder={props.todo.todo}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              variant="outlined"
              size="small"
              className="textField"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className="button"
              onClick={updateTodo}
            >
              Update
            </Button>
            {error && <Typography className="errorText">{error}</Typography>}
          </FormControl>
        </div>
      </Modal>
      <ListItemAvatar style={{ display: 'flex', alignItems: 'center' }}>
        <img alt="Grocery" src={props.todo.image} style={{ display: 'flex', alignItems: 'center', borderRadius: '10px' }} className="image" />
        <GroceryCard props={todoobj} />
      </ListItemAvatar>
    </div>
  );
}

export default CardComponent;
