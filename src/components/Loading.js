import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import { styled } from '@mui/material/styles'


const Wrapper = styled(Box)`
  display: inline-block;
  text-decoration: none;
  line-height: 1.5rem;
  user-select: none;
  cursor: wait;
  width: 100%;
`


const Loading = ({ text }) => {

  const renderLoading = () => {
    return (
      <Wrapper style={{paddingLeft: '20px'}}>
        <Typography variant="h6">
          {text}
        </Typography>
        <LinearProgress />
      </Wrapper>
    )
  }

  return (
    <React.Fragment>
      {renderLoading()}
    </React.Fragment>
  )
}


export default Loading
