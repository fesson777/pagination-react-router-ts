import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link as NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Stack,
  Pagination,
  PaginationItem,
  TextField,
  Link,
  Button,
} from '@mui/material'

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

const HomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('React')
  const currentSearch = parseInt(location.search?.split('=')[1]) || 1
  const [page, setPage] = useState(currentSearch)
  const [pageQty, setPageQty] = useState(0)
  const [error, setError] = useState(false)

  const getAxios = (query: string, page: number) => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      setPosts(data.hits)
      setPageQty(data.nbPages)
      if (data.nbPages < page) {
        setPage(1)
        navigate('/')
      }
    })
  }

  useEffect(() => {
    getAxios(query, page)
  }, [page])

  function handleTextField(e: any) {
    setQuery(e.target.value)
    if (e.key === 'Enter') {
      getAxios(query, page)
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setError(false)

    if (query == '') {
      setError(true)
      return
    }
    getAxios(query, page)
  }
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            fullWidth
            label="query"
            value={query}
            onChange={handleTextField}
            error={error}
          />
          <Button variant="contained" size="small" type="submit">
            Search
          </Button>
        </Stack>
      </form>
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            showFirstButton
            showLastButton
            onChange={(_, num) => {
              setPage(num)
            }}
            sx={{ marginY: 3, marginX: 'auto' }}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        {posts.map((post: any) => (
          <Link key={post.objectID} href={post.url}>
            {post.title || post.story_title}
          </Link>
        ))}
      </Stack>
    </>
  )
}

export default HomePage
