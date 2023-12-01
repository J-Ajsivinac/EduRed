import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used wihin an AuthProvider")
    return context
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data.data)
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error.response.data.message)
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            // console.log("sigini", res.data)
            setUser(res.data)
            setIsAuthenticated(true);
            console.log("Cokies MRD", Cookies.get())
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    useEffect(() => {
        console.log(errors.length)
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors])


    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            // console.log(cookies)
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                // console.log(res.data);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                isAuthenticated,
                errors,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;