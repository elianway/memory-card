import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Logo src={logo} alt="logo"></Logo>
      </HeaderWrapper>
    </>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark}
`

const Logo = styled.img`
  max-width: 250px;
`

export default Header