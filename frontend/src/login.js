import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./loginValidation";
import axios from "axios";
function Login(){
      const [values,setValues] =useState({
        email:'',
        password:''
      })
    const navigate = useNavigate();
      const [errors,setErrors] = useState([]) 
      const handleInput =(event) =>{
         setValues((prev) =>({...prev,[event.target.name]:[event.target.value]}))
      }       
     
     
    const handleSubmit =(event) =>{
         event.preventDefault();
         const validationErrors = Validation(values);
         setErrors(validationErrors);
         if (!validationErrors.email && !validationErrors.password) {
            axios
              .post("http://localhost:8081/login", values)
              .then((res) => {
                if(res.data === "Success"){
                navigate("/home");
                }else{
                  alert("No record existed");
                }
              })
              .catch((err) => console.log(err));
          }
    }

    return(
        <form action="" onSubmit={handleSubmit}>
        <div className="register">  
            <h1>Login page</h1> 
              <label htmlFor="email">email</label>
              <input type="email" id="email" placeholder="email" onChange={handleInput} name="email" autoComplete="email"/>
              {errors.email && <span>{errors.email}</span>}
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="password" onChange={handleInput} name="password"autoComplete="password" />
              {errors.password && <span>{errors.password}</span>}
                <button type="submit">Login</button>
                <Link to ='/signup' id="link">Create Account</Link>
        </div>
    </form>
    )
}

export default Login;