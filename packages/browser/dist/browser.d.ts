import { AuthInfo } from '@wtjs/types';
import { BaseClient } from '@wtjs/core';
import { BaseOptions } from '@wtjs/core';
import { BaseOptionsFieldsIntegrationType } from '@wtjs/types';
import { BasePluginType } from '@wtjs/types';
import { BaseTransport } from '@wtjs/core';
import { Breadcrumb } from '@wtjs/core';
import { BrowserEventTypes } from '@wtjs/shared';
import { EventTypes } from '@wtjs/shared';
import { LogTypes } from '@wtjs/types';
import { ReportDataType } from '@wtjs/types';

export declare class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EventTypes> {
    transport: BrowserTransport;
    options: BrowserOptions;
    breadcrumb: Breadcrumb<BrowserOptionsFieldsTypes>;
    constructor(options?: BrowserOptionsFieldsTypes);
    isPluginEnable(name: BrowserEventTypes): boolean;
    log(data: LogTypes): void;
}

declare class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
    silentXhr: boolean;
    silentFetch: boolean;
    silentConsole: boolean;
    silentDom: boolean;
    silentHistory: boolean;
    silentError: boolean;
    silentUnhandledrejection: boolean;
    silentHashchange: boolean;
    useImgUpload: boolean;
    configReportXhr: unknown;
    constructor(options: BrowserOptionsFieldsTypes);
    bindOptions(options: BrowserOptionsFieldsTypes): void;
}

export declare interface BrowserOptionsFieldsTypes extends BrowsersilentOptionsType, BaseOptionsFieldsIntegrationType, BrowserOptionsHooksType {
    useImgUpload?: boolean;
}

export declare interface BrowserOptionsHooksType {
    configReportXhr?(xhr: XMLHttpRequest, reportData: any): void;
}

export declare interface BrowsersilentOptionsType {
    silentXhr?: boolean;
    silentFetch?: boolean;
    silentConsole?: boolean;
    silentDom?: boolean;
    silentHistory?: boolean;
    silentHashchange?: boolean;
    silentError?: boolean;
    silentUnhandledrejection?: boolean;
}

declare class BrowserTransport extends BaseTransport<BrowserOptionsFieldsTypes> {
    configReportXhr: unknown;
    useImgUpload: boolean;
    constructor(options?: BrowserOptionsFieldsTypes);
    post(data: any, url: string): void;
    imgRequest(data: any, url: string): void;
    sendToServer(data: any, url: string): void;
    getTransportData(data: ReportDataType): {
        authInfo: AuthInfo;
        data: ReportDataType;
    };
    bindOptions(options?: BrowserOptionsFieldsTypes): void;
}

export declare function createBrowserInstance(options?: BrowserOptionsFieldsTypes, plugins?: BasePluginType[]): any;

export declare const init: typeof createBrowserInstance;

export { }
