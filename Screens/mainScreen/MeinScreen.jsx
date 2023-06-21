import { View, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import PostsScreen from "./PostsScreen/PostsScreen.jsx";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen.jsx";
import ProfileScreen from "./ProfileScreen/ProfileScreen.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations.js";

export const MainScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
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
          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              title="exit"
              style={{ marginRight: 16 }}
            >
              <View>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color }) => (
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
        name="Публикации"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: () => (
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
          tabBarIcon: ({ focused, color }) => (
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
