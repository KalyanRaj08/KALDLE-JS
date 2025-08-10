import './App.css';
import Line from './Line.js';
import { useEffect, useState } from 'react';

export const NO_OF_GUESSES = 6;
export const WORD_LENGTH = 5;

function App (){
    const [solution, setSolution] = useState ('');
    const [guesses, setGuesses] = useState(new Array(NO_OF_GUESSES).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');

    useEffect( () => {
        const fetchWord = async () => {
            const wordsList = await fetch ('/assets/5letter-words.json');
            const words = await  wordsList.json();
            setSolution(words[Math.floor(Math.random() * words.length)]);
        }
        fetchWord();
    }, []);

     useEffect(() => {
        const handleKeyDown = (event) => {
            if (/^[a-zA-Z]$/.test(event.key)) {
                if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess((prev) => prev + event.key.toLowerCase());
                }
            }
            else if (event.key === 'Backspace') {
                setCurrentGuess((prev) => prev.slice(0, -1));
            }
            else if (event.key === 'Enter') {
                if (currentGuess.length === WORD_LENGTH) {
                    const newGuesses = [...guesses];
                    const firstEmptyIndex = newGuesses.findIndex((g) => g === null);
                    if (firstEmptyIndex !== -1) {
                        newGuesses[firstEmptyIndex] = currentGuess;
                        setGuesses(newGuesses);
                        setCurrentGuess('');
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentGuess, guesses]);

    let lines = [];
    const firstEmptyIndex = guesses.findIndex((g) => g === null);

    guesses.map ((guess,i) => {
        lines.push(
            <Line 
                key= {i} 
                guess= {i === firstEmptyIndex ? currentGuess : guess} 
            />
        )
    });

    return (
        <div> {lines} </div>
    )  
}

export default App;
