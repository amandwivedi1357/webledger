
import Category from "../components/Category"
import Popular from "../components/Popular"
import Search from "../components/Search"

import Veggie from "../components/Veggie"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <motion.div>
      
      <Search/>
      <Category/>
      <Veggie/>
      <Popular/>
    </motion.div>
  )
}

export default Home
