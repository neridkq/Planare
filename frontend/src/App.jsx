import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import Session from 'react-session-api';

function App() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loginUrl, setLoginUrl] = useState(null);
    const ifLogined = () => {};

    useEffect(() => {
        axios.get('/api/get_user_info').then((res) => {
            if (res.data.status === 401) {
                console.log(res.data.data.url);
                setLoggedIn(false);
                setUserInfo(null);
                setLoginUrl(res.data.data.url);
            } else if (res.data.status === 200) {
                console.log(res.data.data);
                setLoggedIn(true);
                setUserInfo(res.data.data);
            }
        });
    }, [loginUrl]);
    if (loggedIn) {
        return (
            <>
                <div>userInfo.id: {userInfo.id}</div>
                <div>userInfo.connected_at: {userInfo.connected_at}</div>
                <div>userInfo.properties.nickname: {userInfo.properties.nickname}</div>
                <div>
                    userInfo.properties.profile_image(50x50):
                    <img width='50' height='50' src={userInfo.properties.profile_image}></img>
                </div>
                <div>
                    userInfo.properties.thumbnail_image:
                    <img src={userInfo.properties.thumbnail_image}></img>
                </div>
                <button
                    onClick={() => {
                        axios.get('/api/logout').then((res) => {
                            setLoggedIn(false);
                            alert(res.data.data.msg);
                        });
                    }}
                >
                    log아웃하기
                </button>
            </>
        );
    } else if (loggedIn === false) {
        return (
            <>
                <button
                    onClick={() => {
                        window.location.href = loginUrl;
                    }}
                >
                    Login하기
                </button>
            </>
        );
    }
}

export default App;
