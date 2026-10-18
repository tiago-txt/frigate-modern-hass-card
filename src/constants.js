// constants.js — shared constants, icons and helper functions
/**
 * Frigate Modern Hass Card  v6.1
 * ---------------------------------------------------------------
 * Stream: ha-camera-stream without frontend_stream_type → direct HLS, no WebRTC.
 * Multi-camera grid (1-4 cams), responsive layout, per-cam timeline colours,
 * always-visible compact latest event, camera entity picker in editor.
 * ---------------------------------------------------------------
 */
export const VERSION = '1.4.1-dev.8';
export const CARD_TAG = 'frigate-modern-hass-card';
export const DAY = 86400;
// Smallest tile width the automatic grid will produce, in px. Below this a
// camera stops being watchable, so fewer columns are used instead.
// Narrowest a grid tile may be before a column is dropped. Only a readability
// floor: on a phone the stack_on_mobile setting decides, not this number.
export const MIN_TILE_PX = 200;
// A card narrower than this is a phone as far as the grid is concerned. Chosen
// so every phone falls under it: an Android phone is 412 CSS px wide, the
// largest iPhone 430.
export const PHONE_PX = 500;
export const DEFAULT_ROTATE_S = 30;   // seconds used when rotate_seconds=0 and user enables rotation

export const ICONS = {
  live:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
  recordings:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>',
  clips:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>',
  snapshot:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/></svg>',
  reviews:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  starO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z"/></svg>',
  filter:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>',
  expand:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
  rotate:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 0 1 6 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2A5.87 5.87 0 0 1 18 12c0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/></svg>',
  volOff:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
  volOn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
  // Side panel toggle. The filled block shows where the events panel is; empty
  // means it is hidden. A chevron alone did not say what it would do.
  panelOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><rect x="14" y="6" width="6" height="12" fill="currentColor" stroke="none" rx="1"/></svg>',
  panelOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M14 5v14"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/></svg>',
  // The events view: a wall of separate moments, so the icon is a set of blocks
  // rather than the camera grid's single subdivided frame.
  events:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v6H4V4zm9 0h7v6h-7V4zM4 12h7v8H4v-8zm9 0h7v8h-7v-8z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  // The events timeline: staggered bars, which is what a timeline of moments
  // looks like — a clock icon would read as "history", not as the strip itself.
  timeline:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h9v3H3V5zm5 5.5h13v3H8v-3zM3 16h7v3H3v-3z"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
  person:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  ptz:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 6h3v4H7V7L3 11l4 4v-3h4v4H8l4 4 4-4h-3v-4h4v3l4-4-4-4v3h-4V6h3l-4-4z"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
  left:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  right:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  minus:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',
  reset:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
  // The recordings strip in miniature: a spine with ribs, taller where more went
  // on. Used as the legend's own swatch for it.
  bone:'<svg class="lg-bone" viewBox="0 0 26 12" fill="currentColor" aria-hidden="true"><rect x="0" y="5" width="2" height="2" rx="1"/><rect x="4" y="4" width="2" height="4" rx="1"/><rect x="8" y="2" width="2" height="8" rx="1"/><rect x="12" y="0" width="2" height="12" rx="1"/><rect x="16" y="3" width="2" height="6" rx="1"/><rect x="20" y="1" width="2" height="10" rx="1"/><rect x="24" y="5" width="2" height="2" rx="1"/></svg>',
};

// ── helpers ──────────────────────────────────────────────────
export function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
export function parseWs(r) { if (typeof r === 'string') { try { return JSON.parse(r); } catch(_) { return []; } } return r; }
export const LABEL_COLORS = { person:'#3b82f6', car:'#a855f7', motion:'#f59e0b', dog:'#10b981', cat:'#f472b6', bicycle:'#22d3ee', bird:'#eab308', package:'#f97316', face:'#818cf8', truck:'#fb7185', bus:'#34d399' };
export const PALETTE = ['#3b82f6','#a855f7','#f59e0b','#10b981','#f472b6','#22d3ee','#eab308','#ef4444','#f97316'];
export function labelColor(l) { if (!l) return '#f59e0b'; if (LABEL_COLORS[l]) return LABEL_COLORS[l]; let h=0; for (const c of l) h=(h*31+c.charCodeAt(0))>>>0; return PALETTE[h%PALETTE.length]; }
// per-camera recording bar colours (distinct from event marker colours)
export const CAM_COLORS = ['rgba(30,80,200,.5)','rgba(210,80,30,.5)','rgba(30,170,80,.5)','rgba(170,30,180,.5)'];
// Predefined grid layouts. A layout is just a column count plus a size per
// position, so it rides on the same span mechanism as a hand written config.
// The editor draws each one as numbered cells, because "span: 2" tells nobody
// what they are going to get.
// spans: [cols, rows] per tile, in camera order. Cameras beyond the list are 1x1.
export const GRID_LAYOUTS = [
  { id: 'auto',  label: 'Automatic', tiles: 0, cols: 0, spans: [] },
  { id: '2-row', label: '2 stacked', tiles: 2, cols: 1, spans: [] },
  { id: '2-col', label: '2 side by side', tiles: 2, cols: 2, spans: [] },
  { id: '3-big', label: '1 large + 2', tiles: 3, cols: 3, spans: [[2, 2]] },
  { id: '4',     label: '2 x 2', tiles: 4, cols: 2, spans: [] },
  { id: '6-big', label: '1 large + 5', tiles: 6, cols: 3, spans: [[2, 2]] },
  { id: '8-big', label: '1 large + 7', tiles: 8, cols: 4, spans: [[3, 3]] },
  { id: '9',     label: '3 x 3', tiles: 9, cols: 3, spans: [] },
  { id: '10-big',label: '2 large + 8', tiles: 10, cols: 4, spans: [[2, 2], [2, 2]] },
  { id: '16',    label: '4 x 4', tiles: 16, cols: 4, spans: [] },
];
export function findLayout(id) { return GRID_LAYOUTS.find(l => l.id === id) || null; }

// Where a floating overlay may sit over the camera. Shared by the action menu
// and the PTZ controls so the two lists can never drift apart.
export const OVERLAY_POSITIONS = ['top','bottom','top-left','top-right','bottom-left','bottom-right','left','right'];

// A camera's size in grid cells. Accepts a number (square, e.g. 2 for 2x2) or
// {cols, rows}. Clamped so a typo cannot produce a grid nothing else fits in.
export function normSpan(span) {
  const clamp = v => Math.max(1, Math.min(4, Math.round(Number(v) || 1)));
  if (typeof span === 'number' || typeof span === 'string') {
    const v = clamp(span);
    return { cols: v, rows: v };
  }
  if (span && typeof span === 'object') return { cols: clamp(span.cols), rows: clamp(span.rows) };
  return { cols: 1, rows: 1 };
}
export function mkCamState() { return { clientId:'frigate', cam:'', events:[], recordings:[], reviews:[], kept:[], discovered:false }; }
export function camDisplayName(c) { return c.name || (c.entity||'').replace(/^camera\./,'').replace(/_/g,' '); }

// ── main card ────────────────────────────────────────────────
