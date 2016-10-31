import React, { Component } from 'react';
import { 
    AppRegistry
} from 'react-native';
import {
    Container,
    Card,
    CardItem,
    Header,
    List,
    ListItem,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    Text
} from 'native-base';
import Drawer from 'react-native-drawer';
import { lipsum } from './util';
import { store } from './store';
import * as actions from './actions';



export class CardExample extends Component {
    render() {
        return (
           <Container >
               <Content>
                   <Card>
                       <CardItem header>
                           <Text>Card Header</Text>
                       </CardItem>
                       <CardItem>
                           <Text>{lipsum}</Text>
                       </CardItem>
                   </Card>
               </Content>
           </Container>

        );
    }
}
const FriendListItem = ({friendName}) => {
    return (
           <ListItem button onPress={() => store.dispatch(actions.increment())}>
                <Text>{friendName}</Text>
            </ListItem>    
        )
}

const FriendList = () => {
    return (
    <Container>
        <Header>
            <Title>Friends</Title>
        </Header>
        <Content>
            <List>
                <FriendListItem friendName='Daniel Johnston'/>
                <FriendListItem friendName='Rick Ross'/>
                <FriendListItem friendName='Jim Jameson'/>
            </List>
        </Content>
    </Container>
        )
}


class AppContainer extends Component {
    constructor(props) {
      super(props);
    
    }
    render() {
        return (
            <Drawer
                tapToClose={true}
                openDrawerOffset={0.6 /* % gap on right side of drawer */}
                panCloseMask={0.6 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
                closedDrawerOffset={-3}
                ref={(ref) => this._drawer = ref}
                type='static'
                content={<FriendList />}
                >
                <Container style={{backgroundColor: 'white'}}   > 
                    <Header>
                        <Button 
                        onPress={() => this._drawer.open()} 
                        transparent>
                            <Icon name='ios-menu' />
                        </Button>
                        <Title>Header</Title>
                    </Header>
                    <Content>
                        <CardExample />
                        <CardExample />
                        <CardExample />
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button transparent>
                                <Icon name='ios-call' />
                                  <Text>Footer HERE</Text>
                            </Button>  
                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);