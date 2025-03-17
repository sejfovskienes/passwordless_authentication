import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FaceScan() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
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
            } catch (error) {
                console.error("Camera access denied:", error);
                setCameraError(true);
            }
        }

        function handleKeyPress(event) {
            if (event.key === "q") {
                captureImage();
            }
        }

        function captureImage() {
            if (videoRef.current && canvasRef.current) {
                const context = canvasRef.current.getContext("2d");
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                canvasRef.current.toBlob(sendToBackend, "image/png");
            }
        }

        async function sendToBackend(imageBlob) {
            const formData = new FormData();
            formData.append("image", imageBlob, "face_scan.png");

            try {
                const response = await fetch("http://localhost:5000/get-media", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    navigate(source_url === "register" ? "/register/step2?success=true" : "/login/step2?success=true");
                } else {
                    navigate(source_url === "register" ? "/register/step2?success=false" : "/login/step2?success=false");
                }
            } catch (error) {
                console.error("Upload error:", error);
                navigate("/login/step2?success=false");
            }
        }

        document.addEventListener("keydown", handleKeyPress);
        startCamera();

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1.5%" }}>
            <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>Scan your face to gain access</h1>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>Please keep the device in such a position where your face is visible. The data you provide will be used just for system purposes.</p>
            {cameraError ? (
                <p style={{ color: "red" }}>Camera access denied. Please allow camera permissions.</p>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline style={{ width: "40%", height: "40%", marginLeft: "auto", marginRight: "auto", marginTop: "1.5%", border: "solid black 2px" }}></video>
                    <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                </>
            )}
        </div>
    );
}

export default FaceScan;
