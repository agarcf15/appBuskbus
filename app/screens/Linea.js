import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';

import { Text, View, } from '../../components/Themed';


const Linea = (props) => {
    const {Codigo, CodigoPanel, Nombre, ColorFondo, ColorTexto} = props.route.params.item
    const [isLoading, setLoading] = useState(true); //si esta true no enseña los datos, ya que no se han obtenido
    const [IdaYVuelta, setIdaVuelta] = useState(true);//si es TRUE la linea tiene 2 buses (ida y vuelta), sino tiene solo 1
    //Se equipara a la linea M2 de leon (2 buses) y la linea M10 (1 bus)
    const [data, setData] = useState([]);
  
    useEffect(() => {
        console.log(Codigo, CodigoPanel, Nombre, ColorFondo, ColorTexto);
      fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/servicios/0008/buskbus/'+Codigo.toString()+'/0', {//cambiar numero por codlinea
          method: 'POST',
        })
        .then ((response) => response.json())
        .then((json) => {
          if (json.Estado == "OK"){ //si la comunicación es buena devuelvo todo
            setData(json.Datos);
            if (json.Datos.length=="1"){
                setIdaVuelta(false)
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
        <View style ={{flex: 1}}>
          {isLoading ? <ActivityIndicator/> : (
            <View>
                <Card style={{flexDirection: 'row'}}>
                    <View style={styles.cardview, {backgroundColor: ColorFondo}}>
                        <Image 
                            style={styles.icono}
                            source={require('../assets/images/frente-del-autobus.png')}
                        ></Image>
                    
                        <Text>{Nombre}</Text>
                    </View>
                    
                </Card>
                
                <FlatList
                    data={data}
                    keyExtractor={({ Codigo }, index) => Codigo}
                    renderItem={({ item }) => (
                        <Card style={styles.mycard}>
                        <View style={styles.cardview}>
                            <Text >{item.Trayecto}, {item.Descripcion}</Text>
                            <FlatList
                                data={item.Paradas}
                                keyExtractor={({ Orden }, index) => Orden}
                                renderItem={({ item }) => (
                                    <Card style={styles.mycard}>
                                    <View style={styles.cardview}>
                                        <Text >{item.CodigoParada}, {item.NombreParada}</Text>
                                    </View>
                                    </Card>
                                
                                )}
                            />
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
