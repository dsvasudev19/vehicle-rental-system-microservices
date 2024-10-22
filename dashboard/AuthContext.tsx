
import { createContext, useState,useContext, useEffect } from "react";
import {axiosInstance} from './axiosInstance'

const AuthContext=createContext<any>(undefined);

export const AuthProvider=({children}:any)=>{

    const [loading,setLoading]=useState<any>(false);
    const [user,setUser]=useState<any>()

    const login=async(data:any)=>{
        try {
            const res=await axiosInstance.post("/auth/login",data)
            if(res.status===200){
                localStorage.setItem("__auth",res.data.token)
            }
        } catch (error:any) {
            throw new Error(error);
        }
    }

    const getUserByToken=async()=>{
        try{
            setLoading(true)
            let header=localStorage.getItem("__auth")
            const res=await axiosInstance.get("/auth/user/token/"+header)
            if(res?.status===200){
                console.log(res.data)
                setUser(res?.data)
                setLoading(false)
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            // window.location.href="/auth/login"
        }
    }

    const logout=()=>{
        try {
            localStorage.removeItem("__auth")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserByToken()
    },[])

    return (
        <AuthContext.Provider value={{loading,user,logout,login}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth=()=>{
    let context=useContext(AuthContext)
    if(context){
        return context;
    }
    throw new Error("Context not found");
}
