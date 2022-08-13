import {NavLink} from 'react-router-dom';
import {useEffect} from 'react';


export default function Create({setProgress}) {
  useEffect(() => {
    setProgress(100);
  },[])
  
  return(
    <>
    <div className="max-w-sm w-full px-4 my-6 mx-auto">
     <NavLink to="/create/image" className="block py-3 px-4 rounded-full border-2 border-dotted bg-gray-200 flex items-center justify-center grad-2 text-white">
       Upload A Image
        <span className="material-symbols-outlined ml-2 font-bold text-2xl">
photo_camera
</span>
     </NavLink>
     <NavLink to="/create/video" className="mt-3 block py-3 px-4 rounded-full border-2 border-dotted bg-gray-200 flex items-center justify-center grad-1 text-white">
     Upload A video
     <span className="material-symbols-outlined ml-2 font-bold text-2xl">
movie
</span>
     </NavLink>
     <NavLink to="/create/audio" className="mt-3 block py-3 px-4 rounded-full border-2 border-dotted bg-gray-200 flex items-center justify-center grad-3 text-white">
     Upload A Audio
       <span className="material-symbols-outlined ml-2 font-bold text-2xl">
headphones
</span>
     </NavLink>
     </div>
    </>
    );
}