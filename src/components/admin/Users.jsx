import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import "./AdminPanel.css";

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get(`${baseUrl}/api/user`)
      .then((response) => {
        console.log(response);
        let temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setUsers(temp);
      })
      .catch((err) => {
        console.log(err);
      })
  };


  const handleDelete= async (id)=>{
    alert("Delete this user?");
  console.log(id); 
  
      alert("User Deleted successfully");
      const response = await axios.post(
        `${baseUrl}/api/user/${id}`
      );
      console.log(JSON.stringify(response));
  }

  return (
    <div className="adminUserContainer">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Name</td>
              <td>Email</td>
              <td>Address</td>
              <td>Role</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <td className="productId">{i + 1}</td>
                  <td className="productTitle">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>

                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={()=>handleDelete(user._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
};

export default Users;
