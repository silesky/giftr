import React from 'react'

import {
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
} from 'react-native'

import Moment from 'moment'

const DatePicker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

export const FriendFormEventDatePickerCalendar = ({
    selectedEventDate,
    onEventDateInputChange,
  }) => {

  return (
      <DatePicker
        date={ Moment(selectedEventDate).toDate() /* needs to be a date object */ }
        onDateChange={ (input) => onEventDateInputChange(input) }
        mode="date"
        />
  )
}
