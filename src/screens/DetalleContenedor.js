import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import db from '../database/db';

export default function DetalleContenedor({ route, navigation }) {

  const { contenedor } = route.params;
  const [objetos, setObjetos] = useState([]);

  const cargarObjetos = () => {
    const result = db.getAllSync(
      "SELECT * FROM objeto WHERE id_contenedor = ?;",
      [contenedor.id]
    );
    setObjetos(result);
  };

  useFocusEffect(
    useCallback(() => {
      cargarObjetos();
    }, [])
  );

  const eliminarObjeto = (id) => {
    Alert.alert("Confirmar", "¿Eliminar objeto?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: () => {
          db.runSync("DELETE FROM objeto WHERE id = ?;", [id]);
          cargarObjetos();
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>{contenedor.nombre}</Text>
        <Text>{contenedor.descripcion}</Text>
        <Text style={styles.location}>{contenedor.ubicacion}</Text>
      </View>

      <FlatList
        data={objetos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Sin objetos</Text>}
        renderItem={({ item }) => (
          <View style={styles.objCard}>
            <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>

            <View style={styles.actions}>
              <MaterialIcons
                name="edit"
                size={22}
                color="#2196F3"
                onPress={() => navigation.navigate('FormObjeto', {
                  objeto: item,
                  id_contenedor: contenedor.id
                })}
              />
              <MaterialIcons
                name="delete"
                size={22}
                color="#F44336"
                onPress={() => eliminarObjeto(item.id)}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormObjeto', { id_contenedor: contenedor.id })}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#777',
    marginTop: 5,
  },
  objCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    gap: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});