/* global localStorage */

import React from 'react'
import PropTypes from 'prop-types'

import ReactiveMap from './ReactiveMap'
import ReactiveFilters from './ReactiveFilters'

import withEmitter from './withEmitter'

import '../styles/components/ResourceIndex.pcss'

const ResourceIndex = ({
  mapboxConfig,
  elasticsearchConfig,
  emitter,
  // query,
  // filters,
  // aggregations,
  // member,
  // size,
  // totalItems,
  // nextPage,
  // previousPage,
  // from,
  iso3166,
  map,
  view,
  children,
  _self,
  _links,
  className,
  // sort,
  // embedValue,
  phrases,
  isEmbed,
  region,
}) => {
  const home = _self.endsWith('/resource/?features=true')
  const initPins = isEmbed || (typeof localStorage !== 'undefined' && localStorage.getItem('showPins') === 'true')

  return (
    <ReactiveFilters
      iso3166={iso3166}
      region={region}
      elasticsearchConfig={elasticsearchConfig}
      initPins={initPins}
    >

      <ReactiveMap
        phrases={phrases}
        aggregations={[]}
        emitter={emitter}
        mapboxConfig={mapboxConfig}
        iso3166={iso3166}
        map={map}
        home={home}
        _links={_links}
        initPins={initPins}
        region={region}
        data={[]}
      />
    </ReactiveFilters>
  )
}

ResourceIndex.propTypes = {
  mapboxConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  filters: PropTypes.objectOf(PropTypes.any).isRequired,
  aggregations: PropTypes.objectOf(PropTypes.any).isRequired,
  member: PropTypes.arrayOf(PropTypes.any).isRequired,
  size: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
  nextPage: PropTypes.string,
  previousPage: PropTypes.string,
  from: PropTypes.string.isRequired,
  iso3166: PropTypes.string,
  emitter: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.string,
  map: PropTypes.string,
  view: PropTypes.string,
  children: PropTypes.node,
  _self: PropTypes.string.isRequired,
  _links: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  sort: PropTypes.string,
  embedValue: PropTypes.string,
  phrases: PropTypes.objectOf(PropTypes.any).isRequired,
  isEmbed: PropTypes.bool.isRequired,
  region: PropTypes.string,
  elasticsearchConfig: PropTypes.shape(
    {
      index: PropTypes.string,
      url: PropTypes.string,
    },
  ).isRequired,
}

ResourceIndex.defaultProps = {
  query: '',
  map: null,
  nextPage: null,
  previousPage: null,
  iso3166: '',
  view: '',
  className: null,
  sort: '',
  embedValue: null,
  children: null,
  region: null,
}

export default withEmitter(ResourceIndex)