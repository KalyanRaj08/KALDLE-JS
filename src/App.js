import './App.css';
import Line from './Line.js';
import { useEffect, useState } from 'react';

export const NO_OF_GUESSES = 6;
export const WORD_LENGTH = 5;

function App () {
    const [wordList, setWordList] = useState ([]);
    const [solution, setSolution] = useState ('');
    const [guesses, setGuesses] = useState(new Array(NO_OF_GUESSES).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect( () => {
        const fetchWord = async () => {
            const wordsList = await fetch ('/assets/5letter-words.json');
            const words = await  wordsList.json();
            const randomWord = await words[Math.floor(Math.random() * words.length)];
            setSolution(randomWord);
            setWordList(words);
        }
        fetchWord();
    }, []);

    useEffect( () => {
        console.log("Solution :: " + solution);
        console.log("WordsList :: " + wordList);
    }, [solution]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(isGameOver) return;
            if (/^[a-zA-Z]$/.test(event.key)) {
                if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess((prev) => prev + event.key.toLowerCase());
                }
            }
            else if (event.key === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1));
            else if (event.key === 'Enter') {
                if (currentGuess.length !== WORD_LENGTH || !wordList.includes(currentGuess?.toLowerCase())) return;
                else if (solution === currentGuess) setIsGameOver(true);
                const newGuesses = [...guesses];
                const firstEmptyIndex = newGuesses.findIndex((g) => g === null);
                if (firstEmptyIndex !== -1) {
                    newGuesses[firstEmptyIndex] = currentGuess;
                    setGuesses(newGuesses);
                    setCurrentGuess('');
                }
                
            }
            else if (currentGuess.length >= WORD_LENGTH) return;
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentGuess, guesses, isGameOver, solution]);

    let lines = [];
    const firstEmptyIndex = guesses.findIndex((g) => g === null);

    guesses.map ((guess,i) => {
        lines.push(
            <Line 
                key={i} 
                guess={i === firstEmptyIndex ? currentGuess : guess} 
                solution={solution}
                isFinal={i !== firstEmptyIndex && guess !== null}
            />
        )
    });

    return (
        <div> {lines} </div>
    )  
}

export default App;
