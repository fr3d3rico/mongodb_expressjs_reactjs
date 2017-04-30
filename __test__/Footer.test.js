import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../src/Footer';
import renderer from 'react-test-renderer';

const divFooter = {
  'type': 'div',
  'props': {}
}

test('Footer Component test renderer', () => {
  const component = renderer.create(<Footer />);
  expect(component.toJSON()).toMatchObject(divFooter);
});

test('Footer Component test with Enzyme if have text', () => {
  const component = shallow(<Footer />);
  expect(component.text()).toEqual('Footer');
});
