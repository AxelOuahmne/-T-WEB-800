import { useState } from "react"
import { useSignup } from "../../hooks/useSignup";


const SignUp = () => {
    const [nom,setNom]= useState('');
    const [prenom,setPrenom]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const {signup,isLoading,error}=useSignup();
const handelSubmit = async (e)=>{
    e.preventDefault();
    await signup(nom,prenom,email,password);
}
  return (
  <form className="signup" onSubmit={handelSubmit}>
    <h3>Sign Up</h3>
    <label> Nom : </label>
    <input
     type="text" 
     onChange={(e)=>setNom(e.target.value)}
     value={nom}

    />
        <label> Prenom : </label>
    <input
     type="text" 
     onChange={(e)=>setPrenom(e.target.value)}
     value={prenom}

    />
    <label> Email : </label>
    <input
     type="email" 
     onChange={(e)=>setEmail(e.target.value)}
     value={email}

    />
 <label> Password : </label>
<input
     type="password" 
     onChange={(e)=>setPassword(e.target.value)}
     value={password}

    />
    <button disabled={isLoading}>Sign Up</button>

    {error && <div>{error}</div>}
  </form>
  )
}

export default SignUp
