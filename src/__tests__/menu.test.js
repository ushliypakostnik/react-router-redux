import React from 'react';
import { shallow } from 'enzyme';

import Menu from '../components/menu';

describe('menu shallow render', () => {
  let wrapper;
  const children = [];

  beforeEach(() => {
    wrapper = shallow(<Menu children={children} />);
  });

  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
