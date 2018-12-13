import React from 'react'
import assert from 'assert'
import { render } from 'enzyme'

import Diffs from '../src/components/Diffs'
import data from './resources/diffs.json'
import I18nProvider from '../src/components/I18nProvider'
import EmittProvider from '../src/components/EmittProvider'

import mock from './helpers/mock'

describe('<Diffs />', () => {
  const wrapper = render(
    <I18nProvider i18n={mock.i18n}>
      <EmittProvider emitter={mock.emitter}>
        <Diffs {...data} phrases={{}} schema={mock.schema} />
      </EmittProvider>
    </I18nProvider>
  )

  test('creates 5 .logBlock items', () => {
    assert.strictEqual(wrapper.find('.logBlock').length, 5)
  })
  test('creates a <del> and <ins> element', () => {
    assert.strictEqual(wrapper.find('ins').length, 1)
    assert.strictEqual(wrapper.find('del').length, 1)
  })
})
