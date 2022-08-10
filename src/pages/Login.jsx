import {useState,useRef,useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {auth} from "../firebase/firebase";
import {useNavigate,NavLink} from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function Login ({setProgress}) {
  const [drop,setDrop] = useState(false);
  const {login} = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
    const navigate = useNavigate()
  const openDrop = () => {
    setDrop(!drop);
  }
  
  const googleAuth = (e) => {
    setProgress(50)
        e.preventDefault();
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                      setProgress(100)
                    navigate('/',{replace:true});
                }).catch((error) => {
                  setProgress(100);
                  alert(error.message);
                    console.log(error);
                });
            }catch(error){
              setProgress(100)
              alert(error.message)
                console.log(error);
            }

        }
  
  
  useEffect(() => {
    setProgress(100);
  },[])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setProgress(40);
      await login(auth,emailRef.current.value, passwordRef.current.value);
      setProgress(100);
      navigate("/");
    }
    catch(err){
      setProgress(100)
      alert(err.message);
      
    }
  }
  
  
  return(
    <>
    <div className="mx-auto  px-4 md:px-0 mt-12">
    <h1 className="text-3xl text-center">Welcome Back</h1>
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm px-6 my-12">
        <input
        ref={emailRef}
      className="border-2 w-full outline-none rounded-full py-3 px-4 focus:border-blue-500 trasition duration-200"
      type="email"
      placeholder="Email"
      required={true}
      autoComplete="off"
      />
          <input
          ref={passwordRef}
      className="mt-4 rounded-full border-2 w-full outline-none py-3 px-4 focus:border-blue-500 trasition duration-200"
      type="password"
      placeholder="Password"
      required={true}
      autoComplete="off"
      />
        <button type="submit"
      className="mx-auto w-full mt-6 rounded-full py-3 px-4 bg-blue-500 text-white flex items-center justify-center hover:bg-blue-400 hover:shadow-lg cursor-pointer trasition duration-200"
      >
        Log in
      </button>
      <button onClick={googleAuth}
          className="mx-auto mt-6 w-full rounded-full py-3 px-4 bg-gray-800 text-white flex justify-center items-center hover:bg-white hover:text-black  hover:shadow-lg cursor-pointer"
      >
        <img className="w-5 h-5 object-contain mr-2" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"/>
        Login With Google
      </button>
      </form>
      <NavLink className="text-center block text-blue-500" to="/forgot_password">Forgot Password 🔑 ?</NavLink>
      </div>
    </>
    );
}
