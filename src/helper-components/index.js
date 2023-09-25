
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


export const ModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: white;
  width: 50vw;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  gap: 16px;
`;

export const FlexBox = styled(Box)`
  display: flex;
`;

export const ColumnFlexBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;