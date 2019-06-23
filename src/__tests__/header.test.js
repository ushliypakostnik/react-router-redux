import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';

import { INITIAL_STATE } from '../store/constants';

import Header from '../containers/header';

describe('header render', () => {

  const mockStore = configureStore();

  const props = {
    items: [ { text: 'pinhole', path: '/' },
        { text:"wedding", path:"/wedding" },
        { text:"concert", path:"/concert" },
        { text:"pixelart", path:"/pixelart" } ]
  };

  const store = mockStore(INITIAL_STATE);

  const wrapper = mount(<Provider store={store}>
                          <MemoryRouter>
                            <Header {...props} />
                          </MemoryRouter>
                        </Provider>);

  it('header render correctly', () => {
    //expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('header contain wrapper with class', () => {
    expect(wrapper.find('.app__header')).toHaveLength(1);
  });

  it('header contain menu', () => {
    expect(wrapper.find('MenuItem')).toHaveLength(4);
  });

  it('header contain navbar', () => {
    expect(wrapper.find('.header__navbar')).toHaveLength(1);
  });

  it('header contain drawer', () => {
    expect(wrapper.find('Drawer')).toBeTruthy();
  });

  it('header contain logo', () => {
    expect(wrapper.find('.header__logo')).toHaveLength(2);
  });

  it('header contain social', () => {
    expect(wrapper.find('.header__social')).toHaveLength(4);
  });

  it('header contain theme switch', () => {
    expect((wrapper).find('ThemeSwitch')).toBeTruthy();
  });

  it('click on navbar', () => {
    expect(wrapper.find('Header').instance().state.visible).toEqual(false);
    wrapper.find('.header__navbar').simulate('click');
    expect(wrapper.find('Header').instance().state.visible).toEqual(true);
  });

  it('active page', () => {
    expect(wrapper.find('Header').instance().state.pageIsActive).toBe('/');
    expect(wrapper.find('MenuItem').first().hasClass('app__menu--active')).toEqual(true);

    const state = Object.assign({}, INITIAL_STATE, {
      reducer: {
        ...INITIAL_STATE.reducer,
        activePage: '/concert'
      }
    });
    const store2 = mockStore(state);
    const wrapper2 = mount(<Provider store={store2}>
                              <MemoryRouter>
                                <Header {...props} />
                              </MemoryRouter>
                            </Provider>);
    expect(wrapper2.find('Header').instance().state.pageIsActive).toBe('/concert');
    expect(wrapper2.find('MenuItem').first().hasClass('app__menu--active')).toEqual(false);
    expect(wrapper2.find('MenuItem').at(2).hasClass('app__menu--active')).toEqual(true);
  });
});
