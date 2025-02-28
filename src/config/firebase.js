import admin from "firebase-admin";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

// Obtener la ruta del archivo de credenciales desde el .env
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountPath) {
  throw new Error("❌ Falta la variable FIREBASE_SERVICE_ACCOUNT en .env");
}

// Leer el archivo JSON con las credenciales de Firebase
const serviceAccount = JSON.parse(serviceAccountPath);

// Inicializar Firebase Admin si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// Instancia de Firestore
const db = admin.firestore();
export { db };
