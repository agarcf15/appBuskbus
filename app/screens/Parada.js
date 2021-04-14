
import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';

import { View, } from '../../components/Themed';


import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



const Linea = ({route, navigation}) => {

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
            setData(json.Datos);
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
        <View style={{flex: 1}}>
          {isLoading ? <ActivityIndicator/> : (
            <View style={{flexDirection: 'column'}}>
              <MapView
                provider= "google"
                style = {{height : '40%'}}
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
              <List.Item
                title= {NombreParada}
                left={props => <List.Icon {...props} 
                  icon={require('../assets/images/marcador-de-posicion.png')}
                />}
                style={styles.title, {backgroundColor: '#86a3d1'}}
                
              />
              <View style={{height : '52%'}}>
              <FlatList

              data={data.Correspondencias.sort((a, b) => a.HoraPaso.localeCompare(b.HoraPaso))}
              keyExtractor={({ HoraPaso }, index) => HoraPaso}
              renderItem={({ item }) => (
                
                <List.Item
                  title= {'Línea ' + item.CodigoPanel, item.Nombre}
                  description = {item.Dias, item.HoraPaso}
                  left={props => <List.Icon {...props} 
                    icon={require('../assets/images/frente-del-autobus.png')}
                  />}
                  onPress={()=>navigation.navigate("Linea", {item})}
                  style={styles.title, {backgroundColor: item.ColorFondo}}
                  titleStyle={{color: item.ColorTexto}}
                  descriptionStyle= {{color: item.ColorTexto}}
                />
                  
                  )}
              />
              </View>
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
