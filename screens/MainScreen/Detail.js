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

import comment from "../../components/comment";

const DetailScreen = ({ navigation, route }) => {
    console.log('15 route', route);
    const [addComment, setAddComment] = useState('');
    const [getComments, setComments] = useState([]);
    const [productId, setProductId] = useState(route.params.id);
    const [store, setStore] = useState([]);
    const [isSoldOut, setIsSoldOut] = useState(true); // Set isSoldOut to true when sold out

    const getStore = async () => {
        console.log("mail", route.params.mail)
        const q = query(collection(firebase.firestore(), 'user'), where('email', '==', route.params?.mail));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0].data();
        setStore(userData)

    };

    // console.log('store', store?.name);


    var purchasedAmount = 0;
    const [buy, setBuy] = useState(true)
    // const [purchasedAmount, setPurchasedAmount] = useState(0)
    // console.log("product id", productId)

    const [amount, setAmount] = useState(0);
    // const amount = 0


    const [defaultRating, setdefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

    const starIcons = [];

    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

        if (i < route.params.rating) {
            starIcons.push(
                <AntDesign key={i} name="star" size={25} color="orange" />

            );

        }

        else {
            starIcons.push(
                <AntDesign key={i} name="star" size={25} color="grey" />

            )
        }
    }


    //star
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setdefaultRating(item)} >
                                <Image source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }} style={styles.starImgStyle} />

                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        )
    }

    const queryRating = () => {
        const qComments = query(collection(firebase.firestore(), "comments"));

        const unsubscribe = onSnapshot(qComments, (querySnapshotComments) => {
            let rate = 0;
            let num = 0;

            querySnapshotComments.forEach((doc) => {
                const commentData = doc.data();
                if (commentData.ProductId === route.params.id) {
                    rate += commentData.rating;
                    num += 1;
                }
            });

            const meanRate = num > 0 ? Math.floor(rate / num) : 0;

            const productRef = firebase.firestore().collection('Restaurant').doc(route.params.id);
            productRef.update({
                rating: meanRate,
            })
                .then(() => {
                    console.log('Document updated successfully.');
                })
                .catch(error => {
                    console.error('Error updating document:', error);
                });
        });

        return unsubscribe; // To stop listening when the component unmounts
    };


    //addComment
    const AddComment = async () => {
        console.log("AddComment")
        // console.log(auth.currentUser)
        const userEmail = auth.currentUser?.email;
        const q = query(collection(firebase.firestore(), 'user'), where('email', '==', userEmail));


        console.log(q)

        const querySnapshot = await getDocs(q);

        console.log("135", querySnapshot);
        const userData = querySnapshot.docs[0].data();

        console.log("userData", userData);

        const name = userData.username;
        const currentDate = new Date(); // Get the current date and time

        // Create an array of month names for formatting
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Format the date and time
        const formattedDate = `${currentDate.getDate()}-${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

        const data = {
            id: auth.currentUser.uid,
            name: name,
            comment: addComment,
            time: formattedDate,
            ProductId: route.params.id,
            rating: defaultRating,
            imageProfile: auth.currentUser.photoURL

            // Add other user data fields as needed
        };

        console.log("data 158" ,data);
        addDoc(collection(firestore, 'comments'), data)
            .then(() => {
                console.log('User data added to Firestore');

                // alert("Correct")
            })
            .catch(error => {
                console.error('Error adding user data to Firestore:', error);
            });

        queryRating();
        setAddComment("")
        setdefaultRating(1);



    }

    const listenForRatingChanges = () => {
        const qComments = query(collection(firebase.firestore(), 'comments'));

        const unsubscribe = onSnapshot(qComments, (querySnapshotComments) => {
            let i = 0;
            let rate = 0;
            let num = 0;
            var meanRate = 0;

            for (i; i < querySnapshotComments.size; i++) {
                const commentId = querySnapshotComments.docs[i].data().ProductId;
                if (route.params.id === commentId) {
                    rate += querySnapshotComments.docs[i].data().rating;
                    num += 1;
                }
            }
            if (rate == 0) {
                meanRate = 0
            }

            else {

                meanRate = Math.floor(rate / num);
            }

            route.params.rating = meanRate;


        });

        return unsubscribe; // To stop listening when the component unmounts
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log(route.params);

            const readRating = listenForRatingChanges();
            // const readStore =  getStore();
            // fetchData()
            const commentsRef = query(collection(firebase.firestore(), 'comments'), orderBy('time', 'desc'));

            // Set up a real-time listener to listen for new comments in Firestore
            const unsubscribe = onSnapshot(commentsRef, (querySnapshot) => {
                const allProduct = [];

                querySnapshot.forEach((doc) => {
                    const commentData = doc.data();

                    if (commentData.ProductId === route.params.id) {
                        allProduct.push(commentData);
                    }
                });
                setComments(allProduct);
            });

            const productRef = firebase.firestore().collection('Restaurant').doc(route.params.id);

            const q = query(collection(firebase.firestore(), 'purchased'), where('productId', '==', route.params?.id));
            const querySnapshot = await getDocs(q);

            let purchasedAmount = 0; // Initialize purchasedAmount

            const purchased = querySnapshot.docs;
            console.log("userData", purchased);
            for (let purData of purchased) {
                console.log("each purchase", purData.data().amount);
                purchasedAmount += purData.data().amount;
                console.log("purchasedAmount", purchasedAmount);
                if (purchasedAmount >= amount) {
                    setBuy(false);
                }
            }

            const amountDoc = await getDoc(productRef);
            // const amount = amountDoc.data().amount
            console.log("test set set");
            setAmount(amountDoc.data().amount);
            console.log("amount", amountDoc.data().amount);

            getStore();
            return () => {
                // Unsubscribe from the real-time listener when the component unmounts
                queryRating();
                if (readRating) {
                    readRating()
                }
                if (unsubscribe) {
                    unsubscribe()
                }

                // readRating();
                // unsubscribe();
                // readStore();
            };
        };

        fetchData(); // Call the async function



    }, []);

    // getStore()

    console.log("but",



    )
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
            <Image source={{ uri: route.params.pic }} style={{ width: '100%', height: responsiveHeight(40) }} />
            <View style={{ margin: 10, }}>
                <Text style={styles.title}>{route.params.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                    {starIcons}
                    <Text style={{ fontSize: 16, bottom: 0 }}> ({route.params.rating}) </Text>

                    {/* <Text style={{ fontSize: 16, bottom: 0 }}> prop.item.rate (5.0) </Text> */}
                </View>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}> {route.params.price} Baht</Text>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: purchasedAmount >= amount ? '#ccc' : '#9276F2' }
                    ]}
                    onPress={() => {
                        if (purchasedAmount >= amount) {
                            console.log('sold out')
                        } else {
                            navigation.navigate('Cart', { title: route.params.title, pic: route.params.pic, price: route.params.price, owner: route.params.owner, productId: productId })
                        }
                    }}
                    disabled={purchasedAmount >= amount}
                >
                    <Text style={styles.buttonText}>
                        {purchasedAmount >= amount ? 'Sold Out' : 'Buy'}
                    </Text>
                </TouchableOpacity>

            </View>

            {/* store account */}
            <View style={{
                borderBottomColor: '#aaa',
                borderBottomWidth: 1,
                paddingVertical: 7,
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
                marginTop: 10,
                borderTopColor: '#aaa',
                borderTopWidth: 1,
                backgroundColor: '#ddd',
                paddingVertical: 10
            }}>
                <Image
                    source={
                        store.photoURL
                            ? { uri: store.photoURL }
                            : require("../../assets/profile.png")
                    }
                    style={[styles.account,]} />
                <Text style={{ fontSize: 20, fontWeight: '600', }}> {store.name} </Text>
            </View>

            {/* Detail Product */}

            <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.content}>

                    {route.params.detail}
                </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20, marginHorizontal: 20 }}>
                <Text style={[styles.header,]}>Condition</Text>
                <Text style={[styles.content,]}>

                    {route.params.policy}
                </Text>
            </View>


            {/* comments */}

            <View style={{ marginTop: 30 }}>
                <Text style={[styles.header, { fontSize: 20, fontWeight: '200' }]}>Comments</Text>
                <CustomRatingBar />
                {/* <Text style={{ textAlign: 'center' }}>{defaultRating + '/' + maxRating.length}</Text> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>

                    <TextInput style={[styles.input, {
                        flex: 1,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                        paddingLeft: 20
                    }]}
                        multiline
                        numberOfLines={3}
                        maxLength={100000}
                        placeholder='Feedback'
                        onChangeText={text => setAddComment(text)} value={addComment} />
                    <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 20 }} onPress={AddComment} disabled={addComment == ""}>
                        <Image source={require("../../assets/send.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>

            </View>

            <FlatList
                data={getComments}
                renderItem={comment}
                numColumns={1}
                keyExtractor={(item, index) => `${item.ProductId}_${index}`}

                style={{ marginBottom: 20 }}
            />

        </ScrollView >
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
        height: responsiveHeight(10),
        marginHorizontal: '5%',
        fontFamily: 'Anuphan'
    },
    title: {
        fontSize: 30,
        fontWeight: 'light',
        textAlign: 'left',
        fontFamily: 'Anuphan',
        justifyContent: 'space-between',
    },
    header: {
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Anuphan',
        // marginHorizontal: 20
    },
    content: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Anuphan',

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

    },
    starImgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    },
    seperator: {
        alignSelf: 'center',
        height: 1,
        width: '95%',
        backgroundColor: '#ddd'
    }
});

export default DetailScreen;