import React, { Component } from 'react'
import ListItem from './ListItem'
import Events from 'events'

var Channel = new Events.EventEmitter()

class MyList extends Component {
    constructor(props) {
      super(props)
      this.state = {totalClicks: 0}
    }

    static defaultProps = {
      children: React.PropTypes.node
    }

    componentDidMount () {
      Channel.on('listItem:clicks', this.childClicks)
    }
    componentWillUnmount () {
    Channel.removeListener('listItem:clicks', this.childClicks)
    }

    childClicks() {
      let totalClicks = ++this.state.totalClicks
      this.setState({totalClicks})
    }

  render() {
    let props = this.props
    let state = this.state
    const child = (child, index) => <ListItem color="red" text={child.props.children} />
    return (
      <div>
        <h3>Total de Itens : {props.children.length} </h3>
        <h3>Total de cliques : {state.totalClicks}</h3>
        <ul>
          {
            props.children.map(child)
          }
        </ul>
      </div>
    )
  }
}

export default MyList;
