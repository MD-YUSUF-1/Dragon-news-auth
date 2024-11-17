import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from './../firebase.init';

export const AuthContext= createContext();
const auth= getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]= useState();
    const [loading,setLoading]= useState(true);

    const createNewUser=(email,pass)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,pass);
    }
    const updateUserProfile = (userProfile) =>{
        return updateProfile(auth.currentUser,userProfile);
    }
    const logInUser=(email,pass)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,pass);
    }
    const logOut =() =>{
        setLoading(true);
        return signOut(auth)
    }
    const authInfo={
        updateUserProfile,
        logInUser,
        logOut,
        createNewUser,
        user,
        setUser,
        loading
    }

    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;