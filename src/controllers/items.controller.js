import { db } from "../config/firebase.js";

export const addItem = async (req, res) => {
    try {

        const {name,type, schoolId } = req.body;

        if (!name || !type || !schoolId) {
            return res.status(400).json({ error: "Datos inválidos" });
        }       
        const itemRef = await db.collection("items").add({
            name, type, schoolId,schoolId,createdAt: new Date(),
        });        
        res.status(201).json({ message: "Item creado exitosamente" });
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar las categorias." });
  }
};