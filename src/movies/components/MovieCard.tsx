import { StarRating, Button } from 'shared/components';

import { getAvgRating } from 'movies/ratings';
import { Movie, MovieDeleteAction } from 'types';
import { useMovies } from './MovieProvider';

interface MovieCardProps {
    movie: Movie,
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { moviesDispatch } = useMovies()
    
    function deleteAction(movie: Movie) {
        let movieDeleteAction: MovieDeleteAction = {
            type: 'delete',
            payload: {
              movieId: movie.id,
            }
        }
        moviesDispatch(movieDeleteAction)
    }

    return (
        <div data-testid={`movie-item-${movie.id}`}>
            <img src={ movie.imageUrl} className="card-img-top" alt="" />
            <div className="card-body">
                <h4 className="card-title">
                    { movie.title }
                </h4>
                { movie.subtitle}
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="text-justify" style={{ fontSize: '14px' }}>
                    {movie.description}
                </p>
                <Button onClick={() => deleteAction(movie)}>Delete</Button>
            </div>
            <div className="card-footer" data-testid="movie-rating">
                <div className="clearfix">
                <div className="float-left mt-1">
                    { StarRating(
                        {
                            rating: getAvgRating(movie),
                            onRate: () => 5
                        })
                    }
    
                </div>
                { getAvgRating(movie) }
                <div className="card-footer-badge float-right badge badge-primary badge-pill"></div>
                </div>
            </div>
        </div>    
    )
};
