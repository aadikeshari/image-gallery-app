import { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, isSelectedImage] = useState(null);
  const [value, setValue] = useState('nature');

  useEffect(() => {
    if (value === '') {
      setPhotos([]);
    } else {
      fetchImages(value);
    } 
  }, [value, page]);

  const fetchImages = async () => {
    setLoading(true);

    const KEY = '37847825-2be3ebc06b3aff5013069d024';
    const BASE = 'https://pixabay.com/api/';
    const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

    try {
      const response = await axios.get(
        `${BASE}?q=${value}&page=${page}&key=${KEY}&${FILTER}`
      );
      if (response.data.hits.length > 0) {
        setPhotos([...photos, ...response.data.hits]);
      } else if (response.data.hits.length === 0) {
        Notify.info('Sorry, there are no more matches.');
      } else {
        Notify.failure("Sorry, we couldn't find any matches.");
      }
    } catch (error) {
      console.log('Found error', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = query => {
    if (query !== value) {
      setPhotos([]);
      setValue(query);
      setPage(1);
    }
  };

  const onImgClick = image => {
    setShowModal(true);
    isSelectedImage(image);
  };

  const closeHandler = () => {
    setShowModal(false);
    isSelectedImage(null);
  };

  const loadMoreHandler = e => {
    setPage(page => page + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery>
        <ImageGalleryItem photos={photos} onClick={onImgClick} />
      </ImageGallery>
      {isLoading && <Loader />}
      {photos.length > 0 && !isLoading && <Button onClick={loadMoreHandler} />}
      {showModal && <Modal image={selectedImage} onClose={closeHandler} />}
    </div>
  );
}

export default App;
