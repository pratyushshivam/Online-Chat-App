import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";


function Login() {
  const [state, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div class="login">
      <div className="login__button">
        <IconButton>
        <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
       </IconButton>
      </div>
    </div>
  );
}

export default Login;
