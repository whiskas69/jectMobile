import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, Button, ScrollView,Input } from 'react-native'
import { firebase, auth, storage } from "../../database/firebaseDB";
import * as ImagePicker from 'expo-image-picker';
import { uploadBytesResumable, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, query, where, doc, getDoc, updateDoc, deleteDoc, } from "firebase/firestore";

const EditMe = ({ navigation, route }) => {
    console.log("############################### editUser page ###############################")
    const [id, setid] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isImageError, setIsImageError] = useState(false);
    const user = firebase.auth().currentUser;

    const fetchData = () => {
        const collectionRef = firebase.firestore().collection("user");
        collectionRef.get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((res) => {
                    let info = res.data();
                    if (info.email === user.email) {
                        items.push({
                            key: res.id,
                            username: info.username,
                            email: info.email,
                            photoURL: info.photoURL
                        });
                        setid(res.id)
                        setUsername(info.username)
                        
                        setEmail(info.email)
                        setProfile({ uri: info.photoURL })
                    }
                });
                setData(items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                console.log("finally")
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets)
        if (result.assets == null) {
            setIsImageError(true)
        }
        const source = { uri: result.assets[0].uri };
        setProfile(source);
        if (source == "") {
            setIsImageError(true)
        }
    }
    console.log("setProfile", profile)

    console.log("data 3 ????", data);
    const updateUser = async () => {
        const blob = await fetch(profile.uri).then((response) => response.blob());
        const filename = Date.now() + '.jpg';
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);
        try {
            const userRef = doc(firebase.firestore(), "user", email);
            await updateDoc(userRef, {
                id: id,
                username: username,
                
                email: email,
                
                photoURL: downloadURL
            });
            await user.updateProfile({
                photoURL: downloadURL,
            });
            console.log("อัปเดตข้อมูลเรียบร้อยแล้ว");
            Alert.alert(
                "Update Success",
                "New information was updated!!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('Profile'); // Replace 'Admin' with the correct screen name
                        },
                    },
                ]
            );
        } catch (e) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", e);
        }
    };
    console.log("photoURL:",user.photoURL)

    return (
      <View style={styles.container}>
  
        <View style={{ alignItems: 'center', marginBottom: 25, marginTop: 25, }}>
          {profile ? (
            <Image
              source={{ uri: profile.uri }}
              style={{ width: 80, height: 80, marginLeft: 20, }}
            />
          ) : null}
          <TouchableOpacity onPress={pickImage} style={{ marginTop: 25, marginLeft: 20, }} >
            <Text style={{ color: "#176B87", fontSize: 16, }}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.name}>
          <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>ชื่อ</Text>
          <Input
            placeholder={"ชื่อ"}
            value={username}
            onChangeText={(val) => setUsername(val)}
          />
        </View>
        <View style={styles.email}>
          <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>อีเมล</Text>
          <Input
            placeholder={"อีเมล"}
            value={email}
            onChangeText={(val) => setEmail(val)}
            editable={false}
          />
        </View>
  
        <Pressable style={styles.confirm} onPress={updateUser}>
          <Text>ยืนยัน</Text>
        </Pressable>
  
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      backgroundColor: "#F4EEEE",
    },
    confirm: {
      backgroundColor: "#FFDBAA",
      marginTop: 200,
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  export default EditMe;
  