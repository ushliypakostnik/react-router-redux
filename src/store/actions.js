import { FETCH_URL } from './constants';

// Actions Types

export const PAGE_TO_ACTIVE = 'PAGE_TO_ACTIVE';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const RESIZE = 'RESIZE';

export const REQUEST_ALBUMS = 'REQUEST_ALBUMS';
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const REQUEST_ALBUMS_FAILED = 'REQUEST_ALBUMS_FAILED';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_FAILED = 'REQUEST_DATA_FAILED';

// Action Creators

export const requestAlbums = () => ({
  type: REQUEST_ALBUMS
});

export const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums
});

export const requestAlbumsFailed = (error) => ({
  type: REQUEST_ALBUMS_FAILED,
  error
});

export const fetchAlbums = () => {
  return dispatch => {
    dispatch(requestAlbums());
    return fetch(FETCH_URL + "/albums")
      .then(res => res.json())
      .then(
        (result) => {
          const result1 = Object.values(result);
          /* eslint-disable array-callback-return */
          let result2 = [];
          result1.map((item, index) => {
            if (index === 0) {
              result2.push({text: item.name, path: "/"});
            } else {
              result2.push({text: item.name, path: "/" + item.id});
            }
          });
          dispatch(receiveAlbums(result2));
        },
        (error) => {
          dispatch(requestAlbumsFailed(error));
        }
      );
  }
}

export const requestData = () => ({
  type: REQUEST_DATA
});

export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data
});

export const requestDataFailed = (error) => ({
  type: REQUEST_DATA_FAILED,
  error
});

export const fetchData = (album) => {
  return dispatch => {
    dispatch(requestData());
    return fetch(FETCH_URL + "/albums/" + album)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(receiveData(result));
        },
        (error) => {
          dispatch(requestDataFailed(error));
        }
      );
  }
}

export const pageToActive = (page) => ({
  type: PAGE_TO_ACTIVE,
  activePage: page
});

export const toggleTheme = (theme) => ({
  type: TOGGLE_THEME,
  theme: theme
});

export const resize = (minHeight, deviceType) => ({
  type: RESIZE,
  minHeight: minHeight,
  deviceType: deviceType
});

