
import React,{ createContext, useState,useContext, useEffect } from "react";
import {axiosInstance} from './axiosInstance'
const AuthContext=createContext<any>(undefined);

export const AuthProvider=({children}:any)=>{

    const [loading,setLoading]=useState<boolean>(false);
    const [user,setUser]=useState<any>()

    const login=async(data)=>{
        try {
            const res=await axiosInstance.post("/auth/login",data)
            if(res.status===200){
                localStorage.setItem("__auth",res.data.token)
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    const getUserByToken=async()=>{
        try{
            setLoading(true)
            let token=localStorage.getItem("__auth")
            if(token!=null){
                token=JSON.parse(token)
            }
            const res=await axiosInstance.get("/auth/user/token/"+token)
            if(res?.status===200){
                setUser(res?.data)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
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
