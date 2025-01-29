import {useState,useEffect} from "react";
let intialData = {id:"",name:"",designation:"",department:""}
import "../styles/addEmployees.css"
import axios from "axios";
export const AddEmployee =()=>{
    const [formData,setFormData] = useState(intialData);
    const [employeeData,setEmployeeData] = useState([]);
    const [showForm,setShowForm] = useState(false)
    useEffect(()=>{
        axios
          .get("http://localhost:3000/employees")
          .then((response) => setEmployeeData(response.data));
    },[]);

    const handleSubmit=(event)=>{
        event.preventDefault();
        fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
         setEmployeeData(...employeeData,formData);
         setFormData("initialData");        //Add employee logic here
    }
    const handleInputChange=(event)=>{
        const {name,value} = event.target;
        setFormData({...formData,[name]:value})

    }
    const handleShow=()=>{
        setShowForm(!showForm)
    }
    return (
      <>
        <div className="addEmployeeForm">
          <button
            onClick={handleShow}
            style={{ backgroundColor: "teal" }}
          >
            {!showForm ? "Add Employee" : "Close Add Employee Form"}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="ID"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Designation"
              required
            />
            <select onChange={handleInputChange} className="addSelect" required>
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
            </select>
            <button type="submit" className="submit" onClick={handleShow}>
              Add Employee
            </button>
          </form>
        )}
      </>
    );

};
 