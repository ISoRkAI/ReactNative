import { View, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import PostsScreen from "./PostsScreen/PostsScreen.jsx";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen.jsx";
import ProfileScreen from "./ProfileScreen/ProfileScreen.jsx";

export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                marginLeft: 90,
              }}
            >
              <Feather
                name="grid"
                size={24}
                color={focused ? color : "rgba(33, 33, 33, 0.8) "}
              />
            </View>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                flex: 1,
                width: 70,
                maxHeight: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF6C00",
                borderRadius: 20,
              }}
            >
              <Feather name="plus" size={24} color="#ffffff" />
            </View>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginRight: 90 }}>
              <Feather
                name="user"
                size={24}
                color={focused ? color : "rgba(33, 33, 33, 0.8) "}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
