import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import db from '../database/db';

export default function FormContenedor({ route, navigation }) {

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
      db.runSync(
        "UPDATE contenedor SET nombre=?, descripcion=?, ubicacion=? WHERE id=?;",
        [nombre, descripcion, ubicacion, contenedor.id]
      );
    } else {
      db.runSync(
        "INSERT INTO contenedor (nombre, descripcion, ubicacion) VALUES (?, ?, ?);",
        [nombre, descripcion, ubicacion]
      );
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput style={styles.input} value={ubicacion} onChangeText={setUbicacion} />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});