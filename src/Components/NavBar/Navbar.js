import classes from './Navbar.module.css'
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'
import Container from '../UI/Container'
import React,{ useState,useEffect } from 'react'


const Navbar = (props) => {
    const [isLighted , setIsLighted] = useState(true)

    const toggleDarkMode = () => {
        if(isLighted) {
            setIsLighted(false)
        }else {
            setIsLighted(true)
        }
    }

    useEffect(() => {
        props.onToggling(isLighted)
    
       }, [isLighted,props])

    const navbarStyling = isLighted ? `${classes.navbar} ${classes.light}` : classes.navbar 



    return (
    <nav className={navbarStyling}>
        <Container>
        <div className={classes['nav-displayer']}>
        <h1 className={classes.heading}>Where in The World?</h1>
       {isLighted && <span onClick={toggleDarkMode}> <BsFillMoonFill/>Dark Mood</span>}
       {!isLighted && <span onClick={toggleDarkMode}> <BsFillSunFill/>Light Mood</span>}
        </div>
        </Container>
    </nav>
    )

}

export default React.memo(Navbar)