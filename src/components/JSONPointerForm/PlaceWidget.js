import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Fieldset from './Fieldset'
import Input from './Input'
import DropdownSelect from './DropdownSelect'
import withFormData from './withFormData'
import Icon from '../Icon'
import withApi from '../withApi'

import { triggerClick, getProp, mapNominatimResult } from '../../common'

class PlaceWidget extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filter: "",
      options: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateOptions = _.debounce(this.updateOptions.bind(this), 200)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick)
  }

  handleClick(e) {
    if (!this.wrapper.contains(e.target)) {
      this.setState({options: []})
    }
  }

  handleChange(e) {
    this.setState({filter: e.target.value})
    e.target.value ? this.updateOptions() : this.setState({options: []})
  }

  updateOptions() {
    const {value, api} = this.props
    const url = 'https://nominatim.openstreetmap.org/search'
    const params = [
      'format=json',
      'addressdetails=1',
      'limit=10',
      `countrycodes=${getProp(['address', 'addressCountry'], value)}`
    ]
    api.fetch(`${url}/${this.state.filter}?${params.join('&')}`).then(
      result => this.setState({options: result.map(result => mapNominatimResult(result))})
    )
  }

  render() {
    const {
      name, value, errors, property, title, className, translate, schema, api, setValue
    } = this.props

    return (
      <div
        className={`PlaceWidget ${property || ''} ${className}`.trim()}
        role="group"
        aria-labelledby={`${name}-label`}
      >
        <div className="label" id={`${name}-label`}>{translate(title)}</div>
        {errors.map((error, index) => (
          <div className="error" key={index}>{error.message}</div>
        ))}
        <Fieldset property="address" translate={translate}>
          <DropdownSelect
            property="addressCountry"
            translate={translate}
            options={schema.properties.address.properties.addressCountry.enum}
            title={schema.properties.address.properties.addressCountry.title}
          />
          {getProp(['address', 'addressCountry'], value) &&
            <div>
              <div ref={el => this.wrapper = el} className="selectContainer">
                <div className="filterContainer">
                  <input
                    type="text"
                    value={this.state.filter}
                    className="filter"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.options.length > 0 &&
                  <div className="optionsContainer">
                    <ul>
                      {this.state.options.map(option => (
                        <li key={option['@id']}>
                          <input
                            type="checkbox"
                            value={option['@id']}
                            id={`${name}-${option['@id']}`}
                            onChange={e => {
                              setValue(e.target.checked ? option : undefined)
                              this.setState({options: [], filter: ""})
                            }}
                          />
                          <label
                            htmlFor={`${name}-${option['@id']}`}
                            tabIndex="0"
                            role="button"
                            onKeyDown={e => triggerClick(e, 13)}
                          >
                            <Icon type={option["@type"]} />
                            &nbsp;{translate(option.name)}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
              <Input
                property="streetAddress"
                type="text"
                translate={translate}
                title={schema.properties.address.properties.streetAddress.title}
              />
              <Input
                property="postalCode"
                type="text"
                translate={translate}
                title={schema.properties.address.properties.postalCode.title}
              />
              <Input
                property="postOfficeBoxNumber"
                type="text"
                translate={translate}
                title={schema.properties.address.properties.postOfficeBoxNumber.title}
              />
              <Input
                property="addressLocality"
                type="text"
                translate={translate}
                title={schema.properties.address.properties.addressLocality.title}
              />
              <Input
                property="addressRegion"
                type="text"
                translate={translate}
                title={schema.properties.address.properties.addressRegion.title}
              />
            </div>
          }
        </Fieldset>
      </div>
    )
  }
}

PlaceWidget.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  property: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  translate: PropTypes.func.isRequired
}

PlaceWidget.defaultProps = {
  errors: [],
  property: undefined,
  title: '',
  className: ''
}

export default withApi(withFormData(PlaceWidget))
