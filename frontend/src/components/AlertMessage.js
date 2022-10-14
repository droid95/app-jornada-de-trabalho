import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'

const AlertMessage = (props) => {
  const { onClose, open, message, hideDuration } = props

  const onCloseHandler = () => {
    if (typeof onClose === 'function') onClose()
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onCloseHandler}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      open={open}
      autoHideDuration={hideDuration}
      onClose={onCloseHandler}
      message={message}
      action={action}
    />
  )
}

AlertMessage.defaultProps = {
  onClose: undefined,
  open: false,
  message: '',
  hideDuration: 5000
}

export default AlertMessage