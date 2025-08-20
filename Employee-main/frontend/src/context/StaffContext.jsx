import React, { createContext, useContext, useState, useEffect } from "react";

const StaffContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [admins, setAdmins] = useState([]);

  const token = localStorage.getItem("token");

  // ---- Fetch Employees ----
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/Employees/getAllEmployees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEmployees(data.data.Employees);
    } catch (err) {
      console.error("Failed to load employees", err);
    }
  };

  // ---- Fetch Managers ----
  const fetchManagers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/managers/getAllManagers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setManagers(data.data.Managers);
    } catch (err) {
      console.error("Failed to load managers", err);
    }
  };

  // ---- Fetch Departments ----
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/departments/getAllDepatrments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDepartments(data.data.Departments);
    } catch (err) {
      console.error("Failed to load departments", err);
    }
  };
   const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token is missing");
          return;
        }
  
        const res = await fetch('http://localhost:3001/api/admin/getAllAdmins', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await res.json();
        console.log("Fetched admins:", data);
        setAdmins(data.data.admins); // تأكد من أن الاسم الصحيح هنا هو admins
      } catch (err) {
        console.error("فشل في تحميل الإدمنز", err);
      }
    };
  // ---- Load all on mount ----
  useEffect(() => {
    fetchEmployees();
    fetchManagers();
    fetchDepartments();
    fetchAdmins();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        employees,
        managers,
        departments,
        fetchEmployees,
        fetchManagers,
        fetchDepartments,
        fetchAdmins,
        admins,
        setAdmins
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
