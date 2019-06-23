import React from 'react';

import { FETCH_URL } from '../store/constants';

import LightboxContainer from '../components/lightbox';
import Lightbox from 'react-image-lightbox';

describe('lightbox render', () => {

  const props = {
    images: [`${FETCH_URL}/media/pinhole/010.jpg`,
             `${FETCH_URL}/media/pinhole/020.jpg`,
             `${FETCH_URL}/media/pinhole/030.jpg`],
    key: 0,
    index: null,
    isOpen: false,
    lightboxUpdate: jest.fn()
  }

  const props2 = {
    ...props.images,
    mainSrc: props.images[1],
    nextSrc: props.images[0],
    prevSrc: props.images[2],
    onCloseRequest: jest.fn(),
    onMovePrevRequest: jest.fn(),
    onMoveNextRequest: jest.fn(),
    animationDuration: 100,
    enableZoom: false,
    reactModalStyl: {
      overlay: {
        zIndex: 2000
      }
    }
  }

  const wrapper = mount(<LightboxContainer {...props} />);
  const lightbox = shallow(<Lightbox {...props2} />);

  it('lightbox container render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('lightbox render correctly', () => {
    expect(toJson(lightbox)).toMatchSnapshot();
  });
});
