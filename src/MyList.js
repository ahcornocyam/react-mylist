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
      children: []
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
    
    const listItens =  (children) => {
      return children.map(props.children, function (child) {
        return <ListItem color="red" text={child} />
      })
    }
    return (
      <div>
        <h3>Total de Itens : {React.Children.count(props.children)} </h3>
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
