import { BaseClient } from '@wtjs/core';
import { FC } from 'react';
import { ReactNode } from 'react';

export declare const ErrorBoundary: FC<ErrorBoundaryProps & {
    children: ReactNode;
}>;

declare interface ErrorBoundaryProps {
    fallback?: ReactNode;
    onError?: (error: Error, componentStack: string) => void;
    MitoInstance?: BaseClient;
}

export declare const MitoContext: any;

declare interface MitoContextValueType {
    MitoInstance: BaseClient;
}

export declare const MitoProvider: FC<MitoContextValueType>;

export declare const WithErrorBoundary: (errorBoundaryProps?: ErrorBoundaryProps) => <C extends any>(ToWrapComponent: C) => C;

export { }
