import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import {
  storage
} from "./firebase";

const uploadFile = (file,setFileState, setProgress, cb) => {
  if (!file) return;
  try {
    const storageRef = ref(storage, `/files/${new Date().getTime() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
      if(progress < 100){
        setFileState(`${progress}% uploaded..`)
      }
      else{
        setFileState("Almost Done Please Wait..")
      }

    }, (err) => {
      cb({
        status: false, err: err.message
      });
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(url => {
        cb({
          status: true, url: url
        });
      })
    });
  }
  catch (err) {
    cb({
      status: false, err: err.message
    });
  }
}


export default uploadFile;