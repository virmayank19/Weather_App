import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Appbar} from 'react-native-paper';


const MyHeader =(props) =>{
    return(
     <Appbar.Header>
        <Appbar.Content
          title="Weather App"
          subtitle={props.title}
          style={{alignItems:"center"}}
        />
      </Appbar.Header>
    )
}


export default MyHeader;