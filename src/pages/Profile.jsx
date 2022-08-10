import {useState,useEffect} from 'react';
import {useNavigate,Link,Navigate} from 'react-router-dom';
import {auth} from '../firebase/firebase';
import {useAuth} from '../context/AuthContext';

export default function Profile({setProgress,user}){
  const {currentUser,loading,logout} = useAuth();
  const [pPic,setPic] = useState("/blank-profile-picture-973460_640.png");
  const [name,SetName] = useState(null);
  const [date,setDate] = useState(null);
  const navigate = useNavigate();
  
  let montArry = ['Jan', 'Feb', 'Mar', "Apr", 'May', "Jun", "Jul", 'Aug', "Sep", "Oct", "Nov", "Dec"];
  
  function dateFormater(iso) {
    let date = new Date(iso),
    year = date.getFullYear(),
    month = date.getMonth(),
    dt = date.getDate();
    return (`${dt} ${montArry[month]}, ${year}`);
}
  

   
   
   const logoutFunc = async () => {
    try{
      await logout(auth);
      navigate("/")
    }
    catch(err){
      alert(err.message);
    }
   }
   
   useEffect(() => {
    if(!loading){
       if(currentUser){
         if(currentUser.photoURL){
       setPic(currentUser.photoURL);
       }
       setDate(dateFormater(currentUser.metadata.creationTime));
       SetName(currentUser.displayName ? currentUser.displayName : currentUser.email);
       }
    }
   },[currentUser,loading])
   
   
  return (
    <>
    <div className="container mt-4 mx-auto max-w-sm text-center mb-12 px-4">
      <div className="w-full mt-4 w-full py-12 px-4 grad-1 rounded-lg">
         <img className="mx-auto rounded-full w-14 h-14" src={pPic} alt={user}/>
         {loading ? (<div className="py-3 mx-auto w-36 rounded-full mt-3 bg-gray-300"></div>) : (<h1 className="mt-4 text-white text-lg">{name}</h1>)}
           {loading ? (<div className="py-3 mx-auto w-36 rounded-full mt-4 bg-gray-300"></div>) : (<h1 className="mt-2 text-white text-sm">Joined At {date}</h1>)}
         </div>
         <div className="flex items-center mt-3">
         <Link to="/change_password" className="w-1/2 rounded-lg py-4 flex items-center justify-center grad-2 mr-1 flex-col text-white">
         <span className="material-symbols-outlined font-bold text-6xl mb-2">
settings
</span>
Change Password 
         </Link>
         <Link to="/forgot_password" className="w-1/2 py-4 flex items-center justify-center grad-3 rounded-lg ml-1 flex-col text-white">
         <span className="material-symbols-outlined font-bold text-6xl mb-2">
password
</span>
Forgot Password
         </Link>
         </div>
       <div className="flex items-center mt-3">
         <Link to="/dashboard" className="w-1/2 rounded-lg py-4 flex items-center justify-center grad-2 mr-1 flex-col text-white">
         <span className="material-symbols-outlined font-bold text-6xl mb-2">
dashboard
</span>
DashBoard
         </Link>
         <Link to="/about" className="w-1/2 py-4 flex items-center justify-center grad-3 rounded-lg ml-1 flex-col text-white">
         <span className="material-symbols-outlined font-bold text-6xl mb-2">
help
</span>
About Us
         </Link>
      </div>
      <div onClick={logoutFunc} className="mt-3 text-white flex items-center justify-center cursor-pointer rounded-lg w-full grad-4 py-4">
        <span className="font-bold mr-1 material-symbols-outlined">logout</span>
        Log out
      </div>
      </div>
    </>
    );
}