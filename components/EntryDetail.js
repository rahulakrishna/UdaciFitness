/**
 * Created by rahul on 13/10/17.
 */
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'
import {addEntry} from '../actions'
import {removeEntry} from '../utils/api'
import {timeToString,getDailyReminderValue} from '../utils/helpers'
import Textutton from './TextButton'

class EntryDetail extends React.Component{
    reset=()=>{
        const {remove,goBack,entryId}=this.props
        remove()
        goBack()
        removeEntry(entryId)
    }
    shouldComponentUpdate(nextProps){
        return nextProps.metrics !== null && !nextProps.metrics.today
    }
    render(){
        const {metrics}=this.props
        console.log(metrics)
        return(
            <View style={styles.container}>
                <MetricCard metrics={metrics}/>
                <Textutton onPress={this.reset}>
                    Reset
                </Textutton>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white,
        padding:15
    }
})

function mapStateToProps(state,{navigation}) {
    const {entryId}=navigation.state.params
    return{
        entryId,
        metrics:state[entryId]
    }
}

function mapDispatchToProps(dispatch,{navigation}) {
    const {entryId}=navigation.state.params
    return{
        remove:()=>dispatch(addEntry({
            [entryId]:timeToString()===entryId ? getDailyReminderValue() : null
        })),
        goBack:()=>navigation.goBack()
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EntryDetail)