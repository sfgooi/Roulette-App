// 配色生成のためのユーティリティ関数
export const generateWheelColors = (count: number) => {
  // 基本となるHSL色相値（0-360）を均等に分配
  const baseHues = Array.from({ length: count }, (_, i) =>
    Math.floor((360 / count) * i)
  );

  // 各色相に対して彩度と明度を調整して配色を生成
  return baseHues.map((hue, index) => {
    // 交互に明度と彩度を変えて、隣接する色の区別を容易にする
    const saturation = index % 2 === 0 ? "70%" : "60%";
    const lightness = index % 2 === 0 ? "45%" : "55%";

    return `hsl(${hue}, ${saturation}, ${lightness})`;
  });
};

// テキストの色を背景色に基づいて決定
export const getContrastTextColor = (backgroundColor: string): string => {
  // HSLからRGBに変換する簡易的な方法
  const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return "#000000";

  const lightness = parseInt(match[3]);
  // 明度が50%より高い場合は黒、低い場合は白を返す
  return lightness > 50 ? "#000000" : "#ffffff";
};
