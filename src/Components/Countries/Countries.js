import classes from './Countries.module.css'
import Container from "../UI/Container"
import React from 'react'

const Countries = (props) =>{
    
    
    const countryStyling = props.onLight ? `${classes.country} ${classes.light}` : classes.country
    const infoStyling = props.onLight ? ` ${classes.light}` : ""
    const spanStyling = props.onLight ? `${classes.light}`  : ""



    let filtred = props.countries.filter(elem => { 
        if(props.filterRegion === 'All'){
           return elem
        }
        return elem.region===props.filterRegion 
    }).filter(elem => {
        return elem.name.common.toUpperCase().includes(props.filterCountry.trim().toUpperCase())
    })
    

    return (


        <Container>

            {filtred.length === 0 && <h4 className={classes['error-text']}>"{props.filterCountry}" Is Not Here!, Try Searching for another Country</h4>}
        <div className={classes['countries-container']}>
            {
                filtred.map(country => {
                    let allCapitals;
                        if(country.capital === undefined) {
                            allCapitals = <span style={{color:"red"}}>No Capital</span>;
                        } else if(country.capital.length > 1) {
                            allCapitals = country.capital.join(", ")
                        } else {
                            allCapitals = country.capital
                        }
            
                    return <div className={countryStyling} key={country.name.common} >
                        <div>
                        <img src={country.flags.png}  alt='flag'  />
                        </div>
                         <h3  className={infoStyling}>
                        {country.name.common}
                    </h3>
                  
                    <ul className={infoStyling}>
                    <li>Popultion:  <span className={spanStyling} >{country.population}</span></li>
                    <li>Region:     <span className={spanStyling} >{country.region}</span></li>
                    <li>Capital:    <span className={spanStyling} >{allCapitals}</span></li>
                    </ul>
              
                        </div>
                })
            }
        </div>
        </Container>

    )
}

export default React.memo(Countries)