import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import {useState} from 'react';
import Profile from './pages/Profile';
import {AuthProvider} from './context/AuthContext';
import Create from './pages/Create';
import Info from './pages/Info';
import ErrorF from './pages/Error';
import Dashboard from './pages/Dashboard';
import Private from './pages/Private';
import Password from './pages/Password';
import CPassword from './pages/CPassword';
import About from './pages/About';
import UserPost from './pages/UserPost';




export default function App() {
  const [progress,setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="red"
        progress={progress}
        height="4px"
        onLoaderFinished={() => setProgress(0)}
      />
      <AuthProvider>
  <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home setProgress={setProgress}/>}/>
        <Route exact path="/auth/login" element={<Login setProgress={setProgress}/>}/>
        <Route exact path="/auth/register" element={<Register setProgress={setProgress}/>}/>
        <Route exact path="/create" element={
        <Private>
        <Create setProgress={setProgress}/> 
        </Private>
        } />
        <Route exact path="/post/:id" element={<Info setProgress={setProgress} /> } />
        <Route exact path="/profile" element={
        <Private>
        <Profile setProgress={setProgress}/>
        </Private>}/>
        <Route exact path="/dashboard" element={
        <Private>
        <Dashboard setProgress={setProgress}/>
        </Private>
        }/>
        <Route exact path="/forgot_password" element={
          <Password setProgress={setProgress}/>
        }/>
          <Route exact path="/change_password" element={
          <Private>
          <CPassword setProgress={setProgress}/>
          </Private>
        }/>
        <Route exact path="/about" element={
          <About setProgress={setProgress}/>
        }/>
        <Route exact path="/dashboard/post/:id" element={
        <Private>
          <UserPost setProgress={setProgress}/>
          </Private>
        }/>
        <Route path="/*" element={<ErrorF/>}/>
      </Routes>
      </AuthProvider>
    </>
    );
}
