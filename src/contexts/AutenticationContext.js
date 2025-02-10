import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// AuthContext létrehozása, hogy mindenhol elérhető legyen az auth információ
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext); // Visszaadja az AuthContext-ből a hozzáférési adatokat
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // Inicializáljuk a currentUser-t null-ra

    // A regisztrációs függvény, amely a Firebase-ben hozza létre a felhasználót
    async function signup(email, password) {
        try {
            console.log("Creating user with:", email, password); // Kiírjuk, hogy milyen emailt és jelszót próbálunk
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", userCredential); // Kiírjuk a sikeres regisztráció eredményét
            return userCredential;
        } catch (error) {
            console.error("Signup error:", error); // Ha hiba történt, azt is kiírjuk
            throw error;
        }
    }

    // Az auth állapot figyelése (bejelentkezett felhasználó)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user); // Kiírjuk, hogy mi történt a felhasználóval
            setCurrentUser(user); // Beállítjuk a currentUser-t a bejelentkezett felhasználóra
        });

        return () => unsubscribe(); // A figyelőt leállítjuk, amikor a komponens eltűnik
    }, []);

    const value = {
        currentUser, // Jelenlegi felhasználó elérhetősége
        signup // A regisztrációs funkció elérhetősége
    };

    return (
        <AuthContext.Provider value={value}>
            {children} {/* Az AuthContext-t biztosítjuk a gyerek komponenseknek */}
        </AuthContext.Provider>
    );
}
