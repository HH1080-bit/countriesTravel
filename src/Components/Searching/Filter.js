import {AiOutlineSearch} from 'react-icons/ai'
import {MdKeyboardArrowDown} from 'react-icons/md'
import classes from './Filter.module.css'
import Container from '../UI/Container'
import { useState,useEffect } from 'react'
import React from 'react'

const Filter = (props) => {

    const[filtered, setFiltered] = useState('')

    const [regionsAreShown, setRegionsAreShown] = useState(false)

    const [regionFiltered, setRegionFiltered] =   useState("All")


  

    const searchingForCountry = (e) => {
        setFiltered(e.target.value)
    }


   const showRegions = () => {

    if(!regionsAreShown){
    setRegionsAreShown(true)
    }else {
        setRegionsAreShown(false)
    }
   }

   const filteringByRegions = event => {
    setRegionFiltered(event.target.getAttribute('aria-label'))
   }

   useEffect(() => {
    props.onFilter(filtered,regionFiltered)

   }, [filtered,props,regionFiltered])
   

    const iconStyling = props.onLight ? `${classes.ai} ${classes.light}` : classes.ai 
    const inputStyling = props.onLight ? `${classes.search} ${classes.light}` : classes.search
    const filterStyling = props.onLight ? `${classes.filter} ${classes.light}` : classes.filter
    const listStyling = props.onLight ? `${classes.light}` : ''


    return <Container>
        <form className={classes.form}>
            <div className={classes.input}>
            <AiOutlineSearch className={iconStyling}/>          
        <input 
        type='search' 
        name="search" 
        placeholder='Search For a Country...'
        className={inputStyling}
        value={filtered}
        onChange={searchingForCountry}
        />       
        </div>

    <div className={classes.filterCont}>
        <span className={filterStyling} onClick={showRegions}>Filter By Region <MdKeyboardArrowDown/></span>

        {regionsAreShown 
        && 
        <ul className={classes.conteinents}>
            <li className={listStyling} aria-label="Asia"   onClick={filteringByRegions}>Asia  </li>
            <li className={listStyling} aria-label="Europe" onClick={filteringByRegions}>Europe</li>
            <li className={listStyling} aria-label="Africa" onClick={filteringByRegions}>Africa</li>
            <li className={listStyling} aria-label="Americas" onClick={filteringByRegions}>Americas</li>
            <li className={listStyling} aria-label="Oceania" onClick={filteringByRegions}>Oceania</li>
        </ul>
        }
        
        </div>
        
        </form>
        </Container>
 

}

export default React.memo(Filter)