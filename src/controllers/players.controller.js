import { db } from "../config/firebase.js";

export const addPlayer = async (req, res) => {
  try {
    
    const {name,lastname,weight, height, birthDate, country, position,  fanTeam, idType,  documentNumber,email,sedePlayer, categoryPlayer,schoolId} = req.body; 
     
    const querySnapshot = await db.collection("players").where("documentNumber", "==", documentNumber).get();
    if (!querySnapshot.empty) {
        return res.status(401).json({ error: "El jugador ya está registrado en el sistema." });                        
    }

    const playerRef = await db.collection("players").add({
        name, lastname, weight, height, birthDate, country, position,
        fanTeam, idType, documentNumber, email, sede:sedePlayer,categoria:categoryPlayer, schoolId,
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

      const { playerId } = req.params; 
      const {playerData } = req.body; 
      console.log(playerId, playerData)


      if (!playerId) {
        return res.status(400).json({ error: "El ID del jugador es requerido" });
      }

      const playerRef = db.collection("players").doc(playerId);
      const playerDoc = await playerRef.get();

      if (!playerDoc.exists) {
        return res.status(404).json({ error: "Jugador no encontrado." });
      }

      await playerRef.update(playerData);
      res.status(201).json({ message: "Jugador actualizado con éxito" });

    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: "Error al actualizar  jugador: "+ error });
    }
  }

  export const deletePlayer = async (req, res) => {
    try {
      const { id } = req.query; 
     console.log(id)
    if (!id) {
      return res.status(400).json({ error: "El ID del jugador es requerido." });
    }

    const playerRef = db.collection("players").doc(id);
    const playerDoc = await playerRef.get();

    if (!playerDoc.exists) {
      return res.status(404).json({ error: "Jugador no encontrado." });
    }

    await playerRef.delete();

    res.status(200).json({ message: "Jugador eliminado exitosamente." });

  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al eliminar jugador: " + error });
    }
  };

  export const readPlayerById = async (req, res) => {
    try {
      const { playerId } = req.params;

      if (!playerId) {
        return res.status(400).json({ error: "playerId es requerido" });
      }    

      const playerRef = db.collection("players").doc(playerId);
      const playerDoc = await playerRef.get();
      if (!playerDoc.exists) {
        return res.status(404).json({ error: "Jugador no encontrado." });
      }

      res.status(200).json(playerDoc.data());



    } catch (error) {
      console.error("Error al obtener jugadores:", error);
      res.status(500).json({ error: "Error al obtener jugadores: " + error.message });
    }
  };


  export const readPlayers = async (req, res) => {
    try {
      const { schoolId } = req.params; // Obtiene schoolId desde los parámetros de la URL
  
      if (!schoolId) {
        return res.status(400).json({ error: "schoolId es requerido" });
      }
  
      const querySnapshot = await db.collection("players").where("schoolId", "==", schoolId).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ message: "No se encontraron jugadores para esta escuela" });
      }
  
      const players = [];
      querySnapshot.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(players);
    } catch (error) {
      console.error("Error al obtener jugadores:", error);
      res.status(500).json({ error: "Error al obtener jugadores: " + error.message });
    }
  };
  
