
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { View, } from '../../components/Themed';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Linea = ({route, navigation}) => {
    const {IdParada, CodigoParada, NombreParada, Codigo, Nombre} = route.params.item

    const toastRef = useRef()

    const [isFav, setIsFav] = useState(false)
    const [isLoading, setLoading] = useState(true); //si esta true no enseña los datos, ya que no se han obtenido
    const [data, setData] = useState([]);//datos de la api

 

    useEffect(() => {
        console.log(IdParada, CodigoParada, NombreParada);
        if(CodigoParada==null)
          fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/infoparada/0008/buskbus/'+Codigo.toString()+'/0', {//cambiar numero por codlinea
              method: 'POST',
            })
            .then ((response) => response.json())
            .then((json) => {
              if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
                setData(json.Datos);
                getFav();
              }else{//si no es buena devuelvo solo el mensaje
                console.error(json.Mensaje);
              }
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setLoading(false));
        else
        fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/infoparada/0008/buskbus/'+CodigoParada.toString()+'/0', {//cambiar numero por codlinea
              method: 'POST',
            })
            .then ((response) => response.json())
            .then((json) => {
              if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
                setData(json.Datos);
                getFav();
              }else{//si no es buena devuelvo solo el mensaje
                console.error(json.Mensaje);
              }
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setLoading(false));
    }, []);

    const getFav = async() => {
      var result;
      var code;
      try {
        if(CodigoParada==null){
          result = await AsyncStorage.getItem(Codigo.toString())
          code = Codigo
        }
        else{
          result = await AsyncStorage.getItem(CodigoParada.toString())
          code = CodigoParada
        }
      } catch(e) {
        console.error(e)
      }
      if(result==null){
        //no esta en memoria
        setIsFav(false)
      }else{
        var res = JSON.parse(result)
        if(res.Codigo==code){
          //ESTA GUARDADO
          console.log("si")
          setIsFav(true)
        }else{
          //no esta en memoria
          setIsFav(false)

        }
      }
      
      console.log(res)
    }
    const addFav = async() => {
      console.log("add fav")
      const pfav = {
        IdParada: IdParada,
        Nombre: NombreParada,
        Codigo: CodigoParada
      }
      var ok= true;
      try {
        if(CodigoParada==null)
          await AsyncStorage.setItem(Codigo.toString(), JSON.stringify(pfav))
        else
          await AsyncStorage.setItem(CodigoParada.toString(), JSON.stringify(pfav))
      } catch (e) {
        ok=false;
        console.error(e)
      }
      if (ok){
        setIsFav(true)
        toastRef.current.show("Se añadió a favoritos", 3600)
      } else{
        toastRef.current.show("Error al añadir a favoritos", 3600)
      }
    }
    const removeFav = async() => {
      var ok= true;
      try {
        if(CodigoParada==null)
          await AsyncStorage.removeItem(Codigo.toString())
        else
          await AsyncStorage.removeItem(CodigoParada.toString())
      } catch(e) {
        ok=false;
        console.error(e)
      }
      if (ok){
        setIsFav(false)
        toastRef.current.show("Se eliminó de favoritos", 3600)
      } else{
        toastRef.current.show("Error al eliminar de favoritos", 3600)
      }

    }
    return (
        <View style={{flex: 1}}>
          {isLoading ? <ActivityIndicator/> : (
            <View style={{flexDirection: 'column'}}>
              <MapView
                provider= "google"
                style = {{height : '40%'}}
                initialRegion={{
                  latitude: parseFloat(data.Latitud),
                  longitude: parseFloat(data.Longitud),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                      
                >
                  <Marker
                    coordinate={{ latitude: parseFloat(data.Latitud), longitude: parseFloat(data.Longitud) }}
                    title={data.Nombre}
                    />                      

              </MapView>
              <List.Item
                title= {data.Nombre}
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
              <View style={styles.fav}>
                <Icon
                  type="material-community"
                  name={isFav ? "heart" : "heart-outline"}
                  onPress={isFav ? removeFav : addFav}
                  color={isFav ? "#ff0000" : "#ffffff"}
                  size={35}
                  underlayColor="transparent"
                />
              </View>
              <Toast ref={toastRef} position="bottom" opacity={0.8}/>
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
  fav:{
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 10
  }
});
