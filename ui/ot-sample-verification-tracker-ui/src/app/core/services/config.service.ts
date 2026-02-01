// src/app/services/config.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, tap} from 'rxjs';

export interface AppConfig {
  ApiSettings: {
    BaseUrl: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);
  private config: AppConfig | null = null;

  async loadConfig(): Promise<void> {

    try {
      const request$ = this.http.get<AppConfig>('assets/appsettings.json').pipe(
        tap(data => console.log('Config loaded from file:', data))
      );

      this.config = await firstValueFrom(request$);
    } catch (error) {
      console.error('Failed to load appsettings.json. Check your angular.json assets!', error);
    }
  }

  get apiBaseUrl(): string {
    console.log(this.config?.ApiSettings)
    return this.config?.ApiSettings.BaseUrl || '';
  }
}
