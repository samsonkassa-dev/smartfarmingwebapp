import React from 'react'
import './Cards.css'
import { WiThermometer, WiHumidity,WiRaindrops } from 'weather-icons-react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from "react-router";

function Cards(props) {
    const history = useHistory()
    return (
        <div className="wrapperr">
            <div className="card__location">{props.location} <span className="morecss" onClick={() => history.push('/card')} ><MoreHorizIcon /></span></div>
            
            <div className="cards">
                <div className="card">
                    <div className="card__icon"> <WiThermometer size={35} color='#d00000' /></div>
                    <div className="card__title">Temperature</div>
                    <div className="card__content">{props.temperature}</div>
                    
                </div>
                <div className="card">
                <div className="card__icon"><WiRaindrops size={35} color='#0077b6' /></div>
                   <div className="card__title">Moisture</div> 
                   <div className="card__content">{props.moisture}</div>
                </div>
                <div className="card">
               <div className="card__icon"> <WiHumidity size={35} color='#023e8a' /></div>
                   <div className="card__title">Humidity</div> 
                   <div className="card__content">{props.humidity}</div>
                    </div>
            </div>
        </div>
    )
}

export default Cards
