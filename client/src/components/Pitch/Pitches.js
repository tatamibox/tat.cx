import PitchesInfo from "./PitchesInfo"
import './Pitches.css'
const Pitches = (props) => {
    return (
        <div class="pitch__card text-center justify-content-center d-flex flex-column align-items-center">
            <div class="image__container d-flex align-items-center justify-content-center"><img className="pitch__img" src={props.image}></img></div>
            <div className="pitch__name mt-4">{props.name}</div>
            <div className="pitch__description mt-2">{props.description}</div>
        </div>
    )
}

export default Pitches;
