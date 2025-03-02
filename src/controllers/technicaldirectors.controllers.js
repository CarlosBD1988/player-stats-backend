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
            const { password, ...directorData } = director;
            
            batch.set(docRef, { ...directorData, schoolId, createdAt: new Date() });

            const docUserRef = db.collection("Users").doc();
            batch.set(docUserRef, { 
              email:director.email,
              name: director.firstName,
              lastname: director.lastName,
              role: "tecnico",
              password: director.password,
              schoolId, 
              createdAt: new Date() });



          });      
          await batch.commit();
          res.status(201).json({ message: "Tecnicos y usuarios creadas exitosamente." });


    }
    catch(error){
      console.log(error)
          res.status(500).json({ error: "Error al crear nuevo tecnico: "+ error });
    }
  }