import { apiFetch } from './api';

type DailyStat = {
  data: string;
  total: number;
};

type LeaderboardEntry = {
  customer__id: number;
  customer__nome: string;
  total: number;
  avg: number;
  days: number;
};

type Leaderboards = {
  best_volume: LeaderboardEntry;
  best_average: LeaderboardEntry;
  best_frequency: LeaderboardEntry;
};

export async function fetchDailyStats(): Promise<DailyStat[]> {
  return apiFetch('/sales/daily-stats/').then((res) => res);
}

export async function fetchLeaderboards(): Promise<Leaderboards> {
  return apiFetch('/sales/leaderboards/').then((res) => res);
}

