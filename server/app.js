import express from "express";
import {
  getUserByID,
  getPetByUserID,
  getUserByEmailAndPassword,
  getUserByEmail,
  getUsers,
  createUser,
  getPets,
  getUserByNumber,
  updateUserLocation,
  updateUserOnlineStatus,
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET"],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.status(200).send(users);
});
app.get("/user/:id", async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.status(200).send(user);
});


app.get("/user/:email/:password", async (req, res) => {
  
  try {
    const user = await getUserByEmailAndPassword(
      req.params.email,
      req.params.password
    );
    console.log(user)
    res.status(200).send(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
  
});

app.get("/user/:email", async (req, res) => {
  const user = await getUserByEmail(req.params.email);
  console.log(user)
  res.status(200).send(user);
});

app.get("/user/:number", async (req, res) => {
  const user = await getUserByNumber(req.params.number);
  res.status(200).send(user);
});

app.post("/user", async (req, res) => {
  const { name, email, number, password, type } = req.body;

  const existingUserEmail = await getUserByEmail(email);
  const existingUserNumber = await getUserByNumber(number);
  if (existingUserEmail) {
    return res
      .status(400)
      .json({ error: "El correo electrónico ya está en uso." });
  } else if (existingUserNumber) {
    return res.status(400).json({ error: "El numero ya está en uso." });
  }
  try {
    const user = await createUser(name, email, number, password, type);
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});
app.get("/pets", async (req, res) => {
  const pets = await getPets();
  res.status(200).send(pets);
});
app.put("/user/onlineStatus", async (req, res) => {
  const { userId,onlineStatus } = req.body;
  console.log(onlineStatus)
  try {
    await updateUserOnlineStatus(userId, onlineStatus);
    res.status(200).send({ message: "Estado de conexión del usuario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el estado de conexión del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar el estado de conexión del usuario." });
  }
});
app.put("/user/:id/location", async (req, res) => {
  const userID = req.params.id;
  const { latitude, longitude } = req.body;

  try {
    await updateUserLocation(userID, latitude, longitude);
    res.status(200).send({ message: "Ubicación del usuario actualizada correctamente." });
  } catch (error) {
    console.error("Error al actualizar la ubicación del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar la ubicación del usuario." });
  }
});
app.listen(8080, () => {
  console.log("Server running on port 8080");
});

