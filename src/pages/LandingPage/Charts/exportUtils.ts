export function exportRowsToCSV(filename: string, rows: any[]) {
  const headers = rows.length ? Object.keys(rows[0]) : [];
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? '')).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export a container containing SVG (e.g., Recharts) to PNG
export async function exportSVGContainerToPNG(container: HTMLElement, filename: string) {
  const svg = container.querySelector('svg');
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  const loaded = await new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img);
    img.src = url;
  });

  const bbox = svg.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(bbox.width));
  canvas.height = Math.max(1, Math.floor(bbox.height));
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = getComputedStyle(container).backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(loaded, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    const url2 = URL.createObjectURL(blob);
    a.href = url2;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url2);
  }, 'image/png');

  URL.revokeObjectURL(url);
}
