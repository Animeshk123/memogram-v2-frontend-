import {useState,useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import Spinner from './Spinner';
import {Navigate} from 'react-router-dom';


export default function privateRoute({children}){
  const {currentUser,loading} = useAuth();
  const [NotReady,setReady] = useState(true);
  
  useEffect(() => {
    if(!loading){
      setReady(loading);
    }
  },[loading])
  
  
  return (
    <>
      {NotReady ? (<div className="w-screen h-screen flex items-center justify-center"><Spinner/></div>) : (currentUser ? children : <Navigate to="/auth/login" replace/>)}
    </>
    );
}