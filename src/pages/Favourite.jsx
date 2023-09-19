import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import Search from '../components/Search'
import Category from '../components/Category'

const Favourite = () => {
    const [savedRecipes,setSavedRecipes] = useState([]);

    useEffect(()=>{
        get_data()
    },[]);
    const get_data=()=>{
        const fav_datas = JSON.parse(localStorage.getItem('favourites'))||[] ;
        setSavedRecipes(fav_datas)
    }

    const remove_to_fav= (item)=>{
        let fav_datas = JSON.parse(localStorage.getItem('favourites'))||[] 
                    let isPresent = fav_datas.filter((el)=>{
                    if(el.id!==item.id){
                                return el
                            }
                        })    
                           fav_datas.push(item)
                           localStorage.setItem('favourites',JSON.stringify(isPresent));
                           get_data()
                           alert('item Removed Succesfully');
                        
        }

  return (
    <>
    <Search/>
      <Category/>
    <div>
        <h2 style={{textAlign:"center",marginBottom:"20px"}}>Favourite Recipe</h2>
    <Grid>
     {savedRecipes?.map((item)=>(
        <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
            </Link>
            <AiFillHeart size={'2rem'} style={{marginTop:"-2rem"}} onClick={()=>{remove_to_fav(item) }}/>
        </Card>
     ))} 
    </Grid>
    </div>
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
export default Favourite
