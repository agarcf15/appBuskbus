import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Image, TouchableHighlight, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { Card, List, Button } from 'react-native-paper';

import { Text, View, } from '../../components/Themed';

import { createMaterialTopTabNavigator }  from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs'

import MapView, { Polyline } from 'react-native-maps';
import { Marker } from 'react-native-maps';



const Linea = ({route, navigation}) => {

    const {Codigo, CodigoPanel, Nombre, ColorFondo, ColorTexto, } = route.params.item
    const [isLoading, setLoading] = useState(true); //si esta true no enseña los datos, ya que no se han obtenido
    const [IdaYVuelta, setIdaVuelta] = useState(false);//si es TRUE la linea tiene 1 bus, sino tiene 2
    //Se equipara a la linea M2 de leon (2 buses) y la linea M10 (1 bus)
    const [data, setData] = useState([]);//datos de la api
    const [NoServicio, setServicio] = useState(false); //si es FALSE el servicio esta operativo, si es TRUE es que ya ha terminado

    useEffect(() => {
        console.log(Codigo, CodigoPanel, Nombre, ColorFondo, ColorTexto);
      fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/servicios/0008/buskbus/'+Codigo.toString()+'/0', {//cambiar numero por codlinea
          method: 'POST',
        })
        .then ((response) => response.json())
        .then((json) => {
          if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
            if(json.Datos.length=="0"){
              console.log("Servicio acabado");
              setServicio(true)
            }
            console.log(data)
            setData(json.Datos);
            console.log(json.Datos.length);
            
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
        <View style ={{flex: 1}, {backgroundColor: '#86a3d1'}, {height: '100%'}}>
          {NoServicio ? 
          <View style={styles.container}>
            <View >
              <Image
                style={styles.icono}
                source={require('../assets/images/NO_BUS.png')}/> 
            </View>
          </View>
          :(
          <View style={{backgroundColor: ColorFondo}}>
          {isLoading ? <ActivityIndicator/> : (
            <View style={{backgroundColor: ColorFondo}}>
                <View style={{height : '70%'}}>
                  <MapView
                    provider= "google"
                    style = {{height : '100%'}}
                    initialRegion={{
                      latitude: 36.1201500,
                      longitude: -5.4514900,
                      latitudeDelta: 0.06,
                      longitudeDelta: 0.07,
                    }}
                  >
                    {
                      data[0].Paradas.map((item) => <Marker
                      key={item.Orden}
                      coordinate={{ latitude: parseFloat(item.Latitud), longitude: parseFloat(item.Longitud) }}
                      title={item.NombreParada}
                      description={item.HoraPaso}
                    >
                    </Marker >
      
                    )}   
                  </MapView>
              </View>
              <View style={{backgroundColor: ColorFondo, alignItems: 'center'}} >
                <Image 
                  style={{ width: 60,height: 60,}}
                  source={require('../assets/images/frente-del-autobus.png')}
                />
                <Text> {Nombre} </Text>
                <View style={{backgroundColor: ColorFondo, alignItems: 'center', width: 100,height: 100}} >
                  <Pressable onPress={()=>navigation.navigate("InfoLinea", {data})}>
                    <Image 
                    style={{ width: 73,height: 80,marginTop: 5}}
                    source={require('../assets/images/Info.png')}
                  />
                  </Pressable>
                </View>
              </View>
                    

                
                
            </View>

          )}
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
    height: '100%',
    resizeMode: 'contain'
  },
  icono: {
    width: 200,
    height: 200,
  },
});
