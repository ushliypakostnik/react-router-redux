import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INITIAL_STATE } from '../store/constants';

import App from '../containers/app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app render', () => {

  const props = {
    albums: [ { text: 'pinhole', path: '/' },
              { text:"wedding", path:"/wedding" },
              { text:"concert", path:"/concert" },
              { text:"pixelart", path:"/pixelart" } ]
  };

  const state = Object.assign({}, INITIAL_STATE, {
    reducer: {
      ...INITIAL_STATE.reducer,
      albums: props.albums
    }
  });
  const store = mockStore(state);

  const wrapper = mount(<Provider store={store}>
                          <MemoryRouter>
                            <App {...props} />
                          </MemoryRouter>
                        </Provider>);

  it('app render correctly', () => {
    //expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('app contain wrapper with class', () => {
    expect(wrapper.find('.app')).toHaveLength(1);
  });

  it('app contain resize', () => {
    expect(wrapper.find('Resize')).toHaveLength(1);
  });

  it('app contain header', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('app contain switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  it('app contain route', () => {
    expect(wrapper.find('Route')).toHaveLength(1);
  });

  it('app contain page', () => {
    expect(wrapper.find('Page')).toHaveLength(1);
  });

  it('app contain album', () => {
    expect(wrapper.find('Album')).toHaveLength(1);
  });

  it('app contain gallery', () => {
    expect(wrapper.find('Gallery')).toHaveLength(1);
  });

  it('app componentDidMount', () => {
    const spy = jest.spyOn(wrapper.find('App').instance(), 'componentDidMount');
    wrapper.find('App').instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });
});
