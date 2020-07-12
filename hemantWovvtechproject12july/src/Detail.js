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
               <Text>
                   {this.state.data1.approvedTime}
               </Text>
               {/* </Form> */}
            </Form>
        )
    }
}


const styles = StyleSheet.create({
    component: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Detail
