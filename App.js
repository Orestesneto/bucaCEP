import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';

import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return; //
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado sera fechado!

    }catch(error){
      console.log('ERROR: ' + error);
    }


  }

  function limpar(){
    setCep('');
    setCepUser(null);
  }




  return (


    <SafeAreaView style={styles.container}>

      <View style={{alignItems: 'center'}}>

      <Text style = {styles.titulo}>Digite o CEP desejado</Text>

      </View>

      <View style = {styles.areaCep}>

      <TextInput
          placeholder='Ex: 58475000'
          style={styles.input}
          keyboardType= "numeric"
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
        />
      </View>

      <View style={styles.areaBtn}>

      <TouchableOpacity style= {styles.botaoBuscar} onPress={buscar} >
        <Text style= {styles.botaoText}> Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style= {styles.botaoLimpar} onPress={limpar} >
        <Text style= {styles.botaoText}> Limpar</Text>
        </TouchableOpacity>

        </View>

        { cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }

   
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF00F',
    paddingTop: 60,
    alignItems: 'center'
  },
  titulo:{
    fontSize: 20,
    justifyContent: 'center',

  },
  input:{
    width: "100%",
    padding: 8,
    fontSize: 20,
    color:"#000",

  },
  areaCep:{
    backgroundColor: '#F9F9F9',
    width: "90%",
    paddingTop: 8,
    paddingBottom: 3,
    marginTop: 20,
  
  },
  botaoBuscar:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#1d75cd'


  },
  botaoLimpar:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#cd3e1d',
    
    

  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  resultado:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#00BFFF',
    width: "100%",
    paddingTop: 10,
    marginTop: 10,
    padding: 15,
 
  },
  itemText:{
    fontSize: 20   ,
  }
});
