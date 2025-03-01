// src/components/ArchiveChart/ArchiveChart.js
import React from 'react';
import './ArchiveChart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ArchiveChart({ data, timeframe, sensorName }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container empty">
        <div className="no-data">Brak danych dla wybranego okresu</div>
      </div>
    );
  }

  const formatXAxisTick = (timestamp) => {
    const date = new Date(timestamp);

    switch (timeframe) {
      case 'hour':
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'day':
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'month':
        return date.toLocaleDateString([], { day: 'numeric' });
      case 'year':
        return date.toLocaleDateString([], { month: 'short' });
      default:
        return timestamp;
    }
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{sensorName} - Wykres</h3>

      <div className="chart-content">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.2)"
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxisTick}
              stroke="white"
              tick={{ fill: 'white' }}
            />
            <YAxis stroke="white" tick={{ fill: 'white' }} />
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleString()
              }
              formatter={(value) => [parseFloat(value).toFixed(2), '']}
              contentStyle={{
                backgroundColor: '#003366',
                border: 'none',
                color: 'white',
              }}
              itemStyle={{ color: '#3498db' }}
              labelStyle={{ color: 'white' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3498db"
              strokeWidth={2}
              dot={{ stroke: '#3498db', strokeWidth: 2, r: 4, fill: '#004275' }}
              activeDot={{
                r: 8,
                stroke: '#3498db',
                strokeWidth: 2,
                fill: 'white',
              }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ArchiveChart;
