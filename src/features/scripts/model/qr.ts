import "server-only";

import { create } from "qrcode";

export type QrCode = {
  size: number;
  path: string;
};

export function qrCode(text: string): QrCode {
  const { modules } = create(text, { errorCorrectionLevel: "M" });
  let path = "";
  for (let row = 0; row < modules.size; row += 1) {
    for (let col = 0; col < modules.size; col += 1) {
      if (modules.get(row, col)) path += `M${col} ${row}h1v1h-1z`;
    }
  }
  return { size: modules.size, path };
}
