import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

const App = () => {
  const [repositories, setRepositories] = useState([])

  const handleAddRepository = async () => {
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`,
      url: `http://${Date.now()}`,
      techs: ['React', 'Typescript', 'Node.js']
    })

    const repository = response.data
    setRepositories([ ...repositories, repository ])
  }

  const handleRemoveRepository = async (id) => {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    if (repositoryIndex < 0) {
      alert('Erro ao tentar remover o repositório!')
      return
    }

    const response = await api.delete(`/repositories/${id}`)

    if (response.status !== 204) {
      alert('Erro ao tentar remover o repositório!')
      return
    }

    repositories.splice(repositoryIndex, 1)
    setRepositories([ ...repositories ])
  }

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              { repo.title }

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
