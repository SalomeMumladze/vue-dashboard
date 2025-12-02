import getFormattedNumber from "@/components/getFormattedNumber";
import { formatDate } from "../formatDate";

export function renderTooltip({ date, rows }) {
  const itemsHtml = rows
    .map(
      (item) => `
       <div class='flex justify-between gap-4 items-center'>
        <div class='flex items-center gap-1'>
          <div class='rounded-full w-2 h-2 bg-[${item.color}]'> </div>
          <span class='text-xs font-medium text-gray-600'>
            ${item.label}:
          </span>
        </div>
          <span class='text-xs font-medium'>${
            item.prefix ?? ""
          }${getFormattedNumber(item.value)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class='rounded-md'>
      <div class='text-center text-xs font-medium mb-1'>
       ${formatDate(date, "MMM DD yyyy")}
      </div>

      <div class='grid gap-1'>
        ${itemsHtml}
      </div>
    </div>
  `;
}
