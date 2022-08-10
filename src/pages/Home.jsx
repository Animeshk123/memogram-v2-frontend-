import {useAuth} from "../context/AuthContext";
import Grid from '../components/Grid';
import {useEffect} from 'react';


export default function Home ({setProgress}) {
  useEffect(() => {
    setProgress(100);
  },[])
  return <Grid setProgress={setProgress}/>;
}
