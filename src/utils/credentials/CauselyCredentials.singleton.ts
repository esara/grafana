import { getBackendSrv } from '@grafana/runtime';
import { AppPluginId } from '../../constants';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { AppPluginMeta } from '@grafana/data';

export class CauselyCredentials {
    private static instance: CauselyCredentials;
    private credentials: JsonData | null = null;
    private initialized = false;

    private constructor() {}

    public static async create(): Promise<CauselyCredentials | null> {
        if (CauselyCredentials.instance) {
            return Promise.resolve(CauselyCredentials.instance);
        }

        try {
            const instance = new CauselyCredentials();
            await instance.initialize();
            CauselyCredentials.instance = instance;
            return instance;
        } catch (error) {
            console.error('Failed to create CauselyCredentials instance:', error);
            return null;
        }
    }

    public static getInstance(): CauselyCredentials {
        if (!CauselyCredentials.instance) {
            throw new Error('CauselyCredentials not initialized. Call create() first.');
        }
        return CauselyCredentials.instance;
    }

    private async initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }

        try {
            const response = await getBackendSrv().get<AppPluginMeta<JsonData>>(`/api/plugins/${AppPluginId}/settings`);
            this.credentials = response?.jsonData || {};
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize Causely credentials:', error);
            throw error;
        }
    }

    public getCredentials(): JsonData | null {
        if (!this.initialized) {
            throw new Error('CauselyCredentials not initialized. Call initialize() first.');
        }
        return this.credentials;
    }

    public isAuthenticated(): boolean {
        if (!this.initialized) {
            return false;
        }

        const creds = this.credentials;
        return !!(
            creds?.causelyDomain &&
            (
                (creds.isCauselySecretSet && creds.causelyClientId) ||
                (creds.isCauselyPasswordSet && creds.causelyUsername)
            )
        );
    }

    public getDomain(): string | undefined {
        if (!this.initialized) {
            throw new Error('CauselyCredentials not initialized. Call initialize() first.');
        }
        return this.credentials?.causelyDomain;
    }

    public getClientId(): string | undefined {
        if (!this.initialized) {
            throw new Error('CauselyCredentials not initialized. Call initialize() first.');
        }
        return this.credentials?.causelyClientId;
    }

    public getUsername(): string | undefined {
        if (!this.initialized) {
            throw new Error('CauselyCredentials not initialized. Call initialize() first.');
        }
        return this.credentials?.causelyUsername;
    }
} 