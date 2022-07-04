import './Pitch.css';
import Pitches from './Pitches';
import PitchesInfo from "./PitchesInfo"
const Pitch = () => {
return (
    <div className="pitch__container">
    <div className="pitch__question text-center">Why use tat.cx?</div>
    <div className="pitch__collection d-flex justify-content-center">
        <Pitches name={PitchesInfo[0].name} description={PitchesInfo[0].description} image={PitchesInfo[0].image}/>
        <Pitches name={PitchesInfo[1].name} description={PitchesInfo[1].description} image={PitchesInfo[1].image}/>
        <Pitches name={PitchesInfo[0].name} description={PitchesInfo[0].description}/>
        <Pitches name={PitchesInfo[0].name} description={PitchesInfo[0].description}/>
    </div>
    </div>
)
}

export default Pitch;
