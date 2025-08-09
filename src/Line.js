import './Line.css';

const WORD_LENGTH = 5;

function Line (){
    const tiles = []
    for (let i=0; i < WORD_LENGTH; i++)
    {
        tiles.push(<div key={i} className='tile'></div>)
    }
    return (
        <div className='line'> {tiles} </div>
    )
}

export default Line;
