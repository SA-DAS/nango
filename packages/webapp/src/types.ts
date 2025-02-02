export interface ActivityResponse {
    id: number;
    level: 'info' | 'debug' | 'error' | 'warn';
    action:
        | 'account'
        | 'oauth'
        | 'auth'
        | 'proxy'
        | 'token'
        | 'sync'
        | 'sync deploy'
        | 'sync init'
        | 'pause sync'
        | 'full sync'
        | 'restart sync'
        | 'trigger sync'
        | 'trigger full sync'
        | 'cancel sync'
        | 'action'
        | 'webhook';
    success: boolean;
    timestamp: number;
    start: number;
    end: number;
    message: string;
    messages: Record<string, any>[];
    connection_id: string;
    provider_config_key: string;
    provider: string;
    method: string;
    endpoint?: string;
    operation_name?: string;
}

export type ActivityMessageResponse = Record<number, Record<string, any>[]>;

export type SyncResult = Record<string, Result>;

export interface Result {
    added: number;
    updated: number;
    deleted: number;
}

export interface Sync {
    id: string;
    sync_name: string;
    type: string;
    provider: string;
    runs: string;
    auto_start: boolean;
    unique_key: string;
    models: string[];
    updated_at: string;
    version: string;
    pre_built: boolean;
    is_public: boolean;
    connections:
        | {
              connection_id: string;
              metadata?: Record<string, string | Record<string, string>>;
          }[]
        | null;
    metadata?: {
        description?: string;
        scopes?: string[];
    };
}

export interface SyncResponse {
    id: string;
    created_at: string;
    nango_connection_id: number;
    name: string;
    frequency: string;
    frequency_override: string | null;
    futureActionTimes: number[];
    offset: number;
    schedule_status: 'RUNNING' | 'PAUSED' | 'STOPPED';
    models: string[];
    schedule_id: string;
    status: 'SUCCESS' | 'RUNNING' | 'STOPPED' | 'PAUSED' | 'ERROR';
    latest_sync: {
        created_at: string;
        updated_at: string;
        type: 'INITIAL' | 'INCREMENTAL';
        status: 'SUCCESS' | 'STOPPED' | 'RUNNING' | 'PAUSED';
        activity_log_id: number | null;
        result: SyncResult;
        job_id: string;
        sync_config_id: number;
        version: string;
        models: string[];
    };
    thirty_day_timestamps: {
        created_at: string;
        updated_at: string;
    }[];
}

export type RunSyncCommand = 'PAUSE' | 'UNPAUSE' | 'RUN' | 'RUN_FULL' | 'CANCEL';

export const UserFacingSyncCommand = {
    PAUSE: 'paused',
    UNPAUSE: 'resumed',
    RUN: 'triggered',
    RUN_FULL: 'run full',
    CANCEL: 'cancelled'
};

export enum AuthModes {
    OAuth1 = 'OAUTH1',
    OAuth2 = 'OAUTH2',
    Basic = 'BASIC',
    ApiKey = 'API_KEY',
    AppStore = 'APP_STORE',
    App = 'APP',
    Custom = 'CUSTOM',
    None = 'NONE'
}

export interface Connection {
    id: number;
    connectionId: string;
    provider: string;
    providerConfigKey: string;
    creationDate: string;
    oauthType: string;
    connectionConfig: Record<string, string>;
    connectionMetadata: Record<string, string>;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: string | null;
    oauthToken: string | null;
    oauthTokenSecret: string | null;
    rawCredentials: object;
    credentials: BasicApiCredentials | ApiKeyCredentials | null;
}

export interface BasicApiCredentials {
    [key: string]: string;
    username: string;
    password: string;
}

export interface ApiKeyCredentials {
    [key: string]: string;
    apiKey: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    suspended: boolean;
    currentUser?: boolean;
}

export interface InvitedUser {
    id: number;
    email: string;
    name: string;
    expires_at: string;
    token: string;
    accepted: boolean;
}

export interface PreBuiltFlow {
    provider: string;
    type: string;
    name: string;
    runs: string | null;
    auto_start: boolean;
    models: string[];
    model_schema: string;
    is_public: boolean;
}

export interface FlowEndpoint {
    GET?: string;
    POST?: string;
    PUT?: string;
    PATCH?: string;
    DELETE?: string;
}

interface NangoSyncModelField {
    name: string;
    type: string;
    description?: string;
}

export interface NangoSyncModel {
    name: string;
    description?: string;
    fields: NangoSyncModelField[];
}

export type HTTP_VERB = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type NangoSyncEndpoint = {
    [key in HTTP_VERB]?: string;
};

export interface Flow {
    id?: number;
    attributes: Record<string, unknown>;
    endpoints: NangoSyncEndpoint[];
    scopes: string[];
    sync_type?: 'FULL' | 'INCREMENTAL';
    is_public: boolean;
    pre_built: boolean;
    version?: string;
    last_deployed?: string;
    input?: NangoSyncModel;
    description: string;
    name: string;
    returns: string | string[];
    output?: string;
    type: 'sync' | 'action';
    runs?: string;
    track_deletes: boolean;
    auto_start?: boolean;
    endpoint?: string;
    models: NangoSyncModel[];
    nango_yaml_version: 'v1' | 'v2';
    webhookSubscriptions: string[];
}

export interface Account {
    id: number;
    name: string;
    account_id: number;
    secret_key: string;
    public_key: string;
    secret_key_iv: string | null;
    secret_key_tag: string | null;
    callback_url: string;
    webhook_url: string;
    webhook_receive_url: string;
    hmac_enabled: boolean;
    hmac_key: string;
    created_at: string;
    updated_at: string;
    pending_secret_key: string | null;
    pending_secret_key_iv: string | null;
    pending_secret_key_tag: string | null;
    pending_public_key: string | null;
    always_send_webhook: boolean;
    slack_notifications: boolean;
    websockets_path: string;
    secret_key_rotatable: boolean;
    env_variables: string[];
    host: string;
    uuid: string;
    email: string;
}

export interface IntegrationConfig {
    unique_key: string;
    provider: string;
    client_id: string;
    client_secret: string;
    app_link?: string;
    has_webhook: boolean;
    has_webhook_user_defined_secret?: boolean;
    scopes: string;
    auth_mode: AuthModes;
    created_at: string;
    webhook_secret?: string;
    custom?: Record<string, string>;
    connection_count: number;
    connections: Connection[];
    docs: string;
}
