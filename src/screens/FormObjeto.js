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

export default function FormObjeto({ route, navigation }) {

  const { id_contenedor } = route.params;
  const objeto = route?.params?.objeto;

  const [nombre, setNombre] = useState(objeto?.nombre || '');
  const [descripcion, setDescripcion] = useState(objeto?.descripcion || '');

  const guardar = () => {
    if (!nombre || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (objeto) {
      // ACTUALIZAR
      db.runSync(
        "UPDATE objeto SET nombre=?, descripcion=? WHERE id=?;",
        [nombre, descripcion, objeto.id]
      );
    } else {
      //CREAR
      db.runSync(
        "INSERT INTO objeto (nombre, descripcion, id_contenedor) VALUES (?, ?, ?);",
        [nombre, descripcion, id_contenedor]
      );
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Cable HDMI"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ej: Cable de 2 metros"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>
          {objeto ? "Actualizar" : "Guardar"}
        </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});