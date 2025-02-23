import { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken]  = useState<string | null>(() => localStorage.getItem("authToken"));

    useEffect(() =>{
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };
    
    return (
        <AuthContext.Provider value ={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

//export { AuthContext, AuthProvider };
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}