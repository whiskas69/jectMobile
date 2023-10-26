import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { firebase, firestore } from "../../database/firebaseDB";
// import 'firebase/firestore';
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';
// import ShowProduct from '../components/ShowProduct';

const Categories = ({ navigation }) => {
    const [data, setData] = useState([]);

    // const getCategories = async () => {
    //     try {
    //         const querySnapshot = await firebase.firestore().collection("Categories")
    //             .orderBy("id", "asc").get();
    //         const categoriesData = querySnapshot.docs.map((doc) => doc.data());
    //         setData(categoriesData);
    //         // console.log("llllllll", categoriesData)

    //     } catch (error) {
    //         console.error('Error fetching Categories:', error);
    //     }
    // }
    // useEffect(() => {
    //     getCategories()
    // })
    // const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState("");
  const [cate, setCate] = useState("");

  useEffect(() => {
    const q = query(collection(firebase.firestore(), 'Restaurant'));

    // Create a real-time listener to fetch and update data
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productData = [];
      const productAll = [];

      snapshot.forEach((doc) => {
        const dataPro = doc.data();
        const dataAll = {
          name: dataPro.name,
          amount: dataPro.amount,
          category: dataPro.categ,
          id: doc.id,
          detail: dataPro.detail,
          image: dataPro.image,
          rating: dataPro.rating,
        };
        if (dataPro.categ === cate) {
          productData.push(dataAll);
        } else {
          productAll.push(dataAll);
        }
      });

      if (productAll.length === snapshot.size) {
        setCategoryData(productAll);
      } else {
        setCategoryData(productData);
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
        pic={itemData.item.image}
        price={itemData.item.price}
        rating={itemData.item.rating}

        onSelectProduct={() => {
          // console.log(itemData.item)
          navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.image, detail: itemData.item.detail, policy: itemData.item.condition, price: itemData.item.price, id: itemData.item.id, rating: itemData.item.rating, owner: itemData.item.owner, mail: itemData.item.mail }, setCate(""));
        }}
      />
    );
  }

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    
                    <View style={styles.categoryGreen} >
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("Drink")} 
                        >
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaBaKLnm9Er6p1IMYV5dgObNXZQRbOAA7RJBZNGnpibGxDlivA6cuSOJwcaiWEC4he4GrZBjMenPD-W7CrWNNCspR1VKtA=w1825-h924" }} />
                                <Text style={styles.txt}> เครื่องดื่ม </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryYellow} >
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("Sweet")}
                         >
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaAIGlXcREmNu1bjUGfIoKBiJYlbK2Q0doFpW1_WuxCrtoYVE7TGPOaO-mAsH8mewLnq0Dsrud-YuHd9l_lRL-E1-CE3ww=w1825-h924" }} />
                                <Text style={styles.txt}> ของหวาน </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryPink} >
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("Snack")} 
                        >
                            <View style={{ justifyContent: "center", alignItems: "center", }}
                            >
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaDQ0RhK2xxXyJcvn4LmmjZmXDFnbc_dXzh3mp0DCToqZWfisMSWleU8foZvkh5Gz2kvP9UQFMQJOw6u9ugIq_Lp6FH49w=w1825-h924" }} />
                                <Text style={styles.txt}> ของกินเล่น </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.categoryGreen} >
                        {/* <View></View> */}
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("CookedToOrder")} 
                        >
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaA31etQQUMbMi3OxYqSaybIcnKjQ0COhevbdjiXTX3amKf5fXl5bTm5XsTMAAwesVeUB5umDo3D7a4wX-115wQKmCOL_w=w1825-h924?fbclid=IwAR3ZDwc146QYMOHlao0-dAyThUP94lEVRgvRG4vHPV8agFU_3UXuSO3MqLw" }} />
                                <Text style={styles.txt}> อาหารตามสั่ง </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryYellow} >
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("Noodle")} 
                        >
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaBPlPGTqcJor13LO6675qtshlJCsxaFU79A1MzXXhxuLkCYo8l8mCG2re6-i6E-ipuTgWXqqqfosTFQQIjZHBkQXwgJ=w1825-h924" }} />
                                <Text style={styles.txt}> ก๋วยเตี๋ยว </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryPink} >
                        <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} 
                        onPress={() => navigation.navigate("PorkPanAndShabu")} 
                        >
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Image style={styles.pic} source={{ uri: "https://lh3.googleusercontent.com/drive-viewer/AK7aPaCTXfS9CeVGT2aKw3Q1U2iv5VJznUb0BTGVH1x7yAyYMa9WNDgryUiM6REcScgBI1avfIWvGSCMCm2u-llE4rgZbLdKUA=w1825-h924" }} />
                                <Text style={styles.txt}> หมูกะทะ และชาบู  </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

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
    categoryGreen: {
        height: 165,
        width: 165,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#96C291',
        margin: 10,
    },
    categoryYellow: {
        height: 165,
        width: 165,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFDBAA',
        margin: 10,
    },
    categoryPink: {
        height: 165,
        width: 165,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFB7B7',
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