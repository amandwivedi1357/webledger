import styled from "styled-components"
import {motion} from "framer-motion"
import {Link,useParams} from "react-router-dom"
import { apikey } from "../components/Popular"
import { useEffect, useState } from "react"
import Search from "../components/Search"
import Category from "../components/Category"
import { AiOutlineHeart } from "react-icons/ai"

const add_to_fav= (item)=>{
    let fav_datas = JSON.parse(localStorage.getItem('favourites'))||[] 
                let isPresent = fav_datas.filter((el)=>{
                if(el.id===item.id){
                            return el
                        }
                    })
    console.log(fav_datas,isPresent)      
                    if(isPresent.length==0){
                       fav_datas.push(item)
                       localStorage.setItem('favourites',JSON.stringify(fav_datas));
                       alert('item added')
                    }
                    else{
                        alert('item already present')
                    }
    }
const Cuisine = () => {

    const [cuisine,setCuisine] = useState([])

   let params = useParams()


    const getCuisine = async(name)=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&cuisine=${name}`)
        const recipes = await data.json()
        setCuisine(recipes.results)
    }
    useEffect(() => {
        getCuisine(params.type)
        console.log(params.type)
    }, [params.type]);
  return (
    <>
    <Search/>
      <Category/>
    <Grid 
    animate={{opacity:1}}
    initial={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    >
        
     {
        cuisine.map((item)=>{
            return (
                <Card key={item.id}>
                    <Link to={'/recipe/'+ item.id}>
                    
                   <img src={item.image} alt={item.title} /> 
                   <h4>{item.title}</h4>
                   <AiOutlineHeart size={'2rem'} style={{marginTop:"-2rem"}} onClick={()=>{add_to_fav(item) }}/>
                   </Link>
                </Card>
            )
        })
     }
    </Grid>
    </>
  )
}

const Grid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
grid-gap: 3rem;
`;

const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;
}
a{
    text-decoration:none ;
}
h4{
    text-align:center ;
    padding: 1rem;
}
`;


export default Cuisine
