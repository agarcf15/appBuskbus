import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';

import { Text, View, } from '../../components/Themed';

import { createMaterialTopTabNavigator }  from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs'

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



const Linea = ({route}) => {

    const {IdParada, CodigoParada, NombreParada} = route.params.item
    const [isLoading, setLoading] = useState(true); //si esta true no enseña los datos, ya que no se han obtenido
    
    const [data, setData] = useState([]);//datos de la api



    useEffect(() => {
        console.log(IdParada, CodigoParada, NombreParada);
      fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/infoparada/0008/buskbus/'+CodigoParada.toString()+'/0', {//cambiar numero por codlinea
          method: 'POST',
        })
        .then ((response) => response.json())
        .then((json) => {
          if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
            console.log(json);
            setData(json.Datos);
            console.log(data);
          }else{//si no es buena devuelvo solo el mensaje
            console.error(json.Mensaje);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }, []);
    return (
        <View style ={{flex: 1}}>
          {isLoading ? <ActivityIndicator/> : (
            <View style={{flexDirection: 'column'}}>
              <MapView
                provider= "google"
                style = {{height : '30%'}}
                initialRegion={{
                  latitude: 36.1201500,
                  longitude: -5.4514900,
                  latitudeDelta: 0.06,
                  longitudeDelta: 0.07,
                }}      
                >
                  <Marker
                    coordinate={{ latitude: parseFloat(data.Latitud), longitude: parseFloat(data.Longitud) }}
                    title={data.Nombre}
                    />                      

              </MapView>
              
              <FlatList
              data={data.Correspondencias}
              keyExtractor={({ HoraPaso }, index) => HoraPaso.toString()}
              renderItem={({ item }) => (
                <Card style={styles.mycard} onPress={()=>navigation.navigate("Linea", {item})}>
                  <View style={styles.cardview, {backgroundColor: item.ColorFondo}}>
                    <Text >{item.CodigoPanel}, {item.Nombre}</Text>
                    <Text >{item.Dias}, {item.HoraPaso}</Text>
                  </View>
                  </Card>
                  )}
              />
            </View>
          )}
        </View>
      );
}
export default Linea;






const styles = StyleSheet.create({
  mycard:{
    margin: 5,
    padding: 5
  },
  cardview:{
    flexDirection: "row",
    padding: 6,
  },
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
    width: 50,
    height: 50,
  },
});
