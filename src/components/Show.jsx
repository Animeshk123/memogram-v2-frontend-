import {
  useState,
  useEffect
} from 'react';
import {
  useAuth
} from '../context/AuthContext';
import {
  useNavigate,
  NavLink
} from 'react-router-dom';
import Screen from './Screen';
import {
  BaseUrl
} from '../Config.js';
import moment from 'moment';




export default function Show( {
  src, name, text, userImage, likes, comments, created, id, type, postType
}) {
  const navigate = useNavigate();
  const {
    currentUser,
    loading
  } = useAuth();
  const [isLiked,
    setLiked] = useState(true);
  const [screen,
    setScreen] = useState(false);
  const [length,
    setLength] = useState(likes.length);

  useEffect(() => {
    if (currentUser) {
      if (likes.length > 0) {
        likes.map(like => {
          if (like.userId == currentUser.email) {
            setLiked(true)
          }
        })
      } else {
        setLiked(false);
      }
    } else {
      setLiked(false)
    }
  },
    [currentUser])

  const countLikes = async () => {
    try {
      if (currentUser) {
        setScreen(true);
        let api = await fetch(`${BaseUrl}/api/v1/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: currentUser.email, postId: id, userProfile: (currentUser.photoURL) ? currentUser.photoURL: "/blank-profile-picture-973460_640.png", userName: (currentUser.displayName) ? currentUser.displayName: currentUser.email
          })
        });
        let res = await api.json();
        setLength(length+1);
        setScreen(false);
        setLiked(true);
      } else {
        navigate("/auth/login");
      }
    }
    catch(err) {
      setScreen(false);
      alert(err.message);
    }
  }


  const [classN,
    setClass] = useState("h-my");

  const load = () => {
    setTimeout(function() {
      setClass("done")}, 300);

  }


  return(
    <>
    <Screen state={screen} text="Please Wait.." />
    <div key={id} className="card max-w-sm border-b-4 mt-2">
     <div className="flex items-center py-2 justify-between">
      <div className="flex items-center">
       <img src={userImage} className="w-10 h-10 rounded-full mr-4" />
       <div className="">
        <h1 className="font-my">{name}</h1>
        <p className="text-sm text-gray-500">
      {moment(created).fromNow()}
    </p>
    </div>
    </div>
      <a download={src} href={src} className="flex items-center jusitify-center  font-bold cursor-pointer p-3 rounded-full hover:bg-gray-300">
      <span className="material-symbols-outlined font-bold">
      file_download
      </span>
      </a>
    </div>
      {(text != "") && (<h1 className="mb-3 ml-1 capitalize">{text}</h1>)}
     <div className="w-full">
 {
      (type == "video") ?
      (<>
          <video type={postType} controls decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-500 object-cover object-center transition duration-400`} src={src}></video> 
        </>
        ):(type == "audio") ? (<div className="block mx-auto mt-4 border-2 border-dotted max-w-sm h-auto py-6 px-4 rounded-lg cursor-pointer flex items-center justify-center flex-col cursor-pointer bg-gray-100">
          <audio src={src} controls className=""></audio>
        </div>
) :
      (<img onLoad={load} decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-300 object-cover object-center ${classN} transition duration-400`} src={src} />)

    }
    </div>
     {(likes.length > 0) ? (<NavLink to={`/likes/${id}`} className="block flex items-center pt-2">
     <span className="material-symbols-outlined mr-2 font-bold text-blue-500 text-lg">
thumb_up
      </span>
           {isLiked ? "You": ""} {
        isLiked ? ((length-1 == 0) ? "": "and " + (length-1) + " others"): ((length-1 == 0) ? likes[0].userName: likes[0].userName + " and " + (length-1) + " others")
        }
     </NavLink>): ""}
     <div className="flex items-center jusitify-between py-2">
      <button className={`${!loading ? "hidden": "flex"} outline-none w-1/2 mx-1 rounded-full py-4 px-4 items-center justify-center cursor-pointer bg-gray-400 animate-pulse`}></button>
      <button onClick={() => { countLikes()}} disabled={isLiked} type="button" className={`${!loading ? "flex": "hidden"} ${(isLiked) ? "bg-blue-500 text-white": "bg-gray-200 text-black"} outline-none w-1/2 mx-1 rounded-full py-3 px-4 items-center justify-center cursor-pointer`}>
      {length}
      <span className="material-symbols-outlined ml-2 font-bold">
thumb_up
    </span>
      </button>
      <button type="button" className="w-1/2 mx-1 rounded-full py-3 px-4 flex items-center justify-center cursor-pointer bg-gray-200">
      {comments.length}
      <span className="material-symbols-outlined ml-2 font-bold">
mode_comment
    </span>
      </button>
    </div>
  </div>
 < />
);
}