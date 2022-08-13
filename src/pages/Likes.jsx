import { useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {BaseUrl} from '../Config.js';
import moment from 'moment';

export default function Likes({setProgress}) {
  const {id} = useParams();
  const [data,setData] = useState(null);
   const getData = async () => {
    setProgress(40)
    let api = await fetch(`${BaseUrl}/api/v1/post?q=${id}`);
    let res = await api.json();
    setTimeout(function() {
      setData(res.post.likes);
      console.log(res.post.likes);
    }, 200);
    setProgress(100);
  }
  
  useEffect(() =>{
    getData();
  },[])
  
  
  return (
    <>
      <div className="mx-auto max-w-sm w-full px-4 mt-4">
        {
          data ? (
           data.map((da,index) => {
             return(<><div key={index} className="mt-2 flex items-center">
             <img src={da.userProfile} className="w-10 w-10 rounded-full object-cover object-center mr-3"/>
              <div>
                <h1 className="text-lg">{da.userName}</h1>
                <p key={index} className="text-sm text-gray-400">{da.userId}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-right">{moment(da.createdAt).fromNow()}</p>
              </>);
           })
          ) : (
          <>
           <div className="rounded-full py-4 px-4 bg-gray-500 animate-pulse">
           </div>
           <div className="rounded-full py-4 mt-2 px-4 bg-gray-500 animate-pulse">
           </div>
           <div className="py-4 mt-2 px-4 rounded-full bg-gray-500 animate-pulse">
           </div>
           <div className="py-4 mt-2 px-4 rounded-full  bg-gray-500 animate-pulse">
           </div>
           
           </>
          )
          
          
        }
      </div>
    </>
    );
  
}