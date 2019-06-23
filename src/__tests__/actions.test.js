import React from 'react';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { FETCH_URL } from '../store/constants';
import * as types from '../store/actions';
import { pageToActive,
         toggleTheme,
         resize,
         requestAlbums,
         receiveAlbums,
         requestAlbumsFailed,
         fetchAlbums,
         requestData,
         receiveData,
         requestDataFailed,
         fetchData } from '../store/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {

  describe('sync actions', () => {

    it('pageToActive(): set active page', () => {
      const action = {
        type: types.PAGE_TO_ACTIVE,
        activePage: '/'
      }

      expect(pageToActive('/')).toEqual(action);
    });

    it('toggleTheme(): set theme', () => {
      const action = {
        type: types.TOGGLE_THEME,
        theme: 'light'
      }

      expect(toggleTheme('light')).toEqual(action);
    });

    it('resize(): viewport resize', () => {
      const action = {
        type: types.RESIZE,
        minHeight: 710,
        deviceType: 'small'
      }

      expect(resize(710, 'small')).toEqual(action);
    });

    it('requestAlbums()', () => {
      const action = {
        type: types.REQUEST_ALBUMS
      }

      expect(requestAlbums()).toEqual(action);
    });

    it('receiveAlbums()', () => {
      const action = {
        type: types.RECEIVE_ALBUMS,
        albums: ['album']
      }

      expect(receiveAlbums(['album'])).toEqual(action);
    });

    it('requestAlbumsFailed()', () => {
      const action = {
        type: types.REQUEST_ALBUMS_FAILED,
        error: 'Unknown error'
      }

      expect(requestAlbumsFailed('Unknown error')).toEqual(action);
    });

    it('requestData()', () => {
      const action = {
        type: types.REQUEST_DATA
      }

      expect(requestData()).toEqual(action);
    });

    it('receiveData()', () => {
      const action = {
        type: types.RECEIVE_DATA,
        data: []
      }

      expect(receiveData([])).toEqual(action);
    });

    it('requestDataFailed()', () => {
      const action = {
        type: types.REQUEST_DATA_FAILED,
        error: 'Unknown error'
      }

      expect(requestDataFailed('Unknown error')).toEqual(action);
    });

  });

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('albums fetch done', () => {
      fetchMock.getOnce(`${FETCH_URL}/albums`, [{ "id":"pinhole", "name":"pinhole" },
                                                { "id":"wedding", "name":"wedding" },
                                                { "id":"concert", "name":"concert" },
                                                { "id":"pixelart", "name":"pixelart" }]);

      const actions = [requestAlbums(),
                       receiveAlbums([ { text: 'pinhole', path: '/' },
                                       { text:"wedding", path:"/wedding" },
                                       { text:"concert", path:"/concert" },
                                       { text:"pixelart", path:"/pixelart" } ])];
      const store = mockStore({});

      return store.dispatch(fetchAlbums()).then(() => {
        expect(store.getActions()).toEqual(actions);
      });
    });

    it('data fetch done', () => {
      fetchMock.getOnce(`${FETCH_URL}/albums/pinhole`, []);

      const actions = [requestData(),
                       receiveData([])];
      const store = mockStore({});

      return store.dispatch(fetchData('pinhole')).then(() => {
        expect(store.getActions()).toEqual(actions);
      });
    });
  });
});
