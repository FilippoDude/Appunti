

export function hexToRgba(hex : string | undefined, opacity : string){
    if (hex === undefined || opacity === undefined){
      return ""
    }
    
    hex = hex.replace('#', '');

    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Convert 3-digit hex to 6-digit hex
  if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
  }

  // Parse the hex color
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  return { r, g, b };
}

function luminance(r: number, g: number, b: number): number {
  // Apply gamma correction
  const applyGamma = (value: number) =>
      value <= 0.03928
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;

  r = applyGamma(r);
  g = applyGamma(g);
  b = applyGamma(b);

  // Calculate luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isDayTimeColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  const lum = luminance(r, g, b);

  return lum > 0.5;
}

export const animateHeightChange = (animateTo: boolean, element : React.MutableRefObject<HTMLElement | null>) => {
  if (element.current) {
    const currentHeight = parseInt(element.current.style.height, 10) || 100;
    const targetHeight = animateTo ? 240 : 80; // Predefined target heights
    const startHeight = currentHeight;
    const endHeight = targetHeight;
    const duration = 100; // Duration of the animation in milliseconds
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newHeight = startHeight + (endHeight - startHeight) * progress;

      element.current!.style.height = `${Math.round(newHeight)}px`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
};

//console.log(isDayTimeColor(color) ? "Daytime color" : "Nighttime color");
