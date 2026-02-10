import React from 'react';

export type ScreenName = 'welcome' | 'liveScan' | 'analysis' | 'history' | 'trends' | 'guidance';

export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
}

export interface ScanMetric {
  oxygen: number; // Percentage
  wbc: number;    // Count per microliter
  rbc: number;    // Million cells per microliter
}

export interface ScanResult extends ScanMetric {
  id: string;
  date: string;
  riskLevel: RiskLevel;
  summary: string;
}

export interface NavItem {
  id: ScreenName;
  label: string;
  icon: React.ComponentType<any>;
}