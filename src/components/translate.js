import React from 'react'
import PropTypes from 'prop-types'

const translate = (BaseComponent) => {
  const LocalizedComponent = (props, context) => (
    <BaseComponent
      translate={context.translate}
      locales={context.locales}
      {...props}
    />
  )

  LocalizedComponent.contextTypes = {
    translate: PropTypes.func.isRequired,
    locales: PropTypes.array.isRequired
  }

  return LocalizedComponent
}

export default translate
