import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Importez useNavigate depuis react-router-dom

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
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
            navigate('/vols'); // Redirigez l'utilisateur vers la page /vols après la connexion réussie
        }
    }

    return { login, isLoading, error };
}
