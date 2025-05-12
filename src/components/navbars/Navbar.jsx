
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/img/logoalmacenadora.webp";
import { useUserDetails } from "../../shared/hooks";

const NavLogo = () => (
    <div className="nav-logo-container">
        <Link to="/">
            <img
                className="nav-logo"
                width="100%"
                height="100%"
                src={logo}
                alt="Logo Almaceadora"
            />
        </Link>
    </div>
);

const NavButton = ({ text, onClickHandler, to }) => {
    if (to) {
        return (
            <Link className="nav-button" to={to}>
                {text}
            </Link>
        );
    }
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    );
};

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const navigate = useNavigate();

    const handleNavigate = path => () => navigate(path);

    return (
        <div className="nav-container">
            <NavLogo />
            <div className="nav-buttons-container">
                {!isLogged ? (
                    <>
                        <NavButton text="Inicio" to="/" />
                        <NavButton text="Login" to="/auth" />
                    </>
                ) : (
                    <>
                        <NavButton text="Dashboard" to="/dashboard" />
                        <NavButton text="Categories" to="/categories" />
                        <NavButton text="Clients" to="/clients" />
                        <NavButton text="History" to="/history" />
                        <NavButton text="Movements" to="/movements" />
                        <NavButton text="Products" to="/products" />
                        <NavButton text="Providers" to="/providers" />
                        <NavButton text="Suppliers" to="/suppliers" />
                        <NavButton text="My Account" to="/settings" />
                        <NavButton text="Logout" onClickHandler={logout} />
                    </>
                )}
            </div>
        </div>
    );
};
