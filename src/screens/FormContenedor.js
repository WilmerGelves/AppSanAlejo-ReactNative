import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import db from '../database/db';

export default function FormContenedor({ route,navigation }) {
  const contenedor = route?.params?.contenedor;

  const [nombre, setNombre] = useState(contenedor?.nombre || '');
  const [descripcion, setDescripcion] = useState(contenedor?.descripcion || '');
  const [ubicacion, setUbicacion] = useState(contenedor?.ubicacion || '');

const guardar = () => {
  if (!nombre || !descripcion || !ubicacion) {
    Alert.alert("Error", "Todos los campos son obligatorios");
    return;
  }

  if (contenedor) {
    // UPDATE
    db.runSync(
      "UPDATE contenedor SET nombre=?, descripcion=?, ubicacion=? WHERE id=?;",
      [nombre, descripcion, ubicacion, contenedor.id]
    );
  } else {
    // INSERT
    db.runSync(
      "INSERT INTO contenedor (nombre, descripcion, ubicacion) VALUES (?, ?, ?);",
      [nombre, descripcion, ubicacion]
    );
  }

  navigation.goBack();
};

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" onChangeText={setNombre} />
      <TextInput placeholder="Descripción" onChangeText={setDescripcion} />
      <TextInput placeholder="Ubicación" onChangeText={setUbicacion} />

      <Button title="Guardar" onPress={guardar} />
    </View>
  );
}