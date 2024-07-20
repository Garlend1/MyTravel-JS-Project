// import { Stack, List, ListItem, styled } from '@mui/material';
// import { photos } from '../../constants';
// import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './photos.css';
import { useDispatch } from 'react-redux';
import {
  deletePhotoAction,
  fetchPhotosAction,
  createPhotoAction,
} from '../../store/reducers/photoReducer';
import { useSelector } from 'react-redux';

const Photos = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photoReducer.photos);

  useEffect(() => {
    dispatch(fetchPhotosAction());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoData = {
      title: e.target.title.value,
      url: e.target.url.value,
      albumId: e.target.albumId.value,
    };

    dispatch(createPhotoAction(photoData));
  };
  return (
    <div className="photos-container">
      <h1>Photos Gallery</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" required />
        <input name="url" placeholder="Photo URL" required />
        <input name="albumId" placeholder="Album ID" type="number" required />
        <button type="submit">Add Photo</button>
      </form>
      <div className="photos-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt={photo.title} />
            <div className="photo-details">
              <h2>{photo.title}</h2>
              <p>Album id: {photo.albumId}</p>
              <button onClick={() => dispatch(deletePhotoAction(photo.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
