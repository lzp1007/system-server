const sequelize = require("./db.js");
const { DataTypes } = require("sequelize");

const Score = sequelize.define("Score", {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true
});


module.exports = Score;