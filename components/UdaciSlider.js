/**
 * Created by rahul on 1/10/17.
 */
import React from 'react'
import {View,Slider,Text} from 'react-native'

export default function UdaciSlider({max,unit,step,value,onChange}) {
    console.log(max,unit,step,value)
    return(
        <View>
            <Slider
              step={step}
              value={value}
              maximumValue={max}
              minimumValue={0}
              onValueChange={onChange}
            />
            <Text>{value+' '+unit}</Text>
        </View>
    )
}/**
 * Created by rahul on 1/10/17.
 */
