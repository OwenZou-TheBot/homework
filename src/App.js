import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const pokemonsPerPage = 20;
    const pokemonsToSkip = (page - 1) * pokemonsPerPage;
    setLoading(true);
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${pokemonsToSkip}`,
    )
      .then((resp) => resp.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  }, [page]);
  return (
    <div className='App'>
      <div className='container'>
        {data
          ? data.map((v, i) => (
              <div className='pokemon'>
                <p>{v.name}</p>
              </div>
            ))
          : 'Loading Pokemons'}
      </div>
      <div className='pagination'>
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        >
          Prev
        </button>
        <button disabled={loading} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      <p className='page-number'>Page {page}</p>
    </div>
  );
}

export default App;
