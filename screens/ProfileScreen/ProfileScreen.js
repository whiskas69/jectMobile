import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Navbar, Pressable } from 'react-native';
import { firebase, auth, storage } from "../../database/firebaseDB"


const Profile = ({ navigation }) => {
    const user = firebase.auth().currentUser;
    const [id, setid] = useState("");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [data, setData] = useState([]);

    const userData = () => {
        const collectionRef = firebase.firestore().collection("user");
        collectionRef.get()
            .then((querySnapshot) => {
                const item = [];
                querySnapshot.forEach((res) => {
                    let info = res.data();
                    if (info.email === user.email) {
                        item.push({
                            key: res.id,
                            name: info.username,
                            email: info.email,
                            profile: info.profile
                        });
                        setid(res.id),
                            setUsername(info.username),
                            setEmail(info.email),
                            setProfile(info.profile)
                    }
                });
                setData(item)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    };
    // console.log("user ",collectionRef)

    useEffect(() => {
        userData();
    }, []);

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
    
            })
            .catch(error => console.log(error.message))
    }

    return (
        <View style={styles.container}>

<View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 5, }}>
                {profile ? (
                    <Image
                        source={{ uri: profile }}
                        style={{ width: 80, height: 80, marginLeft: 20, }}
                    />
                ) : null}
                
                <View style={{ marginTop: 25, marginLeft: 20, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{username}</Text>
                </View>
            </View>


            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate('History')}>
                {/* ใส่ onPress={onPress} ใน Pressable*/}
                <Text style={{ marginLeft: 25 }}>ประวัติการรีวิว</Text>
                <Text style={{ marginLeft: 185 }}> {'>'} </Text>
            </Pressable>

            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate("Edit", { key: data[0].key })}>
                {/* ใส่ onPress={onPress} ใน Pressable*/}
                <Text style={{ marginLeft: 25, }}>แก้ไขข้อมูลส่วนตัว</Text>
                <Text style={{ marginLeft: 165, }}> {'>'} </Text>
            </Pressable>

            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate('Password')}>
                {/* ใส่ onPress={onPress} ใน Pressable*/}
                <Text style={{ marginLeft: 25, }}>เปลี่ยนรหัสผ่าน</Text>
                <Text style={{ marginLeft: 185, }}> {'>'} </Text>
            </Pressable>


            {/* <Button title="Logout"  /> */}
            <Pressable style={styles.buttonLogout} onPress={handleSignOut}>
                <Text style={{ color: "red", }}>ออกจากระบบ</Text>
            </Pressable>


        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: "#F4EEEE",
    },
    aboutMe: {
        backgroundColor: "#FFDBAA",
        marginBottom: 25,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonLogout: {
        backgroundColor: "#FFDBAA",
        marginTop: 200,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Profile;