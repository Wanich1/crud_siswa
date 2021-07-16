const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("respon berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);

const siswa = require("./models/siswa");

app.post("/crud", async (req, res) => {
    try {
        const { nis, nama_siswa, jenis_kelamin, telepon, alamat } = req.body;
        const newSiswa = new siswa({
            nis, nama_siswa, jenis_kelamin, telepon, alamat
        })

        await newSiswa.save();

        res.json(newSiswa);
    }
    catch (err) {
        console.error(err.message);
        res.status(3000).send("ada yang eror");
    }
});

app.get("/crud", async (req, res) => {
    try {
        const getAllSiswa = await siswa.findAll({});

        res.json(getAllSiswa)
    } catch (err) {
        console.error(err.message);
        res.status(3000).send("ada yang eror");
    }
});

app.get("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id
        
        const getSiswa = await siswa.findOne({
            where: { id: id }
        });

        res.json(getSiswa)
    } catch (err) {
        console.error(err.message);
        res.status(3000).send("ada yang eror");
    }
});

app.delete("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleteSiswa = await siswa.destroy({
            where: { id: id }
        })

        await deleteSiswa;

        res.json("terhapus gan");

    } catch (err) {
        console.error(err.message);
        res.status(3000).send("ada yang eror");
    }
});

app.put("/crud/:id", async (req, res) =>{
    try {
        const { nis, nama_siswa, jenis_kelamin, telepon, alamat } = req.body;
        const id = req.params.id;

        const updateSiswa = await siswa.update({
            nis, nama_siswa, jenis_kelamin, telepon, alamat
        },
            { where: { id: id } }
        );
        
        await updateSiswa;

        res.json("mantab gan");
    } catch (err) {
        console.error(err.message);
        res.status(3000).send("ada yang eror");
    }
})

app.listen(3000, () => console.log("port berjalan di 3000"));