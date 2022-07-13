import styles from './Pitch.module.css';
import Pitches from './Pitches';
import PitchesInfo from "./PitchesInfo"
const Pitch = () => {
    return (
        <div className={`p-3 ${styles.pitch__container}`}>
            <div className={`${styles.pitch__question} text-center`}>Why use tat.cx?</div>
            <div className={`d-flex justify-content-center ${styles.pitch__collection}`}>
                <Pitches name={PitchesInfo[0].name} description={PitchesInfo[0].description} image={PitchesInfo[0].image} />
                <Pitches name={PitchesInfo[1].name} description={PitchesInfo[1].description} image={PitchesInfo[1].image} />
                <Pitches name={PitchesInfo[2].name} description={PitchesInfo[2].description} image={PitchesInfo[2].image} />
            </div>
        </div>
    )
}

export default Pitch;
