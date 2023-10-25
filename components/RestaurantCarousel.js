import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

const Carousel = () => {
    return (
        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image source={{
                        uri: "https://media.discordapp.net/attachments/859736233785032714/1166285242991128576/image.png?ex=6549eec6&is=653779c6&hm=6299b58b78ee60987f60d35843928265934536942c72b937a24d8cca3a676c3b&="}}
                        style={styles.image} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                    <View style={styles.maintext}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10 }}>list.name</Text>
                        <Text style={{ fontSize: 11, color: 'gray', marginLeft: 10 }}>list.category_name</Text>
                    </View>
                    <Text style={styles.review}>list.review รีวิว</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 165,
        backgroundColor: "#ffff",
        borderRadius: 5,
        marginBottom: 5
    },
    imageBox: {
        width: 150,
        height: 113,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden"
    },
    image: {
        width: 150,
        height: 113,
        resizeMode: "cover"
    },
    review: {
        fontSize: 11,
        position: 'absolute',
        right: 10,
        bottom: -1
    }
});

export default Carousel;