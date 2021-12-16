import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Box, Center, Grid, Heading } from '@chakra-ui/react';

import { RootState } from '../store';
import MovieService from '../api/MovieService';
import HomeMovie from '../components/HomeMovie';
import WatchlistActionsCreator from '../store/actions/watchlist';

function Watchlist() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const { firstName } = useSelector((state: RootState) => state.user);
  const watchlist = useSelector((state: RootState) => state.watchlist);

  useEffect(() => {
    const fetchData = async () => {
      const values = await Promise.all(
        watchlist.map(async (title) => {
          const { id } = await MovieService.searchMovie(title);
          return MovieService.getMovie('' + id).catch((err) => {
            return null;
          });
        })
      );

      console.log({ values });
      setMovies(values.filter((value): value is TMDBMovie => !!value));
    };

    if (!watchlist.length) {
      WatchlistActionsCreator.fetchWatchList();
    } else {
      fetchData();
    }
  }, [watchlist]);

  return (
    <Box width='85vw' margin='auto'>
      <Heading fontSize='lg' size='4xl' mt={10}>
        Hello {firstName} 👋
      </Heading>

      <Heading fontSize='lg' size='3xl' my={3}>
        Here are the movies in your watch history:
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

export default Watchlist;
