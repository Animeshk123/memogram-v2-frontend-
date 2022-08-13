import {
  useState,
  useEffect
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  useAuth
} from '../context/AuthContext';
import {
  auth
} from '../firebase/firebase';

export default function Navbar() {
  const {
    loading,
    currentUser,
    logout
  } = useAuth();
  const [show,
    setShow] = useState();
  const handlesignout = async () => {
    await logout(auth);
  }

  const [profile,
    setProfile] = useState("/blank-profile-picture-973460_640.png");

  useEffect(() => {
    if (currentUser) {
      if (currentUser.photoURL) {
        setProfile(currentUser.photoURL);
      }
      else{
        setProfile("/blank-profile-picture-973460_640.png")
      }
    }
  },
    [currentUser])

  return (
    <>
    <div className="w-full shadow-md bg-white sticky top-0 left-0 z-1000">
       <div className="container mx-auto px-4 md:px-0">
       <div className={`flex items-center justify-between`}>
          <Link className="block py-3 text-4xl font-bold logo" to="/">M</Link>
       {
      (loading) ? (<div className={`${loading ? "block": "hidden"} w-36 py-5 px-4 rounded-full bg-gray-300 animate-pulse`}>
      </div>
      ):

      (<> <div className={`${(currentUser) ? "hidden": "flex"} items-center py-3`}>
           <Link to="/auth/login" className="mr-3 text-gray-600 hover:text-black">
            Sign in
           </Link>
             <Link to="/auth/register" className="bg-black text-white capitalize py-2 px-4 rounded-full">
               Get Started
             </Link>
      </div>
        <div className={`${currentUser ? "flex": "hidden"} items-center py-3`}>
           <Link to="/profile">
             <img src={profile} className="w-8 h-8 mr-3 rounded-full object-center" />
           </Link>
           <Link to="/create" className="bg-black text-white capitalize py-2 px-4 rounded-full">
               create Post
             </Link>
      </div> < />)
      }
    </div>
    </div>
    </div> < />
  );
}