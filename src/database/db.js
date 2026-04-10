import * as SQLite from 'expo-sqlite';

// Abrir o crear base de datos
const db = SQLite.openDatabaseSync('sanalejo.db');

// Función para inicializar la base de datos
export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS contenedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      ubicacion TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS objeto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      id_contenedor INTEGER NOT NULL,
      FOREIGN KEY (id_contenedor) REFERENCES contenedor(id) ON DELETE CASCADE
    );
  `);

  console.log("Base de datos lista 🚀");
};

//Exportación de la base de datos para usar en otros archivos
export default db;