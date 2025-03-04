import { db } from "../config/firebase.js";

export const readSchools = async (req, res) => {
    try {     
      
      const querySnapshot = await db.collection("Schools").get();  
      if (querySnapshot.empty) {
        return res.status(404).json({ message: "No se encontraron escuelas resgitradas en el sistema." });
      }  
      const schools = [];
      querySnapshot.forEach((doc) => {
        schools.push({ id: doc.id, ...doc.data() });
      });  
      res.status(200).json(schools);

    } catch (error) {
      console.error("Error al obtener escuelas:", error);
      res.status(500).json({ error: "Error al obtener escuelas: " + error.message });
    }
  };