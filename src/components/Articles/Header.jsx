import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <Link to="/login" className="button is-primary">
                Login
            </Link>
        </header>
    );
}

export default Header;