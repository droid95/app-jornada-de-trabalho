import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

const AlertDialogDaySelected = (props) => {
  const { 
    open, 
    onCancel, 
    onConfirmation, 
    title, 
    description,
    buttonCancelText,
    buttonConfirmationText } = props

  const handleCancel = () => {
    if (typeof onCancel === 'function') onCancel()
  }

  const handleConfirmation = () => {
    if (typeof onConfirmation === 'function') onConfirmation()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { description }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation}>
            { buttonConfirmationText }
          </Button>
          <Button onClick={handleCancel} autoFocus>
            { buttonCancelText }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AlertDialogDaySelected.defaultProps = {
  open: false,
  onCancel: undefined,
  onConfirmation: undefined,
  title: '',
  description: '',
  buttonConfirmationText: '',
  buttonCancelText: ''
}

export default AlertDialogDaySelected