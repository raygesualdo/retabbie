/* global ga */
import React, { Component, PropTypes } from 'react';
import { getTabs, addTabGroup, closeTabsWithIds, createTabs, removeTabGroup } from './utilities'

export default class Container extends Component {
  state = {
    tabGroups: [],
    saveSelected: false,
    tabGroupName: '',
    invalidTabGroupName: false
  }

  handleUpdateTabGroupName = (e) => {
    this.setState({tabGroupName: e.target.value})
  }

  validateTabGroupName = () => {
    const invalidTabGroupName = !this.state.tabGroupName
    this.setState(state => ({invalidTabGroupName}))
    return invalidTabGroupName
  }

  handleToggleSaveSelected = (e) => {
    this.setState(state => ({
      saveSelected: !state.saveSelected
    }))
  }

  handleSaveFactory = ({close} = {close: false}) => async (e) => {
    const invalid = this.validateTabGroupName()
    if (invalid) return

    const tabs = await getTabs({all: !this.state.saveSelected})

    addTabGroup({
      // id: uuid(),
      name: this.state.tabGroupName,
      tabs: tabs.map(tab => ({
        url: tab.url,
        pinned: tab.pinned
      }))
    }, this.state.tabGroups)

    this.setState({tabGroupName: ''})

    ga('send', {
      hitType: 'event',
      eventCategory: 'TabGroup',
      eventAction: 'save',
      eventValue: tabs.length,
    });

    if (close) closeTabsWithIds(tabs.map(tab => tab.id))
  }

  handleSave = this.handleSaveFactory()

  handleSaveAndClose = this.handleSaveFactory({close: true})

  handleOpenTabGroup = (index) => (e) => {
    const { tabs } = this.state.tabGroups[index]
    createTabs(tabs)
    ga('send', {
      hitType: 'event',
      eventCategory: 'TabGroup',
      eventAction: 'open',
      eventValue: tabs.length,
    })
  }

  handleRemoveTabGroup = (index) => (e) => {
    const { tabs } = this.state.tabGroups[index]
    removeTabGroup(index, this.state.tabGroups)
    ga('send', {
      hitType: 'event',
      eventCategory: 'TabGroup',
      eventAction: 'remove',
      eventValue: tabs.length,
    })
  }

  render() {
    const actions = {
      handleOpenTabGroup: this.handleOpenTabGroup,
      handleRemoveTabGroup: this.handleRemoveTabGroup,
      handleUpdateTabGroupName: this.handleUpdateTabGroupName,
      handleSave: this.handleSave,
      handleSaveAndClose: this.handleSaveAndClose,
      handleToggleSaveSelected: this.handleToggleSaveSelected
    }
    return <div>{this.props.children(this.state, actions)}</div>
  }

}

Container.propTypes = {
  children: PropTypes.func.isRequired
}
