// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
// import { firebase, firestore, auth } from "../../database/firebaseDB";
// import { collection, query, orderBy, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';
// import Carousel from "../../components/MenuCarousel";

// //Restaurant

// const CateDetailScreen = () => {
//     const [catagoryName, setCategoryName] = useState('');
//     const [categoryData, setCategoryData] = useState("");
//     const [datasort, setDatasort] = useState("");
//     const [cate, setCate] = useState("");
//     const [searchText, setSearchText] = useState('');
//     const [showView, setShowView] = useState(false);
//     const [name, setName] = useState('');
//     const [picture, setPicture] = useState('');
//     const [review, setReview] = useState('');
//     const [categories_name, setCategories_name] = useState('');

//     useEffect(() => {
//         // const q = query(collection(firebase.firestore(), "Restaurant"));
//         // Create a real-time listener to fetch and update data

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const restaurantData = [];
//             const restaurantAll = [];

//             snapshot.forEach((doc) => {
//                 const dataPro = doc.data();
//                 if (dataPro.categories_name === datasort.categories_name) {
//                     items.push({
//                         name: dataPro.name,
//                         picture: dataPro.picture,
//                         review: dataPro.review,
//                         categories_name: dataPro.categories_name
//                     });
//                 }
//                 const dataAll = {
//                     name: dataPro.name,
//                     picture: dataPro.picture,
//                     review: dataPro.review,
//                     categories_name: dataPro.categories_name
//                 };
//                 setName(dataPro.name);
//                 setPicture(dataPro.picture);
//                 setReview(dataPro.review);
//                 setCategories_name(dataPro.categories_name);
            
//                 if (dataPro.category === cate) {
//                     restaurantData.push(dataAll);
//                 } else {
//                     restaurantAll.push(dataAll);
//                 }
//             });
            
//             if (restaurantAll.length === snapshot.size) {
//                 setDatasort(restaurantAll);
//             } else {
//                 setDatasort(restaurantData);
//             }
                

//             if (restaurantAll.length === snapshot.size) {
//                 setDatasort(restaurantAll);
                
//             } else {
//                 setDatasort(restaurantData);
//             }
//         });

//         return () => {
//             // Unsubscribe from the real-time listener when the component unmounts
//             unsubscribe();
//         };

//     }, [cate])
//     // console.log("rrrrrrrr", datasort)
//     // console.log("rrrrrrrr", catagoryName)

//     const renderedItem = (itemData) => {
//         return (
//             <Carousel
//                 title={itemData.item.name}
//                 pic={itemData.item.picture}
//                 review={itemData.item.review}
//                 categories_name={itemData.item.categories_name}
//                 telephone={itemData.item.telephone}

//                 onSelectProduct={() => {
//                     navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review, categories_name: itemData.item.categories_name, telephone: itemData.item.telephone });
//                 }}
//             />
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                     <FlatList
//                         data={datasort}
//                         renderItem={renderedItem}
                        
//                     />
//                 </ScrollView>
//                 {/* {this.state.CateDetail_list.map((item, i) => {
//                     return (
//                         <View style={styles.containercard} key={i}>
//                             <TouchableOpacity style={styles.cardContainer} onPress={() => this.navigateToViewDetaile(item.key)}>
//                                 <View style={styles.card}>
//                                     <View style={styles.Imagebox}>
//                                         <Image source={{ uri: item.picture }}
//                                             style={styles.Image}
//                                         />
//                                     </View>
//                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
//                                         <View style={styles.maintext}>
//                                             <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{item.name}</Text>
//                                             <Text style={{ fontSize: 13, color: 'gray', marginLeft: 10 }}>{item.category_name}</Text>
//                                         </View>
//                                         <Text style={{ fontSize: 15, height: 30, width: 60, alignItems: 'center' }}>{item.review} รีวิว</Text>
//                                     </View>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     )
//                 })} */}
//         </View>
//     );

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F4EEEE',
//     },
//     containercard: {
//         flexDirection: 'column',
//         flexWrap: 'wrap'
//     },
//     card: {
//         width: 370,
//         height: 180,
//         backgroundColor: "#FFFFFF",
//         borderRadius: 20,
//     },
//     Imagebox: {
//         width: 370,
//         height: 120,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         overflow: 'hidden'
//     },
//     Image: {
//         width: 370,
//         height: 120,
//         resizeMode: 'cover'
//     },
//     cardContainer: {
//         marginLeft: 12,
//         marginBottom: 10
//     }
// });

// export default CateDetailScreen;