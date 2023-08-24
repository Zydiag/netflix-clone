import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  // console.log(data);
  if (isEmpty(data)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 md:gap-2">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
