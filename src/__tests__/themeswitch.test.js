import React from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { THEME, INITIAL_STATE } from '../store/constants';

import ThemeSwitch from '../containers/theme-switch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('theme switch render', () => {

  const props = {
    theme: THEME.DARK
  };

  const state = Object.assign({}, INITIAL_STATE, {
    reducer: {
      theme: props.theme
    }
  });
  const store = mockStore(state);

  const wrapper = mount(<Provider store={store}>
                          <CookiesProvider>
                            <ThemeSwitch {...props} />
                          </CookiesProvider>
                        </Provider>);

  it('theme switch render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme switch wrapper with class', () => {
    expect(wrapper.find('.app__theme-switch.theme-switch')).toHaveLength(1);
  });

  it('theme switch componentDidMount', () => {
    const spy = jest.spyOn(wrapper.find('ThemeSwitch').instance(), 'componentDidMount');
    wrapper.find('ThemeSwitch').instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('theme switch click: set theme', () => {
    const spy = jest.spyOn(wrapper.find('ThemeSwitch').instance(), 'setTheme');
    wrapper.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('theme switch click: theme toggle', () => {
    const spy = jest.spyOn(wrapper.find('ThemeSwitch').instance(), 'themeChange');
    wrapper.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('theme switch click: cookies', () => {
    wrapper.find('a').simulate('click');
    expect(wrapper.find('ThemeSwitch').instance().props.cookies.cookies).toEqual({
      theme: THEME.LIGHT
    });
  });

  it('theme switch render light theme', () => {
    const state2 = Object.assign({}, INITIAL_STATE, {
      reducer: {
        theme: THEME.LIGHT
      }
    });
    const store = mockStore(state2);
    const wrapper2 = mount(<Provider store={store}>
                              <ThemeSwitch {...props} />
                           </Provider>);

    expect(toJson(wrapper2)).toMatchSnapshot();
    expect(wrapper2.find('ThemeSwitch').instance().props.theme).toEqual(THEME.LIGHT);
  });
});
