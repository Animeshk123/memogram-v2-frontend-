export default function Screen({state,text}){
  return(
    <div className={`${state ? "flex" : "hidden"} items-center justify-center fixed top-0 left-0 right-0 bottom-0 flex-col text-white bg-myBlack z-2000 text-xl`}>
    {text}
    <img src="/ZZ5H.gif" className="w-12 h-12 object-contain mt-3"/>
    </div>
    )
}