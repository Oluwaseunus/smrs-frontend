import React, { useEffect, useState } from 'react';
import { Link as RLink, RouteComponentProps } from 'react-router-dom';
import {
  Box,
  Flex,
  Link,
  Text,
  Image,
  Button,
  Center,
  HStack,
  VStack,
  Heading,
  Spinner,
} from '@chakra-ui/react';

import MovieService from '../api/MovieService';

interface SingleMovieProps extends RouteComponentProps<{ movieId: string }> {}

function SingleMovie({ match }: SingleMovieProps) {
  const [loading, setLoading] = useState(true);
  const [isWatched, setIsWatched] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [movie, setMovie] = useState<TMDBMovie | null>(null);

  async function addToWatchedList() {
    setIsUpdating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWatched(!isWatched);
    } catch (err) {
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await MovieService.getMovie(match.params.movieId);
        setMovie(movie);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [match.params.movieId]);

  return (
    <>
      <Box width='85vw' margin='auto' mt={10}>
        <Link as={RLink} to='/home'>
          Go Back
        </Link>
      </Box>

      <Center width='50%' maxWidth='80%' margin='auto' mt={10}>
        {(() => {
          if (loading) {
            return <Spinner size='xl' />;
          }

          if (!movie) {
            return <Text>Movie not found, please try again.</Text>;
          }

          return (
            <Flex flexDirection='column'>
              <Box margin='auto'>
                <Image
                  alt={movie.title}
                  src={`${MovieService.imageBaseURL}original${movie.backdrop_path}`}
                />
              </Box>

              <VStack spacing={5} mt={5}>
                <Heading as='h3' size='lg' textAlign='center'>
                  {movie.title}
                </Heading>

                <HStack>
                  {movie.tagline && (
                    <Text fontSize='md' textAlign='center'>
                      Tagline: {movie.tagline}
                    </Text>
                  )}

                  {movie.vote_average && (
                    <Text fontSize='md' textAlign='center'>
                      Rating: {movie.vote_average}
                    </Text>
                  )}
                </HStack>

                <Text fontSize='xl'>{movie.overview}</Text>

                <Button
                  isLoading={isUpdating}
                  maxWidth='fit-content'
                  onClick={addToWatchedList}
                  colorScheme={isWatched ? 'red' : 'teal'}
                >
                  {isWatched
                    ? 'Remove From Watched List'
                    : 'Add To Watched List'}
                </Button>
              </VStack>
            </Flex>
          );
        })()}
      </Center>
    </>
  );
}

export default SingleMovie;
