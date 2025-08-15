import './App.css';
import Line from './Line.js';
import { useEffect, useState, useRef } from 'react';

export const NO_OF_GUESSES = 6;
export const WORD_LENGTH = 5;

function App () {
    const wordList = useRef ([]);
    const [solution, setSolution] = useState ('');
    const [guesses, setGuesses] = useState(new Array(NO_OF_GUESSES).fill(null));
    const [keysPressed, setKeysPressed] = useState({})
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameResult, setGameResult] = useState(null);
    const [shakeRowIndex, setShakeRowIndex] = useState(null);

    useEffect( () => {
        const fetchWord = async () => {
            const wordsList = await fetch ('/assets/5letter-words.json');
            wordList.current = await wordsList.json();
            const randomWord = await wordList.current[Math.floor(Math.random() * wordList.current.length)];
            setSolution(randomWord);
        }
        fetchWord();
    }, []);

    useEffect( () => {
        console.log("Solution :: " + solution);
    }, [solution]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeysPressed(prev => ({ ...prev, [event.key]: true }));
            if(gameResult || keysPressed['Control']) return;
            if (/^[a-zA-Z]$/.test(event.key)) {
                if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess((prev) => prev + event.key.toLowerCase());
                }
            }
            else if (event.key === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1));
            else if (event.key === 'Enter') {
                if(shakeRowIndex !== null) return;
                const newGuesses = [...guesses];
                const firstEmptyIndex = newGuesses.findIndex((g) => g === null);
                if (currentGuess.length !== WORD_LENGTH || !wordList.current.includes(currentGuess?.toLowerCase())) {
                    if (shakeRowIndex === null) {
                        setShakeRowIndex(firstEmptyIndex);
                        setTimeout(() => setShakeRowIndex(null), 400);
                    }
                    return;
                }
                else if (solution === currentGuess) setGameResult('won');
                if (firstEmptyIndex !== -1) {
                    newGuesses[firstEmptyIndex] = currentGuess;
                    setGuesses(newGuesses);
                    setCurrentGuess('');
                }
                else if(firstEmptyIndex === (NO_OF_GUESSES - 1)) {
                    setGameResult('lost');
                }
            }
            else if (currentGuess.length >= WORD_LENGTH) return;
        };
        const handleKeyUp = (event) => {
            setKeysPressed(prev => { const updated = { ...prev }; delete updated[event.key]; return updated; });
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [currentGuess, guesses, keysPressed, gameResult, solution, shakeRowIndex]);

    let lines = [];
    const firstEmptyIndex = guesses.findIndex((g) => g === null);

    guesses.map ((guess,i) => {
        let tileBorderColor = 'black';
        if(gameResult === 'won' && i === (firstEmptyIndex - 1))
        {
            tileBorderColor = 'green';
        }
        else if (shakeRowIndex === i)
        {
            tileBorderColor = 'red';
        }
        lines.push(
            <Line 
                key={i} 
                guess={i === firstEmptyIndex ? currentGuess : guess} 
                solution={solution}
                isFinal={i !== firstEmptyIndex && guess !== null}
                doShake={shakeRowIndex === i}
                borderColor={tileBorderColor}
            />
        )
    });

    return (
        <div className="linesContainer"> {lines} </div>
    )  
}

export default App;
