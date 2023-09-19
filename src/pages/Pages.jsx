
import Home from './Home'
import {Routes,Route, useLocation, Navigate} from "react-router-dom"
import Cuisine from './Cuisine'
import Searched from './Searched'
import Recipe from './Recipe'
import { AnimatePresence } from 'framer-motion'
import Signup from './Signup/index'
import Login from './Login/index'
import Favourite from './Favourite'


function Pages() {
  const user = localStorage.getItem("token");
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      
    <Routes location={location} key={location.pathname}>
    {user && <Route path="/" exact element={<Home />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/cuisine/:type' element={<Cuisine/>}/>
      <Route path='/searched/:search' element={<Searched/>}/>
      <Route path='/recipe/:name' element={<Recipe/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
    </Routes>
    </AnimatePresence>
  )
}

export default Pages


