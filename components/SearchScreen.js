import React from 'react';
import { StyleSheet, Text, View, ScrollView,AsyncStorage } from 'react-native';
import MyHeader from './MyHeader';
import{TextInput, Card, List,Button} from "react-native-paper";

//`http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=f4f4c0a0f1d6a8a35da24f0359aeaf6f`
export default class SearchScreen extends React.Component  {
 state={
   text:"",
   cities:[]
 };
async buttonclick(){
    console.log("clicked");
    this.props.navigation.navigate('Current City',{city:this.state.text})
    await AsyncStorage.setItem("lastcity",this.state.text)
}

async listClicked(name){
  this.setState({
      text:name
  })
  await AsyncStorage.setItem("lastcity",this.state.text)
  this.props.navigation.navigate('Current City',{city:this.state.text})
}
 fetchCities(text){
  
   this.setState({text})
   fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
   .then(data=>data.json())
   .then(city =>{
     
     this.setState({
       cities:city.RESULTS.slice(0,9)
     })
   })
   
 }
  render(){
    let renderCity=<Card><List.Item title="NO Cities" /></Card>
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map(city=>{
        return(
          <Card style={{margin:5}} key={city.lat} onPress={()=>this.listClicked(city.name)}>
            <List.Item title={city.name}/>
          </Card>
        )
      })
    }
   return (
    <View style={styles.container}>
    <MyHeader title="select city"/>
    <TextInput
        label='Enter City Name'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      
      <Button mode="contained" style={{margin:20}} onPress={() => this.buttonclick()}>
        save changes
      </Button>
      <ScrollView>
        {renderCity}
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightgrey'   
  },
});
