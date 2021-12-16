import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, Button, Center, useToast } from '@chakra-ui/react';

import MovieService from '../api/MovieService';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WatchlistActionsCreator from '../store/actions/watchlist';

interface HomeMovieProps {
  movie: TMDBMovie;
}

function HomeMovie({ movie }: HomeMovieProps) {
  const toast = useToast();
  const watchlist = useSelector((state: RootState) => state.watchlist);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watchlist.includes(movie.title);

  async function toggleWatchStatus() {
    setIsLoading(true);

    try {
      if (isWatched) {
        await WatchlistActionsCreator.removeFromWatchList(movie.title);
      } else {
        await WatchlistActionsCreator.addToWatchList(movie.title);
      }
    } catch (err: any) {
      toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title:
          err.response.data.message ||
          "Couldn't change the status of the movie, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box key={movie.id}>
      <Box borderWidth='1px' borderRadius='lg'>
        <Link to={`/item/${movie.id}`}>
          <Image
            alt={movie.title}
            objectFit='contain'
            objectPosition='top'
            src={`${MovieService.imageBaseURL}original${movie.backdrop_path}`}
          />
        </Link>

        <Center height='8.5rem' flexDirection='column'>
          <Link to={`/item/${movie.id}`}>
            <Text color='black' fontWeight='bold' mb={3}>
              {movie.title}
            </Text>
          </Link>

          <Button
            isLoading={isLoading}
            maxWidth='fit-content'
            onClick={toggleWatchStatus}
            colorScheme={isWatched ? 'red' : 'teal'}
          >
            {isWatched ? 'Remove From Watched List' : 'Add To Watched List'}
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default HomeMovie;
