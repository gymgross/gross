import { useState, useEffect} from 'react'
import './App.css'
import planes from './assets/planes.json'


function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  function basePrefix(e) {
    return `${import.meta.env.BASE_URL}${e}`;
  }
  /*const getAssetSrc = (name) => {
    const path = `/src/assets/${name}`;
    const modules = import.meta.glob("/src/assets/**", { eager: true });
    const mod = modules[path];
    return mod.default;
};*/
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
    <div id="sticky" className={`w-screen fixed z-50 bg-black transition-transform transform ${scrollPosition < 16 ? "-translate-y-full": "translate-y-0"}`}>
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
    <div className="grid grid-rows-auto w-full">
        <div id="hero" className="relative overflow-hidden h-screen flex -mb-8">
            <div className=" hidden absolute z-30 grid grid-rows-5 h-full w-full">
                <div className="text-5xl text-center text-white justify-self-center self-center row-span-3">
                    GROSS GYM FITNESS CHILE
                </div>
            </div>
            <div className="relative contrast-200 w-full scale-100 self-center"  id="welcomeVideoParent">
                <video poster={basePrefix("op.webp")} loop disablePictureInPicture autoPlay muted
                    src={basePrefix("op.webm")}></video>
            </div>
        </div>
        <div className="text-white h-screen snap-x overflow-scroll w-full flex mx-4 no-scrollbar scrolling-touch no-drag px-4 scale-90">
            {planes.map((plan,i) => {
                return  <>
                        <div key={i} className="snap-start shrink-0 span  overflow-hidden relative  w-screen">
                            <img className='absolute object-cover h-full' src={plan.image}></img>
                            <div className={`absolute top-0 ${i % 2 != 0 ? "left-0" : "right-0"} h-full w-2/5 bg-black opacity-80 p-8 text-center `}>
                                <h2 className='text-xl md:text-4xl font-bold uppercase from-yellow-400 to-red-500 text'>
                                    {plan.nombre}
                                </h2>
                                {plan.notas.map((note,j) => {
                                    return <>
                                        <h3 className='md:text-2xl md:mt-4' key={j}>{note}</h3> 
                                    </>
                                })}
                                <h2 className='text-2xl md:text-4xl md:mt-8'>
                                    {plan.precio} Mensual
                                </h2>
                            </div>
                        </div>
                    </> 
            })}
        </div>
    </div>
    </>
  )
}

export default App
