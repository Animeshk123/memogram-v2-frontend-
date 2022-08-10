import {useState,useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function Show({src,name,text,userImage,likes,comments,created,id}){
  let montArry = ['Jan', 'Feb', 'Mar', "Apr", 'May', "Jun", "Jul", 'Aug', "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const [isLiked,setLiked] = useState(false);
  const [length,setLength] = useState(likes.length);
  
  useEffect(() => {
    if(currentUser){
    if(likes.length > 0){
    likes.map(like => {
      if(like.user == currentUser.email){
        setLiked(true)
      }
    })
    }
    else{
      setLiked(false);
    }
    }
  },[currentUser])
  
  const countLikes = async () => {
    try{
      if(currentUser){
      let api = await fetch('http://localhost:8080/api/v1/like',{
         method:"POST",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({userId:currentUser.email,postId:id})
      });
      let res = await api.json();
      setLength(length+1);
      setLiked(true);
      }
      else{
        navigate("/auth/login");
      }
    }
    catch(err){
      alert(err.message);
    }
  }

  function dateFormater(iso) {
    let date = new Date(iso),
    year = date.getFullYear(),
    month = date.getMonth(),
    dt = date.getDate();
    return (`${dt} ${montArry[month]}, ${year}`);
}
const [classN,setClass] = useState("h-my");

const load = () => {
  setTimeout(function() {setClass("done")}, 300);
  
}

  
  return(
    <>
     <div key={id} className="card max-w-sm border-b-4 mt-2">
     <div className="flex items-center py-2 justify-between">
      <div className="flex items-center">
       <img src={userImage} className="w-10 h-10 rounded-full mr-4"/>
       <div className="">
        <h1 className="font-my">{name}</h1>
        <p className="text-sm text-gray-500">{dateFormater(created)} </p>
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
     <img onLoad={load} loading="lazy" decoding="async" className={`rounded-lg w-full bg-gray-300 object-cover object-center transition duration-600 ${classN}`} src={src}/>
     </div>
     <div className="flex items-center jusitify-between py-2">
      <button onClick={() => {eleble ? "" : countLikes()}} disabled={isLiked} type="button" className={`${(isLiked) ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} outline-none w-1/2 mx-1 rounded-full py-3 px-4 flex items-center justify-center cursor-pointer`}>
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
    </>
    );
}