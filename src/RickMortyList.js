import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const TableWrapper = styled.div`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid pink;
`
const TheadWrapper = styled.div`
  width: 30%;
  padding: 10px;
`

const Button = styled.button`
  border: none;
`

export const RickMortyList = () => {
  const [rickAndMortyData, setRickAndMortyData] = useState([]);
  const [score, setScore] = useState(false);

  const handleClick = (
    ) => {
      if (score) {
        setScore(false);
      } else {
        setScore(true);
      }
    }

  useEffect(() => {
		const fetchRickMortyData = async () => {
			try {
				const baseUrl = 'https://rickandmortyapi.com/api/character'
				const response = await axios.get(baseUrl)
				const data = response.data

				//fetch images
				const promises = data.results.map(async (character) => {
					return {
						name: character.name,
            status: character.status,
						image: character.image,
            origin: character.origin.name,
            location: character.location.name,
					}
				})
			
				const resolvedPromises = await Promise.all(promises)
				setRickAndMortyData(resolvedPromises);
			} catch (error) {
				console.error("Can't fetch Rick and Morty data", error)
			}
		}

		fetchRickMortyData();
	}, []);


  return (
    <div className="container" id="container">
      <div>The world of Rick and Morty</div>
        <TableWrapper>
          <table>
            <TheadWrapper>
              <thead>
                {rickAndMortyData.map((character, i) => (
                  <th>
                    <tr><img src={character.image} alt={character.name}></img></tr>
                    <tr key={i} id="name" alt={character.name}>{character.name}</tr>
                    <tr key={i} id="status" alt={character.status}>Status: {character.status}</tr>
                    <tr key={i} id="origin" alt={character.origin}>First seen in: {character.origin}</tr>
                    <tr key={i} id="location" alt={character.location}>Currently located in: {character.location}</tr>
                    <Button>
                      <button style= {{background: score ? 'lightpink' : 'white'}} onClick={handleClick}> 👍 {score} </button>
                    </Button>
                  </th>
                  ))}
              </thead>
           </TheadWrapper>
          </table>
        </TableWrapper>
      </div>
      )
}


          
