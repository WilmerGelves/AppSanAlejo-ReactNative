import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import db from '../database/db';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function DetalleContenedor({ route, navigation }) {

  const { contenedor } = route.params;
  const [objetos, setObjetos] = useState([]);

  const eliminarObjeto = (id) => {
    Alert.alert(
      "Confirmar",
      "¿Eliminar este objeto?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          onPress: () => {
            db.runSync("DELETE FROM objeto WHERE id = ?;", [id]);
            cargarObjetos();
          }
        }
      ]
    );
  };

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

  return (
    <View style={{ padding: 20 }}>

      <Text>{contenedor.nombre}</Text>
      <Text>{contenedor.descripcion}</Text>
      <Text>{contenedor.ubicacion}</Text>

      <Button
        title="Agregar objeto"
        onPress={() => navigation.navigate('FormObjeto', { id_contenedor: contenedor.id })}
      />

      <FlatList
        data={objetos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>

            <Text>{item.nombre} - {item.descripcion}</Text>

            <View style={{ flexDirection: 'row' }}>
              
              {/* EDITAR */}
              <MaterialIcons
                name="edit"
                size={22}
                color="blue"
                onPress={() => navigation.navigate('FormObjeto', {
                  objeto: item,
                  id_contenedor: contenedor.id
                })}
              />

              {/* ELIMINAR */}
              <MaterialIcons
                name="delete"
                size={22}
                color="red"
                style={{ marginLeft: 10 }}
                onPress={() => eliminarObjeto(item.id)}
              />

            </View>

          </View>
        )}
      />
    </View>
  );
}