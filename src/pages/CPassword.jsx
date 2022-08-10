import {useAuth} from '../context/AuthContext';
import {useState,useEffect,useRef} from 'react';

export default function CPassword({setProgress}){
  const [message,setMessage] = useState(null);
  const passwordRef = useRef();
  const {updatePassword,currentUser} = useAuth();
  
  
  const UpdatePassword = async () => {
    try{
      if(passwordRef.current.value == "") return
      if(!currentUser.providerData[0].providerId == "password"){alert("you Can't Change Password Please Go Google Official website to Change Your google account website")
        return;
      }
     
      if(currentUser){
         setProgress(50);
      await updatePassword(currentUser,passwordRef.current.value);
      setMessage("Password Updated SuccesFully!!")
      setProgress(100);
      passwordRef.current.value = "";
      }
    }
    catch(err){
      if(err.message = "Maximum call stack size exceeded"){
      alert("Please Try Again Later or try with forgot password");
      
      }
      setProgress(100)
      console.log(err);
    }
  }
  
  
  return (
    <>
      <div className="flex items-center justify-center flex-col max-w-sm mx-auto h-96 w-screen mt-4 px-4">
            {message && <div className="mt-12 w-full max-w-sm grad-2 text-white py-3 px-4 rounded-lg">{message}</div>}
      <h1 className="font-bold text-2xl mt-3">Change Password</h1>
      <p className="text-center text-sm text-gray-500 mt-2">Enter A Email Where We Will Send A Password Reset Link To Your Email</p>
      <input ref={passwordRef} className="mt-4 w-full py-3 px-4 rounded-full outline-none border-2 focus:border-blue-400" type="password" autoComplete="off" placeholder="Enter New Password"/>
      <button onClick={UpdatePassword} type="button" className="mt-6 outline-none rounded-full bg-blue-500 text-white w-full py-3  cursor-pointer">Submit</button>
      </div>
    </>
    );
}