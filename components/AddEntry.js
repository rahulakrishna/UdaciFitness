import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import {getMetricMetaInfo,timeToString,getDailyReminderValue} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry,removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {white,purple} from '../utils/colors'

function SubmitBtn({onPress}){
  return(
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS==='ios'? 
      styles.iosSubmit:
      styles.androidSubmit
    }  
    >
      <Text>
        Submit
    </Text>
    </TouchableOpacity>
  )
}

class AddEntry extends React.Component {
    state={
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
    }
    increment=(metric)=>{
        console.log(metric)
        const {max,step}=getMetricMetaInfo(metric)
        this.setState((state)=>{
            const count=state[metric]+step
            return{
                ...state,
                [metric]:count>max?max:count
            }
        })
    }
    decrement=(metric)=>{
        const {step}=getMetricMetaInfo(metric)
        this.setState((state)=>{
            const count=state[metric]-step

            return{
                ...state,
                [metric]:count<0?0:count
        }
        })
    }
    slide=(metric,value)=>{
        this.setState((state)=>{
            return{
                ...state,
                [metric]:value
            }
        })
    }
    submit=()=>{
      const key=timeToString()
      const entry=this.state
      this.props.dispatch(addEntry({
        [key]:entry
      }))
      this.setState(()=>({run:0,bike:0,swim:0,sleep:0,eat:0}))
      submitEntry({key,entry})
    }
    reset=()=>{
        const key=timeToString()
        resetEntry({key})
        this.props.dispatch(addEntry({
            [key]:getDailyReminderValue()
        }))
    }
    render(){
        console.log(this.props.alreadyLogged)
        const metaInfo=getMetricMetaInfo()
        if(this.props.alreadyLogged){
          return(
            <View>
              <Ionicons
                name='ios-happy-outline'
                size={100}
              />
              <Text>You already logged your information for today.</Text>
              <TextButton
                onPress={this.reset()}
              >
                Reset
              </TextButton>
            </View>
          )
        }
        else{
            return(
            <View>
                <DateHeader
                  date={(new Date()).toLocaleString()}
                />
                {Object.keys(metaInfo).map((key)=>{
                    const {getIcon,type,max,...rest}=metaInfo[key]
                    const value=this.state[key]
                    return(
                        <View key={key}>
                            {getIcon()}
                            {type==='slider'
                            ? <UdaciSlider
                                value={value}
                                onChange={(value)=>this.slide(key,value)}
                                max={max}
                                {...rest}
                              />
                            : <UdaciSteppers
                                value={value}
                                onIncrement={()=>this.increment(key)}
                                onDecrement={()=>this.decrement(key)}
                                max={max}
                                {...rest}
                              />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
        }
    }
}

const styles=StyleSheet.create({
    androidSubmit:{
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iosSubmit:{
        backgroundColor: purple,
        padding:10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    submitBtnText:{
        color:white,
        fontSize: 22,
        textAlign: 'center'
    }
})

function mapStateToProps(state){
    const key=timeToString()
    return{
        alreadyLogged:state[key] && typeof state[key].today==='undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)
