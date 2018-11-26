import React from 'react'
import assert from 'assert'
import { render } from 'enzyme'
import testdata from './resources/ItemList.json'

import ItemList from '../src/components/ItemList'
import I18nProvider from '../src/components/I18nProvider'
import EmittProvider from '../src/components/EmittProvider'

import mock from './helpers/mock'

describe('<ItemList />', () => {
  test('creates list entry for each item', () => {
    const wrapper = render(
      <I18nProvider i18n={mock.i18n}>
        <EmittProvider emitter={mock.emitter}>
          <ItemList listItems={testdata} selected='none' />
        </EmittProvider>
      </I18nProvider>
    )
    assert.strictEqual(wrapper.find('li').length, 6)
  })
})
