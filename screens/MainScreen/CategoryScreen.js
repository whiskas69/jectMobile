import React, { Component } from "react";
import { StyleSheet, View, ScrollView, FlatList, Image, Text, TouchableOpacity } from 'react-native';

const Categories = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={{ flexDirection: 'row', flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
            <View style={styles.category}>
                    <Image
                        source={require("../../assets/pic/iconfood.png")}
                        style={{ width: 80, height: 80, }}
                    />
                    <Text style={{ color: '#3F2305', fontSize: 18, marginTop: 5 }}>อาหารตามสั่ง</Text>
                </View>
            </View>

            </ScrollView>
            
            {/* <View style={{ flexDirection: 'row', }}>
                <View style={styles.category}>
                    <Image
                        source={require("../../assets/pic/iconfood.png")}
                        style={{ width: 80, height: 80, }}
                    />
                    <Text style={{ color: '#3F2305', fontSize: 18, marginTop: 5 }}>อาหารตามสั่ง</Text>
                </View>
                <View style={styles.category}>
                    <Image
                        source={require("../../assets/pic/iconfood.png")}
                        style={{ width: 80, height: 80, }}
                    />
                    <Text style={{ color: '#3F2305', fontSize: 18, marginTop: 5 }}>อาหารตามสั่ง</Text>
                </View>
            </View> */}
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15,
        backgroundColor: "#F4EEEE",
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: "row",
        // flexWrap: "wrap"
    },
    scoll: {
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    }
    ,
    category: {
        height: 165,
        width: 165,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    pic: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    txt: {
        color: '#3F2305',
        fontSize: 18,
        marginTop: 5
    },
});

export default Categories;