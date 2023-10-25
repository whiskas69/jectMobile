import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const RestaurantItem = ({list}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.Imagebox}>
                        <Image source={{ uri: list.picture }}
                            style={styles.Image}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop: 10}}>
                        <View style={styles.maintext}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{list.name}</Text>
                            <Text style={{ fontSize: 13, color: 'gray', marginLeft: 10 }}>{list.categories_name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    card: {
        width: 370,
        height: 180,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
    },
    Imagebox: {
        width: 370,
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    Image: {
        width: 370,
        height: 120,
        resizeMode: 'cover'
    },
    cardContainer: {
        marginLeft: 12,
        marginBottom: 10
    }
});

export default RestaurantItem;