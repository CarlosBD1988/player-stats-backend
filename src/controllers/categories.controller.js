import { db } from "../config/firebase.js";

export const addCategories = async (req, res) => {
    try {

        const { categories, schoolId } = req.body;

        if (!schoolId || !categories || !Array.isArray(categories)) {
            return res.status(400).json({ error: "Datos inválidos" });
        }
        const batch = db.batch();

        categories.forEach((category) => {
            const docRef = db.collection("categories").doc();
            batch.set(docRef, { ...category, schoolId, createdAt: new Date() });
          });      
          await batch.commit();
          res.status(201).json({ message: "Categorias creadas exitosamente" });
    }
     catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar las categorias." });
  }
};