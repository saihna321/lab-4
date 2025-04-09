import { useState, useEffect } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
            setLoading(false); 
        };

        checkUser();
        window.addEventListener("storage", checkUser);

        return () => {
            window.removeEventListener("storage", checkUser);
        };
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return { user, loading, login, logout }; 
};
