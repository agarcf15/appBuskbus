import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, TextInput, ActivityIndicator, Alert, FlatList, Switch} from 'react-native';
import { List, Button } from 'react-native-paper';

import SwitchSelector from 'react-native-switch-selector'

import { View, } from '../../components/Themed';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Buscar = ({route, navigation}) => {
  console.log(route.params)
  
    const [ListaOMapa, setListaOMapa] = useState(route.params.ListaOMapa) //si es Lista se mostraran los datos 
    // en lista. Si es Mapa se mostrará el mapa
    const [isLoading, setLoading] = useState(false);
    
    const [noDatos, setNoData] = useState(false); //si es FALSE hay datos, si es TRUE no los hay
    const [data, setData] = useState([]);//datos de la api
    
    const [Mapa, setMapa] = useState(false);//Si horario es TRUE, mapa es FALSE
    

    const [text, onChangetext] = useState(route.params.text);
    
  
    useEffect(() => {
      if(text==""){

      }else
      fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/buscarparada/0008/buskbus/'+text.toString()+'/0', {
        method: 'POST',
      })
      .then ((response) => response.json())
      .then((json) => {
        if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
          if(json.Datos.length=="0"){
            console.log("No hay datos");
            setNoData(true)
          }
          setData(json.Datos);
          console.log(data);
          console.log("tenemos " + json.Datos.length+ " datos");
          
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
    <View >
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
        <View style={{flexDirection: 'column',backgroundColor: "#86a3d1",
          }}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangetext}
                value={text}
                placeholder="buscar..."
                
              />
              <SwitchSelector
                initial={0}
                onPress={(value) => setListaOMapa(value)}
                textColor={'#7a44cf'} //'#7a44cf'
                selectedColor={'#fff'}
                buttonColor={'#7a44cf'}
                borderColor={'#7a44cf'}
                hasPadding
                options={[
                    { label: "Mapa", value: "Mapa"}, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "Lista", value: "Lista"} //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
            />
              
              <Button onPress={()=> {
                if(text==null){
                  Alert.alert("Error: Introduce el término a buscar")
                }else{
                  navigation.navigate("Buscar", {text, ListaOMapa})}

                }
                }>
                  Buscar
              </Button>
            </View>
            <View>
          {noDatos ?
            <View>
              {ListaOMapa=="Mapa" ? //si el mapa es true se muestra el mapa
                <View>
                  <MapView
                    provider= "google"
                    style = {{height : '90%'}}
                    initialRegion={{
                      latitude: 36.1201500,
                      longitude: -5.4514900,
                      latitudeDelta: 0.06,
                      longitudeDelta: 0.07,
                    }}/>
                </View>
                    //si selecciono paradas se muestra la lista
              :(
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                  data={data[0]}
                  keyExtractor={({ Orden }, index) => Orden.toString()}
                  renderItem={({ item }) => (
                    <List.Item
                      title= {item.CodigoParada, item.NombreParada}
                      description = {item.HoraPaso}
                      left={props => <List.Icon {...props} 
                        icon={require('../assets/images/marcador-de-posicion.png')}
                      />}
                      onPress={()=>navigation.navigate("Parada", {item})}
                    />
                  )}/>
                </View>
              )}
            </View>
          :(
            <View>
              {ListaOMapa=="Mapa" ? //si el mapa es true se muestra el mapa
                <View>
                  <MapView
                    provider= "google"
                    style = {{height : '90%'}}
                    initialRegion={{
                      latitude: 36.1201500,
                      longitude: -5.4514900,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05,
                    }}
                    >
                      
                    {
                      data.map((item) => 
                      <Marker
                        key={item.IdParada}
                        coordinate={{ latitude: parseFloat(item.Latitud), longitude: parseFloat(item.Longitud) }}
                        title={item.Nombre}
                      >
                      </Marker >
                    )}                      
                  </MapView>
                </View>
                    //si selecciono paradas se muestra la lista
              :(
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                  data={data}
                  keyExtractor={({ IdParada }, index) => IdParada.toString()}
                  renderItem={({ item }) => (
                    <List.Item
                      title= {item.Codigo, item.Nombre}
                      left={props => <List.Icon {...props} 
                        icon={require('../assets/images/marcador-de-posicion.png')}
                      />}
                      onPress={()=>navigation.navigate("Parada", {item})}
                    />
                  )}/>
                </View>
              )}
            </View>
          )}
              
        </View>
      </View> 
      )}
    </View>
  );
};

export default Buscar;

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
    resizeMode: 'contain'

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});