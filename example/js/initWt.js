const instance = WTJS.init({
  debug: true,
  apikey: 'sdasda',
  silentConsole: true,
  silentXhr: false,
  maxBreadcrumbs: 10,
  dsn: 'http://82.156.198.41:11112/ceshi',
  throttleDelayTime: 0,
  enableTraceId: true,
  configReportXhr(xhr, reportData) {
    xhr.setRequestHeader('mito-header', 'test123')
  }
})
window.WTJS = instance