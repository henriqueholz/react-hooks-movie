import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MovieFetchAction, MoviesAction } from 'types';
import { getMovies } from 'api/movies';

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesCollection(): [MoviesState, React.Dispatch<MoviesAction>] {

  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'fetch':
        return { ...state, movies: action.payload.data, initialized: true };

      case 'add':
        const newMovie: Movie = {
          ...action.payload.movie,
          id: uuid(),
          ratings: []
        }

        const addMovieListCopy: Movie[] = [...state.movies];
        addMovieListCopy.push(newMovie)

        return { ...state, movies: addMovieListCopy };

      case 'delete':
        const deleteMovieListCopy: Movie[] = [...state.movies.filter((movie) => movie.id !== action.payload.movieId)];
        return { ...state, movies: deleteMovieListCopy };

      case 'rate':
        return { ...state };

      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMovies()

      let movieFetchAction: MovieFetchAction = {
        type: 'fetch',
        payload: {
          data: result,
        }
      }
      dispatch(movieFetchAction)
    };
    fetchData();
  }, []);

  return [state, dispatch];
}