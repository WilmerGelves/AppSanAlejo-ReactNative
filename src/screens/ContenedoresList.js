import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import db from "../database/db";

export default function ContenedoresList({ navigation }) {
  const [contenedores, setContenedores] = useState([]);

  const cargarContenedores = () => {
    const result = db.getAllSync("SELECT * FROM contenedor;");
    setContenedores(result);
  };

  useFocusEffect(
    useCallback(() => {
      cargarContenedores();
    }, []),
  );

  const eliminarContenedor = (id) => {
    Alert.alert("Confirmar", "¿Eliminar contenedor?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: () => {
          db.runSync("DELETE FROM contenedor WHERE id = ?;", [id]);
          cargarContenedores();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contenedores}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay contenedores</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalle", { contenedor: item })}
          >
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.subtitle}>{item.ubicacion}</Text>

            <View style={styles.actions}>
              <MaterialIcons
                name="edit"
                size={24}
                color="#2196F3"
                onPress={() =>
                  navigation.navigate("FormContenedor", { contenedor: item })
                }
              />
              <MaterialIcons
                name="delete"
                size={24}
                color="#F44336"
                onPress={() => eliminarContenedor(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* BOTÓN FLOTANTE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("FormContenedor")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#777",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 15,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },
});
