import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';

import { View, } from '../../components/Themed';

const BuscarMapa = ({route, navigation}) => {
    const data = route.params.text
  const [isLoading, setLoading] = useState(false);
  const [noDatos, setNoData] = useState(false); //si es FALSE el servicio esta operativo, si es TRUE es que ya ha terminado

  useEffect(() => {
    console.log(data);
    fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/buscarparada/0008/buskbus/'+data.toString()+'/0', {
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
    <View style={styles.cuadrado}>
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
         <View style={{flexDirection: 'row'}}   >
         <FlatList
         data={data}
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
  );
};

export default BuscarMapa;

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
    resizeMode: 'contain'

  },
});