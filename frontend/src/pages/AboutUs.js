import React from "react";
import AboutUsCard from "../components/AboutUsCard";
import img1 from "../assets/profile_pic1.jpg";

function AboutUs(){
    const mainContentStyle ={
        width:"75%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"3%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        marginBottom: "2%",
    };

    return(
        <div style={mainContentStyle}>
            <h1 style={{color:'#0a2540', textAlign:'center'}}>About the project</h1>
            <p style={{fontSize:'16px', textAlign:'center'}}>
            We are developing a passwordless authentication system as part of our Team Project
             course at FCSE - Skopje. Our project focuses on enhancing security and user convenience by
              eliminating traditional passwords and leveraging advanced authentication methods such as face
               recognition. This approach ensures a seamless and secure login experience while reducing the risks
                associated with password-based authentication.  
            </p>
            <div style={{display:'flex', justifyContent:'space-around', marginBottom:'50px', marginTop:'3%'}}>
                <AboutUsCard 
                title="Enes Sejfovski"
                description="Software Engineering Student at FCSE-Skopje"
                image={img1} />

            <AboutUsCard 
                title="Sadula Jakuposki"
                description="Software Engineering Student at FCSE-Skopje"
                image={img1} />
            </div>
            
        </div>
    )
}

export default AboutUs;