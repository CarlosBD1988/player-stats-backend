import { db } from "../config/firebase.js";

export const addPlayer = async (req, res) => {
  try {
    
    const {name,lastname,weight, height, birthDate, country, position,  fanTeam, idType,  documentNumber,email, schoolId} = req.body; 
     
    const querySnapshot = await db.collection("players").where("documentNumber", "==", documentNumber).get();
    if (!querySnapshot.empty) {
        return res.status(401).json({ error: "El jugador ya está registrado en el sistema." });                        
    }

    const playerRef = await db.collection("players").add({
        name, lastname, weight, height, birthDate, country, position,
        fanTeam, idType, documentNumber, email, schoolId,
        createdAt: new Date(),
    });       

    res.status(201).json({ message: "Jugador creado exitosamente.", id: playerRef.id  });

  }
  catch(error){
    console.log(error)
        res.status(500).json({ error: "Error al crear nuevo jugador: "+ error });
  }
}


export const updatePlayer = async (req, res) => {
    try {
        res.status(201).json({ message: "metodo no implementado." });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: "Error al actualizar  jugador: "+ error });
    }
  }

  export const deletePlayer = async (req, res) => {
    try {
        const { documentNumber } = req.query; 
  
      // Buscar al jugador por el número de documento
      const querySnapshot = await db.collection("players").where("documentNumber", "==", documentNumber).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ error: "Jugador no encontrado." });
      }
  
      // Eliminar todos los documentos encontrados (aunque debería haber solo uno)
      const batch = db.batch();
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
  
      res.status(200).json({ message: "Jugador eliminado exitosamente." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al eliminar jugador: " + error });
    }
  };
  