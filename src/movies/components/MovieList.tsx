import React, { useState } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';
import { Movie, MovieAddAction } from "types"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  function changeNewMovieMode() {
    displayOptionType === 'button' ? setDisplayOptionType('form') : setDisplayOptionType('button')
  }

  function addNewMovie(data: Omit<Movie, "id" | "ratings">) {
    let movieAddAction: MovieAddAction = {
      type: 'add',
      payload: {
        movie: {
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          imageUrl: data.imageUrl,
        }
      }
    }
    moviesDispatch(movieAddAction)
  }

  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        { displayOptionType === 'button' ? 
        <AddMovieButton onClick={() => {
          changeNewMovieMode()
        } }/> 
        : 
        <AddMovieForm 
          onSubmit={(data) => { addNewMovie(data) }} 
          onCancel={() => changeNewMovieMode()} 
        />}
      </Card>
    </div>
  );
}
