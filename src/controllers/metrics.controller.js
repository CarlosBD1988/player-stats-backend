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


export const readMetricByPlayer = async (req, res) => {
    try 
    {
      const { playerId } = req.params;
      if (!playerId) {
        return res.status(400).json({ error: "El playerId es requerido." });
      }

      const playerStatsRef = db.collection("playerStats");
      const querySnapshot = await playerStatsRef.where("playerId", "==", playerId).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ message: "No se encontraron métricas para este jugador." });
      }

      const metrics = [];
      querySnapshot.forEach((doc) => {
        metrics.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(metrics);



  
    }
    catch(error){
          console.log(error)
          res.status(500).json({ error: "Error al obtener métricas: " + error.message });
    }
  }