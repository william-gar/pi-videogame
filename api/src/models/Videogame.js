const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      description: {
        types: DataTypes.STRING(500),
        allowNull: false,
      },

      released: {
        types: DataTypes.STRING(10),
      },

      rating: {
        types: DataTypes.FLOAT,
      },

      platforms: {
        types: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      image: {
        types: DataTypes.STRING,
      },

      createdInDb: {
        types: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
