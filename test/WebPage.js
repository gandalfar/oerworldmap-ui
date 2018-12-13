import React from 'react'
import assert from 'assert'
import { render } from 'enzyme'
import testdata from './resources/WebPage.json'

import WebPage from '../src/components/WebPage'
import I18nProvider from '../src/components/I18nProvider'
import EmittProvider from '../src/components/EmittProvider'

import mock from './helpers/mock'

const fakeMapboxConfig = {
  token: 'MAPBOX_ACCESS_TOKEN',
  style: 'MAPBOX_STYLE',
  miniMapStyle: 'MAPBOX_MINIMAP_STYLE'
}

describe('<WebPage />', () => {
  test('can be instantiated', () => {
    const wrapper = render(
      <I18nProvider i18n={mock.i18n}>
        <EmittProvider emitter={mock.emitter}>
          <WebPage {...testdata} geo={null} mapboxConfig={fakeMapboxConfig} view='' schema={mock.schema} />
        </EmittProvider>
      </I18nProvider>
    )
    assert.strictEqual(wrapper.find('h2').length, 1)
  })
})
