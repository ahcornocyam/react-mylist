import React, {Component} from 'react'
import {channel} from '../Mylist/MyList'
import css from './listItem.css'


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
    channel.emit('myList:clicks')
  }
  remove() {
    channel.emit('myList:remove', this.props.index)
  }

  render () {
    let props = this.props
    let state = this.state
    let style = {
      "color": props.color
    }
    let cursor = {
      "cursor": "pointer"
    }
    return (
      <li  style={style}>
        <span onClick={this.clicks.bind(this)} style={cursor}>{props.text} - {state.totalClicks} </span> |
      <button onClick={this.remove.bind(this)}> X </button>
      </li>
        )
      }
}

export default ListItem
