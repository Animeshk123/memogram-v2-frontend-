import {
  useAuth
} from '../context/AuthContext';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  auth
} from '../firebase/firebase';




export default function Password( {
  setProgress
}) {
  const [message,
    setMessage] = useState(null);
  const EmailRef = useRef();
  const {
    resetPassword,
    currentUser
  } = useAuth();


  const ResetPassword = async () => {
    try {
      if (EmailRef.current.value == "") return;
      setProgress(50);
      await resetPassword(auth, EmailRef.current.value);
      setMessage("We Send You An Email To Your Email Address With Reset Password Link  and This Link Is Only Valid for 10 Minutes If You Face Any Problem Please Try Again Later If You not Getting The Email Go to Spam Folder")
      setProgress(100);
      EmailRef.current.value = "";
    }
    catch(err) {
      setProgress(100);
      alert(err.message);
    }
  }




  return (
    <>
    <div className="flex items-center justify-center flex-col max-w-sm mx-auto h-96 w-screen px-4">
      {message && <div className="mt-12 w-full max-w-sm grad-2 text-white py-3 px-4 rounded-lg">
      {message}
    </div>
      }
      <h1 className="font-bold text-2xl mt-2">Forgot Password</h1>
      <p className="text-center text-sm text-gray-500 mt-3">
Enter A Email Where We Will Send A Password Reset Link To Your Email
      </p>
      <input ref={EmailRef} className="mt-4 w-full py-3 px-4 rounded-full outline-none border-2 focus:border-blue-400" type="email" autoComplete="off" placeholder="Enter Email" />
      <button onClick={ResetPassword} type="button" className="mt-6 outline-none rounded-full bg-blue-500 text-white w-full py-3  cursor-pointer">Submit</button>
  </div> < />
);
}