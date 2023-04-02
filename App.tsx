import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import RulesPage from './src/pages/RulesPage';
import CheckList from './src/pages/CheckList';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RulesPage"
            component={RulesPage}
            options={{
              title: 'RulesPage',
            }}
          />
          <Stack.Screen
            name="CheckList"
            component={CheckList}
            options={{
              title: 'CheckList',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
