import {NavLink} from 'react-router-dom';

export default function Error() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2 text-gray-500">The Page You Are Looking For Is Not Found</p>
      <NavLink to="/" className="mt-4 rounded-full py-2 px-4 outline-none text-white bg-black">Go Back</NavLink>
    </div>
    
    );
}