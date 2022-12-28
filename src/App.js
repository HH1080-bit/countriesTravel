import { useCallback, useState,useEffect  } from 'react';
import Countries from './Components/Countries/Countries'
import Navbar from './Components/NavBar/Navbar'
import './App.css';
import Filter from './Components/Searching/Filter';




const App =() => {
  const [countries, setCountries] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [thereIsError, setThereIsError] = useState(false)
  const [light, setLight] = useState(true)
  const [filteredCountry, setFilteredCountry] =useState('')
  const [filteredRegion, setFilteredRegion] = useState('')
   const fetchingData = useCallback(async (url) => {
    try {
    const response = await fetch(url);
    setIsLoading(true)
    const data = await response.json();
      
      setCountries(data)
      setIsLoading(false)

    } catch(error){
      setThereIsError(true)
    }
   },[])

   useEffect(() => {
    fetchingData("https://restcountries.com/v3.1/all")
   }, [fetchingData])
   

   const togglingDarkMode = (isLighted) => {
      setLight(isLighted)
    }

    const filteringCountries = (filterParam, filterRegionParam) => {
      setFilteredCountry(filterParam)
      setFilteredRegion(filterRegionParam)
    }

 light ? document.body.style.backgroundColor = "hsl(0, 0%, 98%)" : document.body.style.backgroundColor = "hsl(209, 23%, 22%)";

 let content ;

 if(!thereIsError && !isLoading) {
  content =        
  <>
  <Filter onLight={light} countries={countries} onFilter={filteringCountries}/>
  <Countries countries={countries} onLight={light} filterCountry={filteredCountry} filterRegion={filteredRegion}/>  
  </>
 } else if (isLoading&&!thereIsError) {
    content = <p className='loading-text'>Loading ....</p>
 } else if (thereIsError){
  content =  <p className='error-text'>Server is Not responding</p>
 }

    
  return (
    <div>

      <Navbar onToggling={togglingDarkMode}/>

      {content}

      
    </div>
  );
}

export default App;
