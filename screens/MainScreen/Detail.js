import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, firebase, firestore } from "../../database/firebaseDB";

import MenuCarousel from '../../components/MenuCarousel'
import Buttonseecomment from '../../components/Buttonseecomment';
import { Button, Input } from "react-native-elements";
import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';


const DetailScreen = ({ navigation, route }) => {
    console.log('15 route', route);
    return (
        <Text>loop</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 5,
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '20%',
        backgroundColor: '#9276F2',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Anuphan'

    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        fontSize: 16,
        // height: responsiveHeight(10),
        marginHorizontal: '5%',
        fontFamily: 'Anuphan'
    },
    title: {
        fontSize: 30,
        fontWeight: 'light',
        textAlign: 'left',
        fontFamily: 'Anuphan'
    },
    header: {
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Anuphan'
    },
    content: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Anuphan'

    },
    account: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 50,
        marginLeft: 20,
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,

    },
    starImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    }
});

export default DetailScreen;