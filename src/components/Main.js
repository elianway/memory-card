import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DisplayScore from './Display/Display'
import GameBoard from './GameBoard/Gameboard'
import { shuffleCards, capitalizeFirstLetter } from './Utils'

const Main = () => {
  const POKEMONS_AMOUNT = 12
  const [pokemons, setPokemons] = useState([])
  const [clickedPokemons, setClickedPokemons] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    const loadCards = async () => {
      setPokemons(shuffleCards(await fetchPokemons(POKEMONS_AMOUNT)))
    }

    loadCards()
  }, [])

  const fetchPokemons = async (amount) => {
    const pokemons = []

    for (let i = 1; i <= amount; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`
      const response = await fetch(pokemonUrl)
      const pokemon = await response.json()
      const id = pokemon.id
      const name = capitalizeFirstLetter(pokemon.name)
      const image = pokemon.sprites.front_default
      pokemons.push({ id, name, image })
    }

    return pokemons
  }

  const handleCardClick = (e) => {
    const pokemonName = e.target.parentNode.lastChild.textContent
    playRound(pokemonName)
    setPokemons(shuffleCards(pokemons))
  }

  const playRound = (pokemonName) => {
    if (clickedPokemons.includes(pokemonName)) {
      resetGame()
    } else {
      const newScore = currentScore + 1
      if (newScore > bestScore) setBestScore(newScore)
      setCurrentScore(newScore)
      setClickedPokemons((prevState) => [...prevState, pokemonName])
    }
  }

  const resetGame = () => {
    setClickedPokemons([])
    setCurrentScore(0)
  }

  return (
    <MainWrapper>
      <DisplayScore
        currentScore={currentScore}
        bestScore={bestScore}
      />
      <GameBoard
        pokemons={pokemons}
        handleCardClick={handleCardClick}
      />
    </MainWrapper>
  )
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 4rem;
  margin-bottom: 3rem;
`

export default Main