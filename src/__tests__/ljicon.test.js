import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { LjIcon } from '../components/menu';


describe('LjIcon render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LjIcon />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
