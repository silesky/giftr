import PropTypes from 'prop-types'
import React from 'react'
import Moment from 'moment'
import * as actions from './../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  EventDateInputPicker,
  FriendFormEventNameInput,
  SimpleModalFormWrapper,
  BodyCreateThingModalFooterBtn,
} from './../components/'
import { LayoutAnimation } from 'react-native'
import { List, Title } from 'native-base'

import { IconCreator } from './../icons'
class BodyCreateEventModal extends React.Component {
  static PropTypes = {
    isVisible: PropTypes.bool,
  }
  static defaultProps = {
    date: Moment().add(1, 'day').toDate(),
    name: '',
  }
  constructor (props) {
    super(props)
    this.onCancelPress = this.onCancelPress.bind(this)
    this.onCreateEventPress = this.onCreateEventPress.bind(this)
    this.onEventNameChange = this.onEventNameChange.bind(this)
    this.onEventDateChange = this.onEventDateChange.bind(this)
    this.state = {
      date: this.props.date,
      name: this.props.name,
    }
  }

  onEventDateChange (date) {
    this.setState({ date })
  }
  onEventNameChange (name) {
    this.setState({ name })
  }
  onCreateEventPress () {
    const _eventName = this.state.name
    const _eventDate = this.state.date.toISOString()
    this.props.actions.createEvent(
      this.props.selectedFriendId,
      _eventName,
      _eventDate
    )
    this.onCancelPress()
  }
  onCancelPress () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.bodyModalVisibilityFalse()
  }
  render () {
    const iconCalendar = IconCreator('FA', 'calendar', 30,
      { fontSize: 20, marginRight: 10 }, // fontSize needs to be larger than container
      { marginTop: 5 } // looks ok, but bring icon needs to same level as title
    )
    return (
      <SimpleModalFormWrapper
        modalHeight={420}
        handleClickAway={this.props.actions.bodyModalVisibilityFalse}
        isVisible={this.props.createGiftModalVisibility}
      >
        <List>
          <Title>
            {iconCalendar}
            Create Event
          </Title>
          <FriendFormEventNameInput
            eventNameList={this.props.eventNameList}
            placeholder={'Birthday, graduation, etc'}
            eventName={this.state.name}
            handleOnChangeText={this.onEventNameChange}
          />
          <EventDateInputPicker
            selectedEventDate={this.state.date}
            handleOnEventDateChange={this.onEventDateChange}
          />
          <BodyCreateThingModalFooterBtn
            okDisabled={!this.props.selectedFriendId}
            onOkPress={this.onCreateEventPress}
            onCancelPress={this.onCancelPress}
          />
        </List>
      </SimpleModalFormWrapper>
    )
  }
}
const mstp = state => {
  return {
    eventNameList: state.user.eventNameList,
    createGiftModalVisibility: state.visible.createEventModalVisibility,
    selectedFriendId: state.visible.selectedFriendId,
  }
}
const mdtp = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})
const connected = connect(mstp, mdtp)(BodyCreateEventModal)
export { connected as BodyCreateEventModal }
