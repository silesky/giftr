import Color from 'color'
// return Color(this.deepblue).lighten(0.5); },

module.exports = {
  // old toolbar bg: F8F8F8
  white: '#fff',
  black: '#000',
  lightgrey: '#dddddd', // header (TopBar), footer (BottomBar), tabs (AppContainer)
  darkgrey: '#878484',
  offwhite: '#ededed',
  darkgreen: '#5a8e0b',
  lightgreen: '#58b21c',
  coolblue: '#dccfec',
  paleyellow: '#ffffe0',
  soothingblue: '#b8c1dd',
  deepblue: '#0800ff',
  electricBlue: '#0892d0',
  red: '#d62246',
  darkpurple: '#8c2b62',
  pink: '#dd85bd',
  accent: '#b6387f', // same as darkpurple.lighten(0.3)
  shadow: '#ddd',

  get $shadowBorder () { return Color('#ddd').lighten(0.1).hex() },

  get $headerFooterTextColor () { return this.red },
  // tabs
  get $listDividerBg () { return this.lightgrey },
  get _tabColor () { return this.electricBlue },
  get $activeTabBackground () { return this.lightgrey },
  get $activeTabTextColor () { return this._tabColor },
  get $activeTabUnderlineColor () { return this._tabColor },
  get $cardHeaderBg () { return this.darkpurple },
  get $cardBg () { return this.offwhite },
  get $headerFooterTextColor () { return this.white }, // header text color
  get $defaultIconColor () { return this.white }, // header icon color
  get $bigHeadingTextColor () { return this.white },  // main text color
  get $headerFooterBg () { return Color(this.lightgreen).hex() } // main top and bottom color, drawerContainer
}
