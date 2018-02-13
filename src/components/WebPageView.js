import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import withI18n from './withI18n'
import Block from './Block'
import ItemList from './ItemList'
import Link from './Link'
import ConceptTree from './ConceptTree'
import WebPageUserActions from './WebPageUserActions'
import SocialLinks from './SocialLinks'

import { formatURL/*, obfuscate*/ } from '../common'
import '../styles/components/WebPageView.pcss'

const WebPageView = ({translate, moment, about, user, view}) => {

  const lighthouses = (about.objectIn || []).filter(action => action['@type'] === 'LighthouseAction') || []

  const likes = (about.objectIn || []).filter(action => action['@type'] === 'LikeAction') || []

  return (
    <div className="WebPageView">

      {about.sameAs &&
        <SocialLinks links={about.sameAs} />
      }

      {about.countryChampionFor &&
        <div className="subtitle">
          {about.countryChampionFor.map(country => (
            <div key={country}>
              {translate(`${about['@type']}.countryChampionFor`)}
              &nbsp;<Link href={`/country/${country}`}>{translate(country)}</Link>
            </div>
          ))}
        </div>
      }

      {user &&
        <WebPageUserActions about={about} user={user} view={view} />
      }

      <h2>{translate(about.displayName) || translate(about.name)}</h2>

      <div className="information">
        <div className="main">
          {(about.description || about.articleBody) &&
            <div className="description">
              <h3>{translate('Description')}</h3>

              {about.description &&
                <ReactMarkdown escapeHtml={false} source={translate(about.description)} />
              }

              {about.articleBody &&
                <ReactMarkdown escapeHtml={false} source={translate(about.articleBody)} />
              }
            </div>
          }

          {about.url &&
            <a href={about.url} target="_blank" rel="noopener" className="boxedLink">
              {formatURL(about.url)}
            </a>
          }

          {about.availableChannel &&
            about.availableChannel.map(link => (
              <a key={link.serviceUrl} href={link.serviceUrl} target="_blank" rel="noopener" className="boxedLink">
                {formatURL(link.serviceUrl)}
              </a>
            ))
          }

          {about.license &&
            about.license.map(license => (
              <img key={license['@id']} className="licenseImage" src={license.image} alt={translate(license.name)} />
            ))
          }

          {about.award &&
            <div>
              {about.award.map(award => (
                <img key={award} src={award} className="awardImage" alt={translate('Award')} />
              ))
              }
            </div>
          }
        </div>

        <aside className="webpageColumn">

          <div className="lighthouses">
            <img
              src="/assets/lighthouse.svg"
              alt="Lighthouse"
            />
            {translate('Lighthouse')} ({lighthouses.length})
          </div>

          <div className="likes">
            <i className="fa fa-thumbs-up" /> <span>({likes.length})</span>
          </div>

          {about.email &&
            <Block title={translate(`${about['@type']}.email`)}>
              {/* FIXME: Find a way to set raw attribute value */}
              {/* <a href={`mailto:${obfuscate(about.email)}`}>{obfuscate(about.email)}</a> */}
              <p>
                <a href={`mailto:${about.email}`}>{about.email}</a>
              </p>
            </Block>
          }

          {about.availableChannel &&
            <Block title={translate(`${about['@type']}.availableChannel.availableLanguage`)}>
              {about.availableChannel.map(item => (
                item.availableLanguage &&
                <p key={item.availableLanguage[0]}>
                  {translate(item.availableLanguage[0])}
                </p>
              ))}
            </Block>
          }

          {about.location && about.location.address &&
            <Block title={translate(`${about['@type']}.location`)}>
              <p>
                {about.location.address.streetAddress &&
                  [about.location.address.streetAddress, <br key="br" />]
                }
                {(about.location.address.postalCode || about.location.address.addressLocality) &&
                  [about.location.address.postalCode, <span key="span">&nbsp;</span>, about.location.address.addressLocality, <br key="br" />]
                }
                {about.location.address.addressRegion &&
                  [translate(about.location.address.addressRegion), <br key="br" />]
                }
                {about.location.address.addressCountry &&
                  translate(about.location.address.addressCountry)
                }
              </p>
            </Block>
          }

          {about.contactPoint &&
            <Block className="asideList" title={translate(`${about['@type']}.contactPoint`)}>
              <ItemList listItems={about.contactPoint} />
            </Block>
          }

          {about.alternateName &&
            <Block className="asideList" title={translate(`${about['@type']}.alternateName`)}>
              {translate(about.alternateName)}
            </Block>
          }

          {about.about &&
            <Block className="asideList" title={translate(`${about['@type']}.about`)}>
              <ConceptTree
                concepts={require('../json/esc.json').hasTopConcept}
                include={about.about.map(concept => concept['@id'])}
                className="recursiveList linedList ItemList"
                linkTemplate="/resource/?filter.about.about.@id={@id}"
              />
            </Block>
          }

          {about.audience &&
            <Block className="asideList" title={translate(`${about['@type']}.audience`)}>
              <ConceptTree
                concepts={require('../json/isced-1997.json').hasTopConcept}
                include={about.audience.map(concept => concept['@id'])}
                className="linedList ItemList"
                linkTemplate="/resource/?filter.about.audience.@id={@id}"
              />
            </Block>
          }

          {about.startTime &&
            <Block className="asideList" title={translate(`${about['@type']}.startTime`)}>
              {about.startTime.includes('T00:00:00')
                ? moment(about.startTime).format('LL')
                : moment(about.startTime).format('LLL')}
              {about.endTime && ` - ${about.endTime.includes('T00:00:00')
                ? moment(about.endTime).format('LL')
                : moment(about.endTime).format('LLL')}`}
            </Block>
          }

          {about.startDate &&
            <Block className="asideList" title={translate(`${about['@type']}.startDate`)}>
              {moment(about.startDate).format('LL')}
              {about.endDate && ` - ${moment(about.startDate).format('LL')}`}
            </Block>
          }

          {about.inLanguage &&
            <Block className="asideList" title={translate(`${about['@type']}.inLanguage`)}>
              <ul className="commaSeparatedList">
                {about.inLanguage.map(lang => {
                  <li key={lang}>
                    <Link href={`/resource/?filter.about.inLanguage=${lang}`}>
                      {translate(lang)}
                    </Link>
                  </li>
                })}
              </ul>
            </Block>
          }

          {about.hashtag &&
            <Block className="asideList" title={translate(`${about['@type']}.hashtag`)}>
              {about.hashtag}
            </Block>
          }

          {about.keywords &&
            <Block className="asideList" title={translate(`${about['@type']}.keywords`)}>
              <ul className="commaSeparatedList">
                {about.keywords.map(keyword => (
                  <li key={keyword}>
                    <Link href={`/resource/?filter.about.keywords=${keyword}`}>
                      {keyword}
                    </Link>
                  </li>
                ))}
              </ul>
            </Block>
          }

          {about.recordedIn &&
            <Block className="asideList" title={translate(`${about['@type']}.recordedIn`)}>
              <ul>
                {about.recordedIn.map(recording => (
                  <li key={recording}>
                    <a href={recording} target="_blank">
                      <i className="fa fa-external-link-square" /> {formatURL(recording)}
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          }

          {
            ['result', 'resultOf', 'provides', 'provider', 'agent'].map(
              prop => (
                about[prop] &&
                <Block key={prop} collapsible collapsed className="asideList" title={translate(`${about['@type']}.${prop}`)}>
                  <ItemList listItems={about[prop]} />
                </Block>
              )
            )
          }

          {about.agentIn && about.agentIn.some(item => item['@type'] === 'Action') &&
            <Block collapsible collapsed className="asideList" title={translate(`${about['@type']}.agentIn`)}>
              <ItemList listItems={about.agentIn.filter(item => item['@type'] === 'Action')} />
            </Block>
          }

          {
            ['participant', 'participantIn'].map(
              prop => (
                about[prop] &&
                <Block key={prop} collapsible collapsed className="asideList" title={translate(`${about['@type']}.${prop}`)}>
                  <ItemList listItems={about[prop]} />
                </Block>
              )
            )
          }

          {about.isFundedBy && about.isFundedBy.some(grant => grant.isAwardedBy) &&
            <Block className="asideList" title={translate(`${about['@type']}.isFundedBy`)}>
              <ItemList
                listItems={
                  [].concat.apply([], about.isFundedBy.filter(grant => grant.isAwardedBy).map(grant => grant.isAwardedBy))
                }
              />
            </Block>
          }

          {about.isFundedBy && about.isFundedBy.some(grant => grant.hasMonetaryValue) &&
            <Block className="asideList" title={translate(`${about['@type']}.budget`)}>
              <ul>
                {about.isFundedBy.filter(grant => grant.hasMonetaryValue).map((grant, i) => (
                  <li key={i}>
                    {grant.hasMonetaryValue}
                  </li>
                ))}
              </ul>
            </Block>
          }

          {about.awards && about.awards.filter(grant => grant.funds) &&
            <Block className="asideList" title={translate(`${about['@type']}.funds`)}>
              <ItemList
                listItems={
                  [].concat.apply([], about.awards.filter(grant => grant.funds).map(grant => grant.funds))
                }
              />
            </Block>
          }

          {about.hasPart &&
            <Block collapsible className="asideList" title={translate(`${about['@type']}.hasPart`)}>
              <ItemList listItems={about.hasPart} />
            </Block>
          }

          {about.isPartOf &&
            <Block className="asideList" title={translate(`${about['@type']}.isPartOf`)}>
              <ItemList listItems={[about.isPartOf]} />
            </Block>
          }

          {['member', 'memberOf', 'affiliation', 'affiliate', 'organizer',
            'organizerFor', 'performer', 'performerIn', 'attendee', 'attends', 'created', 'creator', 'publication',
            'publisher', 'manufacturer', 'manufactured', 'mentions', 'mentionedIn', 'instrument', 'instrumentIn',
            'isRelatedTo'].map(prop => (
            about[prop] &&
            <Block key={prop} collapsible collapsed className="asideList" title={translate(`${about['@type']}.${prop}`)}>
              <ItemList listItems={about[prop]} />
            </Block>
          ))}

          {['primarySector', 'secondarySector'].map(prop => (
            about[prop] &&
            <Block key={prop} collapsible collapsed className="asideList" title={translate(`${about['@type']}.${prop}`)}>
              <ConceptTree
                concepts={require('../json/sectors.json').hasTopConcept}
                include={about[prop].map(concept => concept['@id'])}
                className="linedList ItemList"
                linkTemplate={`/resource/?filter.about.${prop}.@id={@id}`}
              />
            </Block>
          ))}

        </aside>
      </div>

    </div>
  )
}

WebPageView.propTypes = {
  translate: PropTypes.func.isRequired,
  about: PropTypes.objectOf(PropTypes.any).isRequired,
  moment: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  view: PropTypes.string.isRequired
}

WebPageView.defaultProps = {
  user: null
}

export default withI18n(WebPageView)
