import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { setAccessToken } from "../contexts/auth";

const SignIn = () => {
  const history = useHistory();

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('AccessToken');

    if (token) {
      localStorage.setItem('access-token', token);
      setAccessToken(token);

      window.location.href = '/main';
    }
  }, []);

  return <div />
};

export default SignIn;
