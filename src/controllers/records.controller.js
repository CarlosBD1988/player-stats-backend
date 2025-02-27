import { db } from "../config/firebase.js";

export const addRecord = async (req, res) => {
    try 
    {
        const {playerId,itemId , value,schoolId,username} = req.body;
        
        if (!playerId || !itemId || !schoolId || !value || !username) {
            return res.status(400).json({ error: "Datos inválidos" });
        }       
        const recordRef = await db.collection("records").add({
            playerId, 
            itemId, 
            value:parseInt(value), 
            schoolId,          
            date: new Date(),
        });     

        const auditRef = await db.collection("audit").add({
            user: username,
            action: "new record",
            playerId, 
            itemId, 
            value:parseInt(value), 
            schoolId,     
            date: new Date().toISOString()
        }); 
             
        res.status(201).json({ message: "Estadistica  almacenada exitosamente" });
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar la estadistica, Error: "+ error });
  }
};

export const addMultiplesRecords = async (req, res) => {
    try {


        const {playerId, stats, schoolId,username} = req.body;
        if (!playerId || !Array.isArray(stats) || !stats || !schoolId || !username) {
            return res.status(400).json({ error: "Datos inválidos" });
        }  

        const batch = db.batch();

        stats.forEach((stat) => { 

            const recordRef = db.collection("records").doc();
            batch.set(recordRef, {
                itemId:stat.itemId,
                playerId,
                schoolId, 
                value:stat.value,
                date: new Date() });

            const auditoriaRef = db.collection("audit").doc();
            batch.set(auditoriaRef, {
                user: username,
                action: "new record",
                playerId,
                itemId:stat.itemId,
                schoolId, 
                value: stat.value,
                date: new Date().toISOString(),});
        });
   
        await batch.commit();
             
        res.status(201).json({ message: "Estadisticas  almacenadas exitosamente" });
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar las estadisticas, Error: "+ error });
  }
};