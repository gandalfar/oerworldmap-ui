import React from 'react'
import PropTypes from 'prop-types'

const withI18n = (BaseComponent) => {
  const LocalizedComponent = (props, context) => (
    <BaseComponent
      translate={context.translate}
      locales={context.locales}
      moment={context.moment}
      {...props}
    />
  )

  LocalizedComponent.contextTypes = {
    translate: PropTypes.func.isRequired,
    locales: PropTypes.arrayOf(PropTypes.any).isRequired,
    moment: PropTypes.func.isRequired
  }

  return LocalizedComponent
}

export default withI18n
