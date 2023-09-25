import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import TextareaAutosize from '@mui/base/TextareaAutosize';

import ReactToPrint from 'react-to-print';

import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import { ColumnFlexBox, FlexBox, ModalWrapper } from '../helper-components';

const GroceryList = () => {
  const location = useLocation();
  const { loginName } = location.state;

  // for selecting only the table for printing
  const contentRef = useRef(null);

  // for maintaining the value of the new item text box
  const [newItem, setNewItem] = useState('');

  // for maintaining the item list
  const [myList, setMyList] = useState([]);

  // for setting the email id in the modal
  const [emailInput, setEmailInput] = useState('');

  // for setting the body of the email in the modal
  const [bodyInput, setBodyInput] = useState('');

  // for controlling whether the modal is visible or not
  const [isModalVisible, setIsModalVisible] = useState(false);

  // for controlling whether email details or order confirmation is visible in the modal
  const [emailOrConfirmationInModal, setEmailOrConfirmationInModal] =
    useState('');

  // for confirmation of successful placing of order
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // for controlling whether the speech API is listening
  const [isListening, setIsListening] = useState(false);

  // for controlling the confirmation order
  const [finalOrder, setFinalOrder] = useState({});

  // ----------WebSpeech API logic--------------------------
  const SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  const SpeechGrammarList =
    window.webkitSpeechGrammarList || window.SpeechGrammarList;

  const recognition = new SpeechRecognition();
  const grammarList = new SpeechGrammarList();

  // recognition.onstart = () => console.log('started listening...');
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    insertNewProduct(transcript);
  };
  recognition.onend = () => setIsListening(false);

  const startListening = () => setIsListening(true);
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  // -------------helper functions---------------------

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') return;
    setIsSnackbarOpen(false);
  };

  // this will populate the final order details and display the final price in a modal
  const placeOrder = async () => {
    const res = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: myList,
      }),
    });

    const data = await res.json();
    setFinalOrder(data);
    return data;
  };

  const confirmOrder = () => {
    setMyList([]);
    setIsModalVisible(false);
    setIsSnackbarOpen(true);
  };

  // this will populate the final order data into the body of the email that the user can send
  const showEmailDetails = async () => {
    const data = await placeOrder();
    const emailBodyItems = data.products
      .map((listItem) => {
        return `${listItem.title} - $${listItem.price}`;
      })
      .join(' ; ');

    const emailBodyTotalPrice = `Total - $${data.total}`;
    const emailBodyDiscountedPrice = `Discounted total - $${data.discountedTotal}`;

    const emailBody = `${emailBodyItems} ; ${emailBodyTotalPrice} ; ${emailBodyDiscountedPrice}`;

    setBodyInput(emailBody);
  };

  // this will add a new item into the list and attempt to populate its price by searching it in the items database
  const insertNewProduct = (productName) => {
    fetch(`https://dummyjson.com/products/search?q=${productName}`)
      .then((res) => res.json())
      .then((data) => {
        let price = '$-';
        let id = -1;
        if (data.products.length !== 0) {
          price = `$${data.products[0].price}`;
          id = data.products[0].id;
        }

        const newProduct = {
          id,
          name: productName,
          price,
        };

        setMyList((prev) => [...prev, newProduct]);
      });
  };

  // for creating the grammar list during the initial render
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const newGrammarArray = data.products.map((element) => element.title);
        const joinedString = newGrammarArray.join(' | ') || '';
        const grammarString =
          `#JSGF V1.0; grammar products; public <product> = ` +
          joinedString +
          ` ;`;

        grammarList.addFromString(grammarString);

        recognition.grammars = grammarList;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
      });
  }, []);

  // for handling the start and stop of speech listening
  useEffect(() => {
    if (isListening) recognition.start();
    else recognition.stop();
  }, [isListening]);

  const renderList = () => {
    return (
      <ColumnFlexBox ref={contentRef} alignSelf='center' width='40%'>
        <Typography
          style={{ display: 'flex', justifyContent: 'center' }}
          variant='h3'
        >
          My list
        </Typography>
        <List style={{ gap: '4px' }}>
          {myList.map((listItem) => (
            <Box key={listItem.id}>
              <ListItem>
                <ListItemText style={{ display: 'flex', flex: 1 }}>
                  {listItem.name}
                </ListItemText>
                <ListItemText
                  style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  {listItem.price}
                </ListItemText>
                <IconButton
                  style={{ display: 'flex' }}
                  onClick={() => {
                    setMyList((prev) =>
                      prev.filter((item) => item.id !== listItem.id)
                    );
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </ColumnFlexBox>
    );
  };

  const renderEmailModal = () => {
    return (
      <>
        <TextField
          label='Email id'
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <TextareaAutosize
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        />
        <Link
          onClick={() => setIsModalVisible(false)}
          href={`mailto:${emailInput}?subject=Shopping List&body=${bodyInput}`}
        >
          Send
        </Link>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <ColumnFlexBox
        style={{
          width: '20vw',
          justifyContent: 'center',
          alignSelf: 'center',
          gap: '4px',
        }}
      >
        <Button
          variant='contained'
          disabled={myList.length === 0}
          onClick={() => {
            setEmailOrConfirmationInModal('email');
            showEmailDetails();
            setIsModalVisible(true);
          }}
        >
          Send email
        </Button>
        <Button
          disabled={myList.length === 0}
          variant='contained'
          onClick={() => {
            setEmailOrConfirmationInModal('confirmation');
            placeOrder();
            setIsModalVisible(true);
          }}
        >
          Place Order
        </Button>
        <ReactToPrint
          trigger={() => {
            return (
              <Button
                disabled={myList.length === 0}
                variant='contained'
                onClick={() => window.print()}
              >
                Print
              </Button>
            );
          }}
          content={() => contentRef.current}
        />
      </ColumnFlexBox>
    );
  };

  const AddNewItemButton = () => {
    return (
      <IconButton
        color='secondary'
        disabled={isListening}
        onClick={() => {
          if (newItem === '') return;
          insertNewProduct(newItem);
          setNewItem('');
        }}
      >
        <SendIcon />
      </IconButton>
    );
  };

  const renderInput = () => {
    return (
      <FlexBox style={{ justifyContent: 'center' }}>
        <TextField
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          InputProps={{
            endAdornment: <AddNewItemButton />,
          }}
          disabled={isListening}
        />
        {isListening ? (
          <IconButton color='secondary' onClick={stopListening}>
            <MicIcon />
          </IconButton>
        ) : (
          <IconButton onClick={startListening}>
            <MicOffIcon />
          </IconButton>
        )}
      </FlexBox>
    );
  };

  const renderConfirmationModal = () => {
    return (
      <Box>
        <List style={{ gap: '4px' }}>
          {finalOrder.products?.map((listItem) => (
            <Box key={listItem.id}>
              <ListItem>
                <ListItemText style={{ display: 'flex', flex: 1 }}>
                  {listItem.title}
                </ListItemText>
                <ListItemText
                  style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  ${listItem.price}
                </ListItemText>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Typography variant='h4'>Total price: ${finalOrder.total}</Typography>
        <Typography variant='h4'>
          Discounted price: ${finalOrder.discountedTotal}
        </Typography>
        <Button variant='contained' onClick={confirmOrder}>
          Confirm order
        </Button>
      </Box>
    );
  };

  const renderModal = () => {
    return (
      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <ModalWrapper>
          {emailOrConfirmationInModal === 'email'
            ? renderEmailModal()
            : renderConfirmationModal()}
        </ModalWrapper>
      </Modal>
    );
  };

  const renderContent = () => {
    return (
      <Box height='100vh'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='body1'>
              Logged in as <b>{loginName}</b>
            </Typography>
          </Toolbar>
        </AppBar>
        <ColumnFlexBox height='100%' p='64px' gap='20px'>
          {renderList()}
          {renderInput()}
          {renderButtons()}
        </ColumnFlexBox>
        {renderModal()}
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity='success' onClose={handleCloseSnackbar}>
            Order placed successfully!
          </Alert>
        </Snackbar>
      </Box>
    );
  };

  return renderContent();
};

export default GroceryList;
