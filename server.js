const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// carpeta uploads
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// configuración multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// servir frontend
app.use(express.static("public"));

// servir canciones
app.use("/music", express.static(uploadPath));

// subir canción
app.post("/upload", upload.single("song"), (req, res) => {
    res.json({ message: "Canción subida", file: req.file.filename });
});

// listar canciones
app.get("/songs", (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) return res.status(500).send("Error");
        res.json(files);
    });
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});