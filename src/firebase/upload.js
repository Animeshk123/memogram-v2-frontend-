import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import {
  storage
} from "./firebase";

const uploadFile = (file, setCanClick, setProgress, setLoader, cb) => {
  if (!file) return;
  try {
    const storageRef = ref(storage, `/files/${new Date().getTime() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setLoader(true);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);

    }, (err) => {
      cb({
        status: false, err: err.message
      });
    }, () => {
      setProgress(50);
      getDownloadURL(uploadTask.snapshot.ref).then(url => {
        setProgress(70);
        setLoader(false);
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