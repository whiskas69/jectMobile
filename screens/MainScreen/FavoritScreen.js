import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { firebase, auth, firestore } from "../../database/firebaseDB";

import RestaurantItem from "../../components/RestaurantfavItem ";

class FavoriteScreen extends Component {
    constructor() {
        super();

        this.favCollection = firebase.firestore().collection("Favorite");

        this.state = {
            favorite_list: [],
        };
    }

    getCollection = (querySnapshot) => {
        const all_data = [];
        querySnapshot.forEach((res) => {
            const { id, name, category_name, review, detail, category_id, picture, rating, telephone } = res.data();

            all_data.push({
                key: res.id,
                id,
                name,
                category_name,
                review,
                detail,
                category_id,
                picture,
                rating,
                telephone
            });
        });

        this.setState({
            favorite_list: all_data,
        });
    };

    componentDidMount() {
        this.unsubscribe = this.favCollection.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    navigateToViewDetaile = (item) => {
        this.props.navigation.navigate("Restaurant Detail", { key: item });
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.favorite_list.map((item, i) => {
                        return (
                            <RestaurantItem key={i} list={item} />
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4EEEE',
        marginTop: 10
    }
});

export default FavoriteScreen;