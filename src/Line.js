import './Line.css';
import { WORD_LENGTH, NO_OF_GUESSES } from './App';

function Line ( {guess} ){
    const tiles = []
    for (let i=0; i < WORD_LENGTH; i++) {
        tiles.push(
            <div key={i} className='tile'>
                {guess ? guess[i] || '' : ''}
            </div>          
        )
    }
    return (
        <div className='line'> {tiles} </div>
    )
}

export default Line;
