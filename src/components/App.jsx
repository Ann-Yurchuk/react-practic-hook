import { fetchDogByBreed } from 'api';
import { useState } from 'react';
import { BreedSelect } from './BreedSelect';
import { Dog } from './Dog';
import { Layout } from './Layout';
import { DogSkeleton } from './DogSkeleton';

const ERROR_MESSAGE = 'На жаль, в нас не вийшло знайти дані по вашому запиті';

export const App = () => {
  const [dog, setDog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectBreed = async breedId => {
    try {
      setIsLoading(true);
      setError(null);
      const dog = await fetchDogByBreed(breedId);
      setDog( dog );
    } catch {
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <BreedSelect onSelect={selectBreed} />
      {dog && !isLoading && <Dog dog={dog} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && <DogSkeleton />}
    </Layout>
  );
};

// export class App extends Component {
//   state = {
//     dog: null,
//     isLoading: false,
//     error: null,
//   };

//   selectBreed = async breedId => {
//     try {
//       this.setState({ isLoading: true, error: null });
//       const dog = await fetchDogByBreed(breedId);
//       this.setState({ dog });
//     } catch {
//       this.setState({
//         error: 'На жаль, в нас не вийшло знайти дані по вашому запиті',
//       });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   render() {
//     const { error, dog, isLoading } = this.state;
//     return (
//       <Layout>
//         <BreedSelect onSelect={this.selectBreed} />
//         {dog && !isLoading && <Dog dog={dog} />}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {!isLoading && <DogSkeleton />}
//       </Layout>
//     );
//   }
// }
