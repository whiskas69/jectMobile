import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { auth, firebase, firestore } from '../database/firebaseDB';



const Test = ({navigation}) => {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
    
            })
            .catch(error => console.log(error.message))
    }
    return (
        <View>
        <Text style={{marginTop:"50%", fontSize:100}}>Hiiiiiii</Text>
        <Button
  onPress={handleSignOut}
  title="Learn More"
  color="#841584"
/>
        </View>
        
    );
}
export default Test