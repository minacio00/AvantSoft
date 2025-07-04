'use client';
import { useEffect, useState } from 'react';
import { fetchDailyStats, fetchLeaderboards } from '@/services/salesService';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type LeaderboardEntry = {
  customer__id?: number;
  customer__nome?: string;
  total?: number;
  avg?: number;
  days?: number;
} | null;

type Leaderboards = {
  best_volume: LeaderboardEntry;
  best_average: LeaderboardEntry;
  best_frequency: LeaderboardEntry;
};

export default function DashboardPage() {
  const [daily, setDaily] = useState<{ data: string; total: number }[]>([]);
  const [leader, setLeader] = useState<Leaderboards | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dailyData, leaderData] = await Promise.all([
          fetchDailyStats(),
          fetchLeaderboards()
        ]);
        setDaily(dailyData);
        setLeader(leaderData);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daily Sales</h2>
        <div className="w-full h-64 bg-white p-4 rounded-lg shadow">
          {daily.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="data"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Total']}
                  labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No sales data available
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Customer Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Highest Sales Volume</h3>
            <p className="text-lg font-medium">
              {leader?.best_volume?.customer__nome || 'N/A'}
            </p>
            <p className="text-gray-600">
              ${(leader?.best_volume?.total || 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Highest Average Value</h3>
            <p className="text-lg font-medium">
              {leader?.best_average?.customer__nome || 'N/A'}
            </p>
            <p className="text-gray-600">
              ${(leader?.best_average?.avg || 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Highest Purchase Frequency</h3>
            <p className="text-lg font-medium">
              {leader?.best_frequency?.customer__nome || 'N/A'}
            </p>
            <p className="text-gray-600">
              {leader?.best_frequency?.days || 0} days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
