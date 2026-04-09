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
        <Stack.Screen name="El rincón del Desordenado" component={ContenedoresList} />
        <Stack.Screen name="FormContenedor" component={FormContenedor} />
        <Stack.Screen name="Detalle" component={DetalleContenedor} />
        <Stack.Screen name="FormObjeto" component={FormObjeto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}