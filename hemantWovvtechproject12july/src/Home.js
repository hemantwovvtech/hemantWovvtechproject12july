import React, { Component } from 'react'
import { Container, Input, Text, Form, Content, Item, Label, Button, CardItem, Body, ListItem, Card } from 'native-base'
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             news: [],
             current_page: 1
        }
    }

    componentDidMount = () => {
        this.getNews()
        this.interval = setInterval(()=> this.getNews(), 10000)
       
    }

    getNews = async () => {

        fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
        {
            method: 'GET'
        })
        .then((response)=>response.json())
        .then((resposeJson)=>{
            console.log(resposeJson);
            this.setState({news: resposeJson.hits})
        }).catch((error)=>{
            console.log(error)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }
    // getNews = async () => {

    //     fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
    //     {
    //         method: 'POST'
    //     })
    //     .then((response)=>response.json())
    //     .then((resposeJson)=>{
    //         console.log(resposeJson);
    //         this.setState({news: resposeJson.hits})
    //     })
    // }

    renderItem = ({item, index}) => (
        <TouchableOpacity style={{borderRadius: 10}} onPress={()=> this.props.navigation.navigate('Detail',{data: item})}>
        <Card style={{flex: 1, }}>
        <CardItem style={{ width: '100%', padding: 10,borderRadius: 10}}>
        {/* <Body> */}
        <Form style={{flexDirection: 'column'}}>
  <Form style={{flexDirection :'row'}}>

        <Text> Title: </Text>
      <Text style={{width: '70%', fontWeight: 'bold'}}>
          {item.title}
      </Text>
      </Form>
      <Form style={{flexDirection :'row'}}>

<Text> URL: </Text>
<Text style={{width: '70%', fontWeight: 'bold'}}>
{item.url}
</Text>
</Form>
<Form style={{flexDirection :'row'}}>

<Text> created_at: </Text>
<Text style={{width: '70%', fontWeight: 'bold'}}>
{item.created_at}
</Text>
</Form>
<Form style={{flexDirection :'row'}}>

<Text> author name: </Text>
<Text style={{width: '70%', fontWeight: 'bold'}}>
{item.author}
</Text>
</Form>
</Form>
        {/* </Body> */}
      </CardItem>
      </Card>

      </TouchableOpacity>
    )

    loadMoreNews = () => {
        if (this.state.current_page != this.state.news[0].page) {
          this.setState(
            {
            //   loadingFooterPod: true,
              current_page_pod: this.state.current_page + 1,
            },
            () => {
              this.getNews();
            },
          );
        }
      };
    
    render() {
        return (
           <Form style={styles.component}>
               
               <Form style={{flexDirection: 'row', padding: 10}}>
                {/* <Item fixedLabel> */}
              <Input placeholder='Search by Title, Url, author name' onChangeText={(text) => this.setState({search: text})} style={{borderWidth: 1, width: "30%", justifyContent: 'center', alignSelf: 'center', paddingLeft: 0, paddingRight: 0}}/>
            {/* </Item> */}
            <Button success style={{marginLeft: 5}}><Text> Search </Text></Button>
               </Form>

            <Button success style={{}} onPress={()=> this.getNews()}><Text> Refresh </Text></Button>
            {/* <ScrollView> */}

           
               

<FlatList
data={this.state.news}
renderItem={this.renderItem}
extraData={this.state}
// numColumns={2}
onEndReachedThreshold={0.5}
onEndReached={() => {
  this.loadMoreNews();
}}
// ListFooterComponent={this.renderFooterPod}
/>
           
          {/* </ScrollView> */}

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
export default Home
