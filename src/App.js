import './App.css';
import Line from './Line.js';
import { useEffect, useState } from 'react';

function App (){
    const [solution, setSolution] = useState ('');

    useEffect( () => {
        const fetchWord = async () => {
            const wordsList = await fetch ('/assets/5letter-words.json');
            const words = await  wordsList.json();
            setSolution(words);
        }
        fetchWord();
    }, []);

    return (
        <Line />
    ) 
}

export default App;
