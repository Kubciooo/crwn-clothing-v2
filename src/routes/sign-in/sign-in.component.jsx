import {
  auth,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        await createUserDocumentFromAuth(result.user);
        navigate("/");
      }
    };

    getResult();
  }, [navigate]);

  const logGoogleUser = async () => {
    signInWithGoogleRedirect();
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
