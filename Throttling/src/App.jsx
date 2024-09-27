import { useEffect, useState } from 'react'
import './App.css'
import useThrottle from './hooks/use-throttle';

function App() {

  const [windowSize,setWindowSize] = useState({
    width:window.innerWidth,
    height:window.innerHeight
  });

  const handleResize = ()=>{
    setWindowSize({
      width:window.innerWidth,
      height:window.innerHeight
    })
  }

  const throttledHandleResize = useThrottle(handleResize , 1000)

  useEffect(()=>{
    window.addEventListener("resize",throttledHandleResize);

    return()=>{
      window.removeEventListener("resize",throttledHandleResize);
    }
  })

  return (
    <div>
      <h1>Hii Sujal!</h1>
      <h1>Window Size : {windowSize.width} x {windowSize.height}</h1>
    </div>
    
  )
}

export default App
