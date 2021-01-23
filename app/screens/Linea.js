import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
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
    const [Mapa, setMapa] = useState(false);//Si horario es TRUE, mapa es FALSE
    const [Trayecto, setTrayecto] = useState(true);//si es TRUE se muestra el trayecto 1, sino el 2
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
            setData(json.Datos);
            console.log(json.Datos.length);
            if (json.Datos.length=="1"){ //si es 1, la linea tiene un unico trayecto 
                setIdaVuelta(true)
            }
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
        <View style ={{flex: 1}, {backgroundColor: '#86a3d1'}}>
          {NoServicio ? 
          <View style={styles.container}>
            <View >
              <Image
                style={styles.icono}
                source={require('../assets/images/NO_BUS.png')}/> 
            </View>
          <View />
          
          </View>
          :(
            <View>
          {isLoading ? <ActivityIndicator/> : (
            <View>
                <Card style={{flexDirection: 'row'}}>
                    <View>
                        <List.Item
                          title={Nombre}
                          left={props => <List.Icon {...props} 
                            icon={require('../assets/images/frente-del-autobus.png')}
                          />}
                          style={styles.title, {backgroundColor: ColorFondo}}
                          titleStyle={{color: ColorTexto}}
                        />
                    </View>
                </Card>
                {IdaYVuelta ? 
                //SI TIENE UN SOLO TRAYECTO SE MUESTRA ESTE LADO, SIN EL SELECTOR DEL TRAYECTO
                <View>
                  
                  <View style={{ backgroundColor: ColorFondo, flexDirection: "row"}}> 
                    <View style={{flex: 1}}>
                    <Button 
                      icon={require('../assets/images/mapa.png')} 
                      onPress={()=> setMapa(true)}
                      >
                        Mapa
                      </Button>
                    </View>
                    <View style={{flex: 1}}>
                      <Button 
                      icon={require('../assets/images/marcador-de-posicion.png')} 
                      onPress={()=> setMapa(false)}
                      >
                        Paradas
                      </Button>
                    </View>
                  </View>
                  {Mapa ? //si el mapa es true se muestra el mapa
                  <View>
                    <MapView
                      provider= "google"
                      style = {{height : '90%'}}
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
                      )
                      }                      

                    </MapView>
                     
                  </View>
                    //si selecciono paradas se muestra la lista
                    :(
                    <View style={{height: '88%'}}>
                      <FlatList
                      data={data[0].Paradas}
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
                        )}
                      />
                    </View>
                    )}
                     
                </View>
                
                :(
                
                <View>
                  <View style={{ backgroundColor: ColorFondo, flexDirection: "row"}}> 
                        <View style={{flex: 1}}>
                          <List.Item
                            title= {data[0].Descripcion}
                            description = {data[0].Hora}
                            
                            onPress={()=>setTrayecto(true)}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <List.Item
                            title= {data[1].Descripcion}
                            description = {data[1].Hora}
                            
                            onPress={()=>setTrayecto(false)}
                          />
                        </View>
                  </View>
                  
                  {Trayecto ?
                    <View>
                      <View style={{ backgroundColor: ColorFondo, flexDirection: "row"}}> 
                        <View style={{flex: 1}}>
                        <Button 
                          icon={require('../assets/images/mapa.png')} 
                          onPress={()=> setMapa(true)}
                          >
                            Mapa
                          </Button>
                        </View>
                        <View style={{flex: 1}}>
                          <Button 
                          icon={require('../assets/images/marcador-de-posicion.png')} 
                          onPress={()=> setMapa(false)}
                          >
                            Paradas
                          </Button>
                        </View>
                        
                      </View>
                      {Mapa ?
                        <View>
                          <MapView
                            provider= "google"
                            style = {{height : '90%'}}
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
                            </Marker >)
                            }                      

                          </MapView>
                            
                        </View>
                          
                        :(
                          <View style={{height: '81%'}}>
                          <FlatList
                          data={data[0].Paradas}
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
                            )}
                          />
                          </View>
                        )}
                    </View>
                  :(
                    <View>
                      <View style={{ backgroundColor: ColorFondo, flexDirection: "row"}}> 
                        <View style={{flex: 1}}>
                        <Button 
                          icon={require('../assets/images/mapa.png')} 
                          onPress={()=> setMapa(true)}
                          >
                            Mapa
                          </Button>
                        </View>
                        <View style={{flex: 1}}>
                          <Button 
                          icon={require('../assets/images/marcador-de-posicion.png')} 
                          onPress={()=> setMapa(false)}
                          >
                            Paradas
                          </Button>
                        </View>
                        
                      </View>
                      {Mapa ?
                        <View>
                          <MapView
                            provider= "google"
                            style = {{height : '90%'}}
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
                            </Marker >)
                            }                      

                          </MapView>
                            
                        </View>
                          
                        :(
                          <View style={{height: '81%'}}>
                          <FlatList
                          data={data[1].Paradas}
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
                            )}
                          />
                          </View>
                        )}
                    </View>
                  )}
     
              </View>
              
                )}
                
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
