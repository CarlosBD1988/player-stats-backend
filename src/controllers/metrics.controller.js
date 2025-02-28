import { db } from "../config/firebase.js";

export const addMetric = async (req, res) => {
  try {

    const {playerId,stats, schoolId} = req.body; 

    const playerMetricsRef = await db.collection("playerStats").add({
        playerId, stats, schoolId,createdAt: new Date().toISOString(),
    });       

    res.status(201).json({ message: "Metricas registradas exitosamente." });


  }
  catch(error){
    console.log(error)
        res.status(500).json({ error: "Error al crear nuevo jugador: "+ error });
  }
}


export const readMetric = async (req, res) => {
    try {
  
    }
    catch(error){
      console.log(error)
          res.status(500).json({ error: "Error al crear nuevo jugador: "+ error });
    }
  }