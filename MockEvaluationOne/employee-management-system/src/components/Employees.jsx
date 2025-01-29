import {useState,useEffect} from "react";
// import axios from "axios";
import { AddEmployee } from "./AddEmployee";
import "../styles/employees.css";

export const Employess =()=>{
    const [employees, setEmployees] = useState([]);
    
    useEffect(()=>{
        getEmployees();
    },[]);
    const getEmployees = async ()=>{
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        setEmployees(data);
    }
    const handleCategory =(event)=>{
        const category = event.target.value;
        if(category==='All'){
            getEmployees();
        }else{
            const filteredEmployees = employees.filter(employee=>employee.department===category);
            setEmployees(filteredEmployees);
        }
    }
    const handleDelete =(id)=>{
        fetch("http://localhost:3000/employees/id",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({id:1})
        });
        setEmployees(employees.filter(employee=>employee.id!==id));
    }
        console.log(employees,"delete")

    return (
      <div className="eployeePage">
        <h1 style={{color:"teal"}}>Employees</h1>
        {employees.length === 0 && <p>Loading...</p>}
        <select onChange={handleCategory}>
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
        </select>

        <div className="employees">
          {employees.map((employee) => (
            <div key={employee.id}>
              <h2>{employee.name}</h2>
              <p>{employee.designation}</p>
              <p>{employee.department}</p>
              <button onClick={()=>handleDelete(employee.id)}>Delete</button>
            </div>
          ))}
        </div>
        <AddEmployee />
      </div>
    );
}