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

             
        res.status(201).json({ message: "Item creado exitosamente" });
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar las categorias." });
  }
};