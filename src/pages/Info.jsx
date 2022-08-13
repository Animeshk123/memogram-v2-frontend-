import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import Loader from '../components/Loader';
import Show from '../components/Show';
import {
  useAuth
} from '../context/AuthContext';
import Spinner from './Spinner';
import {
  BaseUrl
} from '../Config.js';
import moment from 'moment';


export default function Info( {
  setProgress
}) {
  const [data,
    setData] = useState(null);
  const navigate = useNavigate();
  const commentRef = useRef();
  let {
    id
  } = useParams();
  const {
    currentUser,
    loading
  } = useAuth();
  const getData = async () => {
    setProgress(40)
    let api = await fetch(`${BaseUrl}/api/v1/post?q=${id}`);
    let res = await api.json();
    setTimeout(function() {
      setData(res.post);
    }, 200);
    setProgress(100);
  }

  useEffect(() => {
    getData();
  }, [loading])

  const addComment = async () => {
    if (currentUser && commentRef.current.value != "" && !loading) {
      try {
        setProgress(50);
        let api = await fetch(`${BaseUrl}/api/v1/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            author: (currentUser.displayName) ? currentUser.displayName: currentUser.email, text: commentRef.current.value, postId: data._id
          })
        });
        let res = await api.json();
        setProgress(70);
        getData();
        commentRef.current.value = "";
        setProgress(100);
      }
      catch(err) {
        console.log(err);
      }
    } else {
      navigate("/auth/login");
    }

  }


  const deleteComments = async (commentId) => {
    try {
      if (currentUser && !loading) {
        setProgress(40);
        let api = await fetch(`${BaseUrl}/api/v1/delete/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: id, commentId
          })
        });
        let resp = await api.json();
        setProgress(60);
        getData();
        setProgress(100);
      }
    }
    catch(err) {
      alert(err.message);
      setProgress(100);
    }
  }


  return (
    <>
    {
      loading ? (<div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
      ):
      (<div className="px-4 mx-auto max-w-sm mt-4">
    {
        data ? (<Show id={data._id} src={data.post} name={data.user.name} text={data.description} userImage={data.user.profileUrl} likes={data.likes} type={data.type} postType={data.postType} comments={data.comments} created={data.createdAt} />): (<Loader />)
        }
    <div className="mt-6">
    <p className="text-lg my-3">
Top Comments
        </p>
      {
          (data) ?
          ((!data.comments.length > 0) ? (<p className="">
No comments
          </p>
          ):
            (
              data.comments.map((com, i) => {
                return (<div className="my-4" key={i}>
            {(!loading) ? ((currentUser) ? (<h3 className="text-sm">{(com.author == currentUser.email || com.author == currentUser.displayName) ? "You": com.author}</h3>): (<h3 className="text-sm">{com.author}</h3>)): (<div className="w-36 py-2 rounded-full bg-gray-400 animate-pulse"></div>
                )}
            <div className="rounded-lg py-4 mt-1 px-4 bg-gray-200 relative">
            <p className="capitalize">
                    {com.text}
                  </p>
            {currentUser && (com.author == currentUser.email || com.author == currentUser.displayName) ? (<span onClick={() => { deleteComments(com.commentId)}} className="material-symbols-outlined absolute bottom-0 right-0 p-2 cursor-pointer font-bold">delete</span>): ""}
                </div>
                <p className="text-sm text-gray-600">{moment(com.createdAt).fromNow()}</p>
                </div>
                )
              })
            )): ""
          }
    <div className="flex mt-6 items-center mb-24">
    <input ref={commentRef} type="text" placeholder='type here..' className="outline-none py-2 px-4  rounded-full border-2 focus:border-blue-500 w-4/5 bg-gray-100 mr-2" />
    <button onClick={addComment} type="button" className="flex items-center justify-center bg-blue-500 text-white p-3 outline-none rounded-full w-1/5 cursor-pointer">
    <span className="material-symbols-outlined font-bold">send</span>
    </button>
        </div>
      </div>
      </div>
    )} < />
);
}