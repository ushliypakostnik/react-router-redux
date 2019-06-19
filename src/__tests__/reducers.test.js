import React from 'react';

import { INITIAL_STATE } from '../store/constants';
import * as types from '../store/actions';
import reducer from '../store/reducers';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('REQUEST_ALBUMS', () => {
    const action = {
      type: types.REQUEST_ALBUMS
    }

    expect(reducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      isFetching: true
    });
  });

  it('RECEIVE_ALBUMS', () => {
    const initialState = {
      albums: [],
      isFetching: true,
      error: true
    }

    const action = {
      type: types.RECEIVE_ALBUMS,
      albums: ['album1']
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isFetching: false,
      albums: action.albums
    });
  });

  it('REQUEST_ALBUMS_FAILED', () => {
    const initialState = {
      isFetching: true,
      error: null
    }

    const action = {
      type: types.REQUEST_ALBUMS_FAILED,
      error: 'error'
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isFetching: false,
      error: action.error
    });
  });

  it('REQUEST_DATA', () => {
    const action = {
      type: types.REQUEST_DATA
    }

    expect(reducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      isFetching: true
    });
  });

  it('RECEIVE_DATA', () => {
    const initialState = {
      data: [],
      isFetching: true,
      error: null
    }

    const action = {
      type: types.RECEIVE_DATA,
      data: []
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isFetching: false,
      data: action.data
    });
  });

  it('REQUEST_DATA_FAILED', () => {
    const initialState = {
      isFetching: true,
      error: null
    }

    const action = {
      type: types.REQUEST_DATA_FAILED,
      error: 'error'
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isFetching: false,
      error: action.error
    });
  });

  it('PAGE_TO_ACTIVE', () => {
    const action = {
      type: types.PAGE_TO_ACTIVE,
      activePage: '/'
    }

    expect(reducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      activePage: action.activePage
    });
  });

  it('TOGGLE_THEME', () => {
    const action = {
      type: types.TOGGLE_THEME,
      theme: 'light'
    }

    expect(reducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      theme: action.theme
    });
  });

  it('RESIZE', () => {
    const action = {
      type: types.RESIZE,
      resize: {
        minHeight: 710,
        deviceType: 'small'
      }
    }

    expect(reducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      resize: {
        minHeight: action.minHeight,
        deviceType: action.deviceType
      }
    });
  });
});
