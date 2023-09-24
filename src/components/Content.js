import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import AppBar from './AppBar/AppBar';

const Content = ({ socketConnection }) => {

  const renderHello = () => {

    return (
      <>
      hi
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
