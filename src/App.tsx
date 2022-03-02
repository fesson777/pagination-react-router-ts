import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Container sx={{ marginTop: 5 }} maxWidth="md">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}

export default App
