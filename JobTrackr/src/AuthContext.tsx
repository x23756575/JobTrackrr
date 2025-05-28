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
    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/id", { credentials: "include" })
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
