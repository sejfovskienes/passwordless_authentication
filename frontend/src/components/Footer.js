import React from "react";

function Footer() {
    const footerStyle ={
        width:"100%",
        height:"125px",
        marginBottom:"0px",
        backgroundColor:"#0a2540", 
        bottom: 0,             
        left: 0,  
    };

    const style1 = {
        alignItems: "center",
        marginLeft:"135px"
    };

    const logoStyle = {
        color:"#fff",
        
    };

    const copyrightTextStyle ={
        color:"#fff",
        marginTop:"-10px",
        fontSize:"12px",
    };

    return(
        <footer style={footerStyle}>
            <div style={style1}>
                <h2 style={logoStyle}>Passwordless<br></br>Authentication</h2>
                <p style={copyrightTextStyle}>&copy; 2025, All Rights Reserved.</p>
            </div>
             
        </footer>
    )
}

export default Footer;