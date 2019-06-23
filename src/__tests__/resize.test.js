import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INITIAL_STATE } from '../store/constants';

import Resize from '../containers/resize';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('resize render', () => {

  const props = {
    resize: {
      minHeight: '700px',
      deviceType: 'large'
    }
  };

  const state = Object.assign({}, INITIAL_STATE, {
    reducer: {
      resize: props.resize
    }
  });
  const store = mockStore(state);

  const wrapper = mount(<Provider store={store}>
                          <Resize {...props} />
                        </Provider>);

  it('resize render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('resize contain wrapper with class', () => {
    expect(wrapper.find('.app__resize')).toHaveLength(1);
  });

  it('resize contain resize detector', () => {
    expect(wrapper.find('ResizeDetector')).toHaveLength(1);
  });
});
