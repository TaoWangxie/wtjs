import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@js-wtao/shared'
import { isExistProperty, on, parseUrlToObj, _global, getTimestamp } from '@js-wtao/utils'
import { BasePluginType, RouteChangeCollectType } from '@js-wtao/types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils'

const hashRoutePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.HASHCHANGE,
  monitor(notify) {
    if (!isExistProperty(_global, 'onpopstate')) {
      on(_global, BrowserEventTypes.HASHCHANGE, function (e: HashChangeEvent) {
        const { oldURL: from, newURL: to } = e
        notify(BrowserEventTypes.HASHCHANGE, { from, to })
      })
    }
  },
  transform(collectedData: RouteChangeCollectType) {
    return routeTransform(collectedData)
  },
  consumer(transformedData: RouteChangeCollectType) {
    routeTransformedConsumer.call(this, transformedData)
  }
}

export function routeTransform(collectedData: RouteChangeCollectType): RouteChangeCollectType {
  const { from, to } = collectedData
  const { relative: parsedFrom } = parseUrlToObj(from)
  const { relative: parsedTo } = parseUrlToObj(to)
  return {
    from: parsedFrom ? parsedFrom : '/',
    to: parsedTo ? parsedTo : '/'
  }
}

export function routeTransformedConsumer(this: BrowserClient, transformedData: RouteChangeCollectType) {
  if (transformedData.from === transformedData.to) return
  addBreadcrumbInBrowser.call(this, transformedData, BrowserBreadcrumbTypes.ROUTE)
  let pvdata = {
    type: BrowserEventTypes.PV,
    isTrack: true,
    time: getTimestamp(),
    userinfo:{},
    pageinfo:{},
    ...transformedData,
  }
  this.transport.send(pvdata)
}

export default hashRoutePlugin
