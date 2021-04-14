/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DiscoveryApi } from '@backstage/core';
import {
  AlertSource,
  Incident,
  User,
  IncidentStatus,
  UptimeMonitor,
  EscalationPolicy,
  Schedule,
  IncidentResponder,
} from '../types';

export type TableState = {
  page: number;
  pageSize: number;
};

export type GetIncidentsOpts = {
  maxResults?: number;
  startIndex?: number;
  states?: IncidentStatus[];
  alertSources?: number[] | string[];
};

export type GetIncidentsCountOpts = {
  states?: IncidentStatus[];
};

export type EventRequest = {
  integrationKey: string;
  summary: string;
  details: string;
  userName: string;
  source: string;
};

export interface ILertApi {
  fetchIncidents(opts?: GetIncidentsOpts): Promise<Incident[]>;
  fetchIncidentsCount(opts?: GetIncidentsCountOpts): Promise<number>;
  fetchIncidentResponders(incident: Incident): Promise<IncidentResponder[]>;
  acceptIncident(incident: Incident): Promise<Incident>;
  resolveIncident(incident: Incident): Promise<Incident>;
  assignIncident(
    incident: Incident,
    responder: IncidentResponder,
  ): Promise<Incident>;
  createIncident(eventRequest: EventRequest): Promise<boolean>;

  fetchUptimeMonitors(): Promise<UptimeMonitor[]>;
  pauseUptimeMonitor(uptimeMonitor: UptimeMonitor): Promise<UptimeMonitor>;
  resumeUptimeMonitor(uptimeMonitor: UptimeMonitor): Promise<UptimeMonitor>;
  fetchUptimeMonitor(id: number): Promise<UptimeMonitor>;

  fetchAlertSources(): Promise<AlertSource[]>;
  fetchAlertSource(idOrIntegrationKey: number | string): Promise<AlertSource>;
  enableAlertSource(alertSource: AlertSource): Promise<AlertSource>;
  disableAlertSource(alertSource: AlertSource): Promise<AlertSource>;

  addImmediateMaintenance(
    alertSourceId: number,
    minutes: number,
  ): Promise<void>;

  fetchOnCallSchedules(): Promise<Schedule[]>;
  fetchUsers(): Promise<User[]>;

  overrideShift(
    scheduleId: number,
    userId: number,
    start: string,
    end: string,
  ): Promise<Schedule>;

  getIncidentDetailsURL(incident: Incident): string;
  getAlertSourceDetailsURL(alertSource: AlertSource | null): string;
  getEscalationPolicyDetailsURL(escalationPolicy: EscalationPolicy): string;
  getUptimeMonitorDetailsURL(uptimeMonitor: UptimeMonitor): string;
  getScheduleDetailsURL(schedule: Schedule): string;
  getUserInitials(assignedTo: User | null): string;
}

export type Options = {
  discoveryApi: DiscoveryApi;

  /**
   * Domain used by users to access iLert web UI.
   * Example: https://my-org.ilert.com/
   */
  domain: string;

  /**
   * Path to use for requests via the proxy, defaults to /ilert/api
   */
  proxyPath?: string;
};
