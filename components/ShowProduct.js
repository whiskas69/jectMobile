
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const ShowProduct = (props) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity style={{ height: 260, flexDirection: "row", }} onPress={props.onSelectProduct}>
                <Image source={{ uri: props.pic }} style={styles.product} />
                <View>
                    <Text style={styles.catTitle} numberOfLines={2}> {props.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{
                            fontSize: 16, bottom: -50, position: "absolute"
                        }}> list.category_name </Text>

                        <Text style={styles.review}>{props.review} รีวิว</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    card: {
        maxWidth: "100%",
        minWidth: '100%',
        backgroundColor: "#fff",
        maxHeight: 100,
        minHeight: 100,
        borderRadius: 20
    },
    catTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    product: {
        width: "40%",
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        resizeMode: "cover"
    },
    review: {
        fontSize: 11,
        position: 'absolute',
        right: -40,
        bottom: -48
    }
});


export default ShowProduct;