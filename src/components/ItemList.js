import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import ReactMarkdown from 'react-markdown'
import Icon from './Icon'
import Link from './Link'

import '../styles/components/ItemList.pcss'

import withI18n from './withI18n'
import withEmitter from './withEmitter'

const ItemList = ({ translate, moment, emitter, listItems }) => (
  <ul className="linedList ItemList" >
    {listItems.map(listItem => (
      <li
        id={listItem['@id']}
        key={listItem['@id']}
        onMouseEnter={() => {
          emitter.emit('hoverPoint', { id: listItem["@id"] })
        }}
        onMouseLeave={() => {
          emitter.emit('hoverPoint', { id: '' })
        }}
      >
        <Tooltip
          overlay={
            <div>
              <b>{translate(listItem.name) || listItem['@id']}</b>
              {listItem.description ?
                (
                  <ReactMarkdown
                    escapeHtml={false}
                    source={translate(listItem.description).length
                      ? translate(listItem.description)
                      : translate(listItem.description)
                    }
                  />
                )
                : (<p>No description available</p>)
              }
            </div>
          }
          placement="left"
          mouseEnterDelay={0.2}
          overlayClassName="itemListTooltip"
        >
          <div>
            <Link className="item" href={'/resource/' + listItem['@id']}>
              <Icon type={listItem['@type']} />
              <span>{translate(listItem.name) || listItem['@id']}</span>
            </Link>
          </div>
        </Tooltip>
      </li>
    ))}
  </ul>
)


ItemList.propTypes = {
  translate: PropTypes.func.isRequired,
  moment: PropTypes.func.isRequired,
  emitter: PropTypes.objectOf(PropTypes.any).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default withEmitter(withI18n(ItemList))
