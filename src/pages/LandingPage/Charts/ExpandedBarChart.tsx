import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';
import { DSP_COLORS } from '../../../utils/constants';
import type { LabelMode } from './ExpandChartDialog';

export interface ExpandedBarDatum {
  city: string;
  raisedOrTarget: number; // base/black
  actualOrResolved: number; // colored
  percentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface ExpandedBarChartProps {
  data: ExpandedBarDatum[];
  labelMode: LabelMode;
}

const getColor = (status: ExpandedBarDatum['status']) => {
  switch (status) {
    case 'Satisfactory':
      return DSP_COLORS.SATISFACTORY;
    case 'Average':
      return DSP_COLORS.AVERAGE;
    default:
      return DSP_COLORS.UNSATISFACTORY;
  }
};

const renderLabel = (props: any, labelMode: LabelMode) => {
  const { x, y, width, height, value } = props; // value depends on Bar
  const text = labelMode === 'percent' ? `${props.payload.percentage.toFixed(1)}%` : `${value.toLocaleString?.() ?? value}`;
  const fitsInside = width > 28;
  const tx = fitsInside ? x + width - 4 : x + width + 4;
  const anchor = fitsInside ? 'end' : 'start';
  const fill = fitsInside ? '#fff' : 'rgba(255,255,255,0.85)';
  return (
    <text x={tx} y={y + height / 2} textAnchor={anchor} dominantBaseline="central" fill={fill} fontSize={12} fontWeight={600}>
      {text}
    </text>
  );
};

const ExpandedBarChart: React.FC<ExpandedBarChartProps> = ({ data, labelMode }) => {
  // Prepare for stacked overlay: black bar for base, colored for actual/resolved
  const rechartsData = data.map((d) => ({
    city: d.city,
    base: d.raisedOrTarget,
    value: d.actualOrResolved,
    percentage: d.percentage,
    status: d.status,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={rechartsData} margin={{ top: 12, right: 24, left: 12, bottom: 24 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" angle={-15} textAnchor="end" height={50} />
        <YAxis />
        <Tooltip formatter={(value: any, name: any, props: any) => [
          value,
          name,
          props?.payload ? { city: props.payload.city, percentage: `${props.payload.percentage.toFixed(1)}%`, status: props.payload.status } : undefined,
        ]} />
        <Bar dataKey="base" name="Target/Raised" fill={DSP_COLORS.RAISED} radius={[6, 6, 0, 0]} />
        <Bar dataKey="value" name="Actual/Resolved" radius={[6, 6, 0, 0]} fillOpacity={1}>
          {rechartsData.map((row, idx) => (
            <Cell key={`c-${idx}`} fill={getColor(row.status)} />
          ))}
          <LabelList dataKey={labelMode === 'percent' ? 'value' : 'value'} content={(p) => renderLabel(p, labelMode)} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpandedBarChart;
