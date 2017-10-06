/**
 * Created by rahul on 1/10/17.
 */
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {Entypo,FontAwesome} from '@expo/vector-icons'

export default function UdaciSteppers({max,unit, step, value, onIncrement, onDecrement}) {
    return(
        <View>
            <TouchableOpacity onPress={onDecrement}>
              <FontAwesome
                name='minus'
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
            <Text>{value+' '+unit}</Text>
            <TouchableOpacity onPress={onIncrement}>
              <FontAwesome
                name='plus'
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
        </View>
    )
}