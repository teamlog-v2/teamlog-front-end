import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { setAccessToken } from "../contexts/auth";

const SignIn = () => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('AccessToken');

    if (token) {
      localStorage.setItem('access-token', token);
      setAccessToken(token);
    }

    history.push('/');
  }, []);

  return <div />
};

export default SignIn;
