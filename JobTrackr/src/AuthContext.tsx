import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
    id: number;
    email: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    loaded: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`${apiBaseUrl}/id`, { credentials: "include" })
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                setUser(data);
                setLoaded(true);
            })
            .catch(() => setLoaded(true));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loaded }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
