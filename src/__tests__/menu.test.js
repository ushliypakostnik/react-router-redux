import React from 'react';

import Menu, { MenuItem, LjIcon } from '../components/menu';

describe('menu render', () => {
  let wrapper,
      item,
      icon;

  const props = {
    data:[
      {
        key: 1,
        text: 'Item1',
        path: '/1',
        className: "class1",
        onClick: jest.fn()
      },
      {
        key: 2
      }
    ]
  };

  beforeEach(() => {
    wrapper = shallow(<Menu children={props.data} />);
    item = shallow(<MenuItem {...props.data[0]} />);
    icon = shallow(<LjIcon />);
  });

  it('menu render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('menu has class', () => {
    expect(wrapper.hasClass('app__menu')).toEqual(true);
  });

  it('menu has two childs', () => {
    expect(wrapper.children()).toHaveLength(2);
  });

  it('item render correctly', () => {
    expect(toJson(item)).toMatchSnapshot();
  });

  it('item name is li', () => {
    expect(item.name()).toEqual('li');
  });

  it('item has class', () => {
    expect(item.find('Link').hasClass(props.data[0].className)).toEqual(true);
  });

  it('icon render correctly', () => {
    expect(toJson(icon)).toMatchSnapshot();
  });
});
