// 配色生成のためのユーティリティ関数 - 美麗なグラデーション配色
export const generateWheelColors = (count: number) => {
  // 美麗な色相を選択（鮮やかな色を優先）
  const baseHues = Array.from({ length: count }, (_, i) => {
    // 黄金角（137.5度）を使って調和の取れた配色を生成
    const goldenAngle = 137.5;
    return Math.floor((goldenAngle * i) % 360);
  });

  // 各色相に対して高彩度・最適な明度で美麗な配色を生成
  return baseHues.map((hue, index) => {
    // 高彩度で鮮やかに、明度は少し変化をつけて区別しやすく
    const saturation =
      index % 3 === 0 ? "85%" : index % 3 === 1 ? "75%" : "80%";
    const lightness = index % 3 === 0 ? "50%" : index % 3 === 1 ? "45%" : "55%";

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
