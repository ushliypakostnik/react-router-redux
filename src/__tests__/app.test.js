import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_URL, INITIAL_STATE } from '../store/constants';
import { fetchAlbums } from '../store/actions';

import App from '../containers/app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app render', () => {

  let store,
      wrapper;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    wrapper = mount(<Provider store={store}>
                      <MemoryRouter>
                        <App />
                      </MemoryRouter>
                    </Provider>);
  });

  it('app render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('app has wrapper with class', () => {
    expect(wrapper.find('.app')).toHaveLength(1);
  });

  it('app has resize', () => {
    expect(wrapper.find('Resize')).toHaveLength(1);
  });

  it('app has header', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('app has switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  afterEach(() => wrapper.unmount());
});
