import { BACKEND_URL } from '../../constants';

const initialState = {
  photos: [],
};

export const fetchPhotosAction = () => async (dispatch) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/photos`);
    const data = await response.json();

    dispatch({ type: 'FETCH_PHOTO', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPhotoAction = (photoData) => async (dispatch) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    const data = await response.json();
    dispatch({ type: 'CREATE_PHOTO', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePhotoAction = (id) => async (dispatch) => {
  try {
    await fetch(`${BACKEND_URL}/api/photos/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'DELETE_PHOTO', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PHOTO':
      return {
        ...state,
        photos: action.payload,
      };
    case 'DELETE_PHOTO':
      return {
        ...state,
        photos: state.photos.filter((e) => e.id !== action.payload),
      };
    case 'CREATE_PHOTO':
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    default:
      return state;
  }
};
