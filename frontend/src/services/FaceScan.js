import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FaceScan() {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const [cameraError, setCameraError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const source_url = queryParams.get("source");

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                startRecording(stream);
            } catch (error) {
                console.error("Camera access denied:", error);
                setCameraError(true);
            }
        }

        function startRecording(stream) {
            recordedChunksRef.current = [];
            const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(recordedChunksRef.current, { type: "video/webm" });
                sendToBackend(videoBlob);
            };

            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 3000); 
        }

        async function sendToBackend(videoBlob) {
            const formData = new FormData();
            formData.append("video", videoBlob, "face_scan.webm");

            try {
                const response = await fetch("http://localhost:5000/get-media", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    if (source_url == "register"){
                        navigate("/register/step2?success=true");
                    }else{
                        navigate("/login/step2?success=true");
                    }
                        
                } else {
                    if (source_url == "register"){
                        navigate("/register/step2?success=false");
                    }else{
                        navigate("/login/step2?success=false");
                    }
                }
            } catch (error) {
                console.error("Upload error:", error);
                navigate("/login/step2?success=false");
            }
        }

        startCamera();
    }, []);

    return (
        <div style={{display:"flex", flexDirection:"column", marginTop:"1.5%"}}>
            <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Scan your face to gain access</h1>
            <p style={{marginLeft:"auto", marginRight:"auto"}}>Please keep the device in such position where your face is visible. The data you provide will be used just for purpouses of the system.</p>
            {cameraError ? (
                <p style={{ color: "red" }}>Camera access denied. Please allow camera permissions.</p>
            ) : (
                <video ref={videoRef} autoPlay playsInline style={{ width: "40%", height:"40%", marginLeft:"auto", marginRight:"auto",  marginTop:"1.5%", border:"solid black 2px"}}></video>
            )}
        </div>
    );
}

export default FaceScan;