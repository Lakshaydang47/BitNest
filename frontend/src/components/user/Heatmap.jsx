import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// --- 1. Realistic Mock Data Generator ---
const generateActivityData = (startDate, endDate, systemDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date(systemDate);

  while (currentDate <= end) {
    let count = 0;

    // Only generate random contributions if the date is ON or BEFORE today.
    // Dates after today will remain at count: 0 (which maps to white).
    if (currentDate <= today) {
      const isActive = Math.random() > 0.6; // 40% chance of being active
      count = isActive ? Math.floor(Math.random() * 15) + 1 : 0;
    }
    
    data.push({
      date: currentDate.toISOString().split("T")[0], // YYYY-MM-DD
      count: count,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// --- 2. Classic GitHub Green Color Scale ---
const panelColors = {
  0: '#ffffff',   // Pure White for 0 / Future dates
  2: '#9be9a8',   // Light green
  5: '#40c463',   // Medium green
  10: '#30a14e',  // Dark green
  20: '#216e39',  // Darkest green
};

export default function HeatMapProfile({ userId }) {
  const [activityData, setActivityData] = useState([]);
  
  // Set the boundaries for the full year of 2026
  const startDate = new Date("2026-01-01");
  const endDate = new Date("2026-12-31");
  
  // Get the current system date (e.g., March 2026) to stop filling data
  const systemDate = new Date();

  useEffect(() => {
    // Generate data from Jan 1 to Dec 31, but only fill numbers up to today
    const data = generateActivityData(startDate, endDate, systemDate);
    setActivityData(data);
  }, [userId]);

  // Calculate total contributions (only sums up past/current data)
  const totalContributions = activityData.reduce((total, day) => total + day.count, 0);

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">
          {totalContributions} contributions in 2026
        </h4>
        <div className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
          2026
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
            stroke: "#e2e8f0",  // Adds a faint gray border so white squares are visible
            strokeWidth: 0.5
          }}
          panelColors={panelColors}
          rectRender={(props, data) => {
            if (!data.count) return <rect {...props} title={`No contributions on ${data.date}`} />;
            return (
              <rect
                {...props}
                title={`${data.count} contributions on ${data.date}`}
              />
            );
          }}
        />
      </div>

      {/* Legend below the heatmap */}
      <div className="flex items-center justify-end gap-2 mt-2 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3.5 h-3.5 rounded-sm bg-white border border-slate-200"></div>
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