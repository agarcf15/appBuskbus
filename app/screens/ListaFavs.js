import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';

import { View, } from '../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaFavs = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState();
    useEffect(()=>{
         getFavs()
         .finally(()=> setLoading(false))
    }, [])    
    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }
      
      
    const getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }

        console.log("keys "+keys)
        return keys;
    }
    const getFavs = async () => {
        let final =[]
        let values
        try {
            values = await AsyncStorage.multiGet((await getAllKeys()))
        } catch(e) {

        }
        values.forEach(value => {
            final.push(JSON.parse(value[1]))
        });
        console.log(final)
        setData(final)
    }
    
  return (
    <View style={styles.cuadrado}>
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
         <View style={{flexDirection: 'row'}}>
         <FlatList
         data={data}
         keyExtractor={({ Codigo }, index) => Codigo.toString()}
         renderItem={({ item }) => (
           <List.Item
             title= {item.Codigo, item.Nombre}
             //description = {item.HoraPaso}
             left={props => <List.Icon {...props} 
               icon={require('../assets/images/marcador-de-posicion.png')}
             />}
             onPress={()=>navigation.navigate("Parada", {item})}
           />
           )}
         />
       </View>
      )}
    </View>
  );
};

export default ListaFavs;

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