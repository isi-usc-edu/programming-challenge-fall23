import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Appbar from './AppBar/AppBar';

const Content = ({ socketConnection }) => {

  const renderHello = () => {

    return (
      <>
        <AppBar ></AppBar>
    <Typography variant="h1">hello!</Typography>
    </>
    )
  }

  return (
    <React.Fragment>
      {renderHello()}
    </React.Fragment>
  )
}


export default Content
