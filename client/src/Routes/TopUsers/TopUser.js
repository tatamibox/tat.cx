import styles from './TopUsers.module.css'
const TopUser = (props) => {
    return (
        <div class={`card ${styles.topUser}`}>
            <img src={props.image} className="topUser cardImage" alt="..." />
            <div class={styles[`card-body`]}>
                <h5 class={`${styles[`card-title`]} ${styles.topUser}`}>#1. <span className={styles.full__name}>{props.fullName}</span></h5>
                <p class="card-text">@{props.username}</p>
                <p class="card-text">total visits: {props.pageVisits}</p>
                <a href={`/${props.username}`} class="btn btn-warning">Visit {props.username}</a>
            </div>
        </div>
    )
}

export default TopUser;