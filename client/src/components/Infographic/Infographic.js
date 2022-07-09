import infographic from '../../assets/img/infographic.png'
import InfographicLeft from './InfographicLeft';
import './Infographic.css';

const Infographic = () => {
    return (
        <div className="infographic__container container">
            <div className="row">
                <div className="infographic__description col-lg-6"><InfographicLeft /></div>
                <div className="infographic__image col-lg-6 text-center"><img src={infographic} className="img-fluid" alt="header drawing"></img></div>
            </div>
        </div>
    )
}

export default Infographic;