import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { FETCH_URL, INITIAL_STATE } from '../store/constants';

import Album from '../components/album';

describe('album render', () => {

  const mockStore = configureStore();
  let store,
      wrapper,
      gallery;

  const props = {
    photos: [
      {src: `${FETCH_URL}/media/pinhole/010.jpg`, width: 620, height: 632},
      {src: `${FETCH_URL}/media/pinhole/020.jpg`, width: 1568, height: 632},
      {src: `${FETCH_URL}/media/pinhole/030.jpg`, width: 1053, height: 632}
    ]
  };

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    wrapper = mount(<Provider store={store}>
                      <Album photos={props.photos} >
                      </Album>
                    </Provider>);
  });

  it('album render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('album has wrapper with class', () => {
    expect(wrapper.find('.app__gallery')).toHaveLength(1);
  });

  it('album has gallery', () => {
    expect(wrapper.find('Gallery')).toHaveLength(1);
  });

  afterEach(() => wrapper.unmount());
});
