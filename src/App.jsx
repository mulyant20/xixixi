import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, fetchJokes, fetchRandomJokes } from './store/slice/jokesSlice'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading, err, joke, isOpen } = useSelector(
    (store) => store?.jokes
  )

  useEffect(() => {
    dispatch(fetchJokes())
  }, [])

  const generate = () => {
    dispatch(fetchRandomJokes())
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (err) {
    return <p>Error</p>
  }

  return (
    <div className='App'>
      {isOpen && (
        <div>
          <p>{joke}</p>
          <button onClick={() => dispatch(closeModal())}>x</button>
        </div>
      )}
      <button onClick={generate}>Generate</button>
      <ul>
        {data.map((j, index) => (
          <li key={index}>{j}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
