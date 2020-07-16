import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import useStyles from "./style";
import { AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//components
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function SignInPopUp() {
  const classes = useStyles();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const { theme } = useContext(ThemeContext);
  //Popup open state
  const [open, setOpen] = React.useState(false);

  //tabs value
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setOpen(false);
  }, [authenticated]);

  //popup close
  const handleClose = () => {
    setOpen(false);
  };

  //popup open
  const handleClickOpen = () => {
    setValue(1);
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="outlined"
        style={{ color: theme.code, backgroundColor: "white" }}
        onClick={handleClickOpen}
      >
        Sign In
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="sign in dialog"
      >
        <DialogContent className={classes.dialogContent}>
          <div className={classes.dialogClose}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <DialogTitle disableTypography></DialogTitle>

          <Paper square>
            <Tabs
              value={value}
              TabIndicatorProps={{ style: { background: theme.code } }}
              textColor="inherit"
              style={{ color: theme.code }}
              onChange={handleChange}
            >
              <Tab
                label="Sign In"
                value={1}
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Sign Up"
                value={2}
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Paper>

          {value === 1 && <SignInForm />}
          {value === 2 && <SignUpForm />}
        </DialogContent>
      </Dialog>
    </>
  );
}
