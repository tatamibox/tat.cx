import './TopUsers.css'
const TopUser = (props) => {
    return (
        <div class="card topUser">
            <img src={props.image} className="topUser cardImage" alt="..." />
            <div class="card-body">
                <h5 class="topUser card-title">#1. @{props.username}</h5>
                <p class="card-text">total visits: {props.pageVisits}</p>
                <a href="/" class="btn btn-warning">Visit {props.username}</a>
            </div>
        </div>
    )
}

export default TopUser;