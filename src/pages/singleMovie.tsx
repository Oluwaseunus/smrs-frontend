import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
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
  useToast,
} from '@chakra-ui/react';

import MovieService from '../api/MovieService';
import { RootState } from '../store';
import WatchlistActionsCreator from '../store/actions/watchlist';

interface SingleMovieProps extends RouteComponentProps<{ movieId: string }> {}

function SingleMovie({ match }: SingleMovieProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const watchlist = useSelector((state: RootState) => state.watchlist);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await MovieService.getMovie(match.params.movieId);
        setMovie(movie);
      } catch (err: any) {
        toast({
          position: 'top',
          status: 'error',
          isClosable: true,
          variant: 'left-accent',
          title:
            err.response?.data?.message ||
            "Couldn't fetch movie, please try again.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [toast, match.params.movieId]);

  const addToWatchedList = useCallback(async () => {
    setIsUpdating(true);

    try {
      await WatchlistActionsCreator.addToWatchList(movie?.title || '');
    } catch (err: any) {
      toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title:
          err.response?.data?.message ||
          "Couldn't add movie to watchlist, please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  }, [movie, toast]);

  const removeFromWatchedList = useCallback(async () => {
    setIsUpdating(true);

    try {
      await WatchlistActionsCreator.removeFromWatchList(movie?.title || '');
    } catch (err: any) {
      toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title:
          err.response?.data?.message ||
          "Couldn't fetch movie, please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  }, [movie, toast]);

  const isWatched = watchlist.includes(movie?.title || '');

  return (
    <>
      <Box width='85vw' margin='auto' mt={10}>
        <Link as={RLink} to='/home'>
          Go Back
        </Link>
      </Box>

      <Center width='50%' maxWidth='80%' margin='auto' my={10}>
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

                {isWatched ? (
                  <Button
                    colorScheme='red'
                    isLoading={isUpdating}
                    maxWidth='fit-content'
                    onClick={removeFromWatchedList}
                  >
                    Remove From Watched List
                  </Button>
                ) : (
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
                )}
              </VStack>
            </Flex>
          );
        })()}
      </Center>
    </>
  );
}

export default SingleMovie;
