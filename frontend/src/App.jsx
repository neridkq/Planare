import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import Session from 'react-session-api';

function App() {
    return (
        <>
            <button
                onClick={() => {
                    axios.get('/api/test').then((data) => {
                        console.log(Session.items());
                        console.log(data);
                        console.log(document.cookie);
                    });
                }}
            >
                <h1>hello, react!</h1>
            </button>
        </>
    );
}

export default App;
