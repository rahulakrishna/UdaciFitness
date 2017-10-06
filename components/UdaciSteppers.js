/**
 * Created by rahul on 1/10/17.
 */
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {Entypo,FontAwesome} from '@expo/vector-icons'
import {purple,white} from '../utils/colors'

export default function UdaciSteppers({max,unit, step, value, onIncrement, onDecrement}) {
    return(
        <View style={[styles.row,{justifyContent: 'space-between',padding: 10}]}>
            <TouchableOpacity onPress={onDecrement} style={styles.androidBtn}>
              <FontAwesome
                name='minus'
                size={30}
                color={white}
              />
            </TouchableOpacity>
            <Text style={styles.value}>{value+' '+unit}</Text>
            <TouchableOpacity onPress={onIncrement} style={styles.androidBtn}>
              <FontAwesome
                name='plus'
                size={30}
                color={white}
              />
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
  row:{
    flexDirection: 'row',
    flex:1,
    alignItems:'center'
  },
  androidBtn:{
    margin: 5,
    backgroundColor: purple,
    padding:10,
    borderRadius: 5
  },
  value:{
    fontSize: 24,
    fontWeight: 'bold'
  }
})