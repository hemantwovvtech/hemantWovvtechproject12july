import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Form, Text } from 'native-base'

export class Detail extends Component {
    constructor(props) {
        super(props);
        let data = this.props.route.params.data;
        // alert(JSON.stringify(data))
    
        this.state = {
             data1: data
        }
    }
    
    render() {
        return (
           <Form style={styles.component}>
               {/* <Form> */}
               <Text style={{padding: 10}}>
                   {JSON.stringify(this.state.data1)}
               </Text>
               {/* </Form> */}
            </Form>
        )
    }
}


const styles = StyleSheet.create({
    component: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Detail
