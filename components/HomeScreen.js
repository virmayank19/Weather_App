import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert ,Image, AsyncStorage} from 'react-native';
import MyHeader from './MyHeader';
import { LinearGradient } from 'expo-linear-gradient';
import{TextInput, Card, List, Title} from "react-native-paper";

export default class HomeScreen extends React.Component  {
   state={
       info:{
        name:"loading!!",
        temp:"loading!!",
        humidity:"loading",
        desc:"loading",
        icon:"loading" 
       }
   }
   async getWeather(){
        let MyCity=await AsyncStorage.getItem("lastcity");
        if(!MyCity)
         { MyCity=this.props.navigation.getParam('city',"delhi")
         } 
       fetch(`http://api.openweathermap.org/data/2.5/weather?q=${MyCity}&unit=metric
        &APPID=f4f4c0a0f1d6a8a35da24f0359aeaf6f`)
        .then(res=>res.json())
        .then(data=>{
        
            this.setState({
                info:{
                name:data.name,
                temp:data.main.temp,
                humidity:data.main.humidity,
                desc:data.weather[0].description,
                icon:data.weather[0].icon
                }
            })
          
        }).catch(err=>{Alert.alert("error "+err.message+"please connect to internet",[{test:"ok"}])
    })
    }
    componentDidMount(){
        this.getWeather();
    }
  render(){
    if(this.props.navigation.getParam('city')){
        this.getWeather()
    }
    console.log(this.state.info);
   return (
    <View style={styles.container}>
    <MyHeader title="current weather"/>
    <Card style={{margin:20}}>
    <LinearGradient colors={['#021B79','#0575E6']}>    
         <View style={{padding:20,alignItems:"center"}}>
            <Title style={styles.text}>{this.state.info.name}</Title>
            <Image style={{width:120,height:120}} source={{uri:'http://openweathermap.org/img/w/'
            +this.state.info.icon+".png"}}
            />          
            <Title style={styles.text}>Temperature : {this.state.info.temp}</Title>
            <Title style={styles.text}>Description : {this.state.info.desc}</Title>
            <Title style={styles.text}>Humidity : {this.state.info.humidity}</Title>
         </View>
     </LinearGradient>

    </Card>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightgrey'   
  },
  text:{
      textAlign:"center",
      marginBottom:10,
      color:"white",
      fontSize:25

  }
});
