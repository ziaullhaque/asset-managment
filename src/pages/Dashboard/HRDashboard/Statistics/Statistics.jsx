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
  FaBoxOpen,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";

// Lime/Green Theme Colors
const PIE_COLORS = ["#84cc16", "#ef4444"]; // lime-500, red-500

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

  // --- Calculations ---
  const totalAssets = allAssets.length;
  const totalRequests = allRequests.length;

  const returnableCount = allAssets.filter(
    (asset) => asset.productType?.toLowerCase() === "returnable"
  ).length;

  const nonReturnableCount = allAssets.filter(
    (asset) => asset.productType?.toLowerCase() === "non-returnable"
  ).length;

  // Pie Chart Data
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

  // Bar Chart Data
  const requestCountMap = allRequests.reduce((acc, item) => {
    const key = item.assetId;
    if (!acc[key]) {
      acc[key] = {
        assetId: item.assetId,
        assetName: item.assetName,
        count: 1,
      };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {});

  const sortedRequests = Object.values(requestCountMap).sort(
    (a, b) => b.count - a.count
  );

  const top5Requests = sortedRequests.slice(0, 5);

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Statistics & <span className="text-lime-600">Analytics</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Overview of company assets and requests
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaBoxOpen />}
          title="Total Assets"
          value={totalAssets}
          color="bg-lime-100 text-lime-600"
        />
        <StatCard
          icon={<FaClipboardList />}
          title="Total Requests"
          value={totalRequests}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Returnable"
          value={returnableCount}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<FaTimesCircle />}
          title="Non-Returnable"
          value={nonReturnableCount}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            Asset Composition
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={isAnimationActive}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            Top Requested Items
          </h3>
          <div className="h-[350px] w-full">
            {top5Requests.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={top5Requests}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="assetName"
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    height={60}
                  />
                  <YAxis tick={{ fill: "#6b7280" }} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#84cc16"
                    radius={[6, 6, 0, 0]}
                    barSize={50}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No request data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stat Cards
const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-full text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <h4 className="text-3xl font-bold text-gray-800">{value}</h4>
      </div>
    </div>
  );
};

// Custom Label for Pie Chart
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
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default Statistics;
