import PitchesInfo from "./PitchesInfo"
import styles from './Pitches.module.css'
const Pitches = (props) => {
    return (
        <div class={`${styles.pitch__card} text-center justify-content-center d-flex flex-column align-items-center`}>
            <div class={`${styles.image__container} d-flex align-items-center justify-content-center`}><img className="pitch__img" src={props.image}></img></div>
            <div className={`${styles.pitch__name} mt-4`}>{props.name}</div>
            <div className={`${styles.pitch__description} mt-2`}>{props.description}</div>
        </div>
    )
}

export default Pitches;
