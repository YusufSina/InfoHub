import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { View } from 'react-native'
import Posts from '../screens/HomeScreen/Posts';
import { AntDesign } from '@expo/vector-icons'
import AddPost from '../screens/AddPostScreen/AddPost';
import MyPoints from '../screens/MyPointsScreen/MyPoints';
import PostWebView from '../screens/HomeScreen/PostWebView';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Posts" component={Posts} />
            <HomeStack.Screen name="PostWebView" component={PostWebView} />
            {/*<HomeStack.Screen name="PostDetail" component={ } />*/}
        </HomeStack.Navigator>
    );
}

const AddPostStack = createStackNavigator();

function AddPostStackScreen() {
    return (
        <AddPostStack.Navigator headerMode="none">
            <AddPostStack.Screen name="Add" component={AddPost} />
        </AddPostStack.Navigator>
    );
}

const MyPointsStack = createStackNavigator();

function MyPointsStackScreen() {
    return (
        <MyPointsStack.Navigator headerMode="none">
            <MyPointsStack.Screen name="MyPoints" component={MyPoints} />
            {/*<MyPointsStack.Screen name="PostDetail" component={ } />*/}
        </MyPointsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();


export default function PrivateNavigation() {

    const handleTabBarIcon = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
            }
            else if (route.name === 'Add') {
                iconName = focused ? 'plus' : 'plus';
                return <View style={{ backgroundColor: "#21618C", padding: 10, borderRadius: 50 }}>
                    <AntDesign name="plus" size={20} color="white" />
                </View>
            }
            else if (route.name === 'MyPoints') {
                iconName = focused ? 'tagso' : 'tagso';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
        },

    })

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={handleTabBarIcon} tabBarOptions={{ activeTintColor:"#21618C", showLabel: false, inactiveTintColor: 'grey', }}>

            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Add" component={AddPostStackScreen} />
            <Tab.Screen name="MyPoints" component={MyPointsStackScreen} />

        </Tab.Navigator>
    )
}
