import {
  useEffect
} from 'react';

export default function About( {
  setProgress
}) {

  const done = () => {
    setProgress(100);
  }

  useEffect(() => {
    setProgress(50);
  }, [])

  return <iframe onLoad={() => { done()}} src="https://animeshkumbhakar.netlify.app"
    className="w-full h-screen"
    title="about"></iframe>;
}