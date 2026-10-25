import './App.css';
import Home from './Home.js';
import PreLoader from './PreLoader.js';
import { useEffect, useState } from 'react';

function App () {
    const [isLoading, setIsLoading] = useState(true);
    useEffect ( () => {
        setTimeout ( () => {
            setIsLoading(false);
        }, 3000);
    });
    return (
        <div>
            {isLoading ? <PreLoader/> : <Home/>}
        </div>
    );
}

export default App;
