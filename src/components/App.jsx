import { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from '../service/FetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';

const App = () => {
  const [inputData, setInputData] = useState ('');
  const [images, setImages] = useState ([]);
  const [page, setPage] = useState (1);
  const [status, setStatus] = useState ('idle');
  const [isButtonShown, setIsButtonShown] = useState (false);


  useEffect(() => {
    if(!inputData) return;

    const fetchData = async() => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(inputData, page);
      
          if(hits.length < 1) {
            setStatus('idle');
            Notiflix.Notify.info('Sorry, there are no images matching your search query');
          return;
          };
        setImages(prevState => [...prevState, ...hits]);
        setIsButtonShown(page < Math.ceil(totalHits / 12));
        setStatus('resolved');
      }
      catch (error) {
        setStatus('rejected');
      }
    }  

      fetchData();
  }, [inputData, page]);

  const handleFormSubmit = inputData => {

        setInputData(inputData);
        setImages([]);
        setPage(1);
  };

      return (
        <div className='app'> 
            <Searchbar onSubmit={handleFormSubmit}/>
              {status === 'pending' && (
                  <Loader></Loader>
              )}
              {images.length > 0 && (
                  <ImageGallery images={images}/>
              )}
              {status === 'rejected' && (
                  <p>Something went wrong, please try again later</p>
              )}
              {isButtonShown && (
                  <Button onClick={() => setPage(page + 1)}></Button>
              )}
        </div>
      )
  }

export default App;