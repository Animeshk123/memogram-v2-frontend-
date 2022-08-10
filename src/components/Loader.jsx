export default function Loader(){

  return(
    <>
     <div className="card max-w-sm w-full border-b-4 border-t-2">
     <div className="flex items-center py-3 justify-between">
      <div className="flex items-center">
       <div className="w-12 h-12 rounded-full mr-3 bg-gray-400 animate-pulse"></div>
       <div className="">
        <h2 className="text-lg w-60 h-4 rounded-full bg-gray-400 animate-pulse"></h2>
        <p className="text-sm bg-gray-400 w-full h-2 rounded-full mt-2"></p>
       </div>
      </div>
      <div className="flex items-center jusitify-center font-bold cursor-pointer p-4 rounded-full bg-gray-400 animate-pulse">
      </div>
     </div>
     <div className="w-full">
     <div loading="lazy" className="w-full object-cover object-center h-72 bg-gray-500 animate-pulse"></div>
     </div>
     <div className="flex items-center jusitify-between py-2">
      <button type="button" className="w-1/2 mx-1 rounded-full py-6 px-4 flex items-center animate-pulse justify-center cursor-pointer bg-gray-500">
      </button>
      <button type="button" className="w-1/2 mx-1 rounded-full py-6 animate-pulse px-4 flex items-center justify-center cursor-pointer bg-gray-500">
      </button>
     </div>
     </div>
    </>
    );
}