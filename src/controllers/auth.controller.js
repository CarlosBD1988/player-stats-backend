import { db } from "../config/firebase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // Buscar usuario en Firestore
    const querySnapshot = await db.collection("Users").where("email", "==", email).get();
    if (querySnapshot.empty) {
      return res.status(401).json({ error: "Usuario no encontrado." });
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    // Verificar la contraseña
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;   
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Obtener el nombre de la escuela
    let schoolName = "Uknow";
    if (user.schoolId) {
      const schoolRef = db.collection("Schools").doc(user.schoolId);
      const schoolSnap = await schoolRef.get();
      if (schoolSnap.exists) {
        schoolName = schoolSnap.data().nameSchool;
      }
    }

    // Generar token JWT
    const token = jwt.sign({ uid: userDoc.id, email: user.email }, "clave_secreta", { expiresIn: "1h" });

    // Enviar respuesta con token y datos del usuario
    res.json({
      message: "Inicio de sesión exitoso",
      user: { ...user, school: schoolName },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};



export const createUser = async (req, res) => {
    try {

        const { email, name,lastname,role,schoolId,password } = req.body;     
        const querySnapshot = await db.collection("Users").where("email", "==", email).get();

        if (!querySnapshot.empty) {
            return res.status(401).json({ error: "El correo electrónico ya está registrado." });                        
        }

        const usersRef = db.collection("Users"); // Referencia a la colección

        await usersRef.add({
        email,
        name,
        lastname,
        role,
        schoolId,
        password,
        createdAt: new Date(),
        });

        res.status(201).json({ message: "Usuario creado exitosamente." });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al crear usuario nuevo." });        
      }
    };