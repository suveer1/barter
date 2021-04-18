import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config'

export default class MyBarter extends Component{
    constructor(){
        super();
        this.state={mydonorintrests:''}
    }
    getData=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection("myBarters").where('donor_id','==',email)
        .onSnapshot((snapshot)=>{
            var allBarters = snapshot.docs.map(document => document.data());
            this.setState({
              mydonorintrests : allBarters,
            });
        })
        console.log("lofof"+this.state.mydonorintrests)
    }
    componentDidMount(){
        this.getData();
    }
    keyExtractor=(item,index)=>index.toString()
   
    renderItem=({item})=>(
        <ListItem bottomDivider>
            <ListItem.Content>
            <ListItem.Title style={{fontSize:30,fontWeight:'bold'}}>{ item.item_name}</ListItem.Title>
            <ListItem.Subtitle style={{  
                flex:1,
                fontSize: 20,
                justifyContent:'center',
                alignItems:'center'}}>
                    {'requested by :' + item.requested_by }</ListItem.Subtitle>
                        <ListItem.Subtitle style={{    flex:1,
                fontSize: 20,
                justifyContent:'center',
                alignItems:'center'}}>{'status  :'+item.request_status}</ListItem.Subtitle>
            <View>
                <TouchableOpacity style={{   
                    width:100,
                    height:30,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:"#ff5722",
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 8
                    },
                    elevation : 16}}>
                        <Text>exchange</Text>
                </TouchableOpacity>
            </View>
            </ListItem.Content>
        </ListItem>
    )
    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader  title="My Barters"/>
              <View style={{flex:1}}>
                {
                  this.state.mydonorintrests.length === 0
                  ?(
                    <View >
                      <Text style={{ fontSize: 20}}>you have not shown intrest in any of Barters</Text>
                    </View>
                  )
                  :(
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.mydonorintrests}
                      renderItem={this.renderItem}
                    />
                  )
                }
              </View>
            </View>
          )
    }
}