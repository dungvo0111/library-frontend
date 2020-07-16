import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { clearUserNoti, clearBookNoti } from "../../redux/actions";
//components
import Nav from "../../components/Nav";
import UserProfile from "../../components/UserProfile";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import BorrowBookList from "../../components/BorrowBookList";
import ReturnBookList from "../../components/ReturnBookList";
//MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
//notistack
import { useSnackbar } from "notistack";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const message = useSelector((state: AppState) => state.user.message);
  const error = useSelector((state: AppState) => state.user.error);
  const bookError = useSelector((state: AppState) => state.books.error);
  const bookMessage = useSelector((state: AppState) => state.books.message);
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );

  const handleClick = () => {
    history.push("/");
  };

  useEffect(() => {
    dispatch(clearUserNoti());
  }, []);

  useEffect(() => {
    if (!localStorage.signInToken) {
      history.push("/");
    }
  }, [authenticated]);

  useEffect(() => {
    if (error.length > 0)
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
  }, [error]);

  useEffect(() => {
    if (message.length > 0)
      enqueueSnackbar(message[message.length - 1], { variant: "success" });
  }, [message]);

  useEffect(() => {
    if (bookError.length > 0)
      enqueueSnackbar(bookError[bookError.length - 1], { variant: "error" });
  }, [bookError]);

  useEffect(() => {
    if (bookMessage.length > 0)
      enqueueSnackbar(bookMessage[bookMessage.length - 1], {
        variant: "success",
      });
  }, [bookMessage]);

  //tabs value
  const [value, setValue] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Nav />
      <div className="container">
        <div className="profile">
          <Button
            variant="text"
            style={{
              backgroundColor: "white",
              color: theme.code,
            }}
            onClick={handleClick}
            size="small"
            className="backButton"
          >
            <KeyboardBackspaceIcon />
            <div style={{ marginLeft: "5px" }}>Home page</div>
          </Button>
          <Paper className="profile__paper">
            <UserProfile />
            <Tabs
              value={value}
              TabIndicatorProps={{ style: { background: theme.code } }}
              textColor="inherit"
              style={{ color: theme.code }}
              onChange={handleChange}
              scrollButtons="auto"
              variant="scrollable"
              className="tabs"
            >
              <Tab label="Update Profile" value={1} />
              <Tab label="Update Password" value={2} />
              <Tab label="Borrowing Books" value={3} />
              <Tab label="Returned Books" value={4} />
            </Tabs>
            <div className="tabs__content">
              {value === 1 && <UpdateProfileForm />}
              {value === 2 && <UpdatePasswordForm />}
              {value === 3 && <BorrowBookList />}
              {value === 4 && <ReturnBookList />}
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
