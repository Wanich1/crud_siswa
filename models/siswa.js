const Sequelize = require("sequelize");
const db = require("../config/db");

const siswa = db.define(
    "siswa",
    {
        nis: { type: Sequelize.STRING },
        nama_siswa: { type: Sequelize.STRING },
        jenis_kelamin: { type: Sequelize.STRING },
        telepon: { type: Sequelize.STRING },
        alamat: { type: Sequelize.STRING }
    },
    {
        freezeTableName: true
    }
);

module.exports = siswa;