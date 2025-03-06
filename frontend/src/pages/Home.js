import React from "react";
import img1 from '../assets/encryption_img.png'
function Home() {
    const mainContentStyle ={
        width:"85%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"3%",
        display:"flex",
        justifyContent:"space-between",
    };

    const divStyle={
        width:"48%",
    };

    return (
        <>
            <div style={mainContentStyle}>
                <div style={divStyle}>
                    <h2 style={{color: '#0a2540', fontSize:'40px', marginTop:'100px'}}>What is Passwordless Authentication?</h2>
                    <p style={{width:'80%', fontSize:'22px'}}>Authenticate effortlessly with biometrics, magic links,
                         or one-time codes for a safer, faster, and hassle-free experience..</p>
                </div>
                <div style={divStyle}>
                    <img src={img1} style={{width:'400px', height:'400px', marginLeft:'10%'}} />
                </div>
            </div>
            
        </>
    )
}

export default Home;