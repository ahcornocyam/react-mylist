import React, {Component} from 'react'
import Events from 'events'

let Channel = new Events.EventEmitter()

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {totalClicks: 0}
  }

  static defaultProps = {}


  clicks() {
    let totalClicks = ++this.state.totalClicks
    this.setState({totalClicks})
    Channel.emit('listItem:clicks')
  }
  render () {
    let props = this.props
    let state = this.state
    let style = {"cursor": "pointer", "color": props.color}
    return (
      <li onClick={this.clicks.bind(this)} style={style}>
        {props.text} - {state.totalClicks}
      </li>
        )
}
}

export default ListItem
