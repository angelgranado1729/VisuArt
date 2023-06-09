import React from "react";
import "./Subtitle.css"


const Subtitle =(props)=>{
    const subtitle = props.subtitle;
    return(
        <div className="subtitle-section">
            <h1 className="subtitle-h1">{subtitle}</h1>
        </div>
    )
}

export default Subtitle;
