import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/templates';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { AreaChart, Card as TremorCard, Metric, Text, Flex, BadgeDelta, Grid, Col } from '@tremor/react';
import * as XLSX from 'xlsx';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export const Reports = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedClass, setSelectedClass] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Modern data structure for Tremor charts
  const weeklyAttendanceData = [
    { day: 'Monday', Present: 85, Absent: 15, 'Attendance Rate': 85 },
    { day: 'Tuesday', Present: 92, Absent: 8, 'Attendance Rate': 92 },
    { day: 'Wednesday', Present: 78, Absent: 22, 'Attendance Rate': 78 },
    { day: 'Thursday', Present: 88, Absent: 12, 'Attendance Rate': 88 },
    { day: 'Friday', Present: 95, Absent: 5, 'Attendance Rate': 95 },
  ];

  const classPerformanceData = [
    { name: 'Web Development', value: 92, color: '#3b82f6' },
    { name: 'Database Systems', value: 88, color: '#8b5cf6' },
    { name: 'Mobile Development', value: 85, color: '#6366f1' },
    { name: 'AI & Machine Learning', value: 90, color: '#ec4899' },
  ];

  const monthlyTrendData = [
    { month: 'January', 'Attendance Rate': 85, Present: 1240, Absent: 220 },
    { month: 'February', 'Attendance Rate': 87, Present: 1350, Absent: 200 },
    { month: 'March', 'Attendance Rate': 89, Present: 1420, Absent: 175 },
    { month: 'April', 'Attendance Rate': 91, Present: 1480, Absent: 145 },
    { month: 'May', 'Attendance Rate': 88, Present: 1380, Absent: 185 },
    { month: 'June', 'Attendance Rate': 93, Present: 1520, Absent: 115 },
  ];

  // Chart.js configuration for gradient effects
  const gradientLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
    },
  };

  // Chart.js data with gradients
  const createGradient = (ctx: CanvasRenderingContext2D, area: any) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
    return gradient;
  };

  const chartJsLineData = {
    labels: monthlyTrendData.map(d => d.month),
    datasets: [
      {
        label: 'Attendance Rate',
        data: monthlyTrendData.map(d => d['Attendance Rate']),
        borderColor: '#3b82f6',
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: chartCtx, chartArea } = chart;
          if (!chartArea) return;
          return createGradient(chartCtx, chartArea);
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const handleExport = () => {
    const exportData = [
      { Date: '2025-10-15', Class: 'Web Development', Present: 28, Absent: 4, Rate: '87.5%' },
      { Date: '2025-10-16', Class: 'Web Development', Present: 30, Absent: 2, Rate: '93.8%' },
      { Date: '2025-10-15', Class: 'Database Systems', Present: 25, Absent: 7, Rate: '78.1%' },
    ];

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    XLSX.writeFile(wb, `attendance_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Modern Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                📊 Attendance Analytics
              </h1>
              <p className="text-blue-100 text-lg">
                Smart insights and comprehensive reporting dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Excel
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Share Report
              </button>
            </div>
          </div>
        </div>

        {/* Modern Filters with Glass Morphism */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter & Customize</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                📅 Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                📅 End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                🎯 Class Filter
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
              >
                <option value="all">All Classes</option>
                <option value="web">Web Development</option>
                <option value="db">Database Systems</option>
                <option value="mobile">Mobile Development</option>
                <option value="ai">AI & Machine Learning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modern Charts Grid */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
          {/* Weekly Performance - Tremor Area Chart */}
          <Col numColSpan={1} numColSpanLg={2}>
            <TremorCard className="ring-2 ring-blue-500/10 shadow-xl backdrop-blur-sm">
              <Flex alignItems="center" className="space-x-2 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <Text className="text-lg font-bold">Weekly Performance Trends</Text>
                </div>
                <BadgeDelta deltaType="moderateIncrease" isIncreasePositive>
                  +12.5%
                </BadgeDelta>
              </Flex>
              <AreaChart
                className="h-80"
                data={weeklyAttendanceData}
                index="day"
                categories={["Present", "Absent"]}
                colors={["blue", "red"]}
                valueFormatter={(number) => `${number} students`}
                showLegend={true}
                showGridLines={true}
                curveType="monotone"
              />
            </TremorCard>
          </Col>

          {/* Class Performance - Modern Donut */}
          <Col numColSpan={1}>
            <TremorCard className="ring-2 ring-purple-500/10 shadow-xl backdrop-blur-sm bg-white dark:bg-slate-900">
              <Flex className="space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">Class Performance</Text>
              </Flex>
              <div className="h-80">
                {/* Chart Container */}
                <div className="relative h-56">
                  <Doughnut 
                    data={{
                      labels: classPerformanceData.map(d => d.name),
                      datasets: [{
                        data: classPerformanceData.map(d => d.value),
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.8)',   // blue
                          'rgba(139, 92, 246, 0.8)',   // violet  
                          'rgba(99, 102, 241, 0.8)',   // indigo
                          'rgba(236, 72, 153, 0.8)',   // rose
                        ],
                        borderColor: [
                          'rgba(59, 130, 246, 1)',
                          'rgba(139, 92, 246, 1)', 
                          'rgba(99, 102, 241, 1)',
                          'rgba(236, 72, 153, 1)',
                        ],
                        borderWidth: 2,
                        hoverBackgroundColor: [
                          'rgba(59, 130, 246, 1)',
                          'rgba(139, 92, 246, 1)',
                          'rgba(99, 102, 241, 1)', 
                          'rgba(236, 72, 153, 1)',
                        ],
                        hoverBorderWidth: 3,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '60%',
                      plugins: {
                        legend: {
                          display: false, // Hide default legend
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: '#fff',
                          bodyColor: '#fff',
                          borderColor: '#3b82f6',
                          borderWidth: 1,
                          cornerRadius: 8,
                          callbacks: {
                            label: function(context) {
                              return `${context.label}: ${context.parsed}%`;
                            }
                          }
                        },
                      },
                      animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000,
                      },
                    }}
                  />
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">89%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Overall</div>
                    </div>
                  </div>
                </div>
                
                {/* Custom Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700 dark:text-gray-300">Web Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                    <span className="text-gray-700 dark:text-gray-300">Database Systems</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-gray-700 dark:text-gray-300">Mobile Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-gray-700 dark:text-gray-300">AI & Machine Learning</span>
                  </div>
                </div>
              </div>
            </TremorCard>
          </Col>
        </Grid>

        {/* Monthly Trend - Chart.js with Gradient */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-2xl p-8 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📈 Attendance Trend Analysis
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl"></div>
            <div className="relative h-96 p-4">
              <Line data={chartJsLineData} options={gradientLineOptions} />
            </div>
          </div>
        </div>

        {/* Modern KPI Cards */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
          <TremorCard className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 ring-2 ring-green-200 dark:ring-green-800 shadow-xl">
            <Flex alignItems="start" className="space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-green-600 dark:text-green-400 font-medium">Average Rate</Text>
                <Metric className="text-green-700 dark:text-green-300">89.2%</Metric>
                <BadgeDelta deltaType="moderateIncrease" isIncreasePositive className="mt-2">
                  +2.4%
                </BadgeDelta>
              </div>
            </Flex>
          </TremorCard>

          <TremorCard className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 ring-2 ring-blue-200 dark:ring-blue-800 shadow-xl">
            <Flex alignItems="start" className="space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-blue-600 dark:text-blue-400 font-medium">Total Present</Text>
                <Metric className="text-blue-700 dark:text-blue-300">1,234</Metric>
                <BadgeDelta deltaType="moderateIncrease" isIncreasePositive className="mt-2">
                  +156
                </BadgeDelta>
              </div>
            </Flex>
          </TremorCard>

          <TremorCard className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-900 ring-2 ring-red-200 dark:ring-red-800 shadow-xl">
            <Flex alignItems="start" className="space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-red-600 dark:text-red-400 font-medium">Total Absent</Text>
                <Metric className="text-red-700 dark:text-red-300">156</Metric>
                <BadgeDelta deltaType="moderateDecrease" isIncreasePositive={false} className="mt-2">
                  -12
                </BadgeDelta>
              </div>
            </Flex>
          </TremorCard>

          <TremorCard className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900 ring-2 ring-purple-200 dark:ring-purple-800 shadow-xl">
            <Flex alignItems="start" className="space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-purple-600 dark:text-purple-400 font-medium">Total Sessions</Text>
                <Metric className="text-purple-700 dark:text-purple-300">45</Metric>
                <BadgeDelta deltaType="moderateIncrease" isIncreasePositive className="mt-2">
                  +8
                </BadgeDelta>
              </div>
            </Flex>
          </TremorCard>
        </Grid>

        {/* Modern Insights Panel */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-2xl">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">📊 Smart Insights</h3>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Analysis</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <Text className="font-medium text-gray-700 dark:text-gray-300">Best Performing Day</Text>
                </div>
                <Text className="text-2xl font-bold text-green-600 dark:text-green-400">Friday</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">95% average attendance</Text>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <Text className="font-medium text-gray-700 dark:text-gray-300">Most Engaged Class</Text>
                </div>
                <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">Web Development</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">92% participation rate</Text>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <Text className="font-medium text-gray-700 dark:text-gray-300">Growth Trend</Text>
                </div>
                <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400">+12.5%</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">vs. last month</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
