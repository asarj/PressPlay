import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem', backgroundColor: 'black'
        }}>
           <p style={{color: 'rgb(37, 141, 252)'}}> Made with <FontAwesomeIcon title="love" icon="heart" style={{color: 'rgb(37, 141, 252)'}} />  by <a href="https://www.ajaysarjoo.com" target="_blank" >Ajay Sarjoo</a>, MERN-stack style </p>
        </div>
    )
}

export default Footer
