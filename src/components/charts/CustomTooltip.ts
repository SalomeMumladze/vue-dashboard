import getFormattedNumber from "@/components/getFormattedNumber";
import { formatDate } from "../formatDate";

export function renderTooltip({ date, rows }) {
  const itemsHtml = rows
    .map(
      (item) => `
       <div class='flex justify-between gap-4 items-center'>
        <div class='flex items-center gap-1'>
          <div class='rounded-xl w-1 h-3 bg-[${item.color}]'> </div>
          <span class='text-sm font-normal text-gray-400'>
            ${item.label}:
          </span>
        </div>
          <span class='text-s, font-medium text-white'>${
            item.prefix ?? ""
          }${getFormattedNumber(item.value)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class='rounded-md'>
      <div class='text-center text-sm font-medium mb-2 text-white'>
       ${formatDate(date, "MMM DD yyyy")}
      </div>

      <div class='grid gap-1'>
        ${itemsHtml}
      </div>
    </div>
  `;
}
