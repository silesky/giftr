import React from 'react'
import { Dimensions } from 'react-native'
import * as actions from './../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input } from 'native-base'
import { GiftCardInputGiftDescription, GiftCardInputTitle, SimpleModalFormWrapper } from './../components/'
import { getFriendByFriendId } from './../utils/'
import { View } from 'react-native'
import {
  Body,
  Card,
  CardItem,
  Text,
  List,
  ListItem,
  Container,
  Footer,
  Content,
  Header,
  Title,
  InputGroup,
  Button,
  Icon
} from 'native-base'

class BodyCreateGiftModal extends React.Component {
  static PropTypes = {
    CreateGiftModalIsVisible: React.PropTypes.bool
  }

  onCreateGiftPress () {
    const _giftTitleInput = this.refs.giftTitleInput._textInput._lastNativeText
    const _giftDescInput = this.refs.giftDescInput._textInput._lastNativeText
    this.props.actions.createGift(this.props.selectedFriendId, _giftTitleInput, _giftDescInput)
    this.props.actions.createGiftModalVisibilityFalse();
  }
  render () {
    const { height, width } = Dimensions.get('window') // gets width of entire display
    const { latestGift, selectedFriendId } = this.props
    return (
      <View
        style={{
          position: 'absolute',
          height: height,
          width: width,
          zIndex: 999
        }}>
        <SimpleModalFormWrapper
          height={170}
          handleClickAway={this.props.actions.createGiftModalVisibilityFalse}
          isVisible={this.props.createGiftModalVisibility}>
          <List>
          <Title style={{ marginTop: 10 }}>Create Gift</Title>
          <ListItem>
          <InputGroup>
            <Input
              ref="giftTitleInput"
              placeholder="Title..."
              inlineLabel label="Title"
              placeholderTextColor='lightgrey'
              multiline={false}
              />
          </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
            <Input
              ref="giftDescInput"
              placeholder="Description..."
              inlineLabel label="Description"
              placeholderTextColor='lightgrey'
              multiline={false}
              onSubmitEditing={() => this.onCreateGiftPress()}
               />
          </InputGroup>
        </ListItem>
        <View style={{marginTop: 10, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row'}}>
           <Button danger
            onPress={() => this.props.actions.createGiftModalVisibilityFalse()}>
            Cancel
            </Button>
            <Button
                onPress={() => this.onCreateGiftPress()}
                style={{marginLeft: 5}} success>
                OK
            </Button>
          </View>
          </List>
        </SimpleModalFormWrapper>
      </View>
    )
  }
}
const mstp = (state) => {
  const { gifts } = getFriendByFriendId(state, state.visible.selectedFriendId)
  return {
    latestGift: gifts[gifts.length - 1],
    createGiftModalVisibility: state.visible.createGiftModalVisibility,
    selectedFriendId: state.visible.selectedFriendId
  }
}
const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mstp, mdtp)(BodyCreateGiftModal)