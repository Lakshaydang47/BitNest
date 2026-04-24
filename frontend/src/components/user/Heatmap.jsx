import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import axios from "axios";

// Classic GitHub Green Color Scale
const panelColors = {
  0: '#ebedf0',   // Light gray for 0 (like GitHub)
  2: '#9be9a8',   // Light green
  5: '#40c463',   // Medium green
  10: '#30a14e',  // Dark green
  20: '#216e39',  // Darkest green
};

export default function HeatMapProfile({ userId }) {
  const [activityData, setActivityData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  // Full year boundaries
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`);
  const endDate = new Date(`${currentYear}-12-31`);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://backend-szu2.onrender.com/activity/${userId}`);
        const apiData = res.data.activity || [];
        const apiTotal = res.data.totalContributions || 0;

        // Fill in the full year with zeros, then overlay API data
        const dateMap = {};

        // Initialize every day of the year to 0
        let d = new Date(startDate);
        while (d <= endDate) {
          const key = d.toISOString().split("T")[0];
          dateMap[key] = 0;
          d.setDate(d.getDate() + 1);
        }

        // Overlay real data
        apiData.forEach(item => {
          if (dateMap.hasOwnProperty(item.date)) {
            dateMap[item.date] = item.count;
          }
        });

        // Future dates stay 0 (which maps to white/gray)
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        const finalData = Object.entries(dateMap).map(([date, count]) => ({
          date,
          count: date > todayStr ? 0 : count, // Future dates forced to 0
        }));

        setActivityData(finalData);
        setTotalContributions(apiTotal);
      } catch (err) {
        console.error("Failed to fetch activity data:", err);
        // Fallback: show empty grid
        const emptyData = [];
        let d = new Date(startDate);
        while (d <= endDate) {
          emptyData.push({ date: d.toISOString().split("T")[0], count: 0 });
          d.setDate(d.getDate() + 1);
        }
        setActivityData(emptyData);
        setTotalContributions(0);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchActivity();
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-4 w-48 bg-slate-200 rounded mb-4"></div>
        <div className="h-32 bg-slate-100 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">
          {totalContributions} contribution{totalContributions !== 1 ? 's' : ''} in {currentYear}
        </h4>
        <div className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
          {currentYear}
        </div>
      </div>

      {/* HeatMap Component */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <HeatMap
          value={activityData}
          startDate={startDate}
          endDate={endDate}
          width="100%"
          style={{ color: '#64748b' }}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
          monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          rectSize={14}
          space={3}
          rectProps={{
            rx: 2.5,
            stroke: "#e2e8f0",
            strokeWidth: 0.5
          }}
          panelColors={panelColors}
          rectRender={(props, data) => {
            if (!data.count) return <rect {...props} title={`No contributions on ${data.date}`} />;
            return (
              <rect
                {...props}
                title={`${data.count} contribution${data.count !== 1 ? 's' : ''} on ${data.date}`}
              />
            );
          }}
        />
      </div>

      {/* Legend below the heatmap */}
      <div className="flex items-center justify-end gap-2 mt-2 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3.5 h-3.5 rounded-sm bg-[#ebedf0] border border-slate-200"></div>
          <div className="w-3.5 h-3.5 rounded-sm bg-[#9be9a8]"></div>
          <div className="w-3.5 h-3.5 rounded-sm bg-[#40c463]"></div>
          <div className="w-3.5 h-3.5 rounded-sm bg-[#30a14e]"></div>
          <div className="w-3.5 h-3.5 rounded-sm bg-[#216e39]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}