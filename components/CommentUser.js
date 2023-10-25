import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const comment = ({props,navigation}) => {
    
    const starIcons = [];
  
    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

        if(i < props.item.rating){
            starIcons.push(
              <AntDesign key={i} name="star" size={24} color="orange" />
              
            );
        }
        else{
            starIcons.push(
              <AntDesign key={i} name="staro" size={24} color="orange" />

            )
        }
    }
   
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'colum', marginTop: 20 }}>
                <View style={styles.review}>
                    {/* <Text style={{ fontSize: 20, }}>เขียนรีวิวให้ บ้านคุณพิสมัย</Text> */}
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {starIcons}
                        <View style={styles.date}>
                            <Text style={{ marginLeft: 95, }}>{props.item.time}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10, }}>
                        <Text style={{ width: 320, marginBottom: 30 }}>{props.item.detail}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image
                            source={{uri: props.item.commentImg}}
                            style={{ width: 150, height: 100, marginLeft: 10, }}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 35,
        backgroundColor: "#F4EEEE",
    },
    review: {
        borderRadius: 10,
        padding: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        margin: 10,
    },
});


export default comment;