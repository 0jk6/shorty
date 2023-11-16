import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

    const [inputURL, setInputURL] = useState(null)
    const [shorty, setShorty] = useState("")

    function validateURL(value) {
        return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(value);
    }

    function shortenURL(){

        if(validateURL(inputURL)){

            async function shorty(){
                await fetch(`http://localhost:8080/shorty?url=${inputURL}`).then((response)=>{
                    let data = response.json().then((data)=>{setShorty(data["url"]);})
                })
            }

            shorty()
        }
        else{
            alert("Not a valid url!")
        }
    }

    return (
        <div className="App">
            
            <h1>Shorty: Simple, buggy URL Shortener :|</h1>    
            
            <input style={{width:"30%", borderRadius:"3px"}} type="text" onChange={(e)=>{setInputURL(e.currentTarget.value)}}/>
            
            <input 
                style={{height:"35px",  borderRadius:"3px", background:"#4CAF50", fontWeight:"bold", color:"#ffffff"}} 
                type="button" 
                value="Shorty"
                onClick={()=>{
                    shortenURL()
                }} 
            />

            <input 
                style={{height:"35px",  borderRadius:"3px", background:"#4CAF50", fontWeight:"bold", color:"#ffffff"}} 
                type="button" 
                value="Copy"
                onClick={()=>{
                    navigator.clipboard.writeText(shorty)
                }} 
            />

            <br/>

            <p>Shorty link: <a href={shorty} target="_blank" rel="noopener noreferrer">{shorty}</a></p>

        </div>
    );
}

export default App;
