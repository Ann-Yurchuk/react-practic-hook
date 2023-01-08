import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { fetchBreeds } from 'api';


const ERROR_MESSAGE = 'Щось пішло не так, перезавантажте сторінку';

export const BreedSelect = ({ onSelect }) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBreeds() {
      try {
        setIsLoading(true);
        const breeds = await fetchBreeds();
        setBreeds(breeds);
      } catch {
        setError(ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    }
    getBreeds();
  }, []);

  const handleChange = option => {
    onSelect(option.value);
  };

  const options = useMemo(() => {
    return breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  }, [breeds]);

  return (
    <div>
      <Select options={options} onChange={handleChange} isLoading={isLoading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// export class BreedSelect extends Component {
//     state = {
//     breeds: [],
//     isLoading: false,
//     error: null,
//   };

//   async componentDidMount() {
//     try {
//       this.setState({ isLoading: true });
//       const breeds = await fetchBreeds();
//       this.setState({ breeds });
//     } catch {
//       this.setState({
//         error: 'Щось піщло не так, перезавантажте сторінку',
//       });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   makeOptions = () => {
//     return this.state.breeds.map(breed => ({
//   value: breed.id,
//   label: breed.name,
// }));
//   };

//   handleChange = option => {
//     this.props.onSelect(option.value);
//   };

//   render() {
//     const { error, isLoading } = this.state;
//     const options = this.makeOptions();
//     return (
//       <div>
//         <Select
//           options={options}
//           onChange={this.handleChange}
//           isLoading={isLoading}
//         />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//     );
//   }
// }
