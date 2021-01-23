
import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';

import { View, } from '../../components/Themed';

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
    <View style={styles.cuadrado}>
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
        <View style={{flexDirection: 'row'}}>
        <FlatList //con la flatlist podemos recorrer el vector de datos completo, y mostrar los datos
          data={data}
          keyExtractor={({ Codigo }, index) => Codigo}
          renderItem={({ item }) => (
            <List.Item
              title= {'Línea ' + item.CodigoPanel}
              description = {item.Nombre}
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
      )}
    </View>
  );
};

export default VistaLineas;

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