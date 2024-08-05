import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Icon } from 'react-native-elements';
import BookDetailScreen from './screens/BookDetail';
import BooksListScreen from './screens/BooksList';
import BorrowedScreen from './screens/Borrowed';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BooksList"
        component={BooksListScreen}
        options={{ headerTitle: 'Books List' }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ headerTitle: 'Book Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" type="font-awesome" color={color} size={size} />
            ),
            headerShown:false
          }}
        />
        <Tab.Screen
          name="Borrowed"
          component={BorrowedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" type="font-awesome" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
