import styled, { css } from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  padding: 0 10px 10px 10px;
`

export const Header = styled.h2`
  margin: 10px 0;
`

export const List = styled.div`
  padding-top: 10px;
  flex-grow: 1;
  max-height: 261px;
  overflow-y: auto;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 13px;
`

export const ListItemLabel = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextInput = styled.input`
  -webkit-appearance: none;
  border: 1px solid #808080;
  ${props => props.invalid && css`border: 1px solid #EA4335;`}
  margin: 0;
  width: 100%;
  padding: 8px;
  font-size: 12px;
  box-sizing: border-box;

  &: {
    border: 1px solid #4285F4;
  }
`

export const Button = styled.button`
  border: 1px solid #4285F4;
  border: none;
  color: #4285F4;
  background: white;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  ${props => props.inline && css`margin-left: 10px;`}
  ${props => props.main && css`margin-top: 12px;`}
  ${props => props.big && css`
    padding: 10px;
    font-size: 12px;
  `}

  &:hover {
    background: #4285F4;
    color: white;
  }
`

export const PrimaryButton = styled(Button)`
  background: #4285F4;
  color: white;
`

export const DangerButton = styled(Button)`
  color: #EA4335;

  &:hover {
    background: #EA4335;
    color: white;
  }
`

export const CheckboxLabel = styled.label`
  margin-top: 12px;
`
