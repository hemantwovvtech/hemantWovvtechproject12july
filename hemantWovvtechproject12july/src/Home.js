import React, { Component } from 'react'
import { Container, Input, Text, Form, Content, Item, Label, Button, CardItem, Body, ListItem, Card, Fab, Icon } from 'native-base'
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             news: [],
             current_page: 0,
             newsPage: 0,
             search: ''
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
            this.setState({news: resposeJson.hits, current_page: resposeJson.page})
        }).catch((error)=>{
            console.log(error)
        })
    }


    search = (search) => {
        var title = search


        var temp = this.state.news.filter(item => item.title.includes(title) || item.author.includes(title) || item.created_at.includes(title))

        this.setState({news: temp})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }


    // getNews1 = async () => {

    //     fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0',
    //     {
    //         method: 'POST',
    //         body: this.state.search
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
        if (this.state.current_page != this.state.newsPage) {
          this.setState(
            {
            //   loadingFooterPod: true,
              current_page: this.state.current_page + 1,
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
            <Button success style={{marginLeft: 5}} onPress={()=> this.search(this.state.search)}><Text> Search </Text></Button>
               </Form>

            <Button success style={{}} onPress={()=> this.getNews()}><Text> Refresh </Text></Button>
            {/* <ScrollView> */}

           
               

<FlatList
data={this.state.news}
renderItem={this.renderItem}
extraData={this.state}
// numColumns={2}
onEndReachedThreshold={1}
onEndReached={() => {
  this.loadMoreNews();
}}
// ListFooterComponent={this.renderFooterPod}
/>
<Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="filter" type="FontAwesome" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={()=> this.search("A")}>
              <Icon name="create-outline" type="ionicons"/>
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={()=> this.search(this.state.news[0].created_at)}>
            <Icon name="create-outline" type="ionicons"/>
            </Button>
           
          </Fab>
           
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
