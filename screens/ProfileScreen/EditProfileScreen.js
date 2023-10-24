import React, {useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Input, } from "react-native-elements";
import {firebase, firestore}  from "../../database/firebaseDB";

export default class EditMe extends Component {
    constructor() {
        super();
    
        this.state = {
          key: "",
          profile: "",
          username: "",
          email: "",
          password: ""
        };
      }
      componentDidMount() {
        const profileDoc = firebase
          .firestore()
          .collection("user")
          .doc(this.props.route.params.key);//เรียกข้อมูลที่เลือกมาไว้แก้ไข
          profileDoc.get().then((res) => {
          if (res.exists) {
            const userData = res.data();
            this.setState({
              key: res.id,
              profile: userData.profile,
              username: userData.username,
              email: userData.email,
              password: userData.password,
            });
          } else {
            console.log("Document does not exist!!");
          }
        });
      }
      inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

      updateUserject() {
        const updateUserDoc = firebase
          .firestore()
          .collection("user")
          .doc(this.state.key);
        updateUserDoc
          .set({
            profile: this.state.profile,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
          })
          .then(() => {
            console.log(
              "Updating Alert",
              "The student was updated!! Pls check your DB!!"
            );
            this.props.navigation.navigate("Profile")
            console.log("DB:", this.state)
          });
      }
    
    
render(){
    return (
        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginBottom: 25, marginTop: 25, }}>
            {this.state.profile ? (
                    <Image
                        source={{ uri: this.state.profile }}
                        style={{ width: 80, height: 80, marginLeft: 20, }}
                    />
                ) : null}
                <Pressable style={{ marginTop: 25, marginLeft: 20, }} >
                    {/* ใส่ onPress={onPress} ใน Pressable*/}
                    <Text style={{ color: "#176B87", fontSize: 16, }}>เปลี่ยนรูปโปรไฟล์</Text>
                </Pressable>
            </View>

            <View style={styles.name}>
                <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>ชื่อ</Text>
                <Input
                    placeholder={"ชื่อ"}
                    value={this.state.username}
                    onChangeText={(val) => this.inputValueUpdate(val, "username")}
                />
            </View>
            <View style={styles.email}>
                <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>อีเมล</Text>
                <Input
                    placeholder={"อีเมล"}
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, "email")}
                />
            </View>

            <Pressable style={styles.confirm} onPress={() => this.updateUserject()}>
                <Text>ยืนยัน</Text>
            </Pressable>


        </View>
    );}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: "#F4EEEE",
    },
    confirm: {
        backgroundColor: "#FFDBAA",
        marginTop: 200,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
