import { db } from "../config/firebase.js";

export const addTechnical = async (req, res) => {
    try {

        const {directors, schoolId} = req.body; 

        if (!schoolId || !directors || !Array.isArray(directors)) {
            return res.status(400).json({ error: "Datos inválidos" });
        }
        const batch = db.batch();

        directors.forEach((director) => {
            const docRef = db.collection("tecnicos").doc();
            batch.set(docRef, { ...director, schoolId, createdAt: new Date() });
          });      
          await batch.commit();
          res.status(201).json({ message: "Tecnicos creadas exitosamente" });


    }
    catch(error){
      console.log(error)
          res.status(500).json({ error: "Error al crear nuevo tecnico: "+ error });
    }
  }