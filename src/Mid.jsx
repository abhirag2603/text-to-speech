import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Mid = () => {
    const [prompt, setPrompt] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [promptReq, setPromptReq] = useState(false);
    const [audioChar, setAudioChar] = useState("alloy");
    const [activeButton, setActiveButton] = useState("alloy");
    const audioRef = useRef(null);
    const apiKey=JSON.stringify(import.meta.env.VITE_REACT_APP_API_KEY)

    

    function handleAudioChar(value) {
        setAudioChar(value);
        setActiveButton(value);
    }

    function handleChange(e) {
        setPrompt(e.target.value);
    }

    function handleClick() {
        setPromptReq(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://alloy-text-to-speech.p.rapidapi.com/tts/alloy';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'alloy-text-to-speech.p.rapidapi.com'
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    voice: audioChar,
                    input: prompt,
                    response_format: 'mp3',
                    speed: 1
                })
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const audio = result.media_url;
                setAudioUrl(audio);

            } catch (error) {
                console.error(error);
            }
        };

        if (promptReq && prompt.trim() !== "") {
            fetchData();
        }
    }, [promptReq, prompt, audioChar]);

    useEffect(() => {
        if (audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
        }
    }, [audioUrl]);

    return (
        <>
            <div className="content">
                <div className='top'>
                    <img className='logo' src='image.png' alt='logo'/>
                    <h1 className='TTS'>TTS</h1>
                </div>
                <div className='inpArea'>
                    <input
                        className='input'
                        type='text'
                        name="text"
                        placeholder='Enter your prompt'
                        value={prompt}
                        onChange={handleChange}
                    />
                    <div className="typeBtns">
                        <button
                            onClick={() => handleAudioChar("alloy")}
                            className={activeButton === "alloy" ? "activebtn" : ""}
                        >
                            alloy
                        </button>
                        <button
                            onClick={() => handleAudioChar("echo")}
                            className={activeButton === "echo" ? "activebtn" : ""}
                        >
                            echo
                        </button>
                        <button
                            onClick={() => handleAudioChar("fable")}
                            className={activeButton === "fable" ? "activebtn" : ""}
                        >
                            fable
                        </button>
                        <button
                            onClick={() => handleAudioChar("oynx")}
                            className={activeButton === "oynx" ? "activebtn" : ""}
                        >
                            oynx
                        </button>
                        <button
                            onClick={() => handleAudioChar("nova")}
                            className={activeButton === "nova" ? "activebtn" : ""}
                        >
                            nova
                        </button>
                        <button
                            onClick={() => handleAudioChar("shimmer")}
                            className={activeButton === "shimmer" ? "activebtn" : ""}
                        >
                            shimmer
                        </button>
                    </div>
                    <div className='currVoiceDiv'>current voice is: {audioChar}</div>
                    <button className='inpBtn' onClick={handleClick}>Get speech</button>
                    {audioUrl && (
                        <audio className='speechAud' controls ref={audioRef}>
                            <source type="audio/mpeg" src={audioUrl} />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            </div>
        </>
    );
};

export default Mid;
