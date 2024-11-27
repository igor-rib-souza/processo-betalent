import { Employee } from "../types";

export const fetchEmployees = async (): Promise<Employee[]> => {  
    try {
      const response = await fetch("http://10.0.2.2:3000/employees");
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Erro ao buscar dados da API");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      throw error;
    }
  };
  