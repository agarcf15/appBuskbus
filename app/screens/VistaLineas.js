
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Linea from './Linea'

import { Text, View, } from '../../components/Themed';

const VistaLineas = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://algeciras.timebus.es/api/buskbus/v2/index.php/lineas/0008/buskbus/0', {
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
    <View >
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ Codigo }, index) => Codigo}
          renderItem={({ item }) => (
            <Card style={styles.mycard} onPress={()=>navigation.navigate("Linea", {item})}>
              <View style={styles.cardview, {backgroundColor: item.ColorFondo}}>
                <Text style={{color: item.ColorTexto}, styles.title}>{item.CodigoPanel}, {item.Nombre}</Text>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
};

export default VistaLineas;

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
    width: 10,
    height: 10,
  },
});
