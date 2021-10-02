import React from "react";
import { Dialog, DialogContent, DialogTitle, makeStyles, Button, Typography } from "@material-ui/core";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const useStyles = makeStyles(theme => ({
    dialogwrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }
}))


export default function Popup(props) {
    const classes = useStyles()
    const {title, children, openPopup, setOpenPopup} = props
  return (
    <Dialog open={openPopup} maxWidth='md' fullWidth>
      <DialogTitle >
          <div style={{display: 'flex'}}>
        <Typography style={{flexGrow: 1}}>
            {title}
            </Typography>
        <Button onClick={() => setOpenPopup(false)}><HighlightOffIcon/></Button>
        </div>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

