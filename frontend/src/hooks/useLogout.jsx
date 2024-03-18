import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
 const {dispatch}= useAuthContext();

 const logout =()=>{
  //remove itme 
  localStorage.removeItem('user');

  dispatch({type: "LOGOUT"})
 }
return logout;
}

  
