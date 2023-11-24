import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Publications() {
    const { logout } = useAuth();
    return (
        <div>Publications<br />
            <Link to="/" onClick={() => logout()}>
                Logout
            </Link>
        </div>
    )
}

export default Publications