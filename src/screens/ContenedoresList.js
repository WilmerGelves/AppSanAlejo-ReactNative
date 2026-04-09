import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../database/db';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ContenedoresList({ navigation }) {

  const [contenedores, setContenedores] = useState([]);

  const cargarContenedores = () => {
    const result = db.getAllSync("SELECT * FROM contenedor;");
    setContenedores(result);
  };
  const eliminarContenedor = (id) => {
    Alert.alert(
      "Confirmar",
      "¿Eliminar este contenedor?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          onPress: () => {
            db.runSync("DELETE FROM contenedor WHERE id = ?;", [id]);
            cargarContenedores();
          }
        }
      ]
    );
  };

  useFocusEffect(
  useCallback(() => {
    cargarContenedores();
  }, [])
);

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Button title="Agregar Contenedor" onPress={() => navigation.navigate('FormContenedor')} />

      {contenedores.length === 0 ? (
        <Text>No existen contenedores</Text>
      ) : (
        <FlatList
          data={contenedores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 }}>
              
              <TouchableOpacity
                onPress={() => navigation.navigate('Detalle', { contenedor: item })}
              >
                <Text style={{ fontSize: 18 }}>{item.nombre}</Text>
                <Text>{item.ubicacion}</Text>
              </TouchableOpacity>

              {/* BOTONES */}
              <View style={{ flexDirection: 'row', marginTop: 5 }}>

                {/* EDITAR */}
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="blue"
                  onPress={() => navigation.navigate('FormContenedor', { contenedor: item })}
                />

                {/* ELIMINAR */}
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="red"
                  style={{ marginLeft: 15 }}
                  onPress={() => eliminarContenedor(item.id)}
                />

              </View>
            </View>
          )}
        />
      )}
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
    marginBottom: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#777',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});