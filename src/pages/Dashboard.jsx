import {
  useAuth
} from '../context/AuthContext';
import {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  NavLink
} from 'react-router-dom';
import Loader from '../components/Loader';
import SCard from '../components/SCard';
import {
  BaseUrl
} from '../Config.js';



export default function Dashboard( {
  setProgress
}) {
  const {
    currentUser,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [data,
    setData] = useState(null);



  const getData = async (user) => {
    try {
      setProgress(50);
      let api = await fetch(`${BaseUrl}/api/v1/dashboard?user=${user}`);
      let data = await api.json();
      let Comments = 0;
      let Likes = 0;
      data.post.map(po => {
        Likes = Likes + po.likes.length;
        Comments = Comments + po.comments.length;
      })
      setTimeout(function() {
        setData({
          post: data.post, totalLikes: Likes, totalComments: Comments
        });
      }, 400);

      setProgress(100);
    }
    catch(err) {
      setProgress(100)
      console.log(err.messsage);
    }
  }


  const deletePost = async (postId) => {
    try {
      console.log(postId)
      setProgress(40);
      let api = await fetch(`${BaseUrl}/api/v1/delete/post?id=${postId}`);
      setProgress(50);
      let apires = await api.json();
      if (apires.type) {
        setData(null)
        getData(currentUser.email);
      } else {
        alert(apires.messsage);
      }

    }
    catch(err) {
      setProgress(100)
      alert(err.messsage);
    }
  }



  useEffect(() => {
    getData(currentUser.email);
  }, [])



  return (
    <>
    <div className="container mx-auto px-4 mt-4">
        <div className="flex items-center w-full max-w-sm mx-auto">
        <div className="flex items-center w-1/2 mr-1 justify-center flex-col rounded-lg py-6 grad-2 text-white">
        {!data && <div className="p-4 mb-3 rounded-full bg-gray-500 animate-pulse"></div>
      }
        <h1 className="font-bold text-xl">{data && data.totalLikes}</h1>
        <div className="flex items-center">
        <span className="material-symbols-outlined font-bold mr-2">thumb_up</span>
        Likes
      </div>
    </div>
        <div className="flex items-center w-1/2 ml-1 justify-center flex-col rounded-lg py-6 grad-3 text-white">
        {!data && <div className="p-4 mb-2 rounded-full bg-gray-500 animate-pulse"></div>
      }
        <h1 className="font-bold text-xl">{data && data.totalComments}</h1>
        <div className="flex items-center">
         <span className="material-symbols-outlined font-bold mr-2">chat</span>
        Comments
      </div>
    </div>
    </div>
        <h1 className="mt-6 mb-3 text-black text-center font-bold text-xl">Your Posts</h1>
        {
      data ? ((data.post.length > 0) ?
        (
          <div className="container myClass mx-auto md:px-0 px-3 my-3">
          {data.post.map((d, i) => {
            return (
              <SCard thumbnail={d.thumbnail} type={d.type} postType={d.postType} key={i} deleteFunc={deletePost} likes={d.likes} src={d.post} id={d._id} />
            )
          })}
          </div>
        ): (<h1 className="mt-3 text-gray-500 text-center text-sm">No Posts</h1>)): (
        <>
        <div className="container myClass mx-auto md:px-0 px-3 my-3">
           <Loader />
           <Loader />
           <Loader />
           <Loader />
           <Loader />
           <Loader />
           <Loader />
           <Loader />
        </div> < />
      )
      }
    </div> < />
  );
}