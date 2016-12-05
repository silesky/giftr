import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions'
import { GiftCard } from './../components/GiftCard'
import { 
  Container,
  Content
} from 'native-base'
import * as Utils from './../utils/utils'
// should get an array of all the gifts
export class BodyAllGiftsView extends React.Component {
  static propTypes = {
      isSelected: React.PropTypes.bool,
  }
  render() {
    const gifts = Utils.getAllGifts(this.props.state)
    return (
      <Container>
        <Content>
           { 
             (gifts.length) 
                ? 
                gifts.map((el, ind) => {
                        const { friendId } = Utils.getFriendByGiftId(this.props.state, el.giftId);
                        return ( 
                            <GiftCard 
                                deleteGift={this.props.actions.deleteGift.bind(this, friendId, el.giftId)}
                                giftDesc={el.giftDesc}
                                updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, friendId, el.giftId)}
                                updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, friendId, el.giftId)} 
                                giftId={el.giftId} 
                                giftTitle={el.giftTitle} 
                                key={ind} />
                        )
                    }) 
                    : false
            } 
          </Content>
      </Container>
    );
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(BodyAllGiftsView)