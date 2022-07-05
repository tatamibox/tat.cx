
import './Navbar.css'



const NLINav = () => {
    return(
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
    <div class="nav__container container-fluid my-2">
        <a class="navbar-brand brandName" href="/">tat.cx</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                
            </ul>
            <ul class="navbar-nav navbar__ul">
            <li class="nav-item">
                    <a class="nav-link" href="/">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signup">Sign up</a>
                </li>
                <li class="nav-item farRight py-1 px-3">
                    <a class="nav-link" href="/login">Log in</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
)
}

export default NLINav;