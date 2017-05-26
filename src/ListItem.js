import React, {Component} from 'react'
import Events from 'events'

var Channel = new Events.EventEmitter();

class ListItem extends Component {
  static defaultProps = {
    children : []
  }

  constructor(props) {
    super(props)
    this.state = {totalClicks: 0}
  }

  clicks() {
    let totalClicks = ++this.state.totalClicks
    this.setState({totalClicks})
    Channel.emit('myList:clicks')
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
