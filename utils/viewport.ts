export type ViewportType = "mobile" | "desktop";

export interface WithViewportProps {
  viewport: ViewportType;
}

type SearchParams = WithViewportProps;

export interface WithSearchParamsProps {
  searchParams: SearchParams;
}

export const isMobile = (viewport: ViewportType) => viewport === "mobile";

export const isDesktop = (viewport: ViewportType) => viewport === "desktop";
