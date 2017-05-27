import React, { Component } from 'react'
import ListItem from '../ListItem/ListItem'
import EventEmitter from 'eventemitter3'
import css from './myList.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

var Channel = new EventEmitter()

class MyList extends Component {

    state = {
      totalClicks: 0,
      itens: []
    }

    static defaultProps = {
      children: []
    }

    componentDidMount () {
      Channel.on('myList:clicks', this.childClicks,this)
      Channel.on('myList:remove', this.removeItem, this)
    }

    componentWillUnmount () {
      Channel.removeListener('myList:clicks', this.childClicks, this)
      Channel.removeListener('myList:remove', this.removeItem, this)
    }

    childClicks() {
      let totalClicks = ++this.state.totalClicks
      this.setState({totalClicks})
    }

    removeItem (index) {
      let itens = this.state.itens
      itens.splice(index, 1)
      this.setState({itens})
    }

    insertItem () {
      let itens = this.state.itens
      let text = this.refs.listItemText.value || `Item ${itens.length+1}`
      itens.push(text)
      this.refs.listItemText.value = ""
      this.setState({itens})
    }


  render () {
    let props = this.props
    let state = this.state

    const listItens =(itens) => {
      return itens.map((item, index) => {
        return <ListItem key={index} index={index} color="red" text={item} />
      })
    }

    const countClique = function () {
      return state.itens.length
    }

    return (
      <div>
        <h3>Total de Itens : <i>{countClique()}</i> </h3>
        <h3>Total de cliques : <i> {state.totalClicks}</i></h3>
        <input type="text" ref="listItemText" />
        <button onClick={this.insertItem.bind(this)}>Novo Item</button>
        <ul>
          <ReactCSSTransitionGroup
            transitionName="minhaLista"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            >
            {
              listItens(this.state.itens)
            }
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    )
  }
}

export default MyList;
export const channel = Channel
