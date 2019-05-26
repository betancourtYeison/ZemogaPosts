/**
 * @format
 */

import React from 'react'
import ButtonReload from '../src/components/buttonReload/ButtonReload'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<ButtonReload />).toJSON()
  expect(tree).toMatchSnapshot()
})
