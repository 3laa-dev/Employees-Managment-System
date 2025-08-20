// context/ManagerContext.js
import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
export const ManagerContext = createContext();

export function ManagerProvider({ children }) {
  const [manager, setManager] = useState(null);
  const [departmentName, setDepartmentName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchManagerData = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const managerId = decoded.id;

        const resManager = await fetch(`http://localhost:3001/api/managers/getManager/${managerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dataManager = await resManager.json();
        if (resManager.ok && dataManager.data && dataManager.data.Manager) {
          const managerData = dataManager.data.Manager;
          setManager(managerData);

          if (managerData.departmentId) {
            const resDept = await fetch(`http://localhost:3001/api/departments/getDepartmentName/${managerData.departmentId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const dataDept = await resDept.json();
            setDepartmentName(dataDept.name || '');
          }
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات المدير:", err);
      }
    };

    fetchManagerData();
  }, []);

  return (
    <ManagerContext.Provider value={{ manager, departmentName }}>
      {children}
    </ManagerContext.Provider>
  );
}
