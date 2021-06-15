import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, TextInput, Image, Alert} from 'react-native';

import SwitchSelector from 'react-native-switch-selector'

import { View } from '../../components/Themed';
import { Button } from 'react-native-paper'

const Portada = ({navigation}) => {

  const [ListaOMapa, setListaOMapa] = useState("Mapa") //si es TRUE se mostraran los datos 
    // en lista. Si es FALSE se mostrará el mapa
  const [isLoading, setLoading] = useState(false);
  
  const [noDatos, setNoData] = useState(false); //si es TRUE hay datos, si es FALSE no los hay

  const [text, onChangetext] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.cuadrado}>    
        <Image
        style={styles.logo}
        source={require('../assets/images/LOGO.png')}/> 
      </View>

      <Button onPress={()=>Alert.alert('This is a glicht')}/> 
      
      <View style={styles.cuadrado1}> 
        <Button  
          labelStyle={{ fontSize: 22 }}
          icon={require('../assets/images/frente-del-autobus.png')} 
          onPress={()=> navigation.navigate('Lineas')}
          color='#2b92ff'
        > 
          Líneas
        </Button>
          
        <Button 
          labelStyle={{ fontSize: 22 }}
          icon={require('../assets/images/favoritos.png')} 
          onPress={()=> navigation.navigate('ListaFavs')}
          color='#ed8434'
        > 
          Favoritos
        </Button>
            
        <View style={styles.separator}/>
            <TextInput
                style={styles.input, { width: '90%',  height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:5}}
                onChangeText={onChangetext}
                value={text}
                placeholder="  Buscar..."
            />

            <View style={styles.separator}/>

            <SwitchSelector
                initial={0}
                onPress={(value) => setListaOMapa(value)}
                textColor={'#2b92ff'} //'#7a44cf'
                selectedColor={'#fff'}
                buttonColor={'#2b92ff'}
                borderColor={'#2b92ff'}
                hasPadding
                options={[
                    { label: "Mapa", value: "Mapa"}, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "Lista", value: "Lista"} //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
            />
            <Button 
            labelStyle={{ fontSize: 22 }}
            color= '#2b92ff' onPress={()=> {
              if(text==""){
                Alert.alert("Error: Introduce el término a buscar")
              }else{
                navigation.navigate("Buscar", {text, ListaOMapa})}

              }
              }>
                Buscar
            </Button>
        
       
      </View>
      
    </View>
  );
}
export default Portada;
const styles = StyleSheet.create({
  cuadrado: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#86a3d1",
  },
  cuadrado1: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffff",
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
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
  logo: {
    height: '100%',
    resizeMode: 'contain'
  },
  icono: {
    width: 10,
    height: 10,
  },
});
