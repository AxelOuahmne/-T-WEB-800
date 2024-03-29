
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext); // Correct usage of useContext

    const login = async ( email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password })
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    }
    return { login, isLoading, error };
}
