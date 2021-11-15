import { useSelector } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import React, { FormEvent, useState } from 'react';
import {
  Box,
  Grid,
  Input,
  Button,
  Center,
  Heading,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { RootState } from '../store';
import MovieService from '../api/MovieService';
import HomeMovie from '../components/HomeMovie';

export default function Home() {
  const toast = useToast();
  const history = useHistory();

  const [isSearching, setIsSearching] = useState(false);
  const { username = '', _id = '1' } = useSelector(
    (state: RootState) => state.user
  );
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const movies = await MovieService.getUserMovies();
      setMovies(movies);
    }

    fetchData();
  }, [_id]);

  const [query, setQuery] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSearching(true);

    try {
      const bestMatch = await MovieService.searchMovie(query);
      history.push(`/item/${bestMatch.id}`);
    } catch (err) {
      setIsSearching(false);
      toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title:
          "Couldn't find that item, please try again with a different title.",
      });
    }
  }

  return (
    <Box width='85vw' margin='auto'>
      <Heading fontSize='lg' size='4xl' mt={10}>
        Hello {username || 'username'} 👋
      </Heading>

      <form onSubmit={handleSubmit}>
        <Center width='50%' margin='auto' my={10}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />

            <Input
              mr={5}
              value={query}
              placeholder='F.R.I.E.N.D.S'
              onChange={(e) => setQuery(e.target.value)}
            />

            <Button type='submit' isLoading={isSearching}>
              Search
            </Button>
          </InputGroup>
        </Center>
      </form>

      <Heading fontSize='lg' size='3xl' my={3}>
        Here are your latest recommendations:
      </Heading>

      <Center marginY={10}>
        <Grid gap={10} templateColumns='repeat(3, 1fr)'>
          {movies.map((movie) => (
            <HomeMovie movie={movie} key={movie.id} />
          ))}
        </Grid>
      </Center>
    </Box>
  );
}
