<template>
  <a-table :columns="columns" :data-source="salesPeople">
    <template #expandedRowRender="{ record }">
      <div style="margin: 0">
        <div
          v-if="expandedRow === record.id && record.platforms"
          class="grid gap-2"
        >
          <div class="grid sm:grid-cols-2 gap-2">
            <a-card
              :body-style="{ height: '100%' }"
              v-if="record.platforms?.[0]"
              class="bg-gradient-to-br border rounded-md px-4"
            >
              <div class="flex flex-col justify-between h-full p-4">
                <div class="flex items-center gap-3 h-fit">
                  <div class="text-xl">
                    <NetworkFormatter :network="record.platforms[0].name" />
                  </div>
                  <div class="font-semibold text-gray-900">
                    {{ record.platforms[0].name }}
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 items-end h-fit">
                  <div class="text-xl font-bold text-gray-900">
                    {{ record.platforms[0].percentage }}
                  </div>
                  <div class="text-md text-gray-400 font-medium">
                    {{ record.platforms[0].amount }}
                  </div>
                </div>
              </div>
            </a-card>
            <div class="grid grid-cols-2 gap-2">
              <template v-for="(platform, idx) in record.platforms" :key="idx">
                <a-card
                  v-if="idx !== 0"
                  class="bg-gradient-to-br bg-gray-200 rounded-md relative overflow-hidden [&:last-child:nth-child(odd)]:col-span-2"
                >
                  <div
                    class="absolute inset-0 opacity-5"
                    style="background-size: 20px 20px"
                  ></div>

                  <div
                    class="relative flex flex-wrap items-end justify-between gap-2 p-2"
                  >
                    <div class="flex items-center gap-3">
                      <NetworkFormatter :network="platform.name" />
                      <div class="font-semibold text-gray-900">
                        {{ platform.name }}
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2 items-end">
                      <div class="text-xl font-bold text-gray-900">
                        {{ platform.percentage }}
                      </div>
                      <div class="text-md text-gray-400 font-medium">
                        {{ platform.amount }}
                      </div>
                    </div>
                  </div>
                </a-card>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NetworkFormatter from "@/components/NetworkFormatter.vue";

interface Platform {
  name: string;
  icon: string;
  percentage: string;
  amount: string;
  sub?: string;
}

interface SalesPerson {
  key: number;
  id: number;
  name: string;
  avatar: string;
  revenue: string;
  rank: number;
  leads: number;
  kpi: number;
  wl: string;
  wins: number;
  losses: number;
  platforms?: Platform[];
}

const expandedRow = ref<number | null>(1);
const columns = [
  { title: "Name", dataIndex: "name", key: "name", fixed: true },
  { title: "rank", dataIndex: "rank", key: "rank" },
  { title: "leads", dataIndex: "leads", key: "leads" },
];
const salesPeople = ref<SalesPerson[]>([
  {
    key: 1,
    id: 1,
    name: "Mikasa A.",
    avatar: "👨‍💼",
    revenue: "$156,841",
    rank: 54,
    leads: 103,
    kpi: 0.89,
    wl: "39%",
    wins: 21,
    losses: 33,
    platforms: [
      { name: "Facebook", icon: "🎨", percentage: "45.3%", amount: "$71,048" },
      { name: "Instagram", icon: "📷", percentage: "28.1%", amount: "$44,072" },
      {
        name: "Google",
        icon: "🔍",
        percentage: "14.1%",
        amount: "$22,114",
        sub: "5.4% • $8,469",
      },
      { name: "Other", icon: "📦", percentage: "7.1%", amount: "$11,135" },
    ],
  },
  {
    key: 2,
    id: 2,
    name: "Eren Y.",
    avatar: "👨",
    revenue: "$117,115",
    rank: 22,
    leads: 84,
    kpi: 0.79,
    wl: "32%",
    wins: 7,
    losses: 15,
  },
]);
</script>
