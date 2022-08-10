import {
  useState,
  useEffect,
  useRef
} from 'react';
import uploadFile from '../firebase/upload.js';
import {
  useAuth
} from '../context/AuthContext';
import {
  useNavigate,
  Navigate
} from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import {
  BaseUrl
} from '../Config.js';
import Screen from '../components/Screen';



export default function Create( {
  setProgress
}) {
  const [file,
    setFile] = useState(null);
  const [preview,
    setPreview] = useState(null);
  const [loader,
    setLoader] = useState(false);
    const [screen,setScreen] = useState(false);
  const {
    currentUser,
    loading
  } = useAuth();
  const [canClick,
    setCanClick] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setProgress(100);
  }, []);

  const handleFile = async (e) => {

    if (!e.target.files.length > 0) {
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPreview(reader.result);
    }, false);
    reader.readAsDataURL(e.target.files[0]);
  }

  const descriptionRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/auth/login');
    }

    setCanClick(true)
    setScreen(true)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true,
      onProgress: setProgress,
    }
    try {
      const compressedFile = await imageCompression(file, options);
      setProgress(20)
      uploadFile(compressedFile, setCanClick, setProgress, setLoader, async (data) => {
        if (data.status) {
          let upload = {
            post: data.url,
            description: descriptionRef.current.value,
            name: (currentUser.displayName) ? currentUser.displayName: currentUser.email,
            userId: currentUser.email,
            profileUrl: (currentUser.photoURL) ? currentUser.photoURL: "/blank-profile-picture-973460_640.png"
          }
            setProgress(50)
            let api = await fetch(`${BaseUrl}/api/v1/posts`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(upload)
            });
            setProgress(70);
            let response = await api.json();
            navigate('/', {
              replace: true
            });

          setProgress(100);

        } else {
          setScreen(false)
          setCanClick(false);
          alert(data.err);
        }
        setScreen(false)
       
    })
    }
    catch(err) {
      setCanClick()
      alert(err.message);
      setProgress(false)
    }
  }




  return (
    <>
    <Screen state={screen} text={`Please Wait...`}/>
    <form onSubmit={handleSubmit} className="px-4">
       <label htmlFor="file" className="block mx-auto mt-12 border-2 border-dotted max-w-sm h-auto py-6 px-4 rounded-lg cursor-pointer flex items-center justify-center flex-col cursor-pointer bg-gray-100">
        {
      (preview) ? (<img src={preview} className="w-full h-full rounded-lg object-contain object-center" alt="preview" />):
      (<> <img src="/undraw_add_files_re_v09g.svg" className="w-24 h-24 object-contain" />
      <p className="mt-3">
Upload A Picture
      </p> < /> )
      }
       </label>
       <input onChange={handleFile} className="hidden" type="file" accept="image/*" id="file" />
       <textarea ref={descriptionRef} className="mt-6 block max-w-sm w-full rounded-lg py-3 px-4  mx-auto  outline-none border-2 bg-gray-200 h-48 resize-none focus:border-blue-500 border-gray-300 focus:bg-white" placeholder="Say Something About Your Post"></textarea>
       <button disabled={canClick} type="submit" className="outline-none py-3 px-4 rounded-full bg-blue-500 text-white max-w-sm mx-auto w-full flex items-center justify-center text-white hover:bg-blue-400 mt-6 mb-12 cursor-pointer">Post</button>
</form> < />
);
}