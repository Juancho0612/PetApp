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
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://192.168.56.1:5173",
  methods: ["POST", "GET"],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.status(200).send(users);
});
app.get("/user/:id", async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.status(200).send(user);
});
app.get("/user/:email/:password", async (req, res) => {
  const user = await getUserByEmailAndPassword(
    req.params.email,
    req.params.password
  );
  res.status(200).send(user);
});
app.get("/user/:email", async (req, res) => {
  const user = await getUserByEmail(req.params.email);
  res.status(200).send(user);
});
app.get("/user/:number", async (req, res) => {
    const user = await getUserByNumber(req.params.number);
    res.status(200).send(user);
  });
app.post("/user", async (req,res) => {
    const {name, email, number, password, type}=req.body;

    const existingUserEmail = await getUserByEmail(email);
    const existingUserNumber = await getUserByNumber(number);
    if (existingUserEmail) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
    }else if(existingUserNumber){
        return res.status(400).json({ error: 'El numero ya está en uso.' });
    }
    const user = await createUser(name, email, number, password, type);
    res.status(201).send(user);
});
app.get("/pets", async (req, res) => {
  const pets = await getPets();
  res.status(200).send(pets);
});
app.listen(8080, () => {
  console.log("Server running on port 8080");
});