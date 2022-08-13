import {
  useState
} from 'react';
import {
  NavLink
} from 'react-router-dom';


export default function SCard( {
  id, src, likes, deleteFunc, type, postType, thumbnail 
}) {

  const [classN,
    setClass] = useState("h-my");


  const load = () => {
    setTimeout(function() {
      setClass("h-auto")}, 300);

  }





  return (
    <div className="card m-3 relative max-w-sm relative">
            <NavLink to={`/dashboard/post/${id}`}>
              {
      (type == "video") ?
      (<>
        <div className="absolute bg-myBlack rounded-lg flex items-center justify-center left-0 right-0 bottom-0 top-0">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
       <span className="material-symbols-outlined text-2xl font-bold text-white">play_arrow</span>
        </div>
        </div>
        <img onLoad={load} decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-300 object-cover object-center ${classN} transition duration-400`} src={thumbnail} />
        </>
        ): (type == "audio") ? (<>  <div className="absolute bg-myBlack rounded-lg flex items-center justify-center left-0 right-0 bottom-0 top-0">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
       <span className="material-symbols-outlined text-2xl font-bold text-white">music_note</span>
       </div>
       </div>
        <img onLoad={load} decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-300 object-cover object-center ${classN} transition duration-400`} src={thumbnail} /></>) :
        (<img onLoad={load} decoding="async" loading="lazy" className={`rounded-lg w-full bg-gray-300 object-cover object-center ${classN} transition duration-400`} src={src} />)

      }
      </NavLink>
            <div onClick={() => { deleteFunc(id)}} className="bg-black flex items-center justify-center p-2 rounded-lg overlays absolute right-2 top-2 z-6 cursor-pointer text-white">
               <span className="material-symbols-outlined text-2xl font-bold"> delete </span>
    </div>
              <div className="bg-black flex items-center justify-center p-2 rounded-lg overlays absolute left-2 top-2 z-6 cursor-pointer text-white">
               <span className="material-symbols-outlined text-2xl font-bold mr-2"> favorite </span>{likes.length}
    </div>
  </div>
);
}