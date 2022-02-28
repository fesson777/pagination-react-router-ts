import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Stack, Pagination, TextField, Link } from '@mui/material'

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

function App() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(0)

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      setPosts(data.hits)
      setPageQty(data.nbPages)
      console.log(data)
    })
  }, [query, page])
  return (
    <Container sx={{ marginTop: 5 }} maxWidth="md">
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => {
              setPage(num)
            }}
            sx={{ marginY: 3, marginX: 'auto' }}
          />
        )}
        {posts.map((post: any) => (
          <Link key={post.objectID} href={post.url}>
            {post.title || post.story_title}
          </Link>
        ))}
      </Stack>
    </Container>
  )
}

export default App
