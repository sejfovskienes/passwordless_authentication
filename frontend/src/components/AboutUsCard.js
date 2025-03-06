import React from "react";

function AboutUsCard({ title, description, image }) {
    return (
        <div style={{ 
            width: "175px", 
            border: "1px solid #ddd", 
            borderRadius: "15px", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
            padding: "20px", 
            textAlign: "center",
            backgroundColor: "#fff" 
        }}>
            {image && <img src={image} alt={title} style={{ width: "100%", borderRadius: "10px" }} />}
            <h3 style={{ color: "#0a2540", marginTop: "10px" }}>{title}</h3>
            <p style={{ color: "#555" }}>{description}</p>
        </div>
    );
}

export default AboutUsCard;
