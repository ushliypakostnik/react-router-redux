import React from 'react';

import { LjIcon } from '../components/icons';

describe('icons render', () => {

  it('lj icon render correctly', () => {
    const icon = shallow(<LjIcon />);
    expect(toJson(icon)).toMatchSnapshot();
  });
});
