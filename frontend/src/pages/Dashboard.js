import React from "react";

const divStyle ={
    width:"75%",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"3%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    marginBottom: "2%",
    alignItems:"center",
};

function Dashboard(){
    return(
        <div style={divStyle}>
            <h1>Dashboard</h1>
            <h3>Your email:</h3>
            <h3>Your public key:</h3>
            <br></br>
            <br></br>
            <h4>This page is only visible for the authenticated users.</h4>
        </div>
    )
}

export default Dashboard;