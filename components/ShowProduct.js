
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const ShowProduct = (props) => {
    // console.log("-----")
    // console.log(props)
    // console.log("-----")
    const starIcons = [];


    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

        if (i < props.rating) {
            starIcons.push(
                <AntDesign key={i} name="star" size={16} color="orange" />

            );

        }

        else {
            starIcons.push(
                <AntDesign key={i} name="star" size={16} color="grey" />

            )
        }
    }


    // console.log
    return (
        <View style={{ maxWidth: '50%', minWidth: '50%' }}>
            <ScrollView>
                {/* <TouchableOpacity style={{ height: 400, }}> */}
                <TouchableOpacity style={{ height: 260, }} onPress={props.onSelectProduct}>
                    <Image source={{ uri: props.pic }} style={styles.product} />
                    <View>
                        <Text style={styles.catTitle} numberOfLines={1}> {props.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {starIcons}
                            <Text style={{
                                fontSize: 16, bottom: 0,
                                fontFamily: 'Anuphan'
                            }}> ({props.rating}) </Text>
                        </View>
                        <Text style={{
                            fontSize: 20, fontWeight: 'bold', color: "black",
                            fontFamily: 'Anuphan'
                        }}> {props.price} บาท </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 10,
        paddingTop: 30
    },
    catTitle: {
        fontSize: 20,
        fontWeight: 'light',
        fontFamily: 'Anuphan'
    },
    product: {
        width: "95%",
        height: responsiveHeight(20),
        borderRadius: 10,

    }
});


export default ShowProduct;