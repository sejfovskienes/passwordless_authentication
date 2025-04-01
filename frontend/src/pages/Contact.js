import React, {useState} from "react";
import mailPicture from "../assets/send-mail.jpg";
import axios from 'axios';

function Contact (){
    const mainContentStyle ={
        width:"75%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"3%",
        display:"flex",
        justifyContent:"space-between",
        justifyContent:"space-around",
        marginBottom: "2%",
    };

    const mainContentStyle2 ={
        width:"75%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"3%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        marginBottom: "2%",
    };

    const buttonStyle = {
        backgroundColor: "#0a2540",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        width: "100px",
        height: "35px",
        color: "#fff",
        marginTop: "10px",
        cursor: "pointer"
    };

    const inputStyle ={
        width:"350px",
        height:"25px",
        border: "1px solid #ddd", 
        borderRadius: "5px", 
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
        marginBottom:"15px",
    };

    const textareaStyle = {
        width:"350px",
        height:"150px",
        marginBottom:"15px",
        border: "1px solid #ddd", 
        borderRadius: "5px", 
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
        marginBottom:"15px",
    };

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = { email, subject, message };
    
        try {
          const response = await axios.post('http://localhost:5000/contact', data);
            setEmail('');
            setSubject('');
            setMessage('');
          console.log("Mail sent succesfully")
        } catch (error) {
            console.log("Mail sending failed")
        }
      };

    return(
        <>
            <div style={mainContentStyle2}>
                <h1 style={{textAlign:'center'}}>Feel free to contact us</h1>
                <p style={{textAlign:'center'}}>Feel free to reach out to us for any inquiries or assistance. 
                    We value your feedback and ideas. Whether you have a suggestion, a question, or want to share
                     your thoughts, we are always open to hearing from you. Your input helps us improve and provide the 
                     best possible experience.

Feel free to reach out to us, and we’ll get back to you as soon as possible!</p>
            </div>
            <div style={mainContentStyle}>
                <div>
                <input 
    type="text" 
    name="email" 
    placeholder="Your email address" 
    style={inputStyle} 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
/>

<input 
    type="text" 
    name="subject" 
    placeholder="Subject" 
    style={inputStyle} 
    value={subject} 
    onChange={(e) => setSubject(e.target.value)} 
/>

<textarea 
    style={textareaStyle} 
    name="message" 
    placeholder="Your mail here" 
    value={message} 
    onChange={(e) => setMessage(e.target.value)} 
/>
                    <div style={buttonStyle} onClick={handleSubmit}>Send!</div>
                </div>
                <div>
                    <img src={mailPicture} style={{width:'550px'}}></img>
                </div>
            </div>
        </>
    )
}

export default Contact;