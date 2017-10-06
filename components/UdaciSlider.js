/**
 * Created by rahul on 1/10/17.
 */
import React from 'react'
import {View,Slider,Text,StyleSheet} from 'react-native'

export default function UdaciSlider({max,unit,step,value,onChange}) {
    console.log(max,unit,step,value)
    return(
        <View style={styles.row}>
            <Slider
              step={step}
              value={value}
              maximumValue={max}
              minimumValue={0}
              onValueChange={onChange}
              style={
                {
                  flex: 1
                }
              }
            />
            <Text style={styles.value}>{value+' '+unit}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
  row:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center'
  },
  value:{
    fontSize: 24,
    fontWeight:'bold',
    alignItems:'flex-end'
  }
})