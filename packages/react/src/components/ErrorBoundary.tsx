import { BaseClient } from '@wtjs/core'
import { BaseBreadcrumbTypes, BREADCRUMBCATEGORYS, ErrorTypes } from '@wtjs/shared'
import { ReportDataType } from '@wtjs/types'
import { extractErrorStack, Severity } from '@wtjs/utils'
import { PureComponent, ReactNode, ErrorInfo, ComponentType, FC } from 'react'
import { MitoContext } from './provider'

interface ErrorBoundaryProps {
  fallback?: ReactNode
  onError?: (error: Error, componentStack: string) => void
  MitoInstance?: BaseClient
}

interface ErrorBoundaryState {
  hasError?: boolean
}

class ErrorBoundaryWrapped extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  readonly state: ErrorBoundaryState
  props: {
    children: any
    fallback: any 
    onError: any; 
    MitoInstance: any 
  }
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    // error and componentStack are what we need
    const { onError, MitoInstance } = this.props
    const reactError = extractErrorStack(error, Severity.Normal) as ReportDataType
    reactError.type = ErrorTypes.REACT
    onError?.(error, componentStack)
    // mito handler -> collected react render error
    const breadcrumbStack = MitoInstance?.breadcrumb.push({
      type: BaseBreadcrumbTypes.REACT,
      data: reactError,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      level: Severity.Error
    })
    MitoInstance?.transport.send(reactError, breadcrumbStack)
    this.setState({
      hasError: true
    })
  }
  setState(arg0: { hasError: boolean }) {
    throw new Error('Method not implemented.')
  }
  render() {
    return (this.state.hasError ? this.props.fallback : this.props.children) ?? null
  }
}

export const ErrorBoundary: FC<ErrorBoundaryProps & { children: ReactNode }> = (props: ErrorBoundaryProps & { children: ReactNode }) => (
  <MitoContext.Consumer>
    {({ MitoInstance }) => (
      <ErrorBoundaryWrapped {...props} MitoInstance={props.MitoInstance || MitoInstance}>
        {props.children}
      </ErrorBoundaryWrapped>
    )}
  </MitoContext.Consumer>
)

export const WithErrorBoundary = (errorBoundaryProps: ErrorBoundaryProps = {}) =>
  function <C extends ComponentType>(ToWrapComponent: C) {
    // ToWrapComponent may be class component or Function
    const componentDisplayName = ToWrapComponent.displayName || ToWrapComponent.name || 'unknown'
    const wrapped: FC = (props: any) => (
      <ErrorBoundary {...errorBoundaryProps}>
        <ToWrapComponent {...props} />
      </ErrorBoundary>
    )
    wrapped.displayName = `MitoErrorBoundary(${componentDisplayName})`
    return wrapped as C
  }
