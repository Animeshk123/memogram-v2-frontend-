import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useAuth
} from '../context/AuthContext';
import {
  useNavigate
} from 'react-router-dom';
import {
  auth
} from "../firebase/firebase";
import {
  GoogleAuthProvider
} from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

export default function Register ( {
  setProgress
}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {
    signup
  } = useAuth()
  const [error,
    setError] = useState("")
  const navigate = useNavigate();

  const googlesignup = (e) => {
    e.preventDefault();
    try {
      setProgress(50)
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
      .then((result) => {
        setProgress(70);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setProgress(100)
        navigate('/', {
          replace: true
        });
      }).catch((error) => {
        alert(error.message);
        setProgress(100);
        console.log(error);
      });
    }catch(error) {
      alert(error.message)
      setProgress(100)
      console.log(error);
    }

  }


  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords Doesn't match")
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setProgress(40);
      await signup(auth, emailRef.current.value, passwordRef.current.value).then(use => {});
      setProgress(100);
      navigate("/", {
        replace: true
      });
    } catch(err) {
      alert(err.message);
      setError("Failed to create an account")
      setProgress(100)
    }
  }

  useEffect(() => {
    setProgress(100);
  }, []);





  return (
    <>
    <h1 className="text-center mt-12 px-4 text-2xl">Join Now</h1>

    <form onSubmit={handleSubmit} className="my-12 mx-auto w-full max-w-sm px-6">
       <input
      ref={emailRef}
      className="border-2 w-full outline-none rounded-full py-3 px-4 focus:border-blue-500 trasition duration-200"
      type="text"
      placeholder="Email"
      required={true}
      autoComplete="off"
      />
         <input
    ref={passwordRef}
    className="mt-3 border-2 w-full outline-none rounded-full py-3 px-4 focus:border-blue-500 trasition duration-200"
    type="password"
    placeholder="Password"
    required={true}
    autoComplete="off"
    />
         <input
  ref={passwordConfirmRef}
  className="mt-3 border-2 w-full outline-none rounded-full py-3 px-4 focus:border-blue-500 trasition duration-200"
  type="password"
  placeholder="Confirm Password"
  required={true}
  autoComplete="off"
  />
        <button type="submit"
  className="mx-auto w-full mt-6 rounded-full py-3 px-4 bg-blue-500 text-white flex items-center justify-center hover:bg-blue-400 hover:shadow-lg cursor-pointer trasition duration-200"
  >
        Register
       </button>
</form>
<div className="max-w-sm mx-auto w-full px-6 flex items-center justify-center">
       <div className="h-1 w-2/5 bg-gray-400 rounded"></div>
       OR
       <div className="h-1 bg-gray-400 w-2/5 rounded"></div>
</div>

<button type="button"
  onClick={googlesignup}
  className="mx-auto my-6 rounded-full py-3 px-4 bg-gray-800 text-white flex items-center hover:bg-white hover:text-black  hover:shadow-lg cursor-pointer"
  >
         <img className="trasition duration-200 w-5 h-5 object-contain mr-2" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" />
        Login With Google
        </button> < />
);
}