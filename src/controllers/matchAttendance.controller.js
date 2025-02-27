import { db } from "../config/firebase.js";

export const addAssistance = async (req, res) => {
    try 
    {        
        const itemId = "uKOAjjzOB6szDTkF9e0r"; 
        const {schoolId,responsableRegister,selectedPlayers} = req.body;    

        if (!selectedPlayers || !schoolId || !Array.isArray(selectedPlayers)) {
            return res.status(400).json({ error: "Datos inválidos" });
        }       
        const batch = db.batch();
        selectedPlayers.forEach((player) => {           
            const recordRef = db.collection("records").doc();
            batch.set(recordRef, {
                itemId,
                playerId:player.playerId,
                schoolId, 
                value:1,
                date: new Date() });

            const auditoriaRef = db.collection("audit").doc();
            batch.set(auditoriaRef, {
                user: responsableRegister,
                action: "new record",
                playerId:player.playerId,
                itemId: itemId,
                schoolId, 
                value: 1,
                date: new Date().toISOString(),});
          });      
          await batch.commit();

          res.status(201).json({ message: "Registro de asistencia guardados exitosamente." });            
        
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar la asistencia a partidos." });
  }
};