import { useState, useEffect } from 'react'
import './App.css'
import planes from './assets/planes/planes.json'

console.log(planes)

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  function basePrefix(e) {
    return `${import.meta.env.BASE_URL}${e}`;
  }
  const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <div id="sticky" className={`fixed z-50 bg-black transition-transform transform ${scrollPosition < 16 ? "-translate-y-full": "translate-y-0"}`}>
        <img className="w-1/3 contrast-200 m-auto" src={basePrefix("logo.webp")} alt="Logo" />
    </div>
    <div id="header" className="w-full hidden">
        <img className="contrast-200 sm:w-1/2 m-auto" src="/logo.webp" alt="Logo" />
        <div className="w-full border-slate-400 border-2 hidden">
            <div id="menu" className="w-8 m-auto md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}"
                    stroke="white"  className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </div>
    <div className="grid grid-rows-auto h-full w-full">
        <div id="hero" className="relative overflow-hidden">
            <div className=" hidden absolute z-30 grid grid-rows-5 h-full w-full">
                <div className="text-5xl text-center text-white justify-self-center self-center row-span-3">
                    GROSS GYM FITNESS CHILE
                </div>
            </div>
            <div className="relative contrast-200 w-full scale-100"  id="welcomeVideoParent">
                <video poster={basePrefix("op.webp")} loop disablePictureInPicture autoPlay muted
                    src={basePrefix("op.webm")}></video>
            </div>
        </div>
        <div>
            <h1>Planes</h1>
        </div>
        <div className="snap-x overflow-scroll w-full flex gap-4 mx-4 no-scrollbar scrolling-touch no-drag px-4">
            {planes.map((plan,i) => <img className="snap-start shrink-0 " src={basePrefix(plan.image)} key={i} />)}
        </div>
    </div>
    </>
  )
}

export default App
