import './styles/App.scss'
import { useState } from 'react'
import SideBar from './components/SideBar.tsx'
import FavMenu from './components/FavMenu.tsx'
import Cards from './components/Cards3.tsx'
import arrow from './assets/arrowFR.svg'


export default function App() {
  const [liftingStateUpAPI, setLiftingStateUpAPI] = useState([])

  return (
    <>
      <div>
        <h1 >Smart Fake</h1>
        <h5>Makes you shine in high society!</h5>
        <SideBar inverseDataFlowAPI={(data) => setLiftingStateUpAPI(data)} />
        <FavMenu/>
        <Cards liftingStateUpAPI={liftingStateUpAPI} />
        {liftingStateUpAPI.length > 0 ? <div className="empty"><span>Finito, on recommence ?</span></div> : <div className="bottomDeck"><span>😵</span></div>}
        <img className='arrow' src={arrow} alt="arrow" />
      </div>
    </>
  )
}