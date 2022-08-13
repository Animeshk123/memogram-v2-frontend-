import Screen from '../components/Screen';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useAuth
} from '../context/AuthContext';
import uploadFile from '../firebase/upload.js';
import imageCompression from "browser-image-compression";
import {
  BaseUrl
} from "../Config.js";
import {
  useNavigate
} from "react-router-dom";




export default function VideoUpload( {
  setProgress
}) {

  useEffect(() => {
    setProgress(100);
  }, [])


  const navigate = useNavigate();

  const [file,
    setFile] = useState(null);
  const [preview,
    setPreview] = useState(null);
  const [screen,
    setScreen] = useState(false);
  const [fileState,
    setFileState] = useState("Please Wait...");
  const [thum,
    setThumb] = useState(null);
  const [btnLoading,
    setBtnLoading] = useState(false);
  const {
    currentUser,
    loading
  } = useAuth();
  const [previewThumb,
    setPreviewThumb] = useState(null);

  const getFileExtension = (FileName) => {
    return FileName.split('.').pop();
  }
  const descriptionRef = useRef();

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/auth/login');
    }
    if (!file || !thum) {
      return;
    }
    try {
      setBtnLoading(true);
      setScreen(true);
      uploadFile(file, setFileState, setProgress, async (data) => {
        if (data.status) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 720,
            useWebWorker: true,
            onProgress: setProgress,
          }
          let compressedFile = await imageCompression(thum, options);
          uploadFile(compressedFile, setFileState, setProgress, async (data2) => {
            if (data.status) {
              setProgress(10)
              let upload = {
                post: data.url,
                description: descriptionRef.current.value,
                name: (currentUser.displayName) ? currentUser.displayName: currentUser.email,
                userId: currentUser.email,
                type: "video",
                thumbnail: data2.url,
                postType: `video/${preview.type}`,
                profileUrl: (currentUser.photoURL) ? currentUser.photoURL: "/blank-profile-picture-973460_640.png"
              }
              setProgress(40);
              let api = await fetch(`${BaseUrl}/api/v1/posts`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(upload)
              });
              setProgress(60);
              let response = await api.json();
              navigate('/', {
                replace: true
              });

              setScreen(false);
              setProgress(100);
              setBtnLoading(false);
            } else {
              setScreen(false)
              setProgress(100)
              alert(data.err);
              setBtnLoading(false);
            }
          })

        } else {
          setScreen(false)
          setProgress(100)
          alert(data.err);
          setBtnLoading(false);
        }

      })
    }
    catch(err) {
      setProgress(100)
      alert(err.message);
      setScreen(false)
      setBtnLoading(false);
    }
  }

  const handleFile = (e) => {
    if (!e.target.files.length > 0) {
      setFile(null);
      setPreview(null);
      return;
    } else {
      setFile(e.target.files[0]);
      setProgress(50)
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview({
          url: reader.result, type: getFileExtension(e.target.files[0].name)});
        setProgress(100)
      }, false);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const setThumnail = (e) => {
    if (!e.target.files.length > 0) {
      setThumb(null);
      setPreviewThumb(null);
      return;
    } else {
      setThumb(e.target.files[0]);
      setProgress(50)
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewThumb({
          url: reader.result, type: getFileExtension(e.target.files[0].name)});
        setProgress(100)
      }, false);
      reader.readAsDataURL(e.target.files[0]);
    }
  }



  return (
    <>
    <Screen state={screen} text={`${fileState}`} />
    <form onSubmit={
      uploadImage
      } className="px-4">
    <label htmlFor="file" className="block mx-auto mt-3 border-2 border-dotted max-w-sm h-auto py-6 px-4 rounded-lg cursor-pointer flex items-center justify-center flex-col cursor-pointer bg-gray-100">
        {
        (preview) ? (<video src={preview.url} type={`video/${preview.type}`} controls className="w-full h-full rounded-lg object-contain object-center" alt="preview"></video>):
        (<> <img src="/undraw_add_files_re_v09g.svg" className="w-24 h-24 object-contain" />
        <p className="mt-3">
Upload A Video 🚀
        </p> < />
      )
      }
       </label>
           <label htmlFor="thumb" className="block mx-auto mt-4 border-2 border-dotted max-w-sm h-auto py-6 px-4 rounded-lg cursor-pointer flex items-center justify-center flex-col cursor-pointer bg-gray-100">
        {
      (previewThumb) ? (<img src={previewThumb.url} className="w-full h-full rounded-lg object-contain object-center" alt="preview" />):
    (<> <img src="/undraw_add_files_re_v09g.svg" className="w-24 h-24 object-contain" />
    <p className="mt-3">
Upload A Video Thumbnail 🚀
    </p> < />
  )
  }
       </label>
  <input onChange={handleFile} className="hidden" type="file" accept="video/*" id="file" />
  <input onChange={setThumnail} className="hidden" type="file" accept="image/*" id="thumb" />
  <textarea ref={descriptionRef} className="mt-6 block max-w-sm w-full rounded-lg py-3 px-4  mx-auto  outline-none border-2 bg-gray-200 h-48 resize-none focus:border-blue-500 border-gray-300 focus:bg-white" placeholder="Say Something About Your Post"></textarea>
  <button disabled={btnLoading} type="submit" className="outline-none py-3 px-4 rounded-full bg-blue-500 text-white max-w-sm mx-auto w-full flex items-center justify-center text-white hover:bg-blue-400 mt-6 mb-12 cursor-pointer">{btnLoading ? (<><img className="w-8 h-8 mr-2 rounded-full" src="/loader-waiting.gif" /> Uploading.. < />) : (<> Upload </ >)}</button>
</form> < />
);



}