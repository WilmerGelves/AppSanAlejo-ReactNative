import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import db from '../database/db';

export default function FormObjeto({ route, navigation }) {
  const objeto = route?.params?.objeto;
  const { id_contenedor } = route.params;
  
  const [nombre, setNombre] = useState(objeto?.nombre || '');
  const [descripcion, setDescripcion] = useState(objeto?.descripcion || '');

  const guardar = () => {
    if (!nombre || !descripcion) {
      Alert.alert("Error", "Campos obligatorios");
      return;
    }

    if (objeto) {
      // UPDATE
      db.runSync(
        "UPDATE objeto SET nombre=?, descripcion=? WHERE id=?;",
        [nombre, descripcion, objeto.id]
      );
    } else {
      // INSERT
      db.runSync(
        "INSERT INTO objeto (nombre, descripcion, id_contenedor) VALUES (?, ?, ?);",
        [nombre, descripcion, id_contenedor]
      );
    }

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" onChangeText={setNombre} />
      <TextInput placeholder="Descripción" onChangeText={setDescripcion} />

      <Button title="Guardar" onPress={guardar} />
    </View>
  );
}