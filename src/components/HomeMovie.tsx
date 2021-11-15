import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../api/MovieService';
import { Box, Image, Text, Button, Center } from '@chakra-ui/react';

interface HomeMovieProps {
  movie: TMDBMovie;
}

function HomeMovie({ movie }: HomeMovieProps) {
  const [isWatched, setIsWatched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  async function addToWatchedList() {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWatched(!isWatched);
    } catch (err) {
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
            onClick={addToWatchedList}
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
