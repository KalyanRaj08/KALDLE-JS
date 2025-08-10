import './Line.css';
import { WORD_LENGTH } from './App';

function Line ( {guess, solution='', isFinal} ){
    const tiles = []
    for (let i=0; i < WORD_LENGTH; i++) {
        let color = 'white';
        if (!isFinal) color = 'white';
        else if (guess[i].toLowerCase() === solution[i].toLowerCase()) color = 'green';
        else if (solution.includes(guess[i]?.toLowerCase())) color = 'yellow';
        else color = 'red';
        tiles.push(
            <div key={i} className='tile' style={{ '--tile-color': color }}>
                {guess ? guess[i] || '' : ''}
            </div>          
        )
    }
    return (
        <div className='line'> {tiles} </div>
    )
}

export default Line;
