import ButtonBase from '@mui/material/ButtonBase'
import { styled } from '@mui/material/styles'
import { blue, grey } from '@mui/material/colors'

const ButtonCircle = styled(ButtonBase)(({ selected }) => ({
  borderRadius: '100%', 
  backgroundColor: selected ? blue[500] : grey[500],
  width: 35,
  height: 35,
  fontSize: 16,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0
}))

export default ButtonCircle