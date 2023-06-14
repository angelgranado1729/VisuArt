import React from "react";
import "./Footer.css";

const Footer =()=>{
    return(
        <div className="footer">
            <div className = "sb__footer section">
                <div className = "sb__footer-links">
                    <div className = "sb__footer-links_div">
                        <img src="/images/logos/visuartOrangeLogo.jpg" alt="" />
                    </div>
                    <div className = "sb__footer-links_div">
                        <div className= "sb__footer-below-links">
                        <a href= "#"><div><p>Misión</p></div></a>
                        <a href= "#"><div><p>Visión</p></div></a>
                        <a href= "#"><div><p>Objetivos</p></div></a>
                        <a href= "#"><div><p>Contacto</p></div></a>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="sb__footer-below">
                    <div className ="sb__footer-copyright">
                        <p>©{new Date().getFullYear()} VisuArt. All rights reserved.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;