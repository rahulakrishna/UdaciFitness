import React from 'react'
import { View,StatusBar } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import History from './components/History'
import {TabNavigator,StackNavigator} from 'react-navigation'
import {purple,white} from './utils/colors'
import {FontAwesome,Ionicons} from '@expo/vector-icons'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {Constants} from 'expo'
import EntryDetail from './components/EntryDetail'

const Tabs=TabNavigator({
    History:{
        screen:History,
        navigationOptions:{
            tabBarLabel:'History'
        }
    },
    AddEntry:{
        screen:AddEntry,
        navigationOptions:{
            tabBarLabel:'Add Entry'
        }
    }
},{
    tabBarOptions:{
        activeTintColor:white,
        style:{
            backgroundColor:purple
        }
    }
})

const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs
    },
    EntryDetail:{
        screen:EntryDetail,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            }
        }
    }
})

function UdaciStatusBar({backgroundColor,...props}) {
    return(
        <View style={{backgroundColor:backgroundColor,height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {
  render() {
    return (
    	<Provider store={createStore(reducer)}>
	      <View style={{flex:1}}>
            <UdaciStatusBar backgroundColor={purple}/>
	        <MainNavigator/>
	      </View>
      	</Provider>
    );
  }
}
