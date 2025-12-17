import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaBox,
  FaClipboardCheck,
  FaUndoAlt,
  FaBan,
  FaClipboardList,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

/* 🌊 Teal Theme */
const PRIMARY = "#006d6f";
const LIGHT = "#e6f3f3";
const PIE_COLORS = ["#006d6f", "#ef4444"];

const Statistics = ({ isAnimationActive = true }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allAssets = [], isLoading: assetsLoading } = useQuery({
    queryKey: ["all-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/company-assets/${user.email}`);
      return res.data;
    },
  });

  const { data = {}, isLoading: requestsLoading } = useQuery({
    queryKey: ["all-assetRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-requests/${user?.email}`);
      return res.data;
    },
  });

  const { requests: allRequests = [] } = data;

  if (assetsLoading || requestsLoading) return <LoadingSpinner />;

  // 📊 Calculations
  const totalAssets = allAssets.length;
  const totalRequests = allRequests.length;

  const returnableCount = allAssets.filter(
    (a) => a.productType?.toLowerCase() === "returnable"
  ).length;

  const nonReturnableCount = allAssets.filter(
    (a) => a.productType?.toLowerCase() === "non-returnable"
  ).length;

  const pieData =
    totalAssets > 0
      ? [
          { name: "Returnable", value: (returnableCount / totalAssets) * 100 },
          {
            name: "Non Returnable",
            value: (nonReturnableCount / totalAssets) * 100,
          },
        ]
      : [];

  const requestCountMap = allRequests.reduce((acc, item) => {
    acc[item.assetId] = acc[item.assetId] || {
      assetName: item.assetName,
      count: 0,
    };
    acc[item.assetId].count++;
    return acc;
  }, {});

  const top5Requests = Object.values(requestCountMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="p-6 md:p-10 space-y-10 bg-[#f7fbfb] min-h-screen">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-[#004c4e] border-b-2 border-[#006d6f]/30 pb-1">
            Statistics & Analytics
          </h2>
        </div>
          <p className="text-gray-500 mt-1">Asset usage & request overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaBox />} title="Total Assets" value={totalAssets} />
        <StatCard
          icon={<FaClipboardCheck />}
          title="Total Requests"
          value={totalRequests}
        />
        <StatCard
          icon={<FaUndoAlt />}
          title="Returnable"
          value={returnableCount}
        />
        <StatCard
          icon={<FaBan />}
          title="Non-Returnable"
          value={nonReturnableCount}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie */}
        <ChartCard title="Asset Composition">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={renderCustomizedLabel}
                isAnimationActive={isAnimationActive}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar */}
        <ChartCard title="Top Requested Assets">
          {top5Requests.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={top5Requests}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="assetName" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill={PRIMARY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400">No data available</p>
          )}
        </ChartCard>
      </div>
    </div>
  );
};

/* 🔹 Cards */
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex items-center gap-4">
    <div className="p-4 rounded-full bg-[#e6f3f3] text-[#006d6f] text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 uppercase">{title}</p>
      <h4 className="text-3xl font-bold text-[#004c4e]">{value}</h4>
    </div>
  </div>
);

/* 🔹 Chart Wrapper */
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
    <h3 className="text-lg font-semibold text-[#004c4e] mb-4 text-center">
      {title}
    </h3>
    {children}
  </div>
);

/* 🔹 Pie Label */
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default Statistics;
