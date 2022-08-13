import Card from './Card';
import {
  useState,
  useEffect
} from 'react';
import Loader from './Loader';
import {
  BaseUrl
} from '../Config.js';



export default function Grid( {
  setProgress
}) {
  const [data,
    setData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        let api = await fetch(`${BaseUrl}/api/v1/posts`);
        let response = await api.json();
        setTimeout(function() {
          setData(response.data);
        }, 50);
      }
      catch(err) {
        console.log(err)
      }

    }
    getData();
  })

  return (
    <>

    {
      data ? ((data.length > 0) ? (
        <div className="container myClass mx-auto md:px-0 px-3 my-3">
   {data.map(item => {
          return (
            <Card thumbnail={item.thumbnail} key={item._id} id={item._id} src={item.post} name={item.user.name} text={item.description} userImage={item.user.profileUrl} likes={item.likes} comments={item.comments} type={item.type} postType={item.postType} created={item.createdAt} />
          )
        })}
        </div>
      ): (<h1 className="text-center mt-4 text-xl">No posts Found</h1>)):
      (<>
        <div className="container myClass mx-auto md:px-0 px-3 my-3">
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
     <Loader />
        </div> < />)
      } < />
    );
  }