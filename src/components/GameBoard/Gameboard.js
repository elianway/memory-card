import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const GameBoard = ({ pokemons, handleCardClick }) => {
  const pokemonCards = pokemons.map((pokemon) => (
    <Card key={pokemon.id} pokemon={pokemon} handleCardClick={handleCardClick} />
  ))

  return <GameBoardWrapper>{pokemonCards}</GameBoardWrapper>
}

const GameBoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap 3rem;

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default GameBoard