import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { List } from 'react-native-paper';

import {SwitchSelector} from 'react-native-switch-selector'

import { View, } from '../../components/Themed';

const Buscar = ({route, navigation}) => {
    const [ListaOMapa, setListaOMapa] = useState(true) //si es TRUE se mostraran los datos 
    // en lista. Si es FALSE se mostrará el mapa
    const [isLoading, setLoading] = useState(false);
  
 
  return (
    <View style={styles.cuadrado}>
      {isLoading ? <ActivityIndicator/> : ( //si isLoading es true no muestra nada, sino muestra la lista
        <View style={{flexDirection: 'row'}}   >
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <SwitchSelector
                initial={0}
                onPress={value => this.setListaOMapa({value})}
                textColor={colors.purple} //'#7a44cf'
                selectedColor={colors.white}
                buttonColor={colors.purple}
                borderColor={colors.purple}
                hasPadding
                options={[
                    { label: "Feminino", value: true, imageIcon: images.feminino }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "Masculino", value: false, imageIcon: images.masculino } //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
            />
            <Button onPress={()=> Alert.alert('EStado: '+ ListaOMapa)}>
                try
            </Button>
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