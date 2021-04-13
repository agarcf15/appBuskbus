import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Portada from './app/screens/Portada'
import VistaLineas from './app/screens/VistaLineas'
import Linea from './app/screens/Linea'
import Parada from './app/screens/Parada'
import InfoLinea from './app/screens/InfoLinea'
const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>{/*para añadir más vistas, habrña que añadirlas aqui primero*/}

        <Stack.Screen name="Portada" component={Portada} 
          options={opciones}/>
        <Stack.Screen name="Lineas" component={VistaLineas} 
          options={{...opciones, title: "Líneas"}}/>
        <Stack.Screen name="Linea" component={Linea} />
        <Stack.Screen name="Parada" component={Parada} />
        <Stack.Screen name="InfoLinea" component={InfoLinea} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
//options={{headerTitle: props => <LogoTitle {...props} /> }

const opciones = {
  title: "Buskbus",
    headerTintColor: "#c44037",
    headerStyle:{
      backgroundColor: "white"
    }
}
// URL http://algeciras.timebus.es/api/buskbus/v2/index.php/{{comando}}/0008/buskbus/{{parámetros}}
function LogoTitle() {
  return (
    <View>
      <View style={{flex: 7, justifyContent: 'center'}}>
        <Text>
          Líneas
        </Text>
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('./app/assets/images/frente-del-autobus.png')}
        />
      </View>
      
    </View>

    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

