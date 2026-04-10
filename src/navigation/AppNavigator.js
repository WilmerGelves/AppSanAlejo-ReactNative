import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContenedoresList from '../screens/ContenedoresList';
import FormContenedor from '../screens/FormContenedor';
import DetalleContenedor from '../screens/DetalleContenedor';
import FormObjeto from '../screens/FormObjeto';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ContenedoresList}
          options={{ title: "Mis Contenedores 📦" }}
        />
        <Stack.Screen
          name="FormContenedor"
          component={FormContenedor}
          options={{ title: "Crea un nuevo contenedor🗃️" }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleContenedor}
          options={{ title: "Objetos del contenedor🔍" }}
        />
        <Stack.Screen
          name="FormObjeto"
          component={FormObjeto}
          options={{ title: "Agrega un nuevo objeto🆕" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}