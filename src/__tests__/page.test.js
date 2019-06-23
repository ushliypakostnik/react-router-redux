import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_URL, INITIAL_STATE } from '../store/constants';

import Page from '../containers/page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('page render', () => {

  const props = {
    path: '/pinhole',
    minHeight: '700px',
    isLoaded: false,
    error: null,
    images: []
  };

  const state = Object.assign({}, INITIAL_STATE, {
    reducer: {
      ...INITIAL_STATE.reducer,
      isFetching: !props.isLoaded,
      resize: { minHeight: props.minHeight }
    }
  });
  const store = mockStore(state);

  const wrapper = mount(<Provider store={store}>
                          <Page {...props} />
                        </Provider>);

  it('page render correctly: initial state', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('page contain wrapper with class', () => {
    expect(wrapper.find('.app__page')).toHaveLength(1);
  });

  it('page componentDidMount', () => {
    const spy = jest.spyOn(wrapper.find('Page').instance(), 'componentDidMount');
    wrapper.find('Page').instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  describe('page render: data is loaded', () => {

    const props1 = {
      ...props,
      isLoaded: true,
      images: [
        { src: `${FETCH_URL}/media/pinhole/010.jpg`, width: 620, height: 632 },
        { src: `${FETCH_URL}/media/pinhole/020.jpg`, width: 1568, height: 632 },
        { src: `${FETCH_URL}/media/pinhole/030.jpg`, width: 1053, height: 632 }
      ]
    };

    const state1 = Object.assign({}, INITIAL_STATE, {
      reducer: {
        ...INITIAL_STATE.reducer,
        isFetching: !props1.isLoaded,
        data: props1.images,
        resize: { minHeight: props1.minHeight }
      }
    });
    const store1 = mockStore(state1);

    const wrapper1 = mount(<Provider store={store1}>
                            <Page {...props1} />
                          </Provider>);

    it('page render correctly: data is loaded', () => {
      expect(toJson(wrapper1)).toMatchSnapshot();
    });

    it('page contain album', () => {
      expect(wrapper.find('Album')).toBeTruthy();
    });
  });

  describe('page render: data error', () => {

    const props2 = {
      ...props,
      error: 'error'
    };

    const state2 = Object.assign({}, INITIAL_STATE, {
      reducer: {
        ...INITIAL_STATE.reducer,
        error: props2.error,
        isFetching: !props2.isLoaded,
        resize: { minHeight: props2.minHeight }
      }
    });
    const store2 = mockStore(state2);

    const wrapper2 = mount(<Provider store={store2}>
                            <Page {...props2} />
                          </Provider>);

    it('page render correctly: data error', () => {
      expect(toJson(wrapper2)).toMatchSnapshot();
    });
  });
});
