import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'


const Content = ({ socketConnection }) => {

  const renderHello = () => {
    return <Typography variant="h1">hello!</Typography>
  }

  return (
    <React.Fragment>
      {renderHello()}
    </React.Fragment>
  )
}


export default Content
