import './Line.css';
import { WORD_LENGTH } from './App';

const countOccurance = (word, searchLetter) => {
  if (!word || typeof word !== 'string') return 0;
  return word.split('').filter(letter => letter.toLowerCase() === searchLetter.toLowerCase()).length;
};


const Line = ( {guess, solution='', isFinal} ) => {
    const tiles = []
    for (let i=0; i < WORD_LENGTH; i++) {
        let color = 'white';
        if (!isFinal) color = 'white';
        else if (guess[i].toLowerCase() === solution[i].toLowerCase()) color = 'green';
        else {
            const filteredSolution = solution.split('').filter((letter, i) => (letter !== guess[i]));
            if(filteredSolution.includes(guess[i]?.toLowerCase()) && countOccurance(guess.substring(0,i+1), guess[i]) <= countOccurance(solution, guess[i])) color = 'yellow';
            else color = 'red';
        }
        tiles.push(
            <div key={i} className='tile' style={{ '--tile-color': color }}>
                {guess ? guess[i] || '' : ''}
            </div>          
        )
    }
    return (
        <div className='line'> {tiles} </div>
    )
};

export default Line;
