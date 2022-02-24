import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const Modal = (props)=>{
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const DarkDialog = styled(Dialog)(({ theme }) => ({
        backgroundColor: "transparent"
      }));
  
    return <DarkDialog
    fullScreen={fullScreen}
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      {props.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
      {props.children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={props.onClose}>
        Close
      </Button>
     
    </DialogActions>
  </DarkDialog>
}

export default Modal;