import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apikey } from '../components/Popular';
import styled from 'styled-components';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab,setActiveTab] = useState('instructions')
  const { name } = useParams(); // Use destructuring to extract 'name' from useParams

  const fetchDetails = async () => {
    try {
      const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${apikey}`);
      if (!data.ok) {
        console.log(`API request failed with status ${data.status}`);
      }
      const detailData = await data.json();
      setDetails(detailData);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [name]); 

  return (
    <DetailWrapper>
      <div>
      <h2 style={{marginBottom:"2rem"}}>{details.title}</h2>
      <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTab==='instructions' ? 'active' : ''} onClick={()=>setActiveTab('instructions')}>Instructions</Button>
        <Button 
        className={activeTab==='ingredients' ? 'active' : ''}
        onClick={()=>setActiveTab('ingredients')}>Ingredients</Button>

          {activeTab==='instructions' && (
             <div>
             <h4 dangerouslySetInnerHTML={{__html:details.summary}}></h4>
             <h5 dangerouslySetInnerHTML={{__html:details.instructions}}></h5>
           </div>
          )
          
          }
          {activeTab ==='ingredients' && (
             <ul>
             {details.extendedIngredients.map((ingredient)=>
             <li key={ingredient.id}>
                 {ingredient.original}
             </li>
             )}
           </ul>
          )}
        
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper=styled.div`

margin-bottom: 5rem;
display: flex;

/* div{
  img{
  width: 50%;
}
} */

.active{
  background: linear-gradient(35deg,#494949,#313131);
  color: white;
}
h4{
  margin-bottom: 2rem;
}
li{
font-size:1.2rem;
line-height: 2.5rem;
}
ul{
  margin-top: 2rem;
}
`;


const Button = styled.button`
padding: 1rem 2rem;
color: #313131;
background: white;
border: 2px solid black;
margin-right: 2rem;
font-weight: 600;

`;
const Info = styled.div`
 margin-left: 2rem;

 div{
  margin-top: 2rem;
 }
  
`
export default Recipe;
