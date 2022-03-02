import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link as NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Stack,
  Pagination,
  PaginationItem,
  TextField,
  Link,
} from '@mui/material'

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

const HomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentSearch = parseInt(location.search?.split('=')[1]) || 1

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(currentSearch)
  const [pageQty, setPageQty] = useState(0)

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      setPosts(data.hits)
      setPageQty(data.nbPages)
      if (data.nbPages < page) {
        setPage(1)
        navigate('/')
      }
      console.log(data)
    })
  }, [query, page])
  return (
    <>
      <TextField
        required
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
