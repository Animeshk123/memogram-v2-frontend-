import {useState} from 'react';
import {NavLink} from 'react-router-dom';


export default function SCard({id,src,likes,deleteFunc}){
  
     const [classN,setClass] = useState("h-my");
  
   
   const load = () => {
  setTimeout(function() {setClass("h-auto")}, 300);
  
}


  

  
  return (
    <div className="card m-3 relative max-w-sm relative">
            <NavLink to={`/dashboard/post/${id}`}><img onLoad={load} decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-300 object-cover object-center ${classN} transition duration-400`} src={src} alt="post"/></NavLink>
            <div onClick={() => {deleteFunc(id)}} className="bg-black flex items-center justify-center p-3 rounded-lg overlays absolute right-3 top-3 z-6 cursor-pointer text-white">
               <span className="material-symbols-outlined text-2xl font-bold"> delete </span>
            </div>
              <div className="bg-black flex items-center justify-center p-3 rounded-lg overlays absolute left-3 top-3 z-6 cursor-pointer text-white">
               <span className="material-symbols-outlined text-2xl font-bold mr-2"> favorite </span>{likes.length}
            </div>
          </div>
    );
}