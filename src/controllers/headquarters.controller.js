import { db } from "../config/firebase.js";

export const addHeadquarters = async (req, res) => {
  try {
    const { branches, schoolId } = req.body;

    if (!schoolId || !branches || !Array.isArray(branches)) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    const batch = db.batch();

    branches.forEach((branch) => {
      const docRef = db.collection("sedes").doc();
      batch.set(docRef, { ...branch, schoolId, createdAt: new Date() });
    });

    await batch.commit();

    res.status(201).json({ message: "Sedes guardadas exitosamente" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al guardar las sedes" });
  }
};
