import styles from './Infographic.module.css'
import infographic from '../../assets/img/infographic.png'
import InfographicLeft from './InfographicLeft';


const Infographic = () => {
    return (
        <div className={`${styles.infographic__container} container`}>
            <div className="row">
                <div className={`${styles.infographic__description} col-lg-6`}><InfographicLeft /></div>
                <div className={`${styles.infographic__image} col-lg-6 text-center`}><img src={infographic} className="img-fluid" alt="header drawing"></img></div>
            </div>
        </div>
    )
}

export default Infographic;