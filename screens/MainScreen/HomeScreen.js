import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../../database/firebaseDB';
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';


import ShowProduct from '../../components/ShowProduct';
import Carousel from '../../components/RestaurantCarousel';

const HomeScreen = ({ navigation, route }, props) => {

    // const [restaurantData, setrestaurantData] = useState([]);
    const [categoryData, setCategoryData] = useState("");
    const [cate, setCate] = useState("");
    const [searchText, setSearchText] = useState('');

    //search
    const SearchData = async () => {

        const q = query(collection(firebase.firestore(), "Restaurant"));
        const querySnapshot = await getDocs(q);
        const restaurantData = [];
        const restaurantAll = [];
        var i;

        for (i = 0; i < querySnapshot.size; i++) {
            const restaurant = querySnapshot.docs[i].data().category;
            if (restaurant === cate) {

                const dataPro = querySnapshot.docs[i].data();

                const dataAll = {
                    name: dataPro.name,
                    id: querySnapshot.docs[i].id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                }
                restaurantData.push(dataAll);
            }

            else {
                const dataPro = querySnapshot.docs[i].data();

                const dataAll = {
                    name: dataPro.name,
                    id: querySnapshot.docs[i].id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                }

                restaurantAll.push(dataAll)
            }

        }


        if (restaurantAll.length == querySnapshot.size) {

            const filteredData = restaurantAll.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setCategoryData(filteredData)
        }

        else {
            const filteredData = restaurantData.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setCategoryData(filteredData)
        }
    }

    useEffect(() => {

        const q = query(collection(firebase.firestore(), 'Restaurant'));

        // Create a real-time listener to fetch and update data
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const restaurantData = [];
            const restaurantAll = [];

            snapshot.forEach((doc) => {
                const dataPro = doc.data();
                const dataAll = {
                    name: dataPro.name,
                    id: doc.id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
                    review: dataPro.review,
                    telephone: dataPro.telephone
                };
                if (dataPro.category === cate) {
                    restaurantData.push(dataAll);
                } else {
                    restaurantAll.push(dataAll);
                }
            });

            if (restaurantAll.length === snapshot.size) {
                setCategoryData(restaurantAll);
            } else {
                setCategoryData(restaurantData);
            }
        });

        return () => {
            // Unsubscribe from the real-time listener when the component unmounts
            unsubscribe();
        };

    }, [cate])


    const renderedItem = (itemData) => {
        return (
            <ShowProduct
                title={itemData.item.name}
                pic={itemData.item.picture}
                review={itemData.item.review}

                onSelectProduct={() => {
                    navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review }, setCate(""));
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.input} >
                <TextInput style={{ width: '100%' }} placeholder="Search" onChangeText={text => setSearchText(text)} value={searchText} />

                <AntDesign style={styles.searchIcon} name="search1" size={26} color={'gray'} onPress={() => SearchData(cate)} />

            </View>
            {/* <AntDesign style={{ position: 'absolute', right: 5, top: 15 }} name="notification" size={26} color={'gray'} /> */}
            <ScrollView>
                <Text style={[styles.title]}>Categories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 100 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("")}>
                            <Image source={require('../../assets/all-2.png')} style={[styles.catagory,]} />
                            <Text style={styles.catTitle}>ALL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("food")}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2819/2819194.png' }} style={[styles.catagory,]} />
                            <Text style={styles.catTitle}>FOOD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("clothes")}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3300/3300371.png' }} style={styles.catagory} />
                            <Text style={styles.catTitle}>CLOTHES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("accessory")}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7695/7695930.png' }} style={styles.catagory} />
                            <Text style={styles.catTitle}>ACCESSORY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("model")}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6967/6967594.png' }} style={styles.catagory} />
                            <Text style={styles.catTitle}>MODEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cat} onPress={() => setCate("other")}>
                            <Image source={{ uri: 'https://icon-library.com/images/others-icon/others-icon-20.jpg' }} style={styles.catagory} />
                            <Text style={styles.catTitle}>OTHERS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Text style={[styles.title ]}>Recommend</Text>


                <FlatList
                    data={categoryData}
                    renderItem={renderedItem}
                    numColumns={2}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
    cat: {
        alignItems: 'center',
        marginRight: 10
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        padding: 5,
        position: 'absolute',
        top: 0,
        right: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    catagory: {
        width: 40,
        height: 40,
        borderRadius: 10,

    },
    catTitle: {
        fontSize: 14,
        fontWeight: 'light',
        marginHorizontal: 10,
        marginTop: 5
    },
});


export default HomeScreen;