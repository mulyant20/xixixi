import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJokes } from './store/slice/jokesSlice'

function App() {
  const dispatch = useDispatch()
  const {data, isLoading, err} = useSelector((store) => store?.jokes)
  useEffect(() => {
    dispatch(fetchJokes())
  }, [])

  if(isLoading) {
    return <p>Loading...</p>
  }
  
  return (
    <div className='App'>
      <ul>
        {data.map((j, index) => (
          <li key={index}>{j}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
