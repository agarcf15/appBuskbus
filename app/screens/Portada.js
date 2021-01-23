import * as React from 'react';
import { Alert, StyleSheet, Image, } from 'react-native';

import { View } from '../../components/Themed';
import { Button } from 'react-native-paper'

function Portada({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.cuadrado}>    {/*dentro de este view esta el logo de la app*/}
        <Image
        style={styles.logo}
        source={require('../assets/images/LOGO.png')}/> 
      </View>

      <Button onPress={()=>Alert.alert('This is a glicht')}/> {/*este es un boton invisible, que actua de separador y que es dificil ver*/}
      
      <View style={styles.cuadrado}> {/*dentro de este view estan los botones de acceso*/}
        <Button  
        icon={require('../assets/images/frente-del-autobus.png')} 
        onPress={()=> navigation.navigate('Lineas')}
        color='#8f0cc7'
        > {/*este boton da acceso a la lista de lineas*/}
          Líneas
        </Button>
          
        <View style={styles.separator}/>
        <Button 
        icon={require('../assets/images/favoritos.png')} 
        onPress={()=> Alert.alert('Funcion pendiente de implementación')}
        color='#ed8434'
        > {/*este boton dara acceso a la lista de favoritos*/}
          Favoritos
        </Button>
            
        <View style={styles.separator}/>
        <Button 
        icon={require('../assets/images/marcador-de-posicion.png')} 
        onPress={()=> Alert.alert('Funcion pendiente de implementación')}
        color='#1e9e08'
        > {/*este boton da acceso al mapa con las paradas cercanas*/}
          Paradas Cercanas
        </Button>
        
       
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
    backgroundColor: "#86a3d1",
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ccc9c0"
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  logo: {
    height: '100%',
    resizeMode: 'contain'
  },
  icono: {
    width: 10,
    height: 10,
  },
});
