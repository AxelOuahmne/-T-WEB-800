
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext); // Correct usage of useContext

    const signup = async (nom, prenom, email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, email, password })
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
    return { signup, isLoading, error };
}
