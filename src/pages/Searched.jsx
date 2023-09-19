import { useEffect, useState } from "react"
import { apikey } from "../components/Popular"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Search from "../components/Search"
import Category from "../components/Category"
import {  AiOutlineHeart } from "react-icons/ai"

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
const Searched = () => {
    const params = useParams()
const [searchedRecipes,setSeachedRecipes] = useState([])

    const getSearched = async(name)=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${name}`)
        const recipes = await data.json()
        setSeachedRecipes(recipes.results)
    }
    useEffect(() => {
        getSearched(params.search)
    }, [params.search]);
  return (
    <>
    <Search/>
      <Category/>
    <Grid>
     {searchedRecipes?.map((item)=>(
        <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
            </Link>
            <AiOutlineHeart size={'2rem'} style={{marginTop:"-2rem"}} onClick={()=>{add_to_fav(item) }}/>
        </Card>
     ))} 
    </Grid>
    </>
  )
}

const Grid = styled.div`
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

export default Searched
