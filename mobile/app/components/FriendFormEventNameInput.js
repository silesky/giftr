
import React, {
  Component
} from 'react';
import {
  Input,
  InputGroup,

  Icon,

} from 'native-base';

export const FriendFormEventNameInput = ({defaultValue, handleOnChangeText}) => (
  <InputGroup style={{paddingLeft: 10, marginTop: 10, marginBottom: 10 }} borderType="rounded" >
    <Icon name="md-happy" />
    <Input
      defaultValue={defaultValue}
      onChangeText={(eventNameInputArg) => handleOnChangeText(eventNameInputArg)}
      placeholder='Birthday, graduation, anniversary...'
      placeholderTextColor='#c9c9c9'
      />
  </InputGroup>

)