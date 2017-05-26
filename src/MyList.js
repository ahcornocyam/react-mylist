import React, { Component } from 'react'
import ListItem from './ListItem'
import {EventEmitter} from 'events'

var Channel = new EventEmitter()

class MyList extends Component {

    state = {
      totalClicks: 0
    }

    static defaultProps = {
      children: []
    }

    componentDidMount () {
      Channel.on('myList:clicks', this.childClicks)
    }
    componentWillUnmount () {
    Channel.removeListener('myList:clicks', this.childClicks)
    }

    childClicks() {
      let totalClicks = ++this.state.totalClicks
      this.setState({totalClicks})
    }

  render() {
    let props = this.props
    let state = this.state

    const listItens =  (children) => {
      return children.map(props.children, function (child) {
        return <ListItem color="red" text={child} />
      })
    }

    const countClicque = function () {
      return React.Children.count(props.children)
    }

    return (
      <div>
        <h3>Total de Itens : {countClicque()} </h3>
        <h3>Total de cliques : {state.totalClicks}</h3>
        <ul>
          {
            listItens(React.Children)
          }
        </ul>
      </div>
    )
  }
}

export default MyList;
