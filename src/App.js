import React from 'react';
import Container from './Container'
import { Body, Header, List, ListItem, ListItemLabel, Controls, TextInput, Button, PrimaryButton, DangerButton, CheckboxLabel } from './common';

const App = () => (
  <Container>
    {(state, actions) => (
      <Body>
        <Header>Saved Tab Groups</Header>
        <List>
          {state.tabGroups.map((group, index) => (
            <ListItem key={group.name}>
              <ListItemLabel>{group.name}</ListItemLabel>
              <Button onClick={actions.handleOpenTabGroup(index)} inline>open</Button>
              <DangerButton onClick={actions.handleRemoveTabGroup(index)} inline>remove</DangerButton>
            </ListItem>
          ))}
        </List>
        <Controls>
          <TextInput
            type="text"
            placeholder="New Tab Group Name"
            value={state.tabGroupName}
            onChange={actions.handleUpdateTabGroupName}
            invalid={state.invalidTabGroupName}
            tabIndex="1"
            required />
          <PrimaryButton
            onClick={actions.handleSave}
            tabIndex="2"
            main
            big>
            Save {state.saveSelected ? 'Selected' : 'All'} Tabs
          </PrimaryButton>
          <Button
            onClick={actions.handleSaveAndClose}
            tabIndex="3"
            main
            big>
            Save & Close {state.saveSelected ? 'Selected' : 'All'} Tabs
          </Button>
          <CheckboxLabel>
            <input
              type="checkbox"
              tabIndex="4"
              checked={state.saveSelected}
              onChange={actions.handleToggleSaveSelected} /> Only Save Selected Tabs
          </CheckboxLabel>
        </Controls>
      </Body>
    )}
  </Container>
);

export default App;
