import * as React from 'react';
import { Alert, StyleSheet, Image, TouchableHighlight, Pressable } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import VistaLineas from '../screens/VistaLineas';

import { Text, View, } from '../../components/Themed';


function Portada({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.cuadrado}>
        <Image
        style={styles.logo}
        source={require('../assets/images/bus.jpg')}/> 
      </View>

      <View style={styles.cuadrado}>
        <Pressable style={styles.boton}
        onPress={() => navigation.navigate('Lineas')}> 
        <View style={{backgroundColor: "#ccc9c0"}}>
          <Text>Líneas
             </Text>
             <Image
          style={styles.icono}
          source={require('../assets/images/frente-del-autobus.png')}/>
        </View>
        </Pressable>

    <View style={styles.separator}/>
        <TouchableHighlight style={styles.boton}
        onPress={() => navigation.navigate('TabTwo')}> 
        <View style={{backgroundColor: "#ccc9c0"}}>
          <Text>Favoritos
            <Image
          style={styles.icono}
          source={require('../assets/images/favoritos.png')}/>
             </Text>
             
        </View>
        </TouchableHighlight>
    <View style={styles.separator}/>
        <TouchableHighlight style={styles.boton}
        onPress={() => Alert.alert('pulsaste ubicacion y paradas cercanas')}> 
        <View style={{backgroundColor: "#ccc9c0"}}>
          <Text>Ubicación y Paradas Cercanas
             </Text>
             <Image
          style={styles.icono}
          source={require('../assets/images/marcador-de-posicion.png')}/>
        </View> 
        </TouchableHighlight>

       
      </View>
      
    </View>
  );
}
export default Portada;
const styles = StyleSheet.create({
  cuadrado: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boton:{
    width: '80%',
    height:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ccc9c0"
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  logo: {
    width: '60%',
    height: '60%',
  },
  icono: {
    width: 10,
    height: 10,
  },
});
