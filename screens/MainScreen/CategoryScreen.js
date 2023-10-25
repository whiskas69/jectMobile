import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { firebase, firestore } from "../../database/firebaseDB";
// import 'firebase/firestore';
import { ListItem, Avatar } from "react-native-elements";

const Categories = ({ navigation }) => {
    const [data, setData] = useState([]);

    const getCategories = async () => {
        try {
            const querySnapshot = await firebase.firestore().collection("Categories")
            .orderBy("id", "asc").get();
            const categoriesData = querySnapshot.docs.map((doc) => doc.data());
            setData(categoriesData);
            // console.log("llllllll", categoriesData)
        } catch (error) {
            console.error('Error fetching Categories:', error);
        }
    }
    useEffect(() => {
        getCategories()
    })

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {data.map((itemData, i) => {
                        return (
                            <View key={i} style={{ ...styles.category, backgroundColor: itemData.color }} >
                                {/* <View></View> */}
                                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} key={i} onPress={() => navigation.navigate("CateDetail", { key: itemData })} >
                                    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: itemData.color }}>
                                        <Image source={{ uri: itemData.img }} style={styles.pic} />
                                        <Text style={styles.txt}> {itemData.name} </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        );
                    })}
                </View>
                {/* </TouchableOpacity> */}

            </ScrollView >

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4EEEE",
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoll: {
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