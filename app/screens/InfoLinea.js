import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { colors } from 'react-native-elements';
import { List } from 'react-native-paper';

import { View, } from '../../components/Themed';

const InfoLinea = ({route, navigation}) => {
    const {data} = route.params
  const [isLoading, setLoading] = useState(false);
  
 
  return (
    <View style={styles.cuadrado}>
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
        <View style={{flexDirection: 'row', }}>
        <FlatList //con la flatlist podemos recorrer el vector de datos completo, y mostrar los datos
          data={data}
          keyExtractor={({ Trayecto }, index) => Trayecto}
          renderItem={({ item }) => (
            <List.Item
              title= {item.Descripcion}
              description = {'Línea ' + item.Trayecto + ', ' + item.Hora + ':' + item.HoraFin}
              left={props => <List.Icon {...props} 
                icon={require('../assets/images/frente-del-autobus.png')}
              />}
              onPress={()=>navigation.navigate("ListaParadas", {item})}
              
            />
          )}
        />
        
          
        </View>
      )}
    </View>
  );
};

export default InfoLinea;

const styles = StyleSheet.create({
  mycard:{
    margin: 5,
    padding: 5,
  },
  cardview:{
    padding: 6,
    flexDirection: 'row',
    flex: 1
  },
  cuadrado: {
    flex: 1,
    width: '100%',
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
    resizeMode: 'contain'

  },
});