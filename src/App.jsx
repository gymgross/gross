import { useState, useEffect} from 'react'
import { Document, Page } from 'react-pdf';
import './App.css'
import planes from './assets/planes.json'


function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  function basePrefix(e) {
    return `${import.meta.env.BASE_URL}${e}`;
  }
  const getAssetSrc = (name) => {
    const path = `/src/assets/${name}`;
    const modules = import.meta.glob("/src/assets/**", { eager: true });
    const mod = modules[path];
    return mod.default;
  };
  const getYScrollPos = () => {
      const position = window.scrollY;
      setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', getYScrollPos, { passive: true });
    return () => {
        window.removeEventListener('scroll', getYScrollPos);
    };
  }, []);
  const PDFViewer = () => {
    const pdfURL = basePrefix("terminos&condiciones.pdf");
    return (
        <div>
            <Document file={pdfURL}>
                <Page></Page>
            </Document>
        </div>
    );
  }

  const whatsapplink = "https://wa.me/56986671104"

  function sendWhatsapp(e, message){
    const text = message ? `?text=${encodeURIComponent(message)}` : ""
    window.open(`${whatsapplink}${text}`, "_blank")
  }

  // Function to handle smooth scroll to anchors
  const scrollToAnchor = (e, anchorId) => {
    e.preventDefault()
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      const navbarHeight = 282 // document.getElementById("navbar").offsetHeight // navbarRef.current.offsetHeight;
      const offsetTop = anchorElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };
  const anchors = [
    "inicio",
    "planes",
    "servicios",
    "contacto"
  ]
return (
    <>
    <div id="navbar" className={`w-screen fixed z-50 bg-black navbar flex-col p-0`}>
        <img className={`p-0 w-64 contrast-200 m-auto transition-transform transform ${scrollPosition < 16 ? "-translate-y-full h-0": "translate-y-0 h-full"}`} src={basePrefix("logo.webp")} alt="Logo" />
        <div className="navbar-start w-full">
            <div className="m-auto">
                <ul className="menu menu-horizontal px-1">
                    {anchors.map((anchor,i) => {
                        return (
                            <li className="text-xl uppercase text-white border-x border-1px" key={i}><a href={`#${anchor}`} onClick={(e) => scrollToAnchor(e, anchor)}>{anchor}</a></li>
                        )
                    })}
                </ul>
            </div>
        </div>
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
    <div id='inicio' className="grid grid-rows-auto w-full">
        <div id="hero" className="relative overflow-hidden h-screen flex -mb-8">
            <div className=" hidden absolute z-30 grid grid-rows-5 h-full w-full">
                <div className="text-5xl text-center text-white justify-self-center self-center row-span-3">
                    GROSS GYM FITNESS CHILE
                </div>
            </div>
            <div className="relative contrast-200 w-full scale-100 self-center"  id="welcomeVideoParent">
                <video className='max-md:hidden' poster={basePrefix("op.webp")} loop disablePictureInPicture autoPlay muted
                    src={basePrefix("op.webm")}></video>
                <video className='md:hidden' poster={basePrefix("op.webp")} loop disablePictureInPicture autoPlay muted
                    src={basePrefix("op_mobile.webm")}></video>

            </div>
        </div>

    </div>
    <div id='planes' className="w-full p-4">
        <a href='#planes' onClick={(e) => scrollToAnchor(e, "planes")}>
            <h1 className='text-4xl text-white m-[1rem] font-bold'># Nuestros Planes</h1>
        </a>
        <div className="w-full overflow-x-scroll">
            <div className='carousel w-fit mx-auto p-4'>
                {planes.map((plan,i) => {
                    return ( 
                    <div key={i} className="carousel-item relative select-none">
                        <div className="card card-bordered w-96 mx-2">
                            {() => {
                                if(plan.image_url){
                                    return (
                                        <figure>
                                            <img src={plan.image_url} alt="Plan Background" />
                                        </figure>
                                    )
                                }
                                return ""
                            }}
                            <div className="card-body text-white text-center border border-white border-1px rounded ">
                                <div className="text-2xl font-bold ">
                                    Plan: {plan.name}
                                </div>
                                <div className="text-xl">Horarios: {plan.schedule}</div>
                                <div className='text-xl'>{() => {
                                    if(plan.features.length){
                                        return "Incluye:"
                                    }
                                    return ""
                                }} {plan.features.map((feature,i) => {
                                    return ( <div key={i} className=" badge bg-orange-600 text-white">{feature}</div>)
                                })} </div>
                                <div className="text-xl mt-4">{plan.cost}</div>
                                <div className="card-actions mt-4 ">
                                    <div onClick={(e) => sendWhatsapp(e, `Hola, me interesa el plan ${plan.name} y quisiera unirme a Gross Gym. ¿Podría obtener mas información?`)} className="m-auto btn text-white text-xl capitalized bg-orange-600">Me Interesa</div>
                                </div>
                            </div>
                        </div>            
                    </div>)
                })}
            </div>
        </div>
    </div>
    <div id='servicios' className="w-full p-4">
        <a href='#servicios' onClick={(e) => scrollToAnchor(e, "servicios")}>
            <h1 className='text-4xl text-white m-[1rem] font-bold'># Nuestros Servicios</h1>
        </a>
        <div className="w-full overflow-x-scroll">
            En construcción
        </div>
    </div>    
    <div id="contacto" className="w-full p-4 text-white">
        <a href="#contacto" onClick={(e) => scrollToAnchor(e, "contacto")}>
            <h1 className='text-4xl font-bold'>
                # Contacto
            </h1>
        </a>
        <div className="flex-col w-full">
            <div className="text-4xl text-white font-bold text-center">
                Estamos aquí para ayudarte a alcanzar tus objetivos de fitness. 
            </div>
            <div className="my-2 text-4xl text-white font-bold text-center">
                Contactanos a:
            </div>
            <div className="w-full flex-col text-center">
                <div onClick={(e) => sendWhatsapp(e, "Hola, me interesa unirme a Gross Gym.")} className="btn bg-green-600 text-white text-2xl my-4">
                    <img className='w-8 invert' src={getAssetSrc("whatsapplogo.png")} alt="" />Whatsapp
                </div>
                <div className="text-white text-4xl font-bold my-4">
                    <a href="" onClick={() => window.open("tel:+56:986671104", "_blank")}><h1>{`${"+56 9 86671104"}`}</h1></a>
                </div>
            </div>
        </div>
        <div id='map' className='w-full'>
        </div>
    </div>
    </>
  )
}

export default App
