export interface CardMetric {
  current: number;
  lastMonth: number;
  lastYear: number;
  percentChangeMonth: number;
  percentChangeYear: number;
  currency?: string;
  unit?: string;
}

export interface CardData {
  totalRevenue: CardMetric;
  totalOrders: CardMetric;
  activeUsers: CardMetric;
  conversionRate: CardMetric;
}

export interface Transaction {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Refunded";
  date: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  color: string;
}

export interface MonthlyRevenueChart {
  labels: string[];
  datasets: ChartDataset[];
}

export interface CategorySalesChart {
  labels: string[];
  data: number[];
  colors: string[];
}

export interface WeeklyActivityChart {
  labels: string[];
  currentWeek: number[];
  lastWeek: number[];
}

export interface RegionalSales {
  name: string;
  current: number;
  lastYear: number;
  growth: number;
}

export interface RegionalSalesChart {
  regions: RegionalSales[];
}

export interface TopProduct {
  rank: number;
  product: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface AgeGroup {
  range: string;
  count: number;
  percentage: number;
}

export interface Geography {
  country: string;
  users: number;
  percentage: number;
}

export interface CustomerDemographics {
  ageGroups: AgeGroup[];
  geography: Geography[];
}

export interface DashboardData {
  cardData: CardData;
  tableData: Transaction[];
  monthlyRevenueChart: MonthlyRevenueChart;
  categorySalesChart: CategorySalesChart;
  weeklyActivityChart: WeeklyActivityChart;
  regionalSalesChart: RegionalSalesChart;
  topProductsData: TopProduct[];
  customerDemographics: CustomerDemographics;
}


export const cardData: CardData = {
  totalRevenue: {
    current: 145680,
    lastMonth: 132450,
    lastYear: 98320,
    percentChangeMonth: 10.0,
    percentChangeYear: 48.2,
    currency: "USD",
  },
  totalOrders: {
    current: 1247,
    lastMonth: 1156,
    lastYear: 892,
    percentChangeMonth: 7.9,
    percentChangeYear: 39.8,
  },
  activeUsers: {
    current: 3842,
    lastMonth: 3654,
    lastYear: 2718,
    percentChangeMonth: 5.1,
    percentChangeYear: 41.4,
  },
  conversionRate: {
    current: 3.24,
    lastMonth: 2.98,
    lastYear: 2.45,
    percentChangeMonth: 8.7,
    percentChangeYear: 32.2,
    unit: "%",
  },
};

// Table Data - Recent transactions/orders
export const tableData: Transaction[] = [
  {
    id: "ORD-2024-1247",
    customer: "Sarah Johnson",
    product: "Premium Subscription",
    amount: 299.99,
    status: "Completed",
    date: "2024-11-25",
  },
  {
    id: "ORD-2024-1246",
    customer: "Michael Chen",
    product: "Enterprise License",
    amount: 1499.0,
    status: "Completed",
    date: "2024-11-25",
  },
  {
    id: "ORD-2024-1245",
    customer: "Emily Rodriguez",
    product: "Basic Plan",
    amount: 49.99,
    status: "Pending",
    date: "2024-11-24",
  },
  {
    id: "ORD-2024-1244",
    customer: "David Kim",
    product: "Professional Suite",
    amount: 799.0,
    status: "Completed",
    date: "2024-11-24",
  },
  {
    id: "ORD-2024-1243",
    customer: "Lisa Anderson",
    product: "Premium Subscription",
    amount: 299.99,
    status: "Completed",
    date: "2024-11-23",
  },
  {
    id: "ORD-2024-1242",
    customer: "James Wilson",
    product: "Basic Plan",
    amount: 49.99,
    status: "Refunded",
    date: "2024-11-23",
  },
  {
    id: "ORD-2024-1241",
    customer: "Maria Garcia",
    product: "Enterprise License",
    amount: 1499.0,
    status: "Completed",
    date: "2024-11-22",
  },
  {
    id: "ORD-2024-1240",
    customer: "Robert Taylor",
    product: "Professional Suite",
    amount: 799.0,
    status: "Pending",
    date: "2024-11-22",
  },
];

// Chart Data - Monthly revenue comparison
export const monthlyRevenueChart: MonthlyRevenueChart = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "2024",
      data: [
        98320, 105240, 112680, 118950, 125300, 131200, 128900, 135400, 139800,
        142300, 145680, 0,
      ],
      color: "#3b82f6",
    },
    {
      label: "2023",
      data: [
        78200, 82450, 85900, 89300, 92100, 95800, 98200, 101500, 104200, 106800,
        98320, 110200,
      ],
      color: "#94a3b8",
    },
  ],
};

// Chart Data - Category sales distribution
export const categorySalesChart: CategorySalesChart = {
  labels: [
    "Basic Plan",
    "Premium Subscription",
    "Professional Suite",
    "Enterprise License",
    "Add-ons",
  ],
  data: [28450, 62380, 35890, 44960, 18000],
  colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
};

// Chart Data - Weekly user activity
export const weeklyActivityChart: WeeklyActivityChart = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  currentWeek: [542, 618, 695, 724, 681, 458, 382],
  lastWeek: [512, 589, 654, 698, 642, 425, 356],
};

// Chart Data - Sales by region
export const regionalSalesChart: RegionalSalesChart = {
  regions: [
    { name: "North America", current: 58240, lastYear: 42180, growth: 38.1 },
    { name: "Europe", current: 42680, lastYear: 31250, growth: 36.6 },
    { name: "Asia Pacific", current: 31890, lastYear: 18900, growth: 68.7 },
    { name: "Latin America", current: 8920, lastYear: 4320, growth: 106.5 },
    {
      name: "Middle East & Africa",
      current: 3950,
      lastYear: 1670,
      growth: 136.5,
    },
  ],
};

// Top Products Table Data
export const topProductsData: TopProduct[] = [
  {
    rank: 1,
    product: "Premium Subscription",
    sales: 412,
    revenue: 123588,
    growth: 15.2,
  },
  {
    rank: 2,
    product: "Enterprise License",
    sales: 30,
    revenue: 44970,
    growth: 22.8,
  },
  {
    rank: 3,
    product: "Professional Suite",
    sales: 45,
    revenue: 35955,
    growth: -3.4,
  },
  {
    rank: 4,
    product: "Basic Plan",
    sales: 569,
    revenue: 28431,
    growth: 8.9,
  },
  {
    rank: 5,
    product: "Premium Add-ons",
    sales: 234,
    revenue: 18720,
    growth: 31.5,
  },
];

// Customer Demographics Data
export const customerDemographics: CustomerDemographics = {
  ageGroups: [
    { range: "18-24", count: 342, percentage: 8.9 },
    { range: "25-34", count: 1268, percentage: 33.0 },
    { range: "35-44", count: 1152, percentage: 30.0 },
    { range: "45-54", count: 768, percentage: 20.0 },
    { range: "55+", count: 312, percentage: 8.1 },
  ],
  geography: [
    { country: "United States", users: 1537, percentage: 40.0 },
    { country: "United Kingdom", users: 461, percentage: 12.0 },
    { country: "Germany", users: 384, percentage: 10.0 },
    { country: "Canada", users: 307, percentage: 8.0 },
    { country: "Australia", users: 269, percentage: 7.0 },
    { country: "Others", users: 884, percentage: 23.0 },
  ],
};

// Export all data
export const dashboardData: DashboardData = {
  cardData,
  tableData,
  monthlyRevenueChart,
  categorySalesChart,
  weeklyActivityChart,
  regionalSalesChart,
  topProductsData,
  customerDemographics,
};

// Utility Functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPercentChange = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default dashboardData;
