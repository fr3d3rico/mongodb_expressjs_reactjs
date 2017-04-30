import React from 'react';
import {shallow} from 'enzyme';
import Header from '../src/Header';
import renderer from 'react-test-renderer';

const divHeader = {
  'type': 'div',
  'props': {}
}

test('Header Component test renderer', () => {
  const component = renderer.create(<Header />);
  expect(component.toJSON()).toMatchObject(divHeader);
});

test('Header Component test with Enzyme if have text', () => {
  const component = shallow(<Header />);
  expect(component.text()).toContain('MongoDB + ExpressJS + ReactJS');
});
