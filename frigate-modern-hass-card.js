// constants.js — shared constants, icons and helper functions
/**
 * Frigate Modern Hass Card  v6.1
 * ---------------------------------------------------------------
 * Stream: ha-camera-stream without frontend_stream_type → direct HLS, no WebRTC.
 * Multi-camera grid (1-4 cams), responsive layout, per-cam timeline colours,
 * always-visible compact latest event, camera entity picker in editor.
 * ---------------------------------------------------------------
 */
const VERSION = '1.4.1-dev.8';
const CARD_TAG = 'frigate-modern-hass-card';
const DAY = 86400;
// Smallest tile width the automatic grid will produce, in px. Below this a
// camera stops being watchable, so fewer columns are used instead.
// Narrowest a grid tile may be before a column is dropped. Only a readability
// floor: on a phone the stack_on_mobile setting decides, not this number.
const MIN_TILE_PX = 200;
// A card narrower than this is a phone as far as the grid is concerned. Chosen
// so every phone falls under it: an Android phone is 412 CSS px wide, the
// largest iPhone 430.
const PHONE_PX = 500;
const DEFAULT_ROTATE_S = 30;   // seconds used when rotate_seconds=0 and user enables rotation

const ICONS = {
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
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function parseWs(r) { if (typeof r === 'string') { try { return JSON.parse(r); } catch(_) { return []; } } return r; }
const LABEL_COLORS = { person:'#3b82f6', car:'#a855f7', motion:'#f59e0b', dog:'#10b981', cat:'#f472b6', bicycle:'#22d3ee', bird:'#eab308', package:'#f97316', face:'#818cf8', truck:'#fb7185', bus:'#34d399' };
const PALETTE = ['#3b82f6','#a855f7','#f59e0b','#10b981','#f472b6','#22d3ee','#eab308','#ef4444','#f97316'];
function labelColor(l) { if (!l) return '#f59e0b'; if (LABEL_COLORS[l]) return LABEL_COLORS[l]; let h=0; for (const c of l) h=(h*31+c.charCodeAt(0))>>>0; return PALETTE[h%PALETTE.length]; }
// per-camera recording bar colours (distinct from event marker colours)
const CAM_COLORS = ['rgba(30,80,200,.5)','rgba(210,80,30,.5)','rgba(30,170,80,.5)','rgba(170,30,180,.5)'];
// Predefined grid layouts. A layout is just a column count plus a size per
// position, so it rides on the same span mechanism as a hand written config.
// The editor draws each one as numbered cells, because "span: 2" tells nobody
// what they are going to get.
// spans: [cols, rows] per tile, in camera order. Cameras beyond the list are 1x1.
const GRID_LAYOUTS = [
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
function findLayout(id) { return GRID_LAYOUTS.find(l => l.id === id) || null; }

// Where a floating overlay may sit over the camera. Shared by the action menu
// and the PTZ controls so the two lists can never drift apart.
const OVERLAY_POSITIONS = ['top','bottom','top-left','top-right','bottom-left','bottom-right','left','right'];

// A camera's size in grid cells. Accepts a number (square, e.g. 2 for 2x2) or
// {cols, rows}. Clamped so a typo cannot produce a grid nothing else fits in.
function normSpan(span) {
  const clamp = v => Math.max(1, Math.min(4, Math.round(Number(v) || 1)));
  if (typeof span === 'number' || typeof span === 'string') {
    const v = clamp(span);
    return { cols: v, rows: v };
  }
  if (span && typeof span === 'object') return { cols: clamp(span.cols), rows: clamp(span.rows) };
  return { cols: 1, rows: 1 };
}
function mkCamState() { return { clientId:'frigate', cam:'', events:[], recordings:[], reviews:[], kept:[], discovered:false }; }
function camDisplayName(c) { return c.name || (c.entity||'').replace(/^camera\./,'').replace(/_/g,' '); }

// ── main card ────────────────────────────────────────────────

// i18n.js — every string the user can read, in every language the card speaks.
//
// Home Assistant already knows which language the user picked, and tells the
// card about it via `hass.locale.language` (with `hass.language` as a fallback
// on older frontends). All this file does is look that up and hand back the
// right words.
//
// Adding a language is adding one block below: copy `en`, translate the values,
// and use the language code Home Assistant reports (the part before the dash is
// enough — `pt-BR` finds `pt`). Nothing in card.js or editor.js has to change.
//
// `en` is the source of truth. A key missing from a translation silently falls
// back to English rather than showing a raw key, so a partial translation is
// still usable.

const TRANSLATIONS = {
  en: {
    // shared
    'common.loading': 'Loading…',
    'common.now': 'now',

    // day headings (walls and lists)
    'day.today': 'Today',
    'day.yesterday': 'Yesterday',

    // view switcher / tabs
    'tab.live': 'Live',
    'tab.recordings': 'Recordings',
    'tab.clips': 'Clips',
    'tab.snapshots': 'Snapshots',
    'tab.reviews': 'Reviews',
    'tab.kept': 'Kept',

    'card.cameras': 'Cameras',
    'card.camera': 'Camera',
    'card.allCameras': 'All cameras',
    'card.eventsAlbum': 'Recorded events',
    'card.connecting': 'Connecting…',
    'card.browseTitle': 'Events · Recordings',
    'card.listRecent': 'Recent events',
    'card.listRecordings': 'Recordings',
    'card.listClips': 'Clips',
    'card.listSnapshots': 'Snapshots',
    'card.listReviews': 'Reviews',
    'card.listKept': 'Kept',
    'card.new': 'new ✦',

    'info.events': 'Events',
    'info.online': 'Online',
    'info.offline': 'Offline',

    'ctrl.showOne': 'Show one camera',
    'ctrl.showAll': 'Show all cameras',
    'ctrl.single': 'Single',
    'ctrl.grid': 'Grid',
    'ctrl.fullscreen': 'Fullscreen',
    'ctrl.showPanel': 'Show events panel',
    'ctrl.hidePanel': 'Hide events panel',
    'ctrl.autoRotate': 'Auto-rotate',
    'ctrl.rotateOff': 'Auto-rotate off',
    'ctrl.rotateOn': 'Rotating every {n}s',
    'ctrl.saveFailed': 'Could not save — check Frigate port config.',
    'ctrl.jumpNow': 'Jump to now',
    'ctrl.filter': 'Filter',
    'ctrl.calendar': 'Calendar',

    'tl.dragHint': 'Drag · wheel=scroll · Ctrl+wheel=zoom · rest to magnify',
    'tl.events': 'Events',
    'tl.recordings': 'Recordings',
    'tl.evHint': 'Show the event markers: click one to open that moment',
    'tl.recHint': 'Show the recordings: click a time to play it, with taller ribs where more went on',
    'tl.less': 'less',
    'tl.more': 'more',
    'tl.findLast': 'The last event was at {time} — click to go there',

    'ptz.panUp': 'Pan up',
    'ptz.panDown': 'Pan down',
    'ptz.panLeft': 'Pan left',
    'ptz.panRight': 'Pan right',
    'ptz.reset': 'Reset zoom and pan',
    'ptz.close': 'Close the PTZ pad',
    'ptz.zoomIn': 'Zoom in',
    'ptz.zoomOut': 'Zoom out',

    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'menu.recordings': 'Recordings',
    'menu.clips': 'Clips & events',
    'menu.reviews': 'Reviews',
    'menu.reload': 'Reload stream',
    'menu.timeline': 'Events timeline',
    'menu.ptz': 'Digital PTZ',
    'menu.grid': 'Switch camera / grid',
    'menu.fullscreen': 'Fullscreen',

    'modal.recordings': 'Recordings',
    'modal.clips': 'Events & clips',
    'modal.reviews': 'Reviews',
    'modal.close': 'Close',
    'modal.noEvents': 'No events in this period',

    'list.emptyPeriod': 'No events in this window',
    'list.emptyKept': 'No kept events',
    'list.emptyKeptHint': 'star an event to keep it',
    'list.emptyRecordings': 'No recordings in this window',
    'list.emptyReviews': 'No reviews in this window',
    'list.nothingToReview': 'Nothing to review ✓',
    'list.end': '— end —',
    'list.more': 'scroll for older…',
    'list.toReview': '{n} to review',
    'list.markAll': 'Mark all',
    'list.showReviewed': 'Show reviewed',
    'list.hideReviewed': 'Hide reviewed',
    'list.clip': 'clip',
    'list.snap': 'snap',
    'list.dlClip': 'Download clip',
    'list.dlSnapshot': 'Download snapshot',
    'list.latest': 'Latest event',
    'list.clickToSeek': 'click to seek',
    'list.rec': 'Rec',

    // events grid (the recording-first view)
    'evg.empty': 'No events with a clip or snapshot in this window',

    'filter.label': 'Label',
    'filter.zone': 'Zone',
    'filter.show': 'Show',
    'filter.all': 'All',
    'filter.favorites': '★ Favorites',

    'viewer.downloadFrom': 'Download from {time}',
    'viewer.download': '↓ Download',
    'viewer.mute': 'Mute',
    'viewer.unmute': 'Unmute',
    'viewer.speed': 'Playback speed (0.5×–12×)',
    'viewer.backToLive': 'Back to live',
    'viewer.saveClip': 'Save clip',
    'viewer.saveSnap': 'Save snapshot',
    'cal.today': 'today',
    'heat.title': 'Events over time — tap to jump',

    // editor
    'ed.cameras': 'Cameras',
    'ed.frigateDetected': '· Frigate cameras detected',
    'ed.addCamera': '+ Add camera',
    'ed.gridLayout': 'Grid layout',
    'ed.camSwapHint': 'The number is the tile the camera fills in the grid. Pick a camera that is already in another tile to swap the two.',
    'ed.camLoadHint': 'Every camera in the grid streams at once, so more cameras means more load on the browser and on Frigate.',
    'ed.layoutHint': 'The numbers match the tile numbers beside each camera above. A layout sets the columns and the tile sizes together.',
    'ed.stackOnMobile': 'On a phone, stack the cameras one per row',
    'ed.stackHint': 'Any layout leaves the cameras too small to see on a phone, so this overrides it there. Turn it off to keep the grid on a phone too, for two cameras side by side or a small overview.',
    'ed.title': 'Title (optional)',
    'ed.titlePlaceholder': 'My Camera',
    'ed.subtitle': 'Subtitle',
    'ed.subtitlePlaceholder': 'Frigate',
    'ed.view': 'View',
    'ed.single': 'Single camera',
    'ed.gridAll': 'Grid (all cams)',
    'ed.eventsOnly': 'Events album',
    'ed.eventsOnlyHint': 'the card becomes a grid of every camera\'s clips and snapshots — no live feed, no timeline, no camera controls. The grid fills the height it is given.',
    'ed.cameraOnly': 'Camera-only mode',
    'ed.cameraOnlyHint': 'clean, hides the timeline and the footer',
    'ed.floatingMenu': 'Floating action menu',
    'ed.ptzEnable': 'Enable digital PTZ',
    'ed.menuPosition': 'Floating menu position',
    'ed.ptzPosition': 'PTZ controls position',
    'ed.timeline': 'Events timeline',
    'ed.timelineAuto': 'Automatic',
    'ed.timelineOn': 'Always show',
    'ed.timelineOff': 'Hide',
    'pos.top': 'Top centre',
    'pos.bottom': 'Bottom centre',
    'pos.top-left': 'Top left',
    'pos.top-right': 'Top right',
    'pos.bottom-left': 'Bottom left',
    'pos.bottom-right': 'Bottom right',
    'pos.left': 'Left side',
    'pos.right': 'Right side',
    'ed.autoRotateOnLoad': 'Auto-rotate on load',
    'ed.rotateInterval': 'Rotate interval (seconds, 0 = use default {n}s)',
    'ed.theme': 'Theme',
    'ed.themeAuto': 'Auto (Home Assistant)',
    'ed.themeDark': 'Dark',
    'ed.themeLight': 'Light',
    'ed.colors': 'Colors',
    'ed.customAccent': 'Custom accent',
    'ed.customBg': 'Custom background',
    'ed.colorHint': 'Check the box to activate. Uncheck to revert to theme default.',
    'ed.hiddenTabs': 'Hidden tabs',
    'ed.gridColumns': 'Grid columns',
    'ed.auto': 'Automatic',
    'ed.col1': '1 (stacked)',
    'ed.colsHint': 'A camera can occupy more than one tile, so one can be shown larger than the rest. Automatic picks a column count from the number of cameras and the space available: on a tablet that comes to {cols} per row. A phone stacks regardless, see below.',
    'ed.eventsPanel': 'Events panel',
    'ed.eventsCollapsed': 'Start with the events panel hidden',
    'ed.eventsHint': 'On a wide card the events list sits beside the cameras. Hiding it gives the cameras the full width; a button on the card slides it back in.',
    'ed.liveProvider': 'Live view provider',
    'ed.providerHls': 'Home Assistant stream',
    'ed.providerGo2rtc': 'go2rtc, low latency (experimental)',
    'ed.providerHint': "go2rtc streams via Frigate's built-in WebRTC/MSE for much lower latency. Falls back to the Home Assistant stream automatically if it can't connect.",
    'ed.transport': 'go2rtc transport',
    'ed.mse': 'MSE (recommended)',
    'ed.webrtc': 'WebRTC only',
    'ed.transportAuto': 'Automatic',
    'ed.transportHint': 'MSE runs entirely over the proxied connection, so it works remotely and in the companion apps. WebRTC can be marginally faster but connects directly to go2rtc, which usually only resolves on the local network.',
    'ed.maxHeight': 'Maximum camera height',
    'ed.maxHeightPlaceholder': 'e.g. 70, blank = automatic',
    'ed.maxHeightHint': 'As a percentage of the screen height. Leave empty to let the cameras size themselves; a grid uses at most 70% by default. Raise it for a wall display.',
    'ed.windowHours': 'Window hours',
    'ed.timelineHours': 'Timeline hours',
    'ed.timelineHoursHint': 'How much history the timeline shows when it opens. The events list keeps the full window; Ctrl+scroll (or a pinch) zooms the timeline from here.',
    'ed.timelineMode': 'Timeline shows',
    'ed.tlEvents': 'Events (click one)',
    'ed.tlRecordings': 'Recordings (click to play)',
    'ed.eventsLimit': 'Events per camera',
    'ed.eventsLimitHint': 'how many events the album and the all-cameras grid pull from each camera. Raise it if a busy day is being cut short.',
    'ed.selectCamera': 'Select camera',
    'ed.displayName': 'Display name (optional)',
    'ed.tileN': 'Tile {n} in the grid',
    'ed.tileSize': 'Tile size in the grid',
    'ed.remove': 'Remove',
    'ed.layout': 'Layout',
    'ed.oneCamera': '1 camera',
    'ed.nCameras': '{n} cameras',
    'ed.fitsCount': 'fits the<br>camera count',

    // grid layout names
    'lay.auto': 'Automatic',
    'lay.2-row': '2 stacked',
    'lay.2-col': '2 side by side',
    'lay.3-big': '1 large + 2',
    'lay.4': '2 x 2',
    'lay.6-big': '1 large + 5',
    'lay.8-big': '1 large + 7',
    'lay.9': '3 x 3',
    'lay.10-big': '2 large + 8',
    'lay.16': '4 x 4',
  },

  pt: {
    // compartilhados
    'common.loading': 'Carregando…',
    'common.now': 'agora',

    // títulos de dia (murais e listas)
    'day.today': 'Hoje',
    'day.yesterday': 'Ontem',

    // separadores / vistas
    'tab.live': 'Ao vivo',
    'tab.recordings': 'Gravações',
    'tab.clips': 'Clipes',
    'tab.snapshots': 'Fotos',
    'tab.reviews': 'Revisões',
    'tab.kept': 'Guardados',

    'card.cameras': 'Câmeras',
    'card.camera': 'Câmera',
    'card.allCameras': 'Todas as câmeras',
    'card.eventsAlbum': 'Eventos gravados',
    'card.connecting': 'Conectando…',
    'card.browseTitle': 'Eventos · Gravações',
    'card.listRecent': 'Eventos recentes',
    'card.listRecordings': 'Gravações',
    'card.listClips': 'Clipes',
    'card.listSnapshots': 'Fotos',
    'card.listReviews': 'Revisões',
    'card.listKept': 'Guardados',
    'card.new': 'novo ✦',

    'info.events': 'Eventos',
    'info.online': 'Online',
    'info.offline': 'Offline',

    'ctrl.showOne': 'Ver uma câmera',
    'ctrl.showAll': 'Ver todas as câmeras',
    'ctrl.single': 'Única',
    'ctrl.grid': 'Grade',
    'ctrl.fullscreen': 'Tela cheia',
    'ctrl.showPanel': 'Mostrar painel de eventos',
    'ctrl.hidePanel': 'Esconder painel de eventos',
    'ctrl.autoRotate': 'Rotação automática',
    'ctrl.rotateOff': 'Rotação automática desligada',
    'ctrl.rotateOn': 'Rodando a cada {n}s',
    'ctrl.saveFailed': 'Não foi possível salvar — verifique a porta do Frigate.',
    'ctrl.jumpNow': 'Ir para agora',
    'ctrl.filter': 'Filtrar',
    'ctrl.calendar': 'Calendário',

    'tl.dragHint': 'Arraste · roda=deslocar · Ctrl+roda=zoom · repousa para ampliar',
    'tl.events': 'Eventos',
    'tl.recordings': 'Gravações',
    'tl.evHint': 'Mostrar os marcadores de eventos: clica num para abrir o momento',
    'tl.recHint': 'Mostrar as gravações: clica numa hora para a reproduzir, com costelas mais altas onde se passou mais',
    'tl.less': 'menos',
    'tl.more': 'mais',
    'tl.findLast': 'O último evento foi às {time} — clica para ir lá',

    'ptz.panUp': 'Mover para cima',
    'ptz.panDown': 'Mover para baixo',
    'ptz.panLeft': 'Mover para a esquerda',
    'ptz.panRight': 'Mover para a direita',
    'ptz.reset': 'Redefinir zoom e posição',
    'ptz.close': 'Fechar os controlos PTZ',
    'ptz.zoomIn': 'Aproximar',
    'ptz.zoomOut': 'Afastar',

    'menu.open': 'Abrir menu',
    'menu.close': 'Fechar menu',
    'menu.recordings': 'Gravações',
    'menu.clips': 'Clipes e eventos',
    'menu.reviews': 'Revisões',
    'menu.reload': 'Recarregar stream',
    'menu.timeline': 'Linha do tempo de eventos',
    'menu.ptz': 'PTZ digital',
    'menu.grid': 'Trocar câmera / grade',
    'menu.fullscreen': 'Tela cheia',

    'modal.recordings': 'Gravações',
    'modal.clips': 'Eventos e clipes',
    'modal.reviews': 'Revisões',
    'modal.close': 'Fechar',
    'modal.noEvents': 'Nenhum evento neste período',

    'list.emptyPeriod': 'Nenhum evento neste período',
    'list.emptyKept': 'Nenhum evento guardado',
    'list.emptyKeptHint': 'marque um evento com a estrela para guardá-lo',
    'list.emptyRecordings': 'Nenhuma gravação neste período',
    'list.emptyReviews': 'Nenhuma revisão neste período',
    'list.nothingToReview': 'Nada para revisar ✓',
    'list.end': '— fim —',
    'list.more': 'role para ver mais antigos…',
    'list.toReview': '{n} para revisar',
    'list.markAll': 'Marcar todos',
    'list.showReviewed': 'Mostrar revisados',
    'list.hideReviewed': 'Ocultar revisados',
    'list.clip': 'clipe',
    'list.snap': 'foto',
    'list.dlClip': 'Baixar clipe',
    'list.dlSnapshot': 'Baixar foto',
    'list.latest': 'Último evento',
    'list.clickToSeek': 'clique para navegar',
    'list.rec': 'Grav',

    // grade de eventos (visualização focada em gravações)
    'evg.empty': 'Nenhum evento com clipe ou foto nesta janela',

    'filter.label': 'Rótulo',
    'filter.zone': 'Zona',
    'filter.show': 'Mostrar',
    'filter.all': 'Todos',
    'filter.favorites': '★ Favoritos',

    'viewer.downloadFrom': 'Baixar a partir de {time}',
    'viewer.download': '↓ Baixar',
    'viewer.mute': 'Silenciar',
    'viewer.unmute': 'Ativar som',
    'viewer.speed': 'Velocidade de reprodução (0,5×–12×)',
    'viewer.backToLive': 'Voltar ao vivo',
    'viewer.saveClip': 'Salvar clipe',
    'viewer.saveSnap': 'Salvar foto',
    'cal.today': 'hoje',
    'heat.title': 'Eventos ao longo do tempo — toque para ir',

    // editor
    'ed.cameras': 'Câmeras',
    'ed.frigateDetected': '· câmeras Frigate detectadas',
    'ed.addCamera': '+ Adicionar câmera',
    'ed.gridLayout': 'Layout da grade',
    'ed.camSwapHint': 'O número é o quadro que a câmera ocupa na grade. Escolha uma câmera que já esteja em outro quadro para trocar as duas de lugar.',
    'ed.camLoadHint': 'Todas as câmeras da grade transmitem ao mesmo tempo, então mais câmeras significam mais carga no navegador e no Frigate.',
    'ed.layoutHint': 'Os números correspondem aos quadros ao lado de cada câmera acima. Um layout define as colunas e os tamanhos dos quadros em conjunto.',
    'ed.stackOnMobile': 'No celular, empilhar as câmeras uma por linha',
    'ed.stackHint': 'Qualquer layout deixa as câmeras pequenas demais para ver no celular, então isto prevalece lá. Desligue para manter a grade no celular também, para duas câmeras lado a lado ou uma visão geral.',
    'ed.title': 'Título (opcional)',
    'ed.titlePlaceholder': 'Minha Câmera',
    'ed.subtitle': 'Subtítulo',
    'ed.subtitlePlaceholder': 'Frigate',
    'ed.view': 'Visualização',
    'ed.single': 'Câmera única',
    'ed.gridAll': 'Grade (todas)',
    'ed.eventsOnly': 'Álbum de eventos',
    'ed.eventsOnlyHint': 'o card vira uma grade com os clipes e fotos de todas as câmeras — sem ao vivo, sem linha do tempo, sem controles de câmera. A grade ocupa toda a altura disponível.',
    'ed.cameraOnly': 'Modo só câmera',
    'ed.cameraOnlyHint': 'limpo, oculta a linha do tempo e o rodapé',
    'ed.floatingMenu': 'Menu flutuante de ações',
    'ed.ptzEnable': 'Habilitar PTZ digital',
    'ed.menuPosition': 'Posição do menu flutuante',
    'ed.ptzPosition': 'Posição dos controlos PTZ',
    'ed.timeline': 'Linha do tempo de eventos',
    'ed.timelineAuto': 'Automático',
    'ed.timelineOn': 'Mostrar sempre',
    'ed.timelineOff': 'Ocultar',
    'pos.top': 'Topo, centro',
    'pos.bottom': 'Base, centro',
    'pos.top-left': 'Topo à esquerda',
    'pos.top-right': 'Topo à direita',
    'pos.bottom-left': 'Base à esquerda',
    'pos.bottom-right': 'Base à direita',
    'pos.left': 'Lateral esquerda',
    'pos.right': 'Lateral direita',
    'ed.autoRotateOnLoad': 'Rotação automática ao carregar',
    'ed.rotateInterval': 'Intervalo de rotação (segundos, 0 = padrão {n}s)',
    'ed.theme': 'Tema',
    'ed.themeAuto': 'Automático (Home Assistant)',
    'ed.themeDark': 'Escuro',
    'ed.themeLight': 'Claro',
    'ed.colors': 'Cores',
    'ed.customAccent': 'Cor de destaque',
    'ed.customBg': 'Cor de fundo',
    'ed.colorHint': 'Marque a caixa para ativar. Desmarque para voltar ao padrão do tema.',
    'ed.hiddenTabs': 'Abas ocultas',
    'ed.gridColumns': 'Colunas da grade',
    'ed.auto': 'Automático',
    'ed.col1': '1 (empilhado)',
    'ed.colsHint': 'Uma câmera pode ocupar mais de um quadro, então uma pode aparecer maior que as outras. O modo automático escolhe a quantidade de colunas a partir do número de câmeras e do espaço disponível: num tablet isso dá {cols} por linha. O celular empilha de qualquer forma, veja abaixo.',
    'ed.eventsPanel': 'Painel de eventos',
    'ed.eventsCollapsed': 'Começar com o painel de eventos oculto',
    'ed.eventsHint': 'Num card largo a lista de eventos fica ao lado das câmeras. Ocultá-la dá a largura total às câmeras; um botão no card traz a lista de volta.',
    'ed.liveProvider': 'Fonte da transmissão ao vivo',
    'ed.providerHls': 'Stream do Home Assistant',
    'ed.providerGo2rtc': 'go2rtc, baixa latência (experimental)',
    'ed.providerHint': 'O go2rtc transmite pelo WebRTC/MSE embutido do Frigate, com latência bem menor. Se não conseguir conectar, volta automaticamente para o stream do Home Assistant.',
    'ed.transport': 'Transporte do go2rtc',
    'ed.mse': 'MSE (recomendado)',
    'ed.webrtc': 'Somente WebRTC',
    'ed.transportAuto': 'Automático',
    'ed.transportHint': 'O MSE passa inteiramente pela conexão intermediada, então funciona remotamente e nos apps companheiros. O WebRTC pode ser um pouco mais rápido, mas conecta direto à porta do go2rtc, que normalmente só resolve na rede local.',
    'ed.maxHeight': 'Altura máxima da câmera',
    'ed.maxHeightPlaceholder': 'ex.: 70, vazio = automático',
    'ed.maxHeightHint': 'Como porcentagem da altura da tela. Deixe vazio para as câmeras se dimensionarem sozinhas; uma grade usa no máximo 70% por padrão. Aumente para um painel de parede.',
    'ed.windowHours': 'Janela em horas',
    'ed.timelineHours': 'Linha do tempo em horas',
    'ed.timelineHoursHint': 'Quanto histórico a linha do tempo mostra ao abrir. A lista de eventos mantém a janela completa; Ctrl+scroll (ou pinça) amplia a linha do tempo a partir daqui.',
    'ed.timelineMode': 'Linha do tempo mostra',
    'ed.tlEvents': 'Eventos (clica num)',
    'ed.tlRecordings': 'Gravações (clica para reproduzir)',
    'ed.eventsLimit': 'Eventos por câmera',
    'ed.eventsLimitHint': 'quantos eventos o álbum e a grade de todas as câmeras buscam de cada câmera. Aumente se um dia cheio estiver sendo cortado.',
    'ed.selectCamera': 'Selecione a câmera',
    'ed.displayName': 'Nome de exibição (opcional)',
    'ed.tileN': 'Quadro {n} na grade',
    'ed.tileSize': 'Tamanho do quadro na grade',
    'ed.remove': 'Remover',
    'ed.layout': 'Layout',
    'ed.oneCamera': '1 câmera',
    'ed.nCameras': '{n} câmeras',
    'ed.fitsCount': 'ajusta ao<br>número de câmeras',

    // nomes dos layouts de grade
    'lay.auto': 'Automático',
    'lay.2-row': '2 empilhadas',
    'lay.2-col': '2 lado a lado',
    'lay.3-big': '1 grande + 2',
    'lay.4': '2 x 2',
    'lay.6-big': '1 grande + 5',
    'lay.8-big': '1 grande + 7',
    'lay.9': '3 x 3',
    'lay.10-big': '2 grandes + 8',
    'lay.16': '4 x 4',
  },
};

// The language Home Assistant is using. `hass.locale.language` is the modern
// field; `hass.language` and the browser are the older fallbacks.
function pickLang(hass) {
  const raw = hass?.locale?.language || hass?.language
    || (typeof navigator !== 'undefined' ? navigator.language : '') || 'en';
  const code = String(raw).toLowerCase();
  if (TRANSLATIONS[code]) return code;
  const base = code.split('-')[0];
  return TRANSLATIONS[base] ? base : 'en';
}

// The exact locale tag for Intl (dates, numbers), which wants `pt-BR`, not `pt`.
function pickLocale(hass) {
  return hass?.locale?.language || hass?.language
    || (typeof navigator !== 'undefined' ? navigator.language : '') || 'en';
}

// Look a key up, falling back to English and then to the key itself, so a
// missing translation never shows as an empty string or a code. `{name}` in a
// value is replaced from `vars`.
function translate(lang, key, vars) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let s = dict[key];
  if (s === undefined) s = TRANSLATIONS.en[key];
  if (s === undefined) return key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
  return s;
}

// styles.js — card CSS
// ── styles ───────────────────────────────────────────────────
const STYLES = `
  :host{display:block;}
  ha-card.card{
    position:relative;
    background:var(--ha-card-background, var(--card-background-color, #111827));
    color:var(--primary-text-color, #f3f4f6);
    overflow:hidden;
    border-radius:var(--ha-card-border-radius, 12px);
    border:var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(255,255,255,0.08)));
    box-shadow:var(--ha-card-box-shadow, none);
    font-family:var(--primary-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    box-sizing:border-box;
  }
  .section-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--secondary-text-color, var(--c-text3));}

  /* ── theme variables (inherit HA by default) ── */
  .card {
    --c-bg:        var(--ha-card-background, var(--card-background-color, #111827));
    --c-bg-panel:  var(--secondary-background-color, rgba(255,255,255,.05));
    --c-bg-deep:   var(--ha-card-background, #0b0f19);
    --c-text:      var(--primary-text-color, #f3f4f6);
    --c-text2:     var(--secondary-text-color, #9ca3af);
    --c-text3:     var(--disabled-text-color, #6b7280);
    --c-text4:     var(--disabled-text-color, #4b5563);
    --c-border:    var(--divider-color, rgba(255,255,255,.08));
    --c-border2:   var(--divider-color, rgba(255,255,255,.12));
    --c-acc:       var(--primary-color, #3b82f6);
    --c-acc-bg:    rgba(var(--rgb-primary-color, 59,130,246), .18);
    --c-acc-bdr:   rgba(var(--rgb-primary-color, 59,130,246), .40);
    --c-on:        var(--success-color, #10b981);
  }
  .card.theme-light {
    --c-bg:        var(--ha-card-background, var(--card-background-color, #ffffff));
    --c-bg-panel:  var(--secondary-background-color, rgba(0,0,0,.04));
    --c-bg-deep:   #f3f4f6;
    --c-text:      var(--primary-text-color, #111827);
    --c-text2:     var(--secondary-text-color, #4b5563);
    --c-text3:     var(--disabled-text-color, #6b7280);
    --c-text4:     var(--disabled-text-color, #9ca3af);
    --c-border:    var(--divider-color, rgba(0,0,0,.08));
    --c-border2:   var(--divider-color, rgba(0,0,0,.12));
    --c-acc:       var(--primary-color, #2563eb);
    --c-acc-bg:    rgba(var(--rgb-primary-color, 37,99,235), .12);
    --c-acc-bdr:   rgba(var(--rgb-primary-color, 37,99,235), .35);
  }
  /* ── responsive layout ── */
  .layout{display:flex;flex-direction:column;}
  /* Wide: side-by-side.
     col-left drives card height (natural: stream + timeline + info + tabs + latest).
     col-right max-height is set dynamically by JS to match col-left.offsetHeight
     so the events panel never makes the card taller than the stream side. */
  .card.wide .layout{flex-direction:row;align-items:flex-start;}
  /* Widths rather than flex so the events panel can be slid away: both sides
     animate, the cameras take over the space instead of being covered by an
     overlay. */
  /* The stream column takes whatever is left, so the events panel can both be
     capped and animate away without leaving a gap. An event row needs about
     400px; beyond that the rows just stretch and the cameras lose width for
     nothing. */
  .card.wide .col-left{flex:1 1 auto;min-width:0;}
  .card.wide .col-right{width:42%;max-width:400px;flex:0 0 auto;min-width:0;overflow-y:auto;border-left:1px solid var(--c-border);transition:width .28s ease,max-width .28s ease,opacity .18s ease;}
  .card.wide.events-collapsed .col-right{width:0;max-width:0;opacity:0;overflow:hidden;border-left-color:transparent;}
  /* Narrow layouts already have the browse toggle for this. */
  .card:not(.wide) #sc-events{display:none;}
  .card.events-collapsed #sc-events{color:var(--c-text3);}
  /* Cap stream height so a full-width section doesn't produce an 800px stream.
     User can override via stream_height config. */
  .card.wide #eng-wrap{max-height:var(--stream-h,55vh);}
  .card.wide .browse-toggle{display:none;}
  .card.wide .browse{display:block!important;}
  /* Narrow grid mode: grid stacks above events; browse is open by default
     but the toggle is visible so the user can collapse it. */

  /* ── feed area ── */
  .feed-area{position:relative;width:100%;}
  #eng-wrap{
    position:relative;
    width:100%;
    aspect-ratio:var(--cam-aspect-ratio, 16/9);
    background:var(--c-bg-deep);
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  #engine{position:absolute;inset:0;touch-action:none;transform-origin:0 0;}
  #engine.zooming{transition:none;}
  #engine:not(.zooming){transition:transform .15s ease-out;}
  #engine ha-camera-stream,#engine ha-hls-player,#engine frigate-go2rtc-player{width:100%;height:100%;display:block;}
  #engine video{width:100%;height:100%;object-fit:cover;}
  /* The outgoing camera's last frame, held while the next one connects, then
     dissolved out as the new stream comes up. Both sides animate so the change
     reads as one movement rather than a swap. */
  /* The pre-load still fills the frame the same way the video will (object-fit:
     cover), so the card's height is used edge to edge instead of being letterboxed. */
  .engine-hold{position:absolute;inset:0;background:var(--c-bg-deep) center/cover no-repeat;z-index:0;opacity:1;transition:opacity .55s cubic-bezier(.4,0,.2,1);}
  .engine-hold.dim{opacity:.35;}
  .engine-hold.out{opacity:0;}
  .engine-wait{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:1;pointer-events:none;}
  #engine .engine-player{position:relative;z-index:2;opacity:0;transition:opacity .55s cubic-bezier(.4,0,.2,1);}
  #engine .engine-player.shown{opacity:1;}
  .viewer{position:absolute;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:4;}
  .viewer video,.viewer img.snap{width:100%;height:100%;object-fit:contain;background:#000;}
  .viewer .ld{color:var(--c-text2);font-size:13px;}
  .ph{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--c-text4);background:linear-gradient(145deg,#1a2540,#0d1520);}
  .ph svg{width:40px;height:40px;opacity:.35;}
  .ph-spin{width:24px;height:24px;border:3px solid rgba(255,255,255,.1);border-top-color:var(--c-acc);border-radius:50%;animation:spin .8s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .feed-top{position:absolute;top:10px;left:12px;right:12px;z-index:6;display:flex;align-items:center;gap:6px;}
  .btn{display:inline-flex;align-items:center;gap:5px;background:rgba(15,21,40,.82);border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:8px;padding:6px 11px;font-size:12px;font-weight:600;cursor:pointer;}
  .btn svg{width:14px;height:14px;}
  /* Icons with a title, not icons with a caption: these sit over the picture, and
     a caption over the picture is just picture covered up. */
  .btn.icon-only{padding:6px 8px;}
  #feed-speed{min-width:39px;justify-content:center;font-variant-numeric:tabular-nums;}
  .feed-actions{display:flex;gap:6px;margin-left:auto;}
  .feed-actions .btn:hover{background:rgba(239,68,68,.7);}
  #feed-speed:hover{background:rgba(59,130,246,.75);}

  /* ── camera grid ── */
  /* Column count comes from --grid-cols, set inline by _mountGrid, so any
     number of cameras works without a rule per count. */
  /* dense so a camera spanning several cells does not leave holes behind it:
     later tiles backfill the gaps instead of the grid keeping empty squares. */
  .cam-grid{display:grid;width:100%;grid-template-columns:repeat(var(--grid-cols,2),1fr);grid-auto-flow:dense;grid-auto-rows:1fr;}
  .grid-slot{position:relative;aspect-ratio:16/9;background:var(--c-bg-deep);overflow:hidden;cursor:pointer;transition:box-shadow .15s;}
  .grid-slot:hover{box-shadow:inset 0 0 0 2px rgba(59,130,246,.5);}
  .grid-slot.placeholder{background:#06090f;cursor:default;}
  .grid-slot.placeholder:hover{box-shadow:none;}
  .grid-slot ha-camera-stream,.grid-slot frigate-go2rtc-player{width:100%;height:100%;display:block;}
  .grid-close-btn{position:absolute;top:6px;right:6px;width:22px;height:22px;background:rgba(0,0,0,.75);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:50%;font-size:11px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;line-height:1;}
  .grid-close-btn:hover{background:rgba(239,68,68,.7);}
  /* per-slot fullscreen button — appears on hover, bottom-right */
  .grid-fs-btn{position:absolute;bottom:6px;right:6px;width:22px;height:22px;background:rgba(0,0,0,.65);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:6px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;}
  .grid-slot:hover .grid-fs-btn{opacity:1;}
  .grid-fs-btn:hover{background:rgba(59,130,246,.5);border-color:rgba(59,130,246,.7);}
  .grid-fs-btn svg{width:11px;height:11px;}
  /* fullscreen animation */
  @keyframes fsIn{from{opacity:.7;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
  /* single-slot fullscreen */
  .grid-slot:fullscreen{width:100vw;height:100vh;aspect-ratio:unset;border-radius:0;background:#000;animation:fsIn .25s cubic-bezier(.22,.8,.22,1);}
  .grid-slot:-webkit-full-screen{width:100vw;height:100vh;aspect-ratio:unset;border-radius:0;background:#000;animation:fsIn .25s cubic-bezier(.22,.8,.22,1);}
  .grid-slot:fullscreen .grid-fs-btn,.grid-slot:-webkit-full-screen .grid-fs-btn{display:none;}
  /* whole-grid fullscreen */
  .cam-grid:fullscreen{width:100vw;height:100vh;max-height:none!important;background:#000;animation:fsIn .25s cubic-bezier(.22,.8,.22,1);}
  .cam-grid:-webkit-full-screen{width:100vw;height:100vh;max-height:none!important;background:#000;animation:fsIn .25s cubic-bezier(.22,.8,.22,1);}
  .cam-grid:fullscreen .grid-slot,.cam-grid:-webkit-full-screen .grid-slot{aspect-ratio:unset;border-radius:0;}
  .cam-grid:fullscreen.multi-row,.cam-grid:-webkit-full-screen.multi-row{grid-template-rows:repeat(var(--grid-rows,2),1fr);}
  .grid-label{position:absolute;bottom:4px;left:6px;font-size:10px;font-weight:600;color:rgba(255,255,255,.85);text-shadow:0 1px 2px rgba(0,0,0,.8);background:rgba(0,0,0,.45);padding:1px 7px;border-radius:10px;pointer-events:none;z-index:2;}
  /* More than one row: cap the height so the whole grid fits the viewport and
     let the tiles share it, rather than each keeping its 16:9 box. */
  .card.grid-mode .cam-grid.multi-row:not(.stacked) { max-height:var(--stream-h,70vh); grid-template-rows:repeat(var(--grid-rows,2),1fr); }
  .card.grid-mode .cam-grid.multi-row:not(.stacked) .grid-slot { aspect-ratio:unset; min-height:0; }
  /* Stacked: tiles keep their 16:9 box and the column simply gets taller.
     Capping the height here would squash every tile, the same mistake as on
     mobile. Honour an explicit stream_height, and scroll past it. */
  .card.grid-mode .cam-grid.stacked { max-height:var(--stream-h,none); overflow-y:auto; }
  /* Single stream: optional height cap */
  #eng-wrap { max-height:var(--stream-h,none); }
  /* Mobile: keep the grid about as tall as its tiles actually need. Each tile
     is one column wide, so 16:9 makes a row 56.25vw/cols tall. A stacked
     (single-column) grid is exempt: capping it squashes every tile to a sliver,
     which is the opposite of what stacking is for, and it is meant to scroll. */
  .card.mobile .cam-grid.multi-row:not(.stacked) {
    max-height:calc(56.25vw * var(--grid-rows,2) / var(--grid-cols,2));
  }
  .card.mobile .cam-grid.multi-row:not(.stacked) .grid-slot { aspect-ratio:unset; min-height:0; }

  /* ── info row ── */
  .info-row{display:grid;grid-template-columns:1fr auto;align-items:center;padding:10px 16px 8px;border-bottom:1px solid var(--c-border);}
  /* Sits in the timeline toolbar, so it inherits that spacing and its buttons
     use the same .tool style as the ones beside it. */
  .stream-ctrl-bar{display:flex;align-items:center;gap:4px;}
  .info-title{font-size:14px;font-weight:700;color:var(--c-text);} .info-sub{font-size:11px;color:var(--c-text3);margin-top:1px;}
  .stats{display:flex;gap:16px;justify-self:end;} .stat{display:flex;flex-direction:column;align-items:flex-end;}
  .sv{font-size:14px;font-weight:700;color:#93c5fd;} .sl{font-size:10px;color:var(--c-text4);text-transform:uppercase;letter-spacing:.06em;}

  /* ── camera switcher ── */
  .cam-switcher{display:flex;align-items:center;gap:4px;padding:5px 12px;border-bottom:1px solid var(--c-border);background:var(--c-bg-panel);}
  .cam-tabs{display:flex;gap:4px;flex:1;overflow-x:auto;scrollbar-width:none;}
  .cam-tabs::-webkit-scrollbar{display:none;}
  .cam-tab{display:inline-flex;align-items:center;gap:4px;background:var(--c-bg-panel);border:1px solid var(--c-border2);color:var(--c-text2);border-radius:14px;padding:4px 11px;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .15s;}
  .cam-tab:hover{background:rgba(255,255,255,.09);}
  .cam-tab.active{background:var(--c-acc-bg);border-color:var(--c-acc-bdr);color:#93c5fd;}
  .cam-tab svg{width:12px;height:12px;flex-shrink:0;}
  .cam-dot{font-size:8px;vertical-align:middle;}
  .cam-rotate,.cam-grid-btn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:var(--c-bg-panel);border:1px solid var(--c-border2);color:var(--c-text2);border-radius:7px;cursor:pointer;flex-shrink:0;}
  .cam-rotate svg,.cam-grid-btn svg{width:14px;height:14px;}
  .cam-rotate.on{color:var(--c-on);border-color:rgba(74,222,128,.4);background:rgba(74,222,128,.1);}
  .cam-grid-btn:hover{color:#93c5fd;border-color:var(--c-acc-bdr);}

  /* ── latest event ── */
  .latest{border-bottom:1px solid var(--c-border);}
  .latest-label{padding:7px 16px 4px;display:flex;align-items:center;}
  .latest-body{padding:0 12px 9px;}

  /* ── browse toggle ── */
  .browse-toggle{width:100%;display:flex;align-items:center;gap:8px;background:var(--c-bg-panel);border:none;border-bottom:1px solid var(--c-border);color:inherit;padding:10px 16px;cursor:pointer;}
  .chev2{display:inline-flex;transition:transform .15s;color:var(--c-text3);} .chev2 svg{width:14px;height:14px;}

  /* ── tabs ── */
  .tabs{display:flex;gap:5px;padding:8px 12px;border-bottom:1px solid var(--c-border);overflow-x:auto;scrollbar-width:none;}
  .tabs::-webkit-scrollbar{display:none;}
  .pill{display:inline-flex;align-items:center;gap:4px;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:20px;padding:5px 11px 5px 9px;font-size:11px;font-weight:600;color:var(--c-text2);cursor:pointer;white-space:nowrap;flex-shrink:0;}
  .pill svg{width:11px;height:11px;opacity:.75;}
  .pill:hover,.pill.active{background:var(--c-acc-bg);border-color:var(--c-acc-bdr);color:#93c5fd;} .pill.active svg{opacity:1;}
  .pill.icon-only{padding:6px 8px;} .pill.icon-only svg{width:13px;height:13px;opacity:.85;}

  /* ── timeline ── */
  .tl-sec{padding:8px 13px;border-bottom:1px solid var(--c-border);}
  .tl-head{display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:5px;}
  .tl-tools{display:flex;gap:4px;align-items:center;flex-wrap:wrap;}
  /* Which strip the timeline draws — events or recordings. Two chips in a
     recessed pill: only which one is on changes, so it reads as a mode. */
  .tl-modes{display:flex;gap:2px;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:14px;padding:2px;}
  .tl-modes .chip{border-color:transparent;background:none;padding:2px 9px;}
  .tool{background:var(--c-bg-panel);border:1px solid var(--c-border2);color:var(--c-text2);border-radius:7px;padding:4px 7px;cursor:pointer;}
  .tool svg{width:13px;height:13px;display:block;} .tool:hover{color:#93c5fd;border-color:var(--c-acc-bdr);}
  /* Labelled tool: the view switch is worth reading, not just recognising. */
  .tool-txt{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;font-size:11px;font-weight:600;}
  .tl-track{position:relative;height:30px;background:var(--c-bg-panel);border-radius:6px;overflow:hidden;cursor:grab;touch-action:pan-y;}
  .tl-track.grab{cursor:grabbing;}
  .tl-track.seekable{cursor:pointer;}
  .tl-track.seekable.grab{cursor:grabbing;}
  .tl-track::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent calc(100%/12 - 1px),rgba(255,255,255,.04) calc(100%/12 - 1px),rgba(255,255,255,.04) calc(100%/12));}
  /* Recordings are a spine with ribs: a line where something was recorded, and a
     rib standing on it whose height is how much went on. One colour, read by
     height rather than by shade, and nothing painted behind them — no line and
     no rib means nothing was recorded. */
  .t-spine{position:absolute;top:50%;transform:translateY(-50%);height:2px;border-radius:1px;background:var(--c-acc);opacity:.5;pointer-events:none;}
  .t-rib{position:absolute;top:50%;transform:translate(-50%,-50%);width:2px;border-radius:1px;background:var(--c-acc);pointer-events:none;}
  /* Events are dots: a 4px tick was a sliver to hit, and the moments that sit
     close together were the worst of all. The newest one in the window is
     ringed — the one landmark the strip always has, whatever else it shows. */
  .t-ev{position:absolute;top:50%;transform:translate(-50%,-50%);width:9px;height:9px;border-radius:50%;z-index:1;cursor:pointer;box-shadow:0 0 0 1.5px rgba(0,0,0,.45);}
  .t-ev:hover{width:13px;height:13px;z-index:3;}
  .t-ev.last{width:13px;height:13px;z-index:2;box-shadow:0 0 0 2px rgba(255,255,255,.9),0 0 9px rgba(255,255,255,.5);}
  /* The way to the newest moment when the window is sitting on a quiet stretch
     and would otherwise show nothing at all. */
  .tl-find{position:absolute;top:50%;transform:translateY(-50%);width:17px;height:17px;padding:0;border-radius:50%;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.4);color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;z-index:4;}
  .tl-find svg{width:14px;height:14px;} .tl-find:hover{background:rgba(0,0,0,.75);border-color:#fff;}
  .tl-find.left{left:3px;} .tl-find.right{right:3px;}
  /* The recording bars are gone: what is drawn is a spine with ribs (see
     .t-spine/.t-rib), so there is no band under anything any more. */
  /* The pointer line, and the time it is over spelled out next to the range. */
  .tl-cursor{position:absolute;top:0;bottom:0;width:1px;background:rgba(255,255,255,.7);pointer-events:none;z-index:3;}
  .tl-when{display:inline-flex;align-items:baseline;}
  .tl-hover{font-size:10px;color:#93c5fd;margin-left:5px;font-variant-numeric:tabular-nums;white-space:nowrap;pointer-events:none;}
  .tl-now{position:absolute;top:0;bottom:0;width:2px;background:#ef4444;pointer-events:none;}
  /* Days, marked once: a line where a new one starts and its date written after
     it, so a window that crosses midnight reads as two days and not one run. The
     date sits in a chip of its own, since the strip behind it can be anything. */
  .tl-day{position:absolute;top:0;bottom:0;width:1px;background:rgba(255,255,255,.34);pointer-events:none;z-index:2;}
  .tl-day-lbl{position:absolute;top:0;padding:0 5px 1px 4px;background:rgba(0,0,0,.58);color:#e5e7eb;font-size:9px;font-weight:600;line-height:13px;border-radius:0 0 4px 0;pointer-events:none;z-index:4;white-space:nowrap;}
  .tl-labels{display:flex;justify-content:space-between;margin-top:3px;} .tl-labels span{font-size:9px;color:var(--c-text4);}
  .legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;} .lg{font-size:10px;color:var(--c-text3);display:flex;align-items:center;gap:4px;} .lg i{width:7px;height:7px;border-radius:2px;display:inline-block;}
  /* The legend's own swatch for the strip: the same spine with ribs, drawn small. */
  .lg svg.lg-bone{width:26px;height:12px;color:var(--c-acc);flex:none;}

  /* ── filter + cal ── */
  .filter-panel,.cal-panel{background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:9px;padding:8px;margin-bottom:7px;}
  .frow{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:4px;} .frow:last-child{margin-bottom:0;} .frow-l{font-size:10px;color:var(--c-text3);width:38px;text-transform:uppercase;flex-shrink:0;}
  .chip{background:var(--c-bg-panel);border:1px solid var(--c-border2);color:var(--c-text2);border-radius:14px;padding:3px 9px;font-size:11px;cursor:pointer;}
  .chip.on{background:var(--c-acc-bg);border-color:var(--c-acc-bdr);color:#93c5fd;}
  .cal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;} .cal-head b{font-size:12px;} .cal-head button{background:none;border:none;color:#93c5fd;font-size:17px;cursor:pointer;padding:0 5px;}
  .cal-dow,.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;text-align:center;}
  .cal-dow span{font-size:9px;color:var(--c-text4);padding:2px 0;}
  .cday{position:relative;background:none;border:none;color:var(--c-text);font-size:11px;padding:5px 0;border-radius:6px;cursor:pointer;} .cday:hover{background:var(--c-acc-bg);} .cdot{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:3px;height:3px;border-radius:50%;background:#ef4444;}
  /* Today and the day you picked, told apart at a glance: a ring for today, a
     filled chip for the selection, both when today is also selected. */
  .cday.today{box-shadow:inset 0 0 0 1px var(--c-acc-bdr);font-weight:700;}
  .cday.sel{background:var(--c-acc-bg);color:#93c5fd;font-weight:700;box-shadow:inset 0 0 0 1px var(--c-acc-bdr);}

  /* ── event list ── */
  .list-sec{padding:8px 13px 12px;}
  /* Wide: col-right scrolls the whole events panel, no inner list cap needed */
  .card.wide .list{max-height:none;overflow-y:visible;}
  .list-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
  .newtoast{font-size:10px;font-weight:700;color:var(--c-on);}
  .list{max-height:460px;overflow-y:auto;}
  .empty{text-align:center;padding:16px;color:var(--c-text3);font-size:12px;line-height:1.5;}
  .more,.end{text-align:center;font-size:10px;color:var(--c-text4);padding:6px;}
  /* The heading that opens each day, in the walls and the lists alike: a rule
     across the width with the day named on it. In the grid it spans every column,
     which is what makes the wall read as days rather than as one long run. */
  .day-head{grid-column:1/-1;font-size:11px;font-weight:700;color:var(--c-text3);text-transform:capitalize;padding:3px 0 4px;border-bottom:1px solid var(--c-border);margin:2px 0 6px;}
  .list .day-head{margin:10px 0 6px;}

  .ec{display:flex;gap:9px;align-items:center;padding:8px 10px;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:12px;margin-bottom:5px;cursor:pointer;}
  .ec:hover{background:rgba(255,255,255,.07);border-color:rgba(59,130,246,.25);}
  .ec.compact{padding:6px 9px;}
  .ec.compact .et{width:54px;height:38px;border-radius:7px;}
  .ec.compact .eact .ico{width:24px;height:24px;}
  .ec.compact .eact .ico svg{width:11px;height:11px;}
  .et{width:72px;height:50px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#0d1520;position:relative;}
  .et img{width:100%;height:100%;object-fit:cover;display:block;}
  .tph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a2840,#0d1520);color:#2a3d5e;} .tph svg{width:20px;height:20px;}
  .ed{position:absolute;bottom:2px;right:3px;font-size:9px;font-weight:700;color:#fff;background:rgba(0,0,0,.65);border-radius:4px;padding:1px 3px;}
  .ei{flex:1;min-width:0;}
  .etop{display:flex;align-items:center;gap:5px;margin-bottom:3px;flex-wrap:wrap;}
  .tb{font-size:10px;font-weight:700;padding:2px 6px;border-radius:9px;}
  .cam-badge{font-size:9px;color:var(--c-text2);background:var(--c-bg-panel);padding:1px 6px;border-radius:9px;}
  .subl{font-size:10px;font-weight:600;color:#a5b4fc;background:rgba(99,102,241,.16);padding:2px 6px;border-radius:9px;}
  .bc,.bs{font-size:9px;font-weight:700;padding:1px 5px;border-radius:7px;text-transform:uppercase;} .bc{background:rgba(74,222,128,.14);color:#4ade80;} .bs{background:rgba(148,163,184,.16);color:#cbd5e1;}
  .esc{font-size:11px;font-weight:700;color:#4ade80;background:rgba(74,222,128,.12);border-radius:7px;padding:1px 5px;}
  .em{display:flex;gap:8px;flex-wrap:wrap;font-size:10px;color:var(--c-text3);} .em span{display:flex;align-items:center;gap:2px;} .em svg{width:9px;height:9px;}
  .desc{margin-top:4px;font-size:11px;color:var(--c-text2);line-height:1.45;background:var(--c-bg-panel);border-radius:7px;padding:5px 7px;}
  .eact{display:flex;flex-direction:row;align-items:center;gap:4px;flex-shrink:0;}
  .ico{width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:7px;color:var(--c-text2);cursor:pointer;}
  .ico svg{width:13px;height:13px;} .ico:hover{color:#93c5fd;border-color:var(--c-acc-bdr);}
  .ico.fav.on{color:#fbbf24;border-color:rgba(251,191,36,.4);background:rgba(251,191,36,.12);}

  /* ── events grid (recording-first view) ── */
  /* As many tiles as fit at a watchable width, so it works without JS measuring
     anything. It is the main view, so it keeps its own scroll instead of running
     the whole page long. */
  .ev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--evg-min,168px),1fr));gap:6px;padding:8px;overflow-y:auto;align-content:start;background:var(--c-bg-deep);}
  .card.mobile .ev-grid{--evg-min:132px;}
  .evg{position:relative;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:9px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;transition:box-shadow .15s,border-color .15s;}
  .evg:hover{border-color:var(--c-acc-bdr);box-shadow:0 0 0 1px var(--c-acc-bdr);}
  .evg-th{position:relative;aspect-ratio:16/9;background:#0d1520;overflow:hidden;}
  .evg-th img{width:100%;height:100%;object-fit:cover;display:block;}
  /* A clip plays, so it always advertises that with a play disc; a snapshot only
     shows one on hover, since tapping it merely opens the still. */
  .evg-play{position:absolute;inset:0;margin:auto;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;pointer-events:none;}
  .evg-play svg{width:16px;height:16px;margin-left:2px;}
  .evg:hover .evg-play{opacity:1;}
  .evg.has-clip .evg-play{opacity:.9;}
  .evg-dur{position:absolute;bottom:4px;right:4px;font-size:9px;font-weight:700;color:#fff;background:rgba(0,0,0,.68);border-radius:4px;padding:1px 4px;pointer-events:none;}
  /* When it was recorded, at a glance — no click needed. */
  .evg-time{position:absolute;top:4px;left:4px;font-size:9px;font-weight:700;color:#fff;background:rgba(0,0,0,.68);border-radius:4px;padding:1px 5px;pointer-events:none;letter-spacing:.02em;}
  .evg-btn{width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:6px;color:var(--c-text2);cursor:pointer;padding:0;flex-shrink:0;}
  .evg-btn svg{width:12px;height:12px;}
  .evg-btn:hover{color:#93c5fd;border-color:var(--c-acc-bdr);}
  .evg-bar{display:flex;align-items:center;gap:4px;padding:4px 5px;}
  .evg-bar .tb{font-size:9px;font-weight:700;padding:1px 5px;border-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0;max-width:52%;}
  /* The origin camera rides on the picture, opposite the clock, so the bar stays
     just the label and its two buttons however narrow the tile gets. */
  .evg-cam{position:absolute;top:4px;right:4px;max-width:62%;font-size:9px;font-weight:700;color:#fff;background:rgba(0,0,0,.68);border-radius:4px;padding:1px 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;letter-spacing:.02em;}
  .evg-sp{flex:1;}

  /* ── events album (events_only) ── */
  /* The grid is the whole card, so the card takes whatever height the dashboard
     gives it — a stretched Sections row, a fixed pixel height, a full screen —
     and the grid scrolls inside rather than the page growing. */
  .card.album{display:flex;flex-direction:column;height:var(--stream-h,100%);}
  .album-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px 8px;border-bottom:1px solid var(--c-border);flex-shrink:0;}
  .album-title{display:flex;align-items:baseline;gap:8px;min-width:0;}
  .album-count{font-size:11px;color:var(--c-text3);}
  .album-tools{display:flex;gap:4px;flex-shrink:0;}
  /* The grid keeps its natural row heights inside its own scroller; the rail
     beside it stretches to the same height and stays put. Making the grid
     itself the scroller collapses every row to min-content once there is more
     than a screen of them, because a fixed-height grid shrinks auto rows. */
  .album-body{flex:1;min-height:0;display:flex;}
  .album-scroll{flex:1;min-width:0;min-height:0;overflow-y:auto;}
  .card.album .ev-grid{overflow-y:visible;}
  /* viewer: the moment, over the wall, instead of dropping into the live camera */
  .album-viewer{position:absolute;inset:0;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;z-index:40;}
  .album-stage{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--c-text2);font-size:13px;}
  .album-stage video,.album-stage img.snap{width:100%;height:100%;object-fit:contain;background:#000;}
  .album-close{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(15,21,40,.85);border:1px solid rgba(255,255,255,.25);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:41;}
  .album-close svg{width:16px;height:16px;}
  .album-close:hover{background:rgba(239,68,68,.7);}
  .album-sub{font-size:11px;color:var(--c-text3);white-space:nowrap;}
  /* Save bar over the playing moment — the point of the album is to keep what
     you find, so the clip and the still are both one tap away. */
  .album-vtools{position:absolute;top:10px;left:10px;z-index:42;display:flex;align-items:center;gap:6px;max-width:70%;background:rgba(15,21,40,.82);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:4px 6px;}
  .album-vtxt{font-size:11px;font-weight:600;color:#e5e7eb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .album-vtools .tool{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15);color:#e5e7eb;flex-shrink:0;}
  .album-vtools .tool:hover{color:#fca5a5;border-color:rgba(239,68,68,.6);}

  /* ── heat rail ── */
  /* Vertical density strip beside the wall: reading top-to-bottom is newest to
     oldest, which mirrors the grid and Frigate's own timeline. */
  .album-heat{position:relative;width:54px;flex-shrink:0;background:var(--c-bg-deep);border-left:1px solid var(--c-border);overflow:hidden;cursor:pointer;}
  .heat-rows{position:absolute;inset:0;display:flex;flex-direction:column;}
  .heat-row{flex:1 1 0;min-height:0;position:relative;display:flex;align-items:center;justify-content:flex-end;padding-right:3px;}
  .heat-row:hover{background:rgba(255,255,255,.06);}
  .heat-bar{display:block;height:74%;min-height:2px;background:#ef4444;border-radius:1px;}
  .heat-row:hover .heat-bar{background:#f87171;}
  .heat-row.on{background:rgba(239,68,68,.18);}
  .heat-row.on .heat-bar{background:#fca5a5;}
  .heat-lbl{position:absolute;left:3px;transform:translateY(-50%);font-size:8px;line-height:1;color:var(--c-text3);background:var(--c-bg-deep);padding:1px 2px;border-radius:2px;pointer-events:none;white-space:nowrap;}
  .heat-now{position:absolute;left:0;right:0;border-top:1px solid #ef4444;pointer-events:none;}
  /* Days on the rail: the same line the strip draws, bolder than an hour tick. */
  .heat-day{position:absolute;left:0;right:0;height:1px;background:rgba(255,255,255,.3);pointer-events:none;}
  .heat-day-lbl{font-weight:700;color:var(--c-text2);}
  .evg.heat-target{outline:2px solid var(--c-acc-bdr);outline-offset:-2px;}

  /* ── recordings ── */
  .rec{display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:11px;margin-bottom:5px;cursor:pointer;}
  .rec:hover{background:rgba(255,255,255,.07);}
  .rec-th{width:64px;height:42px;border-radius:7px;overflow:hidden;flex-shrink:0;background:#0d1520;position:relative;}
  .rec-th img{width:100%;height:100%;object-fit:cover;display:block;}
  .ric{width:30px;height:30px;border-radius:7px;background:rgba(30,80,200,.25);color:#93c5fd;display:flex;align-items:center;justify-content:center;} .ric svg{width:14px;height:14px;}
  .rinf{flex:1;} .rt{font-size:12px;font-weight:600;color:var(--c-text);} .rsub{font-size:10px;color:var(--c-text3);margin-top:1px;} .rp{color:var(--c-on);}

  /* ── recording seek ── */
  .rec-seek-wrap{margin-top:7px;}
  .rec-seek-row{display:flex;align-items:center;gap:8px;}
  .rec-seek-bar{flex:1;height:4px;accent-color:var(--c-acc);cursor:pointer;}
  .rec-seek-lbl{font-size:10px;color:#93c5fd;white-space:nowrap;min-width:90px;}
  .seek-hint{color:var(--c-text4);font-size:9px;}

  /* ── reviews ── */
  .rev-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;font-size:11px;color:var(--c-text2);}
  .rev{display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--c-bg-panel);border:1px solid var(--c-border2);border-radius:11px;margin-bottom:5px;cursor:pointer;}
  .rev[data-review-open]:hover{background:rgba(255,255,255,.07);border-color:rgba(59,130,246,.25);}
  .rev-sev{width:4px;align-self:stretch;border-radius:3px;} .rev-sev.alert{background:#ef4444;} .rev-sev.detection{background:#f59e0b;}
  .rev-inf{flex:1;} .rev-t{font-size:12px;font-weight:600;color:var(--c-text);} .rev-m{font-size:10px;color:var(--c-text3);margin-top:1px;}
  .rev-th{width:56px;height:40px;border-radius:7px;overflow:hidden;flex-shrink:0;background:#0d1520;} .rev-th img{width:100%;height:100%;object-fit:cover;display:block;}

  /* ── toast ── */
  .toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99;background:rgba(15,21,40,.96);border:1px solid rgba(239,68,68,.4);color:#fca5a5;padding:8px 14px;border-radius:9px;font-size:12px;box-shadow:0 8px 24px rgba(0,0,0,.5);max-width:90%;}
  .diag{font-size:10px;color:#fca5a5;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:7px;padding:6px 8px;margin-bottom:7px;}

  /* ── recording viewer bottom overlay (controls + download) ── */
  .rec-dl-bar{position:absolute;bottom:0;left:0;right:0;display:flex;flex-direction:column;gap:5px;padding:8px 12px 6px;background:linear-gradient(transparent,rgba(0,0,0,.87));z-index:5;pointer-events:none;}
  .rec-dl-bar>*{pointer-events:all;}
  /* playback control row */
  .rec-ctl-row{display:flex;align-items:center;gap:8px;}
  .rec-pp-btn{background:rgba(255,255,255,.18);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:13px;line-height:1;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
  .rec-pp-btn:hover{background:rgba(255,255,255,.32);}
  /* It had no rule of its own at all, so its icon was laid out at the browser's
     default replaced size — a mute button the size of the whole bar. */
  .rec-mute-btn{background:rgba(255,255,255,.18);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:0;}
  .rec-mute-btn:hover{background:rgba(255,255,255,.32);}
  .rec-mute-btn.off{background:rgba(239,68,68,.55);color:#fff;}
  .rec-mute-btn svg{width:14px;height:14px;}
  .rec-ctl-time{font-size:11px;color:rgba(255,255,255,.9);white-space:nowrap;min-width:78px;text-align:center;}
  .rec-prog{flex:1;height:3px;accent-color:#3b82f6;cursor:pointer;background:rgba(255,255,255,.2);border-radius:2px;}
  /* download row */
  .rec-dl-row{display:flex;align-items:center;gap:8px;}
  .rec-dl-row span{flex:1;font-size:11px;color:rgba(255,255,255,.8);}
  .rec-dl-time{color:#93c5fd;font-weight:600;}
  .rec-dl-btn{padding:4px 11px;background:rgba(59,130,246,.45);border:1px solid rgba(59,130,246,.7);color:#fff;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;}
  .rec-dl-btn:hover{background:rgba(59,130,246,.75);}

  /* ── camera-only mode ── */
  /* The timeline is the one strip worth having next to the camera, so it is the
     only one the floating menu's timeline button can bring back (.tl-open). */
  .card.camera-only:not(.tl-open) .tl-sec,
  .card.camera-only .info-row,
  .card.camera-only .cam-switcher,
  .card.camera-only .latest,
  .card.camera-only .col-right {
    display: none !important;
  }
  /* The timeline under the camera is a choice, not a given: the button can put
     it there anywhere, and take it away anywhere. */
  .card.tl-open .tl-sec { display: block !important; }
  .card.tl-closed .tl-sec { display: none !important; }
  /* A narrow card in a fixed-height section clips its overflow, and the strip —
     being last — is what gets cut. Give the picture back exactly the height the
     strip takes, measured into --tl-h when it appears. Wide cards grow with
     their content, so they need none of this. */
  .card.tl-open:not(.wide) #eng-wrap { max-height: calc(var(--stream-h, none) - var(--tl-h, 0px)); }
  .card.camera-only .col-left { width: 100% !important; flex: 1 1 100% !important; }
  .card.camera-only #eng-wrap { border-radius: var(--ha-card-border-radius, 12px); }

  /* ── floating action menu / bar ── */
  /* Two pills, not one: a round handle, and beside it the column of actions.
     Keeping them apart is what lets the actions open without the handle moving
     an inch, and what keeps the column a plain column of icons. The wrapper is
     only a place to hang both from, so it takes no clicks of its own — a
     full-height strip of invisible clicks over the picture would be worse than
     anything the menu does. */
  .floating-menu {
    position: absolute;
    z-index: 15;
    display: flex;
    gap: 8px;
    align-items: center;
    pointer-events: none;
    opacity: 1;
    transition: opacity .25s ease;
  }
  .floating-menu > * { pointer-events: auto; }
  .float-actions {
    display: flex;
    flex-flow: column wrap;
    align-content: center;
    gap: 3px;
    max-height: 100%;
    padding: 5px;
    border-radius: 22px;
    background: rgba(var(--rgb-card-background-color, 15,23,42), 0.62);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.34);
    animation: floatOpen .16s ease;
  }
  @keyframes floatOpen { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }
  .floating-menu.collapsed .float-actions { display: none; }
  /* Collapsed is the handle alone. It is faint on purpose: it should read as part
     of the picture's edge, not as a control laid over the camera. */
  .floating-menu.collapsed .float-toggle {
    color: rgba(255, 255, 255, 0.6);
  }
  .floating-menu.collapsed .float-toggle:hover { color: #fff; }
  /* With a real pointer there is a hover to bring it back, so the handle can
     fade right out of the way. opacity:0 still takes clicks, so the spot works.
     Anywhere over the card brings it back, not just the strip it sits in. */
  @media (hover: hover) and (pointer: fine) {
    .floating-menu.collapsed { opacity: 0; }
    .card:hover .floating-menu.collapsed,
    .floating-menu.collapsed:focus-within { opacity: 1; }
  }
  /* Touch has no hover, so hiding it outright would also hide the way in. It
     stays faint instead, and brightens while pressed. */
  @media (hover: none) {
    .floating-menu.collapsed { opacity: .45; }
    .floating-menu.collapsed:active { opacity: 1; }
  }
  .floating-menu.pos-top { top: 10px; left: 50%; transform: translateX(-50%); }
  .floating-menu.pos-bottom { bottom: 12px; left: 50%; transform: translateX(-50%); }
  .floating-menu.pos-top-left { top: 10px; left: 10px; }
  .floating-menu.pos-top-right { top: 10px; right: 10px; }
  .floating-menu.pos-bottom-left { bottom: 12px; left: 10px; }
  .floating-menu.pos-bottom-right { bottom: 12px; right: 10px; }
  /* Side positions: the wrapper spans the picture, so the handle can sit on the
     middle of the edge and the actions can be as tall as the picture allows —
     wrapping into a second column rather than growing past the bottom, where the
     player would clip them. Only the pills take clicks, never the span. */
  .floating-menu.pos-left,
  .floating-menu.pos-right { top: 0; bottom: 0; }
  .floating-menu.pos-left { left: 6px; }
  /* The handle is the outermost thing on the edge: with the actions reversed the
     column opens inwards, into the picture, instead of off the side of it. */
  .floating-menu.pos-right { right: 6px; flex-direction: row-reverse; }
  /* A clip or recording is open: the back button owns the top-left corner, so
     anything anchored along the top drops below it rather than covering it. */
  .viewer-open .floating-menu.pos-top,
  .viewer-open .floating-menu.pos-top-left,
  .viewer-open .floating-menu.pos-top-right { top: 52px; }
  .viewer-open .floating-menu.pos-left,
  .viewer-open .floating-menu.pos-right { top: 44px; }

  .float-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.88);
    cursor: pointer;
    transition: background .15s ease, color .15s ease, box-shadow .15s ease;
    padding: 0;
  }
  .float-btn svg { width: 17px; height: 17px; }
  .float-btn:hover {
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
  }
  .float-btn.active {
    background: var(--c-acc);
    color: #fff;
    box-shadow: 0 0 10px var(--c-acc);
  }
  /* The handle: a pill of its own so it still reads as a button with the actions
     away, and the same size open or shut — the spot you pressed is the spot you
     press again. */
  .float-toggle {
    width: 34px;
    height: 34px;
    flex: 0 0 auto;
    background: rgba(var(--rgb-card-background-color, 15,23,42), 0.38);
    border: 1px solid rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.72);
  }
  .float-toggle:hover {
    background: rgba(var(--rgb-card-background-color, 15,23,42), 0.62);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  /* Open, the handle is pressed: it wears the accent, hover or not. */
  .float-toggle.active, .float-toggle.active:hover {
    background: var(--c-acc);
    border-color: transparent;
    box-shadow: 0 0 10px var(--c-acc);
    color: #fff;
  }

  /* ── PTZ overlay controls ── */
  /* No panel behind the pad: the buttons float straight on the picture, with a
     drop shadow to stay legible over whatever the camera is looking at. */
  .ptz-overlay {
    position: absolute;
    z-index: 14;
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .ptz-overlay.pos-bottom-right { bottom: 50px; right: 8px; }
  .ptz-overlay.pos-bottom-left  { bottom: 50px; left: 8px; }
  .ptz-overlay.pos-bottom       { bottom: 50px; left: 50%; transform: translateX(-50%); }
  .ptz-overlay.pos-top-right    { top: 8px; right: 8px; }
  .ptz-overlay.pos-top-left     { top: 8px; left: 8px; }
  .ptz-overlay.pos-top          { top: 8px; left: 50%; transform: translateX(-50%); }
  .ptz-overlay.pos-right        { top: 50%; right: 8px; transform: translateY(-50%); }
  .ptz-overlay.pos-left         { top: 50%; left: 8px; transform: translateY(-50%); }
  .ptz-dpad {
    display: grid;
    grid-template-columns: repeat(3, 30px);
    grid-template-rows: repeat(3, 30px);
    gap: 3px;
    align-items: center;
    justify-items: center;
  }
  .ptz-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* Same treatment as the floating menu's buttons, so the two read as one
       control layer instead of a dark slab sitting over the picture. */
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .15s ease, color .15s ease, border-color .15s ease, transform .12s ease;
    padding: 0;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.85));
  }
  .ptz-btn svg { width: 16px; height: 16px; }
  .ptz-btn:hover { background: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.24); color: #fff; }
  .ptz-btn:active { transform: scale(0.9); }
  .ptz-zoom-row {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }
  .ptz-zoom-lvl {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.88);
    min-width: 34px;
    text-align: center;
    padding: 2px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.14);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
  }

  /* ── Modal overlay for events/recordings in camera-only or floating mode ── */
  .modal-overlay {
    position: absolute;
    inset: 0;
    z-index: 25;
    background: rgba(10, 15, 26, 0.82);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    flex-direction: column;
    animation: fsIn .2s ease;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid var(--c-border);
    background: rgba(255, 255, 255, 0.03);
  }
  .modal-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--c-text);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .modal-close-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--c-border2);
    color: var(--c-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .modal-close-btn svg { width: 14px; height: 14px; }
  .modal-close-btn:hover { background: rgba(239, 68, 68, 0.6); color: #fff; }
  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }

`;

// ── editor ───────────────────────────────────────────────────

// go2rtc-player.js — vendored, unmodified go2rtc example player.
// Source: https://github.com/AlexxIT/go2rtc/blob/master/www/video-rtc.js
// Copyright (c) Alexey Khit — MIT License: https://github.com/AlexxIT/go2rtc/blob/master/LICENSE
// Kept verbatim (aside from stripping the `export` keyword for bundling) so
// upstream fixes/updates can be dropped in without re-deriving anything.

/**
 * VideoRTC v1.6.0 - Video player for go2rtc streaming application.
 *
 * All modern web technologies are supported in almost any browser except Apple Safari.
 *
 * Support:
 * - ECMAScript 2017 (ES8) = ES6 + async
 * - RTCPeerConnection for Safari iOS 11.0+
 * - IntersectionObserver for Safari iOS 12.2+
 * - ManagedMediaSource for Safari 17+
 *
 * Doesn't support:
 * - MediaSource for Safari iOS
 * - Customized built-in elements (extends HTMLVideoElement) because Safari
 * - Autoplay for WebRTC in Safari
 */
class VideoRTC extends HTMLElement {
    constructor() {
        super();

        this.DISCONNECT_TIMEOUT = 5000;
        this.RECONNECT_TIMEOUT = 15000;

        this.CODECS = [
            'avc1.640029',      // H.264 high 4.1 (Chromecast 1st and 2nd Gen)
            'avc1.64002A',      // H.264 high 4.2 (Chromecast 3rd Gen)
            'avc1.640033',      // H.264 high 5.1 (Chromecast with Google TV)
            'hvc1.1.6.L153.B0', // H.265 main 5.1 (Chromecast Ultra)
            'mp4a.40.2',        // AAC LC
            'mp4a.40.5',        // AAC HE
            'flac',             // FLAC (PCM compatible)
            'opus',             // OPUS Chrome, Firefox
        ];

        /**
         * [config] Supported modes (webrtc, webrtc/tcp, mse, hls, mp4, mjpeg).
         * @type {string}
         */
        this.mode = 'webrtc,mse,hls,mjpeg';

        /**
         * [Config] Requested medias (video, audio, microphone).
         * @type {string}
         */
        this.media = 'video,audio';

        /**
         * [config] Run stream when not displayed on the screen. Default `false`.
         * @type {boolean}
         */
        this.background = false;

        /**
         * [config] Run stream only when player in the viewport. Stop when user scroll out player.
         * Value is percentage of visibility from `0` (not visible) to `1` (full visible).
         * Default `0` - disable;
         * @type {number}
         */
        this.visibilityThreshold = 0;

        /**
         * [config] Run stream only when browser page on the screen. Stop when user change browser
         * tab or minimise browser windows.
         * @type {boolean}
         */
        this.visibilityCheck = true;

        /**
         * [config] WebRTC configuration
         * @type {RTCConfiguration}
         */
        this.pcConfig = {
            bundlePolicy: 'max-bundle',
            iceServers: [{urls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302']}],
            sdpSemantics: 'unified-plan',  // important for Chromecast 1
        };

        /**
         * [info] WebSocket connection state. Values: CONNECTING, OPEN, CLOSED
         * @type {number}
         */
        this.wsState = WebSocket.CLOSED;

        /**
         * [info] WebRTC connection state.
         * @type {number}
         */
        this.pcState = WebSocket.CLOSED;

        /**
         * @type {HTMLVideoElement}
         */
        this.video = null;

        /**
         * @type {WebSocket}
         */
        this.ws = null;

        /**
         * @type {string|URL}
         */
        this.wsURL = '';

        /**
         * @type {RTCPeerConnection}
         */
        this.pc = null;

        /**
         * @type {number}
         */
        this.connectTS = 0;

        /**
         * @type {string}
         */
        this.mseCodecs = '';

        /**
         * [internal] Disconnect TimeoutID.
         * @type {number}
         */
        this.disconnectTID = 0;

        /**
         * [internal] Reconnect TimeoutID.
         * @type {number}
         */
        this.reconnectTID = 0;

        /**
         * [internal] Handler for receiving Binary from WebSocket.
         * @type {Function}
         */
        this.ondata = null;

        /**
         * [internal] Handlers list for receiving JSON from WebSocket.
         * @type {Object.<string,Function>}
         */
        this.onmessage = null;
    }

    /**
     * Set video source (WebSocket URL). Support relative path.
     * @param {string|URL} value
     */
    set src(value) {
        if (typeof value !== 'string') value = value.toString();
        if (value.startsWith('http')) {
            value = 'ws' + value.substring(4);
        } else if (value.startsWith('/')) {
            value = 'ws' + location.origin.substring(4) + value;
        }

        this.wsURL = value;

        this.onconnect();
    }

    /**
     * Play video. Support automute when autoplay blocked.
     * https://developer.chrome.com/blog/autoplay/
     */
    play() {
        this.video.play().catch(() => {
            if (!this.video.muted) {
                this.video.muted = true;
                this.video.play().catch(er => {
                    console.warn(er);
                });
            }
        });
    }

    /**
     * Send message to server via WebSocket
     * @param {Object} value
     */
    send(value) {
        if (this.ws) this.ws.send(JSON.stringify(value));
    }

    /** @param {Function} isSupported */
    codecs(isSupported) {
        return this.CODECS
            .filter(codec => this.media.includes(codec.includes('vc1') ? 'video' : 'audio'))
            .filter(codec => isSupported(`video/mp4; codecs="${codec}"`)).join();
    }

    /**
     * `CustomElement`. Invoked each time the custom element is appended into a
     * document-connected element.
     */
    connectedCallback() {
        if (this.disconnectTID) {
            clearTimeout(this.disconnectTID);
            this.disconnectTID = 0;
        }

        // because video autopause on disconnected from DOM
        if (this.video) {
            const seek = this.video.seekable;
            if (seek.length > 0) {
                this.video.currentTime = seek.end(seek.length - 1);
            }
            this.play();
        } else {
            this.oninit();
        }

        this.onconnect();
    }

    /**
     * `CustomElement`. Invoked each time the custom element is disconnected from the
     * document's DOM.
     */
    disconnectedCallback() {
        if (this.background || this.disconnectTID) return;
        if (this.wsState === WebSocket.CLOSED && this.pcState === WebSocket.CLOSED) return;

        this.disconnectTID = setTimeout(() => {
            if (this.reconnectTID) {
                clearTimeout(this.reconnectTID);
                this.reconnectTID = 0;
            }

            this.disconnectTID = 0;

            this.ondisconnect();
        }, this.DISCONNECT_TIMEOUT);
    }

    /**
     * Creates child DOM elements. Called automatically once on `connectedCallback`.
     */
    oninit() {
        this.video = document.createElement('video');
        this.video.controls = true;
        this.video.playsInline = true;
        this.video.preload = 'auto';

        this.video.style.display = 'block'; // fix bottom margin 4px
        this.video.style.width = '100%';
        this.video.style.height = '100%';

        this.appendChild(this.video);

        this.video.addEventListener('error', ev => {
            // No source at all means *we* took the video down: ondisconnect()
            // clears src before the browser gets round to reporting the load it
            // aborted, so this arrives as MEDIA_ERR_SRC_NOT_SUPPORTED with
            // "Empty src attribute". Logging that reads like a stream failure,
            // and closing the socket here killed the connection a reconnect had
            // just opened (visibilitychange does exactly that on every tab
            // switch). A real decode failure always has a source behind it.
            if (!ev.target.getAttribute('src') && !ev.target.srcObject) return;
            const err = this.video.error;
            // https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
            const MEDIA_ERRORS = {
                1: 'MEDIA_ERR_ABORTED',
                2: 'MEDIA_ERR_NETWORK',
                3: 'MEDIA_ERR_DECODE',
                4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
            };
            console.error('[VideoRTC] Video error:', {
                error: err ? MEDIA_ERRORS[err.code] : 'unknown',
                message: err ? err.message : 'unknown',
                codecs: this.mseCodecs || 'not set',
                readyState: this.video.readyState,
                networkState: this.video.networkState,
                currentTime: this.video.currentTime
            });
            if (this.ws) this.ws.close(); // run reconnect for broken MSE stream
        });

        // all Safari lies about supported audio codecs
        const m = window.navigator.userAgent.match(/Version\/(\d+).+Safari/);
        if (m) {
            // AAC from v13, FLAC from v14, OPUS - unsupported
            const skip = m[1] < '13' ? 'mp4a.40.2' : m[1] < '14' ? 'flac' : 'opus';
            this.CODECS.splice(this.CODECS.indexOf(skip));
        }

        if (this.background) return;

        if ('hidden' in document && this.visibilityCheck) {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.disconnectedCallback();
                } else if (this.isConnected) {
                    this.connectedCallback();
                }
            });
        }

        if ('IntersectionObserver' in window && this.visibilityThreshold) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        this.disconnectedCallback();
                    } else if (this.isConnected) {
                        this.connectedCallback();
                    }
                });
            }, {threshold: this.visibilityThreshold});
            observer.observe(this);
        }
    }

    /**
     * Connect to WebSocket. Called automatically on `connectedCallback`.
     * @return {boolean} true if the connection has started.
     */
    onconnect() {
        if (!this.isConnected || !this.wsURL || this.ws || this.pc) return false;

        // CLOSED or CONNECTING => CONNECTING
        this.wsState = WebSocket.CONNECTING;

        this.connectTS = Date.now();

        this.ws = new WebSocket(this.wsURL);
        this.ws.binaryType = 'arraybuffer';
        this.ws.addEventListener('open', () => this.onopen());
        this.ws.addEventListener('close', () => this.onclose());

        return true;
    }

    ondisconnect() {
        this.wsState = WebSocket.CLOSED;
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        this.pcState = WebSocket.CLOSED;
        if (this.pc) {
            this.pc.getSenders().forEach(sender => {
                if (sender.track) sender.track.stop();
            });
            this.pc.close();
            this.pc = null;
        }

        this.video.src = '';
        this.video.srcObject = null;
    }

    /**
     * @returns {Array.<string>} of modes (mse, webrtc, etc.)
     */
    onopen() {
        // CONNECTING => OPEN
        this.wsState = WebSocket.OPEN;

        this.ws.addEventListener('message', ev => {
            if (typeof ev.data === 'string') {
                const msg = JSON.parse(ev.data);
                for (const mode in this.onmessage) {
                    this.onmessage[mode](msg);
                }
            } else {
                this.ondata(ev.data);
            }
        });

        this.ondata = null;
        this.onmessage = {};

        const modes = [];

        if (this.mode.includes('mse') && ('MediaSource' in window || 'ManagedMediaSource' in window)) {
            modes.push('mse');
            this.onmse();
        } else if (this.mode.includes('hls') && this.video.canPlayType('application/vnd.apple.mpegurl')) {
            modes.push('hls');
            this.onhls();
        } else if (this.mode.includes('mp4')) {
            modes.push('mp4');
            this.onmp4();
        }

        if (this.mode.includes('webrtc') && 'RTCPeerConnection' in window) {
            modes.push('webrtc');
            this.onwebrtc();
        }

        if (this.mode.includes('mjpeg')) {
            if (modes.length) {
                this.onmessage['mjpeg'] = msg => {
                    if (msg.type !== 'error' || msg.value.indexOf(modes[0]) !== 0) return;
                    this.onmjpeg();
                };
            } else {
                modes.push('mjpeg');
                this.onmjpeg();
            }
        }

        return modes;
    }

    /**
     * @return {boolean} true if reconnection has started.
     */
    onclose() {
        if (this.wsState === WebSocket.CLOSED) return false;

        // CONNECTING, OPEN => CONNECTING
        this.wsState = WebSocket.CONNECTING;
        this.ws = null;

        // reconnect no more than once every X seconds
        const delay = Math.max(this.RECONNECT_TIMEOUT - (Date.now() - this.connectTS), 0);

        this.reconnectTID = setTimeout(() => {
            this.reconnectTID = 0;
            this.onconnect();
        }, delay);

        return true;
    }

    onmse() {
        /** @type {MediaSource} */
        let ms;

        if ('ManagedMediaSource' in window) {
            const MediaSource = window.ManagedMediaSource;

            ms = new MediaSource();
            ms.addEventListener('sourceopen', () => {
                this.send({type: 'mse', value: this.codecs(MediaSource.isTypeSupported)});
            }, {once: true});

            this.video.disableRemotePlayback = true;
            this.video.srcObject = ms;
        } else {
            ms = new MediaSource();
            ms.addEventListener('sourceopen', () => {
                URL.revokeObjectURL(this.video.src);
                this.send({type: 'mse', value: this.codecs(MediaSource.isTypeSupported)});
            }, {once: true});

            this.video.src = URL.createObjectURL(ms);
            this.video.srcObject = null;
        }

        this.play();

        this.mseCodecs = '';

        this.onmessage['mse'] = msg => {
            if (msg.type !== 'mse') return;

            this.mseCodecs = msg.value;

            const sb = ms.addSourceBuffer(msg.value);
            sb.mode = 'segments'; // segments or sequence
            sb.addEventListener('updateend', () => {
                if (!sb.updating && bufLen > 0) {
                    try {
                        const data = buf.slice(0, bufLen);
                        sb.appendBuffer(data);
                        bufLen = 0;
                    } catch (e) {
                        // console.debug(e);
                    }
                }

                if (!sb.updating && sb.buffered && sb.buffered.length) {
                    const end = sb.buffered.end(sb.buffered.length - 1);
                    const start = end - 5;
                    const start0 = sb.buffered.start(0);
                    if (start > start0) {
                        sb.remove(start0, start);
                        ms.setLiveSeekableRange(start, end);
                    }
                    if (this.video.currentTime < start) {
                        this.video.currentTime = start;
                    }
                    const gap = end - this.video.currentTime;
                    this.video.playbackRate = gap > 0.1 ? gap : 0.1;
                    // console.debug('VideoRTC.buffered', gap, this.video.playbackRate, this.video.readyState);
                }
            });

            const buf = new Uint8Array(2 * 1024 * 1024);
            let bufLen = 0;

            this.ondata = data => {
                if (sb.updating || bufLen > 0) {
                    const b = new Uint8Array(data);
                    buf.set(b, bufLen);
                    bufLen += b.byteLength;
                    // console.debug('VideoRTC.buffer', b.byteLength, bufLen);
                } else {
                    try {
                        sb.appendBuffer(data);
                    } catch (e) {
                        // console.debug(e);
                    }
                }
            };
        };
    }

    onwebrtc() {
        const pc = new RTCPeerConnection(this.pcConfig);

        pc.addEventListener('icecandidate', ev => {
            if (ev.candidate && this.mode.includes('webrtc/tcp') && ev.candidate.protocol === 'udp') return;

            const candidate = ev.candidate ? ev.candidate.toJSON().candidate : '';
            this.send({type: 'webrtc/candidate', value: candidate});
        });

        pc.addEventListener('connectionstatechange', () => {
            if (pc.connectionState === 'connected') {
                const tracks = pc.getTransceivers()
                    .filter(tr => tr.currentDirection === 'recvonly') // skip inactive
                    .map(tr => tr.receiver.track);
                /** @type {HTMLVideoElement} */
                const video2 = document.createElement('video');
                video2.addEventListener('loadeddata', () => this.onpcvideo(video2), {once: true});
                video2.srcObject = new MediaStream(tracks);
            } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
                pc.close(); // stop next events

                this.pcState = WebSocket.CLOSED;
                this.pc = null;

                this.onconnect();
            }
        });

        this.onmessage['webrtc'] = msg => {
            switch (msg.type) {
                case 'webrtc/candidate':
                    if (this.mode.includes('webrtc/tcp') && msg.value.includes(' udp ')) return;

                    pc.addIceCandidate({candidate: msg.value, sdpMid: '0'}).catch(er => {
                        console.warn(er);
                    });
                    break;
                case 'webrtc/answer':
                    pc.setRemoteDescription({type: 'answer', sdp: msg.value}).catch(er => {
                        console.warn(er);
                    });
                    break;
                case 'error':
                    if (!msg.value.includes('webrtc/offer')) return;
                    pc.close();
            }
        };

        this.createOffer(pc).then(offer => {
            this.send({type: 'webrtc/offer', value: offer.sdp});
        });

        this.pcState = WebSocket.CONNECTING;
        this.pc = pc;
    }

    /**
     * @param pc {RTCPeerConnection}
     * @return {Promise<RTCSessionDescriptionInit>}
     */
    async createOffer(pc) {
        try {
            if (this.media.includes('microphone')) {
                const media = await navigator.mediaDevices.getUserMedia({audio: true});
                media.getTracks().forEach(track => {
                    pc.addTransceiver(track, {direction: 'sendonly'});
                });
            }
        } catch (e) {
            console.warn(e);
        }

        for (const kind of ['video', 'audio']) {
            if (this.media.includes(kind)) {
                pc.addTransceiver(kind, {direction: 'recvonly'});
            }
        }

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        return offer;
    }

    /**
     * @param video2 {HTMLVideoElement}
     */
    onpcvideo(video2) {
        if (this.pc) {
            // Video+Audio > Video, H265 > H264, Video > Audio, WebRTC > MSE
            let rtcPriority = 0, msePriority = 0;

            /** @type {MediaStream} */
            const stream = video2.srcObject;
            if (stream.getVideoTracks().length > 0) {
                // not the best, but a pretty simple way to check a codec
                const isH265Supported =  this.pc.remoteDescription.sdp.includes('H265/90000');
                rtcPriority += isH265Supported ? 0x240 : 0x220;
            }
            if (stream.getAudioTracks().length > 0) rtcPriority += 0x102;

            if (this.mseCodecs.includes('hvc1.')) msePriority += 0x230;
            if (this.mseCodecs.includes('avc1.')) msePriority += 0x210;
            if (this.mseCodecs.includes('mp4a.')) msePriority += 0x101;

            if (rtcPriority >= msePriority) {
                this.video.srcObject = stream;
                this.play();

                this.pcState = WebSocket.OPEN;

                this.wsState = WebSocket.CLOSED;
                if (this.ws) {
                    this.ws.close();
                    this.ws = null;
                }
            } else {
                this.pcState = WebSocket.CLOSED;
                if (this.pc) {
                    this.pc.close();
                    this.pc = null;
                }
            }
        }

        video2.srcObject = null;
    }

    onmjpeg() {
        this.ondata = data => {
            this.video.controls = false;
            this.video.poster = 'data:image/jpeg;base64,' + VideoRTC.btoa(data);
        };

        this.send({type: 'mjpeg'});
    }

    onhls() {
        this.onmessage['hls'] = msg => {
            if (msg.type !== 'hls') return;

            const url = 'http' + this.wsURL.substring(2, this.wsURL.indexOf('/ws')) + '/hls/';
            const playlist = msg.value.replace('hls/', url);
            this.video.src = 'data:application/vnd.apple.mpegurl;base64,' + btoa(playlist);
            this.play();
        };

        this.send({type: 'hls', value: this.codecs(type => this.video.canPlayType(type))});
    }

    onmp4() {
        /** @type {HTMLCanvasElement} **/
        const canvas = document.createElement('canvas');
        /** @type {CanvasRenderingContext2D} */
        let context;

        /** @type {HTMLVideoElement} */
        const video2 = document.createElement('video');
        video2.autoplay = true;
        video2.playsInline = true;
        video2.muted = true;

        video2.addEventListener('loadeddata', () => {
            if (!context) {
                canvas.width = video2.videoWidth;
                canvas.height = video2.videoHeight;
                context = canvas.getContext('2d');
            }

            context.drawImage(video2, 0, 0, canvas.width, canvas.height);

            this.video.controls = false;
            this.video.poster = canvas.toDataURL('image/jpeg');
        });

        this.ondata = data => {
            video2.src = 'data:video/mp4;base64,' + VideoRTC.btoa(data);
        };

        this.send({type: 'mp4', value: this.codecs(this.video.canPlayType)});
    }

    static btoa(buffer) {
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        let binary = '';
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

if (!customElements.get('frigate-go2rtc-player')) customElements.define('frigate-go2rtc-player', VideoRTC);

// card.js — main FrigateModernHassCard custom element

class FrigateModernHassCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode:'open' });
    this._hass = null; this._config = null; this._started = false;
    this._activeCamIdx = 0;
    this._camCache = {};     // entity → mkCamState()
    this._viewMode = 'single';   // 'single' | 'grid'
    this._eventsMode = 'camera'; // 'camera' | 'all'
    // active display data
    this._events = []; this._recordings = []; this._reviews = []; this._kept = [];
    // UI
    this._tab = 'live'; this._playing = null;
    this._browseOpen = false;
    this._eventsCollapsed = false; // wide layout only; narrow uses the browse toggle
    this._winEnd = 0; this._winStart = 0;
    // Where the pointer is on the timeline strip, as a fraction of the view, or
    // null when it is not over it. Kept so the line survives a redraw.
    this._tlHover = null;
    this._tlMag = null;      // the window to put back after a hover magnify
    this._tlAnim = null;     // the frame handle while that magnify is animating
    this._tlAnimating = false;
    // What has actually been fetched. The view above is a window on this, so the
    // timeline can zoom in close to now without shrinking the events list.
    this._dataStart = 0; this._dataEnd = 0;
    this._loading = false; this._exhausted = false;
    this._daysWithActivity = new Set();
    this._filterLabel = 'all'; this._filterZone = 'all'; this._favOnly = false;
    this._calMonth = null;
    this._selDay = null;   // calendar day the window was pinned to; null = rolling window
    this._engine = null; this._unsub = null;
    this._rotateTimer = null; this._cardWidth = 0;
    this._playSeq = 0;
    this._mountingEngine = false; // guards against mounting the live player twice
    this._booting = false;        // true while _start() is still running
    this._liveRetries = 0;        // HLS no-picture remount attempts (reset on a frame)
    this._streamMuted = true; // initial live-view mute state; never changed after mount (see _mountEngine)
    this._domCache = {}; // querySelector result cache — cleared on re-render
    this._ptzOpen = false;
    this._modalOpen = false;
    this._modalTab = null;
    this._zoomScale = 1;
    this._panTx = 0;
    this._panTy = 0;
    this._ptzLastPt = null;   // last pointer position inside the picture (layout coords)
    this._wheelT = 0;         // clears the wheel's "no transition" class
    this._menuOpen = false;  // floating menu starts collapsed: just its button, clear of the video
    this._rate = 1;          // playback rate of whatever the viewer has open
    this._feedVid = null;    // the viewer video the rate belongs to
    this._liveWasMuted = null; // live volume to hand back after the viewer closes
    this._poster = null;     // camera still held as the player's own poster
    this._lastNudge = 0;     // debounce for rebuilds triggered by wake-ups
    this._engineTS = 0;      // when the current player was mounted
    this._lang = 'en';       // UI language, from Home Assistant (see i18n.js)
    this._locale = 'en';     // exact tag Intl wants, e.g. pt-BR
    this._renderLang = null; // language the shell was last drawn in
  }

  // Every string the user reads goes through here, so the card speaks whatever
  // language Home Assistant is set to (falling back to English).
  _t(key, vars) { return translate(this._lang, key, vars); }

  static getConfigElement() { return document.createElement(CARD_TAG+'-editor'); }
  static getStubConfig() { return { camera_entity:'camera.front_door' }; }

  setConfig(config) {
    let cameras;
    if (config.cameras && Array.isArray(config.cameras) && config.cameras.length)
      cameras = config.cameras.map(c => ({ entity:c.entity, name:c.name||null, span:normSpan(c.span) }));
    else if (config.camera_entity)
      cameras = [{ entity:config.camera_entity, name:config.title||null, span:normSpan() }];
    else throw new Error('camera_entity or cameras[] required');

    this._config = {
      cameras,
      title: config.title || null,
      subtitle: config.subtitle || null,
      window_hours: config.window_hours || 24,
      // How much history the timeline itself shows, in hours. The timeline used
      // to open on the whole window, which on a default card is a day — read as
      // one wide smear in which nothing could be picked out. The events list
      // still holds the full window; this only decides the opening view, and
      // Ctrl+wheel (or a pinch) zooms it from there.
      timeline_hours: Math.min(config.timeline_hours || 2, config.window_hours || 24),
      // What the timeline draws: event ticks, or the recording bars that can be
      // clicked to play from that moment. One at a time, because together the
      // ticks sit on top of the only thing that makes a bar clickable.
      timeline_mode: config.timeline_mode === 'recordings' ? 'recordings' : 'events',
      refresh_seconds: Math.max(15, config.refresh_seconds || 45),
      browse_expanded: config.browse_expanded === true,
      rotate_seconds: config.rotate_seconds ?? 0,
      rotate_on_load: config.rotate_on_load === true,
      default_view: config.default_view === 'grid' ? 'grid' : 'single',
      hidden_tabs: Array.isArray(config.hidden_tabs) ? config.hidden_tabs : [],
      stream_height: config.stream_height ? Number(config.stream_height) : null,
      theme: ['light','dark','auto'].includes(config.theme) ? config.theme : 'auto',
      accent_color: config.accent_color || null,
      bg_color: config.bg_color || null,
      // Live view source. 'go2rtc' streams via Frigate's built-in go2rtc
      // (WebRTC/MSE) for much lower latency; it falls back to the standard
      // Home Assistant stream if it can't connect.
      // Start with the events panel slid away, for a camera-first dashboard.
      events_collapsed: config.events_collapsed === true,
      // A named layout from GRID_LAYOUTS. It sets the column count and the tile
      // sizes together, so it overrides grid_columns and any per-camera span.
      grid_layout: findLayout(config.grid_layout) ? config.grid_layout : 'auto',
      // Grid columns: 'auto' works one out from the camera count, or pin a
      // number. 1 stacks the cameras vertically.
      grid_columns: (config.grid_columns === undefined || config.grid_columns === 'auto')
        ? 'auto' : Math.max(1, Math.min(6, Number(config.grid_columns) || 1)),
      // Logs why the live view chose what it chose. Off unless asked for, so it
      // can stay in the code rather than being bolted on during every hunt.
      debug: config.debug === true,
      // A grid on a phone is a row of pictures too small to see anything in, so
      // it stacks by default. Off is for the deliberate case: two cameras side
      // by side, or a small grid as an overview.
      stack_on_mobile: config.stack_on_mobile !== false,
      // Escape hatch for the width at which a column is dropped. Not in the
      // editor: the stacking question is the one people actually have, and this
      // is the answer to a rarer one.
      min_tile_width: config.min_tile_width ? Math.max(80, Number(config.min_tile_width)) : null,
      live_provider: config.live_provider === 'go2rtc' ? 'go2rtc' : 'hls',
      // Which go2rtc transport to use. Defaults to 'mse': WebRTC media does not
      // travel through Home Assistant's proxy — it connects straight to
      // go2rtc's own port, which generally only resolves on the local network,
      // so remotely and in the companion apps it just hangs in CONNECTING
      // forever while MSE quietly carries the stream anyway. 'webrtc' is there
      // for local setups that want the lowest possible latency; 'auto' leaves
      // the choice to the player (it tries WebRTC first).
      go2rtc_mode: ['auto','webrtc','mse'].includes(config.go2rtc_mode) ? config.go2rtc_mode : 'mse',
      camera_only: config.camera_only === true,
      // Whether the events timeline sits under the live camera. 'auto' (the
      // default) keeps the card's own rule: shown in the full card, hidden in
      // camera-only mode, where the floating menu's timeline button is what
      // brings it back.
      timeline: typeof config.timeline === 'boolean' ? config.timeline : 'auto',
      // The album: the card is nothing but a grid of recorded moments — every
      // camera's clips and snapshots — with no live feed and no camera controls.
      events_only: config.events_only === true,
      // How many events the album (and the all-cameras grid) asks for per
      // camera. The camera's own list keeps its small page and scrolls for more,
      // but the album is a browsable wall, so 20 was cutting it off mid-day.
      events_limit: Number.isFinite(+config.events_limit) && +config.events_limit > 0 ? Math.min(2000, Math.floor(+config.events_limit)) : 300,
      floating_menu: config.floating_menu !== false, // default true when camera_only or configurable
      // 'right' by default: the native video controls sit along the bottom of
      // the player, and a top menu covered the back button once a clip was open.
      // A side menu keeps clear of both. Any of the eight positions still works.
      menu_position: OVERLAY_POSITIONS.includes(config.menu_position) ? config.menu_position : 'right',
      ptz: config.ptz !== false,
      // Where the PTZ pad sits. Defaults to the bottom-right corner, over the
      // picture but clear of both the middle of the frame and the action menu.
      ptz_position: OVERLAY_POSITIONS.includes(config.ptz_position) ? config.ptz_position : 'bottom-right',
    };
    this._browseOpen = this._config.browse_expanded;
    this._eventsCollapsed = this._config.events_collapsed;
    this._timelineOpen = this._config.timeline;
    this._tlMode = this._config.timeline_mode;
    for (const c of cameras) { if (!this._camCache[c.entity]) this._camCache[c.entity] = mkCamState(); }
    this._renderShell();
  }

  set hass(hass) {
    this._hass = hass;
    const lang = pickLang(hass);
    const langChanged = lang !== this._lang;
    this._lang = lang;
    this._locale = pickLocale(hass);
    if (!this._config) return;
    // Home Assistant calls setConfig before it hands us hass, so the first shell
    // is drawn before we know the language. Redraw it once we do — the live
    // player has not started yet, so nothing is torn down. A later change means
    // the user switched language, which reloads the frontend anyway.
    if (langChanged && !this._started && this._renderLang !== lang) this._renderShell();
    if (!this._started) { this._started = true; this._start(); return; }
    // keep active stream in sync
    if (this._engine) {
      try { this._engine.hass = hass; } catch(_) {}
      // Only update stateObj when entity state actually changes (e.g. offline→online).
      // Resetting stateObj on every hass update restarts the stream and resets muted state.
      const ent = this._activeCam?.entity;
      const newState = hass.states[ent]?.state;
      if (ent && newState !== this._lastEngineState) {
        const wasOffline = this._lastEngineState === 'unavailable';
        this._lastEngineState = newState;
        if ('stateObj' in this._engine) {
          try { this._engine.stateObj = this._hlsStateObj(ent); } catch(_) {}
        }
        // A camera that was still coming up when the card mounted failed its
        // first stream request and, with the entity id unchanged, never asks
        // again. Only a camera coming back from unavailable is worth acting on:
        // idle↔recording flips constantly and would otherwise interrupt a
        // stream that is merely still connecting, and would also keep refilling
        // the watchdog's retry budget so a genuinely dead stream never settled.
        if (wasOffline && newState !== 'unavailable') {
          this._liveRetries = 0;
          this._nudgeLive();
        }
      }
    }
    this._syncStatus();
    if (this._config.theme === 'auto') this._applyCardStyle(); // re-evaluate HA dark mode
    // A camera that was not in the states map yet when the card started never got
    // its player mounted. Try again now that the entity exists.
    this._maybeMountEngine();
  }

  get _activeCam() { return this._config?.cameras[this._activeCamIdx] || this._config?.cameras[0]; }
  getCardSize() { return 10; }
  // HA Sections grid: default to 2 columns × 3 rows so the card is a sensible size.
  // Users can override in their dashboard yaml via grid_options.
  getGridSize() { return { columns: 2, rows: 3 }; }

  disconnectedCallback() {
    this._stopRotate();
    this._unwireWakeups();
    if (this._scrubWin) {
      window.removeEventListener('mousemove', this._scrubWin.mv);
      window.removeEventListener('mouseup', this._scrubWin.up);
      this._scrubWin = null;
    }
    if (this._pinchWin) {
      window.removeEventListener('mousemove', this._pinchWin.mv);
      window.removeEventListener('mouseup', this._pinchWin.up);
      this._pinchWin = null;
    }
    clearTimeout(this._wheelT);
    if (this._refresh) clearInterval(this._refresh);
    if (this._unsub) { try { this._unsub.then(u=>u&&u()); } catch(_) {} this._unsub=null; }
    if (this._ro) this._ro.disconnect();
    this._revokeClipBlob();
    // Dropping back to a dashboard and returning leaves the card detached. Forget
    // the mounted player (and any pending mount) so the hass setter's retry builds
    // a fresh one instead of trusting a stale, detached element.
    this._engine = null;
    this._mountingEngine = false;
    this._liveRetries = 0; // a fresh mount gets its own retry budget
    this._teardownGo2rtc();
    this._teardownGridGo2rtc();
  }

  // ── init ─────────────────────────────────────────────────
  async _start() {
    this._booting = true;
    this._liveRetries = 0;
    // Before any awaits: the layout classes decide the stream's size, and
    // without them the card renders 16:9 across its full width — briefly
    // enormous on a wide dashboard.
    this._setupResizeObserver();
    // A dashboard opens in a background tab, the browser suspends the stream,
    // and coming back to it used to need a full page reload. Retry when the tab
    // is shown again or the window regains focus.
    this._wireWakeups();
    await this._discoverAll();
    const now = Math.floor(Date.now()/1000);
    this._resetWindows(now);
    // The album streams nothing. It never mounts a player: it only reads every
    // camera's events and paints them.
    if (this._config.events_only) {
      this._eventsMode = 'all';
      await this._loadWindow(true);
      this._loadCalendar();
      this._subscribe();
      this._refresh = setInterval(() => { if (this._isNowWindow()) this._loadWindow(true); }, this._config.refresh_seconds*1000);
      this._booting = false;
      return;
    }
    const startInGrid = this._config.default_view === 'grid' && this._config.cameras.length > 1;
    if (startInGrid) this._setViewMode('grid');
    // Only start the single view player when it is the one on screen. Mounting
    // it behind the grid opened a stream nobody could see, competing with the
    // tiles for bandwidth and connections.
    if (!startInGrid) await this._mountEngine();
    await this._loadWindow(true);
    this._loadCalendar();
    this._subscribe();
    this._refresh = setInterval(() => { if (this._isNowWindow()) this._loadWindow(true); }, this._config.refresh_seconds*1000);
    const shouldRotate = this._config.rotate_on_load || this._config.rotate_seconds > 0;
    if (shouldRotate && this._config.cameras.length > 1) this._startRotate();
    this._booting = false;
  }

  // Discover all cameras in parallel for faster startup
  async _discoverAll() { await Promise.all(this._config.cameras.map(c => this._discoverOne(c.entity))); }
  async _discoverOne(entity) {
    const cache = this._camCache[entity] || mkCamState();
    if (cache.discovered) return;
    const ent = this._hass.states[entity]; if (!ent) return;
    cache.clientId = ent.attributes?.client_id || ent.attributes?.mqtt_client_id || 'frigate';
    cache.cam = ent.attributes?.camera_name || entity.replace(/^camera\./,'');
    cache.discovered = true;
    this._camCache[entity] = cache;
  }

  // ── stream (HLS, no WebRTC) ───────────────────────────────
  // Strip frontend_stream_type so ha-camera-stream uses HLS, not WebRTC
  _hlsStateObj(entity) {
    const raw = this._hass.states[entity]; if (!raw) return null;
    const attrs = { ...raw.attributes };
    delete attrs.frontend_stream_type;
    return { ...raw, attributes: attrs };
  }

  // Switching cameras used to blank the picture to a spinner, which reads as
  // something breaking rather than something changing. Keep the last frame on
  // screen instead and fade the new stream in over it. A canvas copy costs
  // nothing and avoids holding two streams open at once.
  _captureFrame() {
    try {
      const vid = this._engine ? this._findVideo(this._engine, 0) : null;
      if (!vid?.videoWidth) return null;
      const canvas = document.createElement('canvas');
      canvas.width = vid.videoWidth;
      canvas.height = vid.videoHeight;
      canvas.getContext('2d').drawImage(vid, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.7);
    } catch (_) {
      return null; // tainted canvas or no frame yet; fall back to the spinner
    }
  }
  _holdFrame(slot, frame, dim = true) {
    if (!frame) return;
    const hold = document.createElement('div');
    hold.className = 'engine-hold';
    hold.style.backgroundImage = `url(${frame})`;
    slot.insertAdjacentElement('afterbegin', hold);
    const wait = document.createElement('div');
    wait.className = 'engine-wait';
    wait.innerHTML = '<div class="ph-spin"></div>';
    slot.insertAdjacentElement('afterbegin', wait);
    // Dim the outgoing camera's frame straight away: left at full strength it
    // just looks like the picture froze, with no sign anything is happening. The
    // initial camera still is left bright — it reads as the thumbnail the card
    // shows before the first video frame arrives.
    if (dim) requestAnimationFrame(() => hold.classList.add('dim'));
  }
  // A still of the camera to show while the live stream connects. Home Assistant
  // camera entities expose entity_picture — the /api/camera_proxy URL with its
  // access token — which is the same poster the advanced cards paint before their
  // first video frame. Without it a slow stream shows a bare spinner (or black).
  _camPoster(entity) {
    const attrs = this._hass?.states?.[entity]?.attributes;
    if (attrs?.entity_picture) return attrs.entity_picture;
    if (attrs?.access_token) return `/api/camera_proxy/${entity}?token=${attrs.access_token}`;
    return entity ? `/api/camera_proxy/${entity}` : null;
  }
  // Mount the live player once the camera's state is known; retried from the hass
  // setter if the state had not arrived at start-up.
  _maybeMountEngine() {
    if (!this._started || this._booting || this._playing) return;
    if (this._viewMode !== 'single' || this._mountingEngine) return;
    if (this._engine && this._engine.isConnected) return;
    const entity = this._activeCam?.entity;
    if (!entity || !this._hass?.states?.[entity]) return;
    this._mountEngine();
  }
  // Chrome pauses (and HA's own players tear down) a stream in a hidden tab.
  // Re-entering the tab is the moment to notice a dead picture and rebuild,
  // instead of leaving the user to reload the page.
  _wireWakeups() {
    if (this._onWake) return;
    this._onWake = () => { if (!document.hidden) this._nudgeLive(); };
    document.addEventListener('visibilitychange', this._onWake);
    window.addEventListener('focus', this._onWake);
  }
  _unwireWakeups() {
    if (!this._onWake) return;
    document.removeEventListener('visibilitychange', this._onWake);
    window.removeEventListener('focus', this._onWake);
    this._onWake = null;
  }
  // Last-resort recovery: if the live view is on screen but has no picture,
  // rebuild it. Does nothing when things are fine, so it is safe to call from
  // every wake-up and camera-state change. Debounced so a burst of hass updates
  // cannot start a remount storm.
  _nudgeLive() {
    if (!this._started || this._booting || this._playing) return;
    if (this._viewMode !== 'single' || this._mountingEngine) return;
    const entity = this._activeCam?.entity;
    if (!entity || !this._hass?.states?.[entity]) return;
    const v = this._engine && this._engine.isConnected ? this._findVideo(this._engine, 0) : null;
    if (v && v.videoWidth > 0) {
      // Picture exists: after a background tab it may just be paused.
      if (v.paused) { try { v.play().catch(() => {}); } catch (_) {} }
      return;
    }
    // A stream that is merely still connecting must be left alone: give it the
    // same grace the watchdog does before deciding it has failed.
    if (Date.now() - this._engineTS < 8000) return;
    if (Date.now() - this._lastNudge < 3000) return;
    this._lastNudge = Date.now();
    this._mountEngine();
  }
  // Explicit "reload the stream" affordance, so a stuck feed is one tap away
  // instead of a full page reload.
  _reloadStream() {
    if (this._mountingEngine) return;
    this._liveRetries = 0;
    this._lastNudge = Date.now();
    this._mountEngine();
  }
  // Reveal the player once it actually has picture, then drop the held frame.
  _syncAspect(vid) {
    if (!vid?.videoWidth || !vid?.videoHeight) return;
    const aspect = `${vid.videoWidth} / ${vid.videoHeight}`;
    const wrap = this.shadowRoot.querySelector('#eng-wrap');
    if (wrap) wrap.style.setProperty('--cam-aspect-ratio', aspect);
  }
  _fadeInPlayer(slot, el) {
    el.classList.add('engine-player');
    let revealed = false;
    const reveal = (vid) => {
      if (revealed) return;
      revealed = true;
      el.classList.add('shown');
      slot.querySelector('.engine-wait')?.remove();
      const hold = slot.querySelector('.engine-hold');
      if (hold) {
        hold.classList.remove('dim');
        hold.classList.add('out');
        setTimeout(() => hold.remove(), 600);
      }
      if (vid) this._syncAspect(vid);
    };

    // Poll rather than listen once: the <video> lives inside the player's own
    // shadow root and appears a tick after the element is appended.
    let wired = false, ticks = 0;
    const pollVid = setInterval(() => {
      ticks++;
      const vid = this._findVideo(el, 0);
      if (vid && !wired) {
        wired = true;
        this._syncAspect(vid);
        this._syncPtzControls(); // the new player's <video> may need its bar hidden
        vid.addEventListener('loadedmetadata', () => this._syncAspect(vid), { once: true });
        vid.addEventListener('playing', () => reveal(vid), { once: true });
        vid.addEventListener('loadeddata', () => reveal(vid), { once: true });
      }
      if (vid && (vid.readyState >= 2 || (!vid.paused && vid.currentTime > 0))) {
        clearInterval(pollVid);
        reveal(vid);
        return;
      }
      // Safety net. The player is painted with the camera still as its own
      // poster, so revealing it before the first frame shows the thumbnail, not
      // a black rectangle. Without this a stream that never reports `playing`
      // stayed invisible behind the still forever — the card looked frozen and
      // only a page reload brought the feed back.
      if (ticks >= 80) { clearInterval(pollVid); reveal(vid); }
    }, 100);
  }
  async _mountEngine() {
    const slot = this.shadowRoot.querySelector('#engine'); if (!slot) return;
    const entity = this._activeCam?.entity; if (!entity) return;
    const frame = this._captureFrame(); // before anything is torn down
    const poster = frame || this._camPoster(entity); // last frame, else the camera still
    // The player's own poster is the *camera still*, not the captured frame: the
    // captured frame belongs to the camera we are leaving, and a stream that
    // never starts would otherwise keep showing the wrong camera.
    this._poster = this._camPoster(entity);
    const spinner = '<div class="ph"><div class="ph-spin"></div></div>';
    slot.innerHTML = poster ? '' : spinner;
    this._holdFrame(slot, poster, !!frame);
    this._engine = null;
    this._teardownGo2rtc();
    this._engineSeq = (this._engineSeq || 0) + 1;
    const token = this._engineSeq;
    const stateObj = this._hlsStateObj(entity);
    if (!stateObj) { this._dbg(`no state for ${entity} yet; waiting for it to appear`); return; }
    this._engineTS = Date.now();
    this._mountingEngine = true;
    // A freshly mounted player starts with its own controls on; re-evaluate once
    // the element is in (see _applyEngineTransform at the end of each path).
    this._ptzZoomed = null;
    this._ptzVid = null;
    this._ptzAppliedVid = null;
    try {
      if (this._config.live_provider === 'go2rtc') {
        const t0 = Date.now();
        const ok = await this._mountGo2rtc(slot, token);
        this._dbg(`single view ${entity}: go2rtc ${ok ? 'playing' : 'gave up'} after ${Date.now() - t0}ms`);
        if (ok || this._engineSeq !== token) return;
        slot.innerHTML = poster ? '' : spinner; // go2rtc did not start, fall through to HLS
        this._holdFrame(slot, poster, !!frame);
      }
      this._dbg(`single view ${entity}: starting the Home Assistant HLS player`);
      this._mountHaPlayer(slot, entity, stateObj);
    } finally {
      this._mountingEngine = false;
    }
  }

  // Live view via Frigate's built-in go2rtc (WebRTC/MSE): far lower latency
  // than HLS, and lighter on the browser. Reached through the Frigate
  // integration's own proxy, so no separate go2rtc URL or port is needed and
  // it works through HA auth — including the companion apps.
  //
  // Frigate deprecated the /mse/ proxy path in favour of /go2rtc/ws/ (the MSE
  // *protocol* is unaffected — it's the route that changed). The new path
  // needs Frigate integration v5.12.0+, so try it first and fall back to the
  // old one for older installs rather than making users work out which of the
  // two their setup supports. On Frigate 0.18+ both resolve to the same
  // upstream anyway.
  // Returns true when go2rtc is playing (or was superseded), false to fall back to HLS.
  async _mountGo2rtc(slot, token) {
    const { clientId, cam } = this._cc();
    if (!clientId || !cam) {
      this._dbg('no go2rtc: this camera has no Frigate instance/name yet', { clientId, cam });
      return false;
    }
    // A camera Frigate does not publish to go2rtc closes the socket at once. Once
    // is enough to learn that: without this, every switch back to that camera
    // spent four seconds waiting for a connection that is never coming.
    const cache = this._camCache[this._activeCam?.entity];
    if (cache?.noGo2rtc) {
      this._dbg(cam, 'has no go2rtc stream, going straight to the Home Assistant stream');
      return false;
    }
    const paths = this._go2rtcPaths(clientId, cam);
    for (const path of paths) {
      let r = await this._tryGo2rtcPath(slot, token, path);
      if (this._engineSeq !== token) return true; // superseded, nothing to do
      if (r.ok) { this._go2rtcPath = path; return true; } // remember what worked
      // The browser accepted the codec and then could not decode it. Ask for the
      // same stream without H.265 before giving up on go2rtc entirely.
      if (r.mediaError) {
        this._dbg('decode failed, asking go2rtc for H.264 instead:', r.mediaError);
        r = await this._tryGo2rtcPath(slot, token, path, { noHevc: true });
        if (this._engineSeq !== token) return true;
        if (r.ok) { this._go2rtcPath = path; return true; }
      }
      // The socket opened but the stream never played: this proxy route is
      // fine, so the other one won't help. Go straight to the HLS fallback.
      if (r.routeWorks) return false;
    }
    // Every route refused the connection while others work, so go2rtc does not
    // carry this camera. Remember it for as long as the card is open.
    if (cache) cache.noGo2rtc = true;
    this._dbg(cam, 'no go2rtc stream on any route; using the Home Assistant stream from now on');
    return false;
  }
  async _tryGo2rtcPath(slot, token, path, opts = {}) {
    const src = await this._signed(path);
    if (this._engineSeq !== token) return { ok: false, routeWorks: false };

    const player = document.createElement('frigate-go2rtc-player');
    player.style.cssText = 'width:100%;height:100%;display:block';
    this._clearPlayerSlot(slot);
    slot.appendChild(player); // creates its <video> synchronously
    // Chrome reports H.265 as supported and then fails to decode the stream. The
    // player advertises whatever the browser claims, so go2rtc picks H.265 and
    // the picture never arrives. Dropping it from the offer makes go2rtc send
    // H.264 instead. Only on the retry: where H.265 does work it is the better
    // stream, and this costs go2rtc a transcode.
    if (opts.noHevc) player.CODECS = player.CODECS.filter(c => !c.startsWith('hvc1'));
    // Upstream's player starts unmuted and only mutes if autoplay is refused;
    // mute before connecting so the live view is never unexpectedly audible.
    if (player.video) {
      player.video.muted = true;
      player.video.style.objectFit = 'contain';
      // The still the card shows while the stream connects, carried by the
      // player itself too, so revealing it early shows the camera and not black.
      if (this._poster) player.video.poster = this._poster;
    }
    // A decode error means waiting out the timeout is pointless: the stream is
    // arriving, the browser just cannot play it. A video with no source at all
    // is being torn down, not failing to decode — counting that as a decode
    // error sent the card on a second, H.265-less attempt that cost another 15
    // seconds before the Home Assistant fallback it actually needed.
    let mediaError = null;
    const onMediaError = () => {
      const v = player.video;
      if (!v || (!v.getAttribute('src') && !v.srcObject)) return;
      mediaError = v.error?.message || 'media error';
    };
    player.video?.addEventListener('error', onMediaError);
    // WebRTC media does not travel through HA's proxy — it goes straight to
    // go2rtc's own port, which typically only resolves on the local network.
    // 'mse' keeps everything on the (proxied) WebSocket instead.
    this._applyGo2rtcMode(player);
    player.src = src;
    // Right after src the player has either created the socket (CONNECTING) or
    // refused to, and the two need different fixes: refused means the element
    // was not in the document yet, CLOSED later means the server hung up.
    this._dbg('after src', {
      inDocument: player.isConnected, signed: src !== path, ws: player.wsState, pc: player.pcState,
    });
    // The close code says who hung up and why: 1006 is the handshake being
    // refused (wrong path, or auth), 1000 is a clean close from the other end.
    if (this._config.debug && player.ws) {
      player.ws.addEventListener('close', e => this._dbg('socket closed', { code: e.code, reason: e.reason, clean: e.wasClean }));
      player.ws.addEventListener('open', () => this._dbg('socket open'));
    }
    this._go2rtcPlayer = player;
    this._engine = player;
    this._fadeInPlayer(slot, player);
    this._applyEngineTransform(); // keep an active zoom on the new element
    this._renderStreamCtrl();

    // Two separate questions, and conflating them was a bug: does this proxy
    // route exist (did the socket open?), and does the stream actually play?
    // A blind timeout tore down connections that were merely slow to start —
    // cameras that take a while to come up never got the chance, and go2rtc's
    // own reconnect logic never got to run either.
    const SOCKET_MS = 4000;   // route unusable if the socket never opens
    const PLAY_MS = 15000;    // generous: cold cameras can take a while
    const result = await new Promise(resolve => {
      let done = false;
      const finish = r => { if (!done) { done = true; clearInterval(poll); resolve(r); } };
      const onPlaying = () => finish({ ok: true, routeWorks: true });
      player.video?.addEventListener('playing', onPlaying, { once: true });
      player.video?.addEventListener('loadeddata', onPlaying, { once: true });
      const started = Date.now();
      const poll = setInterval(() => {
        const elapsed = Date.now() - started;
        const socketOpen = player.wsState === WebSocket.OPEN || player.pcState === WebSocket.OPEN;
        if (mediaError) finish({ ok: false, routeWorks: true, mediaError });
        else if (!socketOpen && elapsed > SOCKET_MS) finish({ ok: false, routeWorks: false });
        else if (elapsed > PLAY_MS) finish({ ok: false, routeWorks: true });
      }, 250);
    });
    this._dbg('go2rtc path', path.replace(/\?.*/, ''), result.ok ? 'playing' : (result.mediaError ? `decode failed: ${result.mediaError}` : (result.routeWorks ? 'socket opened but no picture' : 'socket never opened')),
      { ws: player.wsState, pc: player.pcState, mode: player.mode, video: !!player.video, ready: player.video?.readyState });
    if (this._engineSeq !== token) return { ok: false, routeWorks: true };
    if (result.ok) { this._startGo2rtcWatchdog(player, () => this._mountEngine()); return result; }
    this._teardownGo2rtc();
    return result;
  }
  // Candidate proxy paths, newest first. Once one has worked we keep using it,
  // so the grid doesn't have to rediscover it per camera.
  _go2rtcPaths(clientId, cam) {
    const query = `?src=${encodeURIComponent(cam)}`;
    const build = kind => kind === 'new'
      ? `/api/frigate/${clientId}/go2rtc/ws/api/ws${query}`
      : `/api/frigate/${clientId}/mse/api/ws${query}`;
    const known = this._go2rtcPath?.includes('/go2rtc/ws/') ? 'new'
                : this._go2rtcPath ? 'old' : null;
    return known ? [build(known)] : [build('new'), build('old')];
  }
  _applyGo2rtcMode(player) {
    if (this._config.go2rtc_mode === 'webrtc') player.mode = 'webrtc';
    else if (this._config.go2rtc_mode !== 'auto') player.mode = 'mse';
  }
  // Recovery watchdog. The player has some reconnect logic of its own, but it
  // has two gaps: when WebRTC is carrying the stream the WebSocket is already
  // closed, so its video-error handler (`if (this.ws) this.ws.close()`) does
  // nothing at all; and a peer connection that ends up 'closed' rather than
  // 'failed' never triggers its reconnect either. Both leave a frozen picture
  // with nothing trying to fix it.
  //
  // So watch whether playback is actually advancing. Try a soft reconnect
  // first (same signed URL), and after repeated failures remount the engine
  // entirely — which brings the HLS fallback back into play if go2rtc is
  // simply unavailable.
  _startGo2rtcWatchdog(player, onGiveUp) {
    const CHECK_MS = 2000, STALL_MS = 8000, MAX_SOFT_RETRIES = 3;
    clearInterval(player._fmhcWatch);
    let lastTime = -1, stalledMs = 0, retries = 0;
    player._fmhcWatch = setInterval(() => {
      if (!player.isConnected) { clearInterval(player._fmhcWatch); return; }
      const v = player.video;
      // Don't fight the user or the browser: a deliberate pause and a
      // backgrounded tab both legitimately stop playback.
      if (!v || v.paused || document.hidden) { stalledMs = 0; return; }

      const advancing = v.currentTime !== lastTime;
      lastTime = v.currentTime;
      const noConnection = player.wsState === WebSocket.CLOSED && player.pcState === WebSocket.CLOSED;
      if (advancing && !noConnection) { stalledMs = 0; retries = 0; return; }

      stalledMs += CHECK_MS;
      if (stalledMs < STALL_MS) return;
      stalledMs = 0;
      retries++;
      if (retries <= MAX_SOFT_RETRIES) {
        console.warn('[frigate-modern-hass-card] go2rtc stream stalled, reconnecting', `(${retries}/${MAX_SOFT_RETRIES})`);
        try { player.ondisconnect(); } catch (_) {}
        try { player.onconnect(); } catch (_) {}
      } else {
        console.warn('[frigate-modern-hass-card] go2rtc could not recover, falling back to the Home Assistant stream');
        clearInterval(player._fmhcWatch);
        onGiveUp();
      }
    }, CHECK_MS);
  }
  // Empty a player slot. A go2rtc player left behind would keep its socket open
  // until its own deferred disconnect fired, so close it properly rather than
  // just pulling the node out of the document.
  _clearPlayerSlot(slot) {
    slot.querySelectorAll(':scope > :not(.engine-hold):not(.engine-wait)').forEach(n => {
      if (typeof n.ondisconnect === 'function') this._stopGo2rtcPlayer(n); else n.remove();
    });
  }
  _stopGo2rtcPlayer(p) {
    if (!p) return;
    clearInterval(p._fmhcWatch);
    // The element's own disconnect is deferred (DISCONNECT_TIMEOUT), so cancel
    // it before taking the player down now: left armed, it fires again half a
    // minute later on a node that is already gone and empties an already empty
    // <video>, which the browser reports as another error.
    clearTimeout(p.disconnectTID);
    p.disconnectTID = 0;
    // Close the socket/peer connection now rather than waiting out the
    // player's own disconnect timeout.
    try { p.ondisconnect(); } catch (_) {}
    try { p.remove(); } catch (_) {}
  }
  _teardownGridGo2rtc() {
    (this._gridPlayers || []).forEach(p => this._stopGo2rtcPlayer(p));
    this._gridPlayers = [];
  }
  // Hiding the grid does not stop it. Every tile holds its own connection, so a
  // hidden grid of seven cameras keeps seven streams running while the single
  // view tries to start an eighth, and that one is the one you are waiting for.
  // Emptying the element also disconnects the ha-hls-player instances.
  _teardownGrid() {
    this._teardownGridGo2rtc();
    const grid = this.shadowRoot.querySelector('#cam-grid');
    if (grid) grid.innerHTML = '';
    this._gridCols = 0;
  }
  _teardownGo2rtc() {
    const p = this._go2rtcPlayer;
    if (!p) return;
    this._go2rtcPlayer = null;
    this._stopGo2rtcPlayer(p);
    if (this._engine === p) this._engine = null;
  }

  _mountHaPlayer(slot, entity, stateObj) {
    // Use Home Assistant's HLS player directly rather than <ha-camera-stream>.
    // ha-camera-stream picks between HLS and WebRTC, and it picks WebRTC when
    // asked to start muted — but ha-web-rtc-player permanently discards the
    // incoming audio track on a muted connect, which left the native volume
    // control greyed out with no way to ever get sound (#6). Going straight to
    // HLS keeps the audio track, so the card can start muted *and* have a
    // working volume control. Falls back to ha-camera-stream on frontends
    // where ha-hls-player isn't registered.
    const useHls = !!customElements.get('ha-hls-player');
    const s = document.createElement(useHls ? 'ha-hls-player' : 'ha-camera-stream');
    s.hass = this._hass;
    if (useHls) {
      s.entityid = entity;
      s.autoPlay = true;
      s.playsInline = true;
    } else {
      s.stateObj = stateObj;
    }
    // HA's players paint this image on their <video> until the first frame is
    // decoded — the same "thumbnail before the stream" behaviour the advanced
    // cards have. Without it a slow stream shows a bare black rectangle.
    if (this._poster) s.posterUrl = this._poster;
    // Native player controls (mute/volume/fullscreen) instead of our own bar.
    // Our own mute button toggled `muted` on the stream element, which is a Lit
    // reactive property HA uses internally to pick between its HLS and WebRTC
    // players — toggling it could swap the whole player mid-stream. That
    // reactive tug-of-war caused the unreliable mute button (#6). Native
    // controls write straight to the <video> DOM node, outside Lit's render
    // cycle, so there is nothing left to fight over.
    s.controls = true;
    s.muted = true;
    s.style.cssText = 'width:100%;height:100%;display:block';
    this._clearPlayerSlot(slot);
    slot.appendChild(s);
    this._engine = s;
    this._fadeInPlayer(slot, s);
    this._applyEngineTransform(); // keep an active zoom on the new element
    this._startHaWatchdog(s);
    this._renderStreamCtrl();
  }

  // The Home Assistant HLS player has no reconnect of its own. If the stream is
  // not ready when the card mounts — a cold camera, or a dashboard that starts a
  // dozen cards at once — it can sit on a black frame forever, and the only cure
  // was reloading the page. Watch for a picture and remount a couple of times
  // before giving up. A deliberate pause and a backgrounded tab are left alone.
  _startHaWatchdog(el) {
    // Patience, not a hair trigger: a cold camera or a dashboard that starts a
    // dozen cards at once can take a while. Four rebuilds covers a stream that
    // fails at start-up and then succeeds, without ever thrashing a working one.
    const CHECK_MS = 2000, STALL_MS = 12000, MAX = 4;
    clearInterval(el._fmhcWatch);
    let stalledMs = 0, lastTime = -1;
    el._fmhcWatch = setInterval(() => {
      if (!el.isConnected) { clearInterval(el._fmhcWatch); return; }
      if (this._playing || this._viewMode === 'grid' || document.hidden) { stalledMs = 0; lastTime = -1; return; }
      const v = this._findVideo(el, 0);
      const hasPicture = !!v && v.videoWidth > 0;
      // A paused video with a picture on it is the user's doing: leave it alone.
      // Everything else is a broken stream — no <video> at all, no frame yet, or
      // a picture that has stopped advancing, which is just as dead as no
      // picture and is what a browser-suspended stream comes back as.
      let bad;
      if (!hasPicture) bad = !(v && v.paused);
      else if (v.paused) bad = false;
      else {
        const advancing = v.currentTime !== lastTime;
        lastTime = v.currentTime;
        bad = !advancing;
      }
      if (!bad) { stalledMs = 0; if (hasPicture) this._liveRetries = 0; return; }
      stalledMs += CHECK_MS;
      if (stalledMs < STALL_MS) return;
      stalledMs = 0;
      if (this._mountingEngine) return;
      if (this._liveRetries < MAX) {
        this._liveRetries = (this._liveRetries || 0) + 1;
        console.warn('[frigate-modern-hass-card] live stream is not playing, remounting',
          `(${this._liveRetries}/${MAX})`);
        this._mountEngine();
      } else {
        clearInterval(el._fmhcWatch);
      }
    }, CHECK_MS);
  }

  // Digital PTZ (Pan-Tilt-Zoom) on live view (#engine).
  // Supports touch pinch/pan, double-tap zoom, mouse wheel, mouse drag, and D-pad controls.
  _applyEngineTransform() {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine) return;
    engine.style.transform = `translate(${this._panTx}px,${this._panTy}px) scale(${this._zoomScale})`;
    const lvl = this.shadowRoot.querySelector('#ptz-zoom-lvl');
    if (lvl) lvl.textContent = `${this._zoomScale.toFixed(1)}x`;
    this._syncPtzResetBtn();
    this._syncPtzControls();
  }
  // The pad's centre button means two things, because "put it back" is only
  // worth offering when there is something to put back: reset the picture, or —
  // already at the default zoom and position — close the pad. A button that
  // does nothing visible reads as broken.
  _ptzResetOrClose() {
    if (this._zoomScale <= 1.0001 && !this._panTx && !this._panTy) return this._togglePtz();
    this._resetPtz();
  }
  _syncPtzResetBtn() {
    const btn = this.shadowRoot.querySelector('[data-ptz="reset"]');
    if (!btn) return;
    const atDefault = this._zoomScale <= 1.0001 && !this._panTx && !this._panTy;
    if (this._ptzAtDefault === atDefault) return;
    this._ptzAtDefault = atDefault;
    btn.innerHTML = atDefault ? ICONS.close : ICONS.reset;
    btn.title = atDefault ? this._t('ptz.close') : this._t('ptz.reset');
  }
  // The player's own control bar is painted *inside* the <video> box, so the
  // transform above scales it along with the picture and it drifts off the
  // frame. Take it out of the picture while a zoom is active and put it back at
  // 1x, so only the image zooms. Cheap to call: the lookup only runs on a change.
  _syncPtzControls() {
    const el = this._engine;
    if (!el) return;
    const zoomed = this._zoomScale > 1.0001;
    // Finding the <video> walks into the player's shadow root, so do it once and
    // reuse it while the node stays connected.
    let v = this._ptzVid;
    if (!v || !v.isConnected || this._ptzVidEl !== el) {
      v = this._findVideo(el, 0);
      this._ptzVid = v;
      this._ptzVidEl = el;
    }
    if (this._ptzZoomed === zoomed && this._ptzAppliedVid === v) return;
    this._ptzZoomed = zoomed;
    this._ptzAppliedVid = v;
    if (v) { try { v.controls = !zoomed; } catch (_) {} }
  }
  _clampEnginePan() {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine) return;
    const w = engine.offsetWidth, h = engine.offsetHeight;
    this._panTx = Math.min(0, Math.max(w - w * this._zoomScale, this._panTx));
    this._panTy = Math.min(0, Math.max(h - h * this._zoomScale, this._panTy));
  }
  // Pointer position in the engine's own (untransformed) coordinates. The engine
  // is scaled about its top-left corner, and getBoundingClientRect() reports the
  // box *after* that transform — measuring against it put the zoom anchor
  // somewhere other than the pointer, and the error grew with every step, so
  // zooming back out never landed where it started. #eng-wrap is the box the
  // engine fills and is never transformed, so measure against that instead.
  _enginePoint(clientX, clientY) {
    const wrap = this.shadowRoot.querySelector('#eng-wrap');
    if (!wrap) return null;
    const r = wrap.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }
  // One wheel gesture: take each step instantly, because a half-finished
  // transition is the box the next step would measure its anchor against.
  _endWheelZoomSoon() {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine) return;
    engine.classList.add('zooming');
    clearTimeout(this._wheelT);
    this._wheelT = setTimeout(() => engine.classList.remove('zooming'), 160);
  }
  _zoomEngineAt(px, py, ns) {
    const MAX = 5;
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine) return;
    ns = Math.min(MAX, Math.max(1, ns));
    this._panTx = px - (px - this._panTx) * (ns / this._zoomScale);
    this._panTy = py - (py - this._panTy) * (ns / this._zoomScale);
    this._zoomScale = ns;
    this._clampEnginePan();
    this._applyEngineTransform();
  }
  _resetPtz() {
    this._zoomScale = 1;
    this._panTx = 0;
    this._panTy = 0;
    this._applyEngineTransform();
  }
  _ptzMove(dx, dy) {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine || this._zoomScale <= 1) return;
    this._panTx += dx;
    this._panTy += dy;
    this._clampEnginePan();
    this._applyEngineTransform();
  }
  // The +/- buttons have no pointer of their own over the video, so they aim at
  // the last place the pointer was over the picture — zooming where you looked.
  _ptzZoomStep(delta) {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine) return;
    const p = this._ptzLastPt;
    const w = engine.offsetWidth, h = engine.offsetHeight;
    this._zoomEngineAt(p ? p.x : w / 2, p ? p.y : h / 2, this._zoomScale + delta);
  }
  _wirePinchZoom() {
    const engine = this.shadowRoot.querySelector('#engine');
    if (!engine || engine._pinchWired) return;
    engine._pinchWired = true;
    let mode = null; // 'pinch' | 'pan'
    let pinchStartDist = 1, pinchStartScale = 1, midX = 0, midY = 0;
    let panStartX = 0, panStartY = 0, panStartTx = 0, panStartTy = 0;
    let lastTapT = 0, lastTapX = 0, lastTapY = 0;
    const dist = (a,b) => Math.hypot(a.clientX-b.clientX, a.clientY-b.clientY);

    engine.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        mode = 'pinch';
        engine.classList.add('zooming');
        pinchStartDist = dist(e.touches[0], e.touches[1]) || 1;
        pinchStartScale = this._zoomScale;
        const p = this._enginePoint((e.touches[0].clientX + e.touches[1].clientX) / 2,
                                    (e.touches[0].clientY + e.touches[1].clientY) / 2);
        if (p) { midX = p.x; midY = p.y; }
      } else if (e.touches.length === 1) {
        const t = e.touches[0], now = Date.now();
        if (now - lastTapT < 300 && Math.hypot(t.clientX-lastTapX, t.clientY-lastTapY) < 30) {
          const p = this._enginePoint(t.clientX, t.clientY);
          if (this._zoomScale > 1) { this._resetPtz(); }
          else if (p) { this._ptzLastPt = p; this._zoomEngineAt(p.x, p.y, 2.5); }
          lastTapT = 0;
          return;
        }
        lastTapT = now; lastTapX = t.clientX; lastTapY = t.clientY;
        if (this._zoomScale > 1) {
          mode = 'pan';
          panStartX = t.clientX; panStartY = t.clientY;
          panStartTx = this._panTx; panStartTy = this._panTy;
        }
      }
    }, { passive: true });

    engine.addEventListener('touchmove', e => {
      if (mode === 'pinch' && e.touches.length === 2) {
        const d = dist(e.touches[0], e.touches[1]) || 1;
        this._zoomEngineAt(midX, midY, pinchStartScale * (d / pinchStartDist));
      } else if (mode === 'pan' && e.touches.length === 1) {
        const t = e.touches[0];
        this._panTx = panStartTx + (t.clientX - panStartX);
        this._panTy = panStartTy + (t.clientY - panStartY);
        this._clampEnginePan();
        this._applyEngineTransform();
      }
    }, { passive: true });

    const end = () => { mode = null; engine.classList.remove('zooming'); };
    engine.addEventListener('touchend', end);
    engine.addEventListener('touchcancel', end);

    // Desktop mouse wheel zoom, anchored on the pointer.
    engine.addEventListener('wheel', e => {
      e.preventDefault();
      const p = this._enginePoint(e.clientX, e.clientY);
      if (!p) return;
      this._ptzLastPt = p;
      const factor = e.deltaY < 0 ? 1.25 : 0.8;
      this._endWheelZoomSoon();
      this._zoomEngineAt(p.x, p.y, this._zoomScale * factor);
    }, { passive: false });

    // Track the pointer over the picture so the +/- buttons can aim there too.
    engine.addEventListener('mousemove', e => {
      const p = this._enginePoint(e.clientX, e.clientY);
      if (p) this._ptzLastPt = p;
    });

    // Desktop mouse drag to pan
    let mouseDragging = false, mStartX = 0, mStartY = 0, mStartTx = 0, mStartTy = 0;
    engine.addEventListener('mousedown', e => {
      if (this._zoomScale > 1 && e.button === 0) {
        mouseDragging = true;
        mStartX = e.clientX; mStartY = e.clientY;
        mStartTx = this._panTx; mStartTy = this._panTy;
        engine.classList.add('zooming');
      }
    });
    // Same as the scrub listeners: the window pair outlives the element it was
    // wired for, so replace the previous one rather than stacking another.
    if (this._pinchWin) {
      window.removeEventListener('mousemove', this._pinchWin.mv);
      window.removeEventListener('mouseup', this._pinchWin.up);
    }
    const pinchMv = e => {
      if (mouseDragging) {
        this._panTx = mStartTx + (e.clientX - mStartX);
        this._panTy = mStartTy + (e.clientY - mStartY);
        this._clampEnginePan();
        this._applyEngineTransform();
      }
    };
    const pinchUp = () => {
      if (mouseDragging) {
        mouseDragging = false;
        engine.classList.remove('zooming');
      }
    };
    this._pinchWin = { mv: pinchMv, up: pinchUp };
    window.addEventListener('mousemove', pinchMv);
    window.addEventListener('mouseup', pinchUp);
  }

  // ── camera grid ───────────────────────────────────────────
  // Columns for the grid. 'auto' keeps tiles roughly square-ish as cameras are
  // added; a pinned number wins, and 1 gives a vertical stack.
  // The 'auto' entry exists so the editor can show it as a choice; it means no
  // layout, leaving the column count and any hand written spans alone.
  _activeLayout() {
    const id = this._config.grid_layout;
    return id && id !== 'auto' ? findLayout(id) : null;
  }
  // How narrow a tile may get before the grid drops a column. Configurable
  // because it is the one number that decides when a phone stacks: lower it and
  // two columns survive on a phone, raise it and even a tablet stacks.
  _minTilePx() {
    const v = Number(this._config.min_tile_width);
    return v > 0 ? Math.max(80, v) : MIN_TILE_PX;
  }
  // Cells the cameras will occupy, a camera spanning more than one included.
  _gridCells() {
    return this._config.cameras.reduce((sum, c) => {
      const sp = c.span || {};
      return sum + Math.max(1, Number(sp.cols) || 1) * Math.max(1, Number(sp.rows) || 1);
    }, 0);
  }
  _gridColumns(n) {
    const layout = this._activeLayout();
    const min = this._minTilePx();
    // On a phone, stacking wins over everything else, a chosen layout included.
    // Four tiles on a 412px screen is not a grid, it is four thumbnails.
    const w0 = this._cardWidth || this.offsetWidth || 0;
    if (this._config.stack_on_mobile && w0 && w0 < PHONE_PX) return 1;
    if (layout?.cols) {
      // Still bounded by width: a four column layout on a phone is unreadable.
      const w = this._cardWidth || this.offsetWidth || 0;
      return w ? Math.max(1, Math.min(layout.cols, Math.floor(w / min))) : layout.cols;
    }
    const cfg = this._config.grid_columns;
    // A pinned column count is still capped by what there is to put in it. Four
    // columns for three cameras leaves an empty tile at the end of the row,
    // which reads as a camera that failed to load rather than as a choice.
    if (cfg && cfg !== 'auto') return Math.max(1, Math.min(Number(cfg) || 1, this._gridCells()));
    let cols = n <= 1 ? 1 : n <= 4 ? 2 : n <= 9 ? 3 : 4;
    // Never make tiles so narrow they stop being watchable. Without this a
    // phone showing seven cameras got three columns of ~100px tiles; the count
    // alone says nothing about how much room there actually is.
    const width = this._cardWidth || this.offsetWidth || 0;
    if (width) cols = Math.max(1, Math.min(cols, Math.floor(width / min)));
    return cols;
  }
  async _mountGrid() {
    const grid = this.shadowRoot.querySelector('#cam-grid'); if (!grid) return;
    const n = this._config.cameras.length;
    const cols = this._gridColumns(n);
    // A camera may occupy more than one cell, which is what gives the
    // asymmetric layouts (one large with smaller ones around it). A span wider
    // than the grid is clamped, so the same config still works when the column
    // count drops on a phone.
    const layout = this._activeLayout();
    const spans = this._config.cameras.map((c, i) => {
      const preset = layout?.spans?.[i];
      const want = preset ? { cols: preset[0], rows: preset[1] } : (layout ? { cols: 1, rows: 1 } : c.span || { cols: 1, rows: 1 });
      const wc = want.cols || 1, wr = want.rows || 1;
      const fit = Math.min(wc, cols);
      // Shrink the height by as much as the width had to shrink, or a tile that
      // wanted 3x3 keeps three rows in a single column and leaves two empty
      // screens below the video.
      return { cols: fit, rows: Math.max(1, Math.round(wr * (fit / wc))) };
    });
    const cells = spans.reduce((sum, sp) => sum + sp.cols * sp.rows, 0);
    const rows = Math.max(1, Math.ceil(cells / cols));
    const slots = cols * rows;       // leftover cells become placeholders
    grid.className = `cam-grid cams-${n}${rows > 1 ? ' multi-row' : ''}${cols === 1 ? ' stacked' : ''}`;
    grid.style.setProperty('--grid-cols', cols);
    grid.style.setProperty('--grid-rows', rows);
    this._gridCols = cols;
    this._teardownGridGo2rtc();
    grid.innerHTML = '';
    this._gridSeq = (this._gridSeq || 0) + 1;
    const gridToken = this._gridSeq;
    this._gridToken = gridToken;
    // Cameras first, then placeholders for whatever cells are left over. In a
    // single column there is no shape to preserve, so an empty tile would just
    // be a gap in a list.
    const total = n + (cols === 1 ? 0 : Math.max(0, slots - cells));
    for (let i = 0; i < total; i++) {
      const slot = document.createElement('div');
      const isPlaceholder = i >= n;
      slot.className = `grid-slot${isPlaceholder ? ' placeholder' : ''}`;
      if (!isPlaceholder) {
        const sp = spans[i];
        if (sp.cols > 1) slot.style.gridColumn = `span ${sp.cols}`;
        if (sp.rows > 1) slot.style.gridRow = `span ${sp.rows}`;
        const c = this._config.cameras[i];
        const name = cap(camDisplayName(c));
        // stream — go2rtc when configured (one WebSocket per tile is far
        // lighter than a full HLS pipeline each), otherwise the HA stream.
        if (this._config.live_provider === 'go2rtc') {
          slot.insertAdjacentHTML('afterbegin', '<div class="ph"><div class="ph-spin"></div></div>');
          this._mountGridGo2rtc(slot, c.entity);
        } else {
          this._mountGridHaStream(slot, c.entity);
        }
        // label
        const lbl = document.createElement('div');
        lbl.className = 'grid-label'; lbl.textContent = name;
        slot.appendChild(lbl);
        // Click → open this camera in single view (_switchCamera switches the
        // view mode itself). Leave wall-display fullscreen first, otherwise we
        // would land on a single view stuck behind a fullscreened grid.
        // Guard: buttons inside the slot handle their own action (a clip played
        // in-slot renders its own close/fullscreen buttons); don't also switch.
        slot.addEventListener('click', ev => {
          if (ev.target.closest('.grid-fs-btn,.grid-close-btn,[data-restore-slot]')) return;
          this._exitFullscreen();
          this._switchCamera(i); this._renderCamSwitcher();
        });
      }
      grid.appendChild(slot);
    }
  }

  _mountGridHaStream(slot, entity) {
    const stateObj = this._hlsStateObj(entity);
    if (!stateObj) return;
    const s = document.createElement('ha-camera-stream');
    s.hass = this._hass; s.stateObj = stateObj; s.controls = false; s.muted = true;
    s.style.cssText = 'width:100%;height:100%;display:block;pointer-events:none';
    slot.querySelector('.ph')?.remove();
    slot.insertAdjacentElement('afterbegin', s);
  }
  // A grid tile's go2rtc stream. No controls here: tiles stay
  // pointer-events:none so a click selects the camera rather than hitting the
  // player. Falls back to the HA stream for this tile alone if it can't start.
  async _mountGridGo2rtc(slot, entity) {
    const token = this._gridToken;
    const cache = this._camCache[entity];
    const clientId = cache?.clientId, cam = cache?.cam;
    const giveUp = () => {
      if (this._gridToken !== token || !slot.isConnected) return;
      this._mountGridHaStream(slot, entity);
    };
    if (!clientId || !cam) { giveUp(); return; }

    const src = await this._signed(this._go2rtcPaths(clientId, cam)[0]);
    if (this._gridToken !== token || !slot.isConnected) return;

    const player = document.createElement('frigate-go2rtc-player');
    player.style.cssText = 'width:100%;height:100%;display:block;pointer-events:none';
    slot.insertAdjacentElement('afterbegin', player);
    if (player.video) {
      player.video.controls = false;
      player.video.muted = true;
      player.video.style.objectFit = 'contain';
    }
    this._applyGo2rtcMode(player);
    player.src = src;
    (this._gridPlayers = this._gridPlayers || []).push(player);

    const ok = await new Promise(resolve => {
      let done = false;
      const finish = v => { if (!done) { done = true; clearInterval(poll); resolve(v); } };
      player.video?.addEventListener('playing', () => finish(true), { once: true });
      player.video?.addEventListener('loadeddata', () => finish(true), { once: true });
      // Detached mid-connect (tile now shows a clip): stop waiting.
      if (!player.isConnected) finish(false);
      const started = Date.now();
      const poll = setInterval(() => {
        const elapsed = Date.now() - started;
        const open = player.wsState === WebSocket.OPEN || player.pcState === WebSocket.OPEN;
        if ((!open && elapsed > 4000) || elapsed > 15000) finish(false);
      }, 250);
    });
    if (this._gridToken !== token || !slot.isConnected || !player.isConnected) {
      this._stopGo2rtcPlayer(player);
      this._gridPlayers = (this._gridPlayers || []).filter(x => x !== player);
      return;
    }
    this._dbg('grid tile', entity, ok ? 'playing' : 'gave up', { ws: player.wsState, pc: player.pcState });
    if (ok) {
      slot.querySelector('.ph')?.remove();
      this._startGo2rtcWatchdog(player, giveUp);
      return;
    }
    this._stopGo2rtcPlayer(player);
    this._gridPlayers = (this._gridPlayers || []).filter(p => p !== player);
    giveUp();
  }

  // ── custom stream controls ────────────────────────────────
  // Single view uses the player's own native controls for mute and fullscreen.
  // Grid slots can't (their streams are pointer-events:none so slot clicks
  // still select the camera), so those keep the card's fullscreen button.
  _renderStreamCtrl() {
    const bar = this.shadowRoot.querySelector('#stream-ctrl-bar'); if (!bar) return;
    const inGrid = this._viewMode === 'grid';
    // Switching between one camera and all of them is a view control, so it
    // belongs with fullscreen and the events panel. It used to sit in the row of
    // camera tabs, where it read as another camera and was easy to miss. Labelled
    // rather than an icon alone, for the same reason.
    // The word is what the button does, never where you are. Highlighting it as
    // well made it read as the mode you were already in, which is backwards.
    const grid = this._config.cameras.length > 1
      ? `<button class="tool tool-txt" id="sc-grid" title="${inGrid ? this._t('ctrl.showOne') : this._t('ctrl.showAll')}">${inGrid ? ICONS.live : ICONS.grid}<span>${inGrid ? this._t('ctrl.single') : this._t('ctrl.grid')}</span></button>`
      : '';
    const fs = inGrid ? `<button class="tool" id="sc-fs" title="${this._t('ctrl.fullscreen')}">${ICONS.expand}</button>` : '';
    // Only meaningful in the wide layout, where the events panel sits beside the
    // cameras. CSS hides it when narrow, since there the browse toggle does this.
    const events = `<button class="tool" id="sc-events"></button>`;
    bar.innerHTML = `${grid}${fs}${events}`;
    this._applyEventsCollapsed();
  }
  _applyEventsCollapsed() {
    const card = this.shadowRoot.querySelector('.card'); if (!card) return;
    card.classList.toggle('events-collapsed', this._eventsCollapsed);
    const btn = this.shadowRoot.querySelector('#sc-events');
    if (btn) {
      btn.innerHTML = this._eventsCollapsed ? ICONS.panelOff : ICONS.panelOn;
      btn.title = this._eventsCollapsed ? this._t('ctrl.showPanel') : this._t('ctrl.hidePanel');
    }
  }
  _toggleEvents() {
    this._eventsCollapsed = !this._eventsCollapsed;
    this._applyEventsCollapsed();
    // The stream column changes width, so the height the events column is
    // matched to changes with it. Re-measure once the animation has settled.
    setTimeout(() => { if (this._cardWidth >= 560) this._syncColHeight(); }, 320);
  }

  // ── events timeline under the live camera ─────────────────
  // The timeline is the one part of the card that is genuinely useful next to a
  // live picture — where the last events sit relative to now — so it gets a
  // button of its own instead of being reachable only from the recordings tab.
  // `timeline` in the config is the starting point; the button overrides it.
  _timelineVisible() {
    if (this._timelineOpen === true || this._timelineOpen === false) return this._timelineOpen;
    return !this._config.camera_only;
  }
  _applyTimeline() {
    const card = this.shadowRoot.querySelector('.card'); if (!card) return;
    const on = this._timelineVisible();
    // Two separate classes: "the user asked for it" (which beats camera-only)
    // and "the user asked it gone" (which beats the card's own default).
    card.classList.toggle('tl-open', on === true);
    card.classList.toggle('tl-closed', on === false);
    const btn = this.shadowRoot.querySelector('[data-float-act="timeline"]');
    if (btn) btn.classList.toggle('active', on);
    this._measureTimeline();
  }
  // The strip's real height, handed to the picture as --tl-h so a narrow card in
  // a fixed-height section gives up exactly that much instead of clipping it —
  // the legend wraps, so it is not a constant. The hover readout can add a line
  // to the header, which is why this can run again without the strip changing:
  // the height is compared before it is written, so a pointer moving along the
  // strip does not set the property sixty times a second for nothing.
  _measureTimeline() {
    const card = this.shadowRoot.querySelector('.card'); if (!card) return;
    const sec = this.shadowRoot.querySelector('.tl-sec');
    const h = `${this._timelineVisible() && sec ? sec.offsetHeight : 0}px`;
    if (this._tlMeasured === h) return;
    this._tlMeasured = h;
    card.style.setProperty('--tl-h', h);
  }
  _toggleTimeline() {
    this._timelineOpen = !this._timelineVisible();
    this._applyTimeline();
    if (this._timelineOpen) { this._renderTimeline(); this._renderRange(); }
  }

  // ── view mode ─────────────────────────────────────────────
  // mount:false is for a caller that will mount the engine itself, so clicking a
  // camera in the grid does not first start the previously active camera and
  // then immediately tear it down again.
  _setViewMode(mode, opts = {}) {
    this._viewMode = mode;
    const card = this.shadowRoot.querySelector('.card');
    if (card) card.classList.toggle('grid-mode', mode === 'grid');
    const engWrap = this.shadowRoot.querySelector('#eng-wrap');
    const gridEl = this.shadowRoot.querySelector('#cam-grid');

    if (mode === 'grid') {
      if (engWrap) engWrap.style.display = 'none';
      if (gridEl) { gridEl.style.display = ''; this._mountGrid(); }
      this._eventsMode = 'all';
      const lbl = this.shadowRoot.querySelector('#list-label');
      if (lbl) lbl.textContent = this._t('card.allCameras');
      this._loadAllCamsBackground().then(() => this._renderAll());
    } else {
      if (engWrap) engWrap.style.display = '';
      if (gridEl) gridEl.style.display = 'none';
      this._teardownGrid();
      this._eventsMode = 'camera';
      if (opts.mount !== false) this._mountEngine();
      this._renderAll();
    }
    this._renderStreamCtrl();
    this._renderCamSwitcher();
    this._applyBrowse();
    this.shadowRoot.querySelectorAll('[data-viewmode]').forEach(p =>
      p.classList.toggle('active', p.dataset.viewmode === mode));
  }

  // ── camera switching ──────────────────────────────────────
  async _switchCamera(idx) {
    if (idx === this._activeCamIdx && this._viewMode === 'single') return;
    this._liveRetries = 0; // a fresh camera gets its own retry budget
    // Clicking a cam tab while in grid mode switches to single view of that camera
    if (this._viewMode === 'grid') this._setViewMode('single', { mount: false });
    const prevEnt = this._activeCam?.entity;
    if (prevEnt && this._camCache[prevEnt]) {
      this._camCache[prevEnt].events = this._events;
      this._camCache[prevEnt].recordings = this._recordings;
    }
    this._activeCamIdx = idx;
    const newEnt = this._activeCam?.entity;
    if (!this._camCache[newEnt]) this._camCache[newEnt] = mkCamState();
    // Start the stream before waiting on anything else. The picture is what the
    // user is waiting for; discovery is a round trip that only the events list
    // needs.
    const mounting = this._mountEngine();
    if (!this._camCache[newEnt].discovered) await this._discoverOne(newEnt);
    const cached = this._camCache[newEnt];
    this._events = cached.events||[]; this._recordings = cached.recordings||[];
    this._reviews = cached.reviews||[]; this._kept = cached.kept||[];
    this._renderCamSwitcher(); this._syncStatus();
    await mounting;
    this._renderAll();
    await this._loadWindow(true);
  }

  _startRotate() {
    this._stopRotate();
    const secs = this._config.rotate_seconds || DEFAULT_ROTATE_S;
    this._rotateTimer = setInterval(() => {
      const next = (this._activeCamIdx+1) % this._config.cameras.length;
      this._switchCamera(next);
    }, secs*1000);
  }
  _stopRotate() { if (this._rotateTimer) { clearInterval(this._rotateTimer); this._rotateTimer=null; } }
  _toggleRotate() {
    if (this._rotateTimer) { this._stopRotate(); this._toast(this._t('ctrl.rotateOff'),1800); }
    else {
      if (!this._config.rotate_seconds) this._config.rotate_seconds = DEFAULT_ROTATE_S;
      this._startRotate(); this._toast(this._t('ctrl.rotateOn', { n: this._config.rotate_seconds }),1800);
    }
    this._renderCamSwitcher();
  }

  // ── data ─────────────────────────────────────────────────
  _cc() { return this._camCache[this._activeCam?.entity] || mkCamState(); }
  // The wall wants the whole day at once, the camera's list wants a page it can
  // scroll. Same fetch, two sizes.
  _eventLimit() { return (this._config.events_only || this._eventsMode==='all') ? this._config.events_limit : 20; }
  _dbg(...a) { if (this._config?.debug) console.info('[frigate-card]', ...a); }
  async _ws(p) { return parseWs(await this._hass.callWS(p)); }
  _isNowWindow() { return Math.abs(this._winEnd - Math.floor(Date.now()/1000)) < 120; }

  // Two windows, and they are not the same thing:
  //   _winStart/_winEnd   the view — what the timeline draws, what a finger moves
  //   _dataStart/_dataEnd what has been fetched — always covers the view
  // Keeping them apart is what lets the timeline open on the last hour or two
  // while the events list still holds the whole history window.
  _resetWindows(now) {
    // The album has no timeline to zoom: there its window is the history it lists.
    const hours = this._config.events_only ? this._config.window_hours : this._config.timeline_hours;
    this._winEnd = now; this._winStart = now - hours*3600;
    this._dataEnd = now; this._dataStart = now - this._config.window_hours*3600;
  }
  // Move the view, with its own rules: never past the present, never wider than
  // a fortnight nor narrower than a few minutes. Every gesture goes through here
  // so a drag, a pinch and a wheel all obey the same limits. The rules are their
  // own function because an animation needs to know where it is going before it
  // sets off — the last frame has to land exactly on the window the first frame
  // was aiming at, or the zoom ends with a little jump.
  _viewClamp(start, span) {
    const now = Math.floor(Date.now()/1000);
    const sp = Math.max(300, Math.min(14*DAY, Math.round(span)));
    const s = Math.min(Math.round(start), now - sp);
    return [s, sp];
  }
  _setView(start, span) {
    const [s, sp] = this._viewClamp(start, span);
    this._winStart = s; this._winEnd = s + sp;
    this._exhausted = false;
  }
  _viewInsideData() { return this._winStart >= this._dataStart && this._winEnd <= this._dataEnd; }
  // Keep the fetched range over the view: panning inside what is already here
  // costs nothing, going past the edge refetches around the view instead.
  _ensureData() {
    if (this._viewInsideData()) return;
    const now = Math.floor(Date.now()/1000);
    this._dataEnd = Math.min(now, this._winEnd + 60);
    this._dataStart = this._dataEnd - this._config.window_hours*3600;
  }
  _settleData() { if (!this._viewInsideData()) this._loadWindow(true); }

  async _loadWindow(replace) {
    if (this._loading) return;
    this._loading = true;
    const { clientId, cam } = this._cc(); if (!clientId||!cam) { this._loading=false; return; }
    // The view may have wandered off what has been fetched (a pan into the past,
    // a picked day): move the fetched range over it before asking.
    this._ensureData();
    const after=this._dataStart, before=this._dataEnd;
    try {
      const ev = await this._ws({ type:'frigate/events/get', instance_id:clientId, cameras:[cam], after, before, limit:this._eventLimit() });
      this._events = Array.isArray(ev)?ev:[];
    } catch(e) { console.error('[Frigate] events',e); }
    try {
      const rec = await this._ws({ type:'frigate/recordings/get', instance_id:clientId, camera:cam, after, before });
      this._recordings = Array.isArray(rec)?rec:[];
    } catch(_) { this._recordings=[]; }
    const ent=this._activeCam?.entity;
    if (ent&&this._camCache[ent]) { this._camCache[ent].events=this._events; this._camCache[ent].recordings=this._recordings; }
    if (this._tab==='reviews') await this._loadReviews();
    this._loading = false;
    if (this._eventsMode==='all') this._loadAllCamsBackground();
    this._renderAll();
  }

  // Fetch all non-active cameras in parallel — was sequential, now Promise.all
  async _loadAllCamsBackground() {
    const after=this._dataStart, before=this._dataEnd;
    const others = this._config.cameras.filter(c => {
      const cc = this._camCache[c.entity];
      return c.entity !== this._activeCam?.entity && cc && cc.discovered;
    });
    await Promise.all(others.map(async c => {
      const cc = this._camCache[c.entity];
      try {
        const ev = await this._ws({type:'frigate/events/get',instance_id:cc.clientId,cameras:[cc.cam],after,before,limit:this._eventLimit()});
        cc.events = Array.isArray(ev) ? ev : [];
      } catch(_) {}
    }));
    if (this._eventsMode==='all') { this._renderList(); this._renderEvGrid(); this._renderHeat(); }
  }

  async _loadKept() {
    const {clientId,cam}=this._cc();
    try {
      const k=await this._ws({type:'frigate/events/get',instance_id:clientId,cameras:[cam],favorites:true,limit:200});
      this._kept=Array.isArray(k)?k:[];
      const ent=this._activeCam?.entity; if(ent&&this._camCache[ent]) this._camCache[ent].kept=this._kept;
    } catch(_) { this._kept=[]; }
  }
  async _loadReviews() {
    const {clientId,cam}=this._cc();
    try {
      const r=await this._ws({type:'frigate/reviews/get',instance_id:clientId,cameras:[cam],after:this._dataStart,before:this._dataEnd,limit:200});
      this._reviews=Array.isArray(r)?r:[];
    } catch(_) { this._reviews=[]; }
  }
  async _loadCalendar() {
    const {clientId,cam}=this._cc();
    try {
      const sum=await this._ws({type:'frigate/events/summary',instance_id:clientId,timezone:this._tz()});
      if(Array.isArray(sum)) {
        // The album spans every camera, so its month view must light up a day
        // when any of them recorded, not only the one the card happens to hold.
        const cams = (this._config.events_only || this._eventsMode==='all')
          ? new Set(this._config.cameras.map(c => (this._camCache[c.entity]||{}).cam).filter(Boolean))
          : new Set([cam]);
        this._daysWithActivity=new Set(sum.filter(s=>cams.has(s.camera)&&s.day).map(s=>s.day));
      }
    } catch(_) {}
  }
  _tz() { return this._hass?.config?.time_zone||Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'; }

  async _subscribe() {
    const {clientId}=this._cc(); if(!this._hass?.connection||!clientId) return;
    try {
      this._unsub=this._hass.connection.subscribeMessage(
        msg=>{ if(msg?.type==='end'&&this._isNowWindow()) this._scheduleReload(); },
        {type:'frigate/events/subscribe',instance_id:clientId}
      );
    } catch(_) {}
  }
  _scheduleReload() { clearTimeout(this._rt); this._rt=setTimeout(()=>this._loadWindow(true),1500); }

  // ── shell ─────────────────────────────────────────────────
  _renderShell() {
    // The shell is being rebuilt: any player mounted against the old DOM is now
    // detached, so drop the references (or they read as a live stream forever and
    // the fresh shell never remounts).
    this._engine = null;
    this._poster = null;
    this._ptzAtDefault = null; // the pad is about to be re-rendered with the reset label
    this._tlMeasured = null;   // a fresh .card element is about to need --tl-h again
    this._tlMag = null;        // and a fresh track has nothing magnified
    if (this._tlAnim) cancelAnimationFrame(this._tlAnim);
    this._tlAnim = null; this._tlAnimating = false;
    this._teardownGo2rtc();
    this._teardownGrid();
    // The album is a different card inside the same element: no live feed, no
    // timeline, no events panel — just the recorded moments.
    if (this._config.events_only) { this._renderAlbumShell(); return; }
    this.style.height = '';
    const title = this._config.title || (this._config.cameras.length===1 ? cap(camDisplayName(this._config.cameras[0])) : this._t('card.cameras')) || this._t('card.camera');
    const sub = this._config.subtitle || 'Frigate';
    const multiCam = this._config.cameras.length > 1;
    const ht = new Set(this._config.hidden_tabs || []);
    const tab = (id, icon, label) => ht.has(id) ? '' :
      id === 'live'
        ? `<div class="pill active" data-tab="live">${icon}<span>${label}</span></div>`
        : `<div class="pill icon-only" data-tab="${id}" title="${label}">${icon}</div>`;

    const isCameraOnly = this._config.camera_only;
    const showFloating = this._config.floating_menu;
    const menuPos = this._config.menu_position || 'right';
    const showPtz = this._config.ptz;

    // Two separate pills: the handle is a round button pinned to the edge of the
    // picture, the actions open beside it in a column of their own. Keeping them
    // apart is what lets the actions appear without the handle moving — and it
    // keeps the column a column, instead of a stack with a stray button down the
    // side of it. There is no Live button: every other window has its own way
    // back.
    const floatingMenuHtml = showFloating ? `
      <div class="floating-menu pos-${menuPos}${this._menuOpen?'':' collapsed'}" id="floating-menu">
        <button class="float-btn float-toggle ${this._menuOpen?'active':''}" data-float-act="menu-toggle" title="${this._menuOpen?this._t('menu.close'):this._t('menu.open')}">${this._menuOpen?ICONS.close:ICONS.menu}</button>
        <div class="float-actions">
          <button class="float-btn float-action ${this._modalOpen&&this._modalTab==='recordings'?'active':''}" data-float-act="recordings" title="${this._t('menu.recordings')}">${ICONS.recordings}</button>
          <button class="float-btn float-action ${this._modalOpen&&this._modalTab==='clips'?'active':''}" data-float-act="clips" title="${this._t('menu.clips')}">${ICONS.clips}</button>
          <button class="float-btn float-action ${this._modalOpen&&this._modalTab==='reviews'?'active':''}" data-float-act="reviews" title="${this._t('menu.reviews')}">${ICONS.reviews}</button>
          <button class="float-btn float-action" data-float-act="reload" title="${this._t('menu.reload')}">${ICONS.rotate}</button>
          <button class="float-btn float-action ${this._timelineVisible()?'active':''}" data-float-act="timeline" title="${this._t('menu.timeline')}">${ICONS.timeline}</button>
          ${showPtz ? `<button class="float-btn float-action ${this._ptzOpen?'active':''}" data-float-act="ptz" title="${this._t('menu.ptz')}">${ICONS.ptz}</button>` : ''}
          ${multiCam ? `<button class="float-btn float-action" data-float-act="grid" title="${this._t('menu.grid')}">${this._viewMode==='grid'?ICONS.live:ICONS.grid}</button>` : ''}
          <button class="float-btn float-action" data-float-act="fs" title="${this._t('menu.fullscreen')}">${ICONS.expand}</button>
        </div>
      </div>` : '';

    const ptzOverlayHtml = showPtz ? `
      <div class="ptz-overlay pos-${this._config.ptz_position || 'bottom-right'}" id="ptz-overlay" style="display:${this._ptzOpen?'flex':'none'}">
        <div class="ptz-dpad">
          <div></div>
          <button class="ptz-btn" data-ptz="up" title="${this._t('ptz.panUp')}">${ICONS.up}</button>
          <div></div>
          <button class="ptz-btn" data-ptz="left" title="${this._t('ptz.panLeft')}">${ICONS.left}</button>
          <button class="ptz-btn" data-ptz="reset" title="${this._t('ptz.reset')}">${ICONS.reset}</button>
          <button class="ptz-btn" data-ptz="right" title="${this._t('ptz.panRight')}">${ICONS.right}</button>
          <div></div>
          <button class="ptz-btn" data-ptz="down" title="${this._t('ptz.panDown')}">${ICONS.down}</button>
          <div></div>
        </div>
        <div class="ptz-zoom-row">
          <button class="ptz-btn" data-ptz="zoom-in" title="${this._t('ptz.zoomIn')}">${ICONS.plus}</button>
          <span class="ptz-zoom-lvl" id="ptz-zoom-lvl">${this._zoomScale.toFixed(1)}x</span>
          <button class="ptz-btn" data-ptz="zoom-out" title="${this._t('ptz.zoomOut')}">${ICONS.minus}</button>
        </div>
      </div>` : '';

    const modalHtml = `
      <div class="modal-overlay" id="modal-overlay" style="display:${this._modalOpen?'flex':'none'}">
        <div class="modal-header">
          <div class="modal-title" id="modal-title">${ICONS.clips} <span>${this._t('info.events')}</span></div>
          <button class="modal-close-btn" data-modal-close title="${this._t('modal.close')}">${ICONS.close}</button>
        </div>
        <div class="modal-body" id="modal-body"></div>
      </div>`;

    this.shadowRoot.innerHTML = `<style>${STYLES}</style>
      <ha-card class="card ${this._config.theme==='light'?'theme-light':this._config.theme==='auto'?'theme-auto':''} ${isCameraOnly?'camera-only':''}" id="card">
        <div class="layout" id="layout">
          <div class="col-left">
            <!-- feed: single stream or grid -->
            <div class="feed-area">
              <div id="eng-wrap">
                <div id="engine"><div class="ph">${ICONS.live}<span>${this._t('card.connecting')}</span></div></div>
                <div class="viewer" id="viewer" style="display:none"></div>
                <div class="feed-top" id="feed-top" style="display:none">
                  <button class="btn icon-only back" id="back" title="${this._t('tab.live')}">${ICONS.back}</button>
                  <button class="btn icon-only" id="feed-speed" title="${this._t('viewer.speed')}" style="display:none">1×</button>
                  <div class="feed-actions" id="feed-actions"></div>
                </div>
                ${floatingMenuHtml}
                ${ptzOverlayHtml}
                ${modalHtml}
              </div>
              <div id="cam-grid" style="display:none"></div>
            </div>
            <!-- timeline strip — always visible below the stream/grid -->
            <div class="tl-sec">
              <div class="tl-head">
                <span class="tl-when"><span class="section-label" id="tl-range">—</span><span class="tl-hover" id="tl-hover"></span></span>
                <div class="tl-tools">
                  <div class="tl-modes">
                    <button class="chip ${this._tlMode==='recordings'?'on':''}" data-tl-mode="recordings" title="${this._t('tl.recHint')}">${this._t('tl.recordings')}</button>
                    <button class="chip ${this._tlMode==='events'?'on':''}" data-tl-mode="events" title="${this._t('tl.evHint')}">${this._t('tl.events')}</button>
                  </div>
                  <div class="stream-ctrl-bar" id="stream-ctrl-bar"></div>
                  <button class="tool" id="now-btn" title="${this._t('ctrl.jumpNow')}">⟳</button>
                  <button class="tool" id="filter-btn" title="${this._t('ctrl.filter')}">${ICONS.filter}</button>
                  <button class="tool" id="cal-btn" title="${this._t('ctrl.calendar')}">${ICONS.calendar}</button>
                </div>
              </div>
              <div class="filter-panel" id="filter-panel" style="display:none"></div>
              <div class="cal-panel" id="cal-panel" style="display:none"></div>
              <div class="tl-track" id="tl-track" title="${this._t('tl.dragHint')}"><div class="tl-now"></div></div>
              <div class="tl-labels" id="tl-labels"></div>
              <div class="legend" id="legend"></div>
            </div>
            <!-- info: sits below timeline in col-left -->
            <div class="info-row">
              <div><div class="info-title" id="info-title">${title}</div><div class="info-sub">${sub}</div></div>
              <div class="stats">
                <div class="stat"><div class="sv" id="ev-count">—</div><div class="sl">${this._t('info.events')}</div></div>
                <div class="stat"><div class="sv" id="on-dot" style="color:#4ade80">●</div><div class="sl" id="on-lbl">${this._t('info.online')}</div></div>
              </div>
            </div>
            ${multiCam ? `<div class="cam-switcher" id="cam-switcher"></div>` : ''}
            <div class="latest" id="latest-row" style="display:none"></div>
          </div>

          <div class="col-right">
            <button class="browse-toggle" id="browse-toggle"><span class="chev2" id="chev2">${ICONS.chevron}</span><span class="section-label">${this._t('card.browseTitle')}</span></button>
            <div class="browse" id="browse" style="display:none">
              <div class="tabs">
                ${tab('live', ICONS.live, this._t('tab.live'))}
                ${tab('recordings', ICONS.recordings, this._t('tab.recordings'))}
                ${tab('clips', ICONS.clips, this._t('tab.clips'))}
                ${tab('snapshot', ICONS.snapshot, this._t('tab.snapshots'))}
                ${tab('reviews', ICONS.reviews, this._t('tab.reviews'))}
                ${tab('kept', ICONS.star, this._t('tab.kept'))}
              </div>
              <div class="list-sec">
                <div class="list-head"><span class="section-label" id="list-label">${this._t('card.listRecent')}</span><span class="newtoast" id="newtoast" style="display:none">${this._t('card.new')}</span></div>
                <div class="diag" id="diag" style="display:none"></div>
                <div class="list" id="list"><div class="empty">${this._t('common.loading')}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="toast" id="toast" style="display:none"></div>
      </ha-card>`;
    // Delegated click handling lives on the shadow root, which survives an
    // innerHTML swap, so wire it exactly once. A second copy would run every
    // action twice — and a toggle that fires twice cancels itself out, which
    // reads as a dead button.
    if (!this._clickWired) { this._clickWired = true; this.shadowRoot.addEventListener('click', e=>this._click(e)); }
    this._wireScrub(); this._wireScroll(); this._wirePinchZoom(); this._applyBrowse();
    this._wireFloatingMenu();
    if (multiCam) this._renderCamSwitcher();
    this._renderStreamCtrl();
    this._applyCardStyle();
    this._applyTimeline();
    this._renderLang = this._lang;
  }

  // ── events album (`events_only`) ───────────────────────────
  // A card of recorded moments and nothing else: the live feed, the timeline,
  // the camera tabs and the events panel are all gone. It is built as its own
  // shell rather than by hiding pieces of the camera card, so nothing about the
  // stream can leak in — and so the grid is the card's own content and can fill
  // whatever height the dashboard gives it.
  _renderAlbumShell() {
    this._viewMode = 'album';
    this._eventsMode = 'all';
    // Fill the space the dashboard hands the card (a stretched Sections row);
    // harmless when the parent is auto-sized.
    this.style.height = '100%';
    const title = this._config.title || this._t('card.eventsAlbum');
    const themeCls = this._config.theme === 'light' ? 'theme-light' : '';
    this.shadowRoot.innerHTML = `<style>${STYLES}</style>
      <ha-card class="card album ${themeCls}" id="card">
        <div class="album-head">
          <div class="album-title">
            <span class="info-title" id="album-title">${title}</span>
            <span class="album-sub" id="album-sub"></span>
            <span class="album-count" id="ev-count">—</span>
          </div>
          <div class="album-tools">
            <button class="tool" id="now-btn" title="${this._t('ctrl.jumpNow')}">⟳</button>
            <button class="tool" id="filter-btn" title="${this._t('ctrl.filter')}">${ICONS.filter}</button>
            <button class="tool" id="cal-btn" title="${this._t('ctrl.calendar')}">${ICONS.calendar}</button>
          </div>
        </div>
        <div class="filter-panel" id="filter-panel" style="display:none"></div>
        <div class="cal-panel" id="cal-panel" style="display:none"></div>
        <div class="album-body">
          <div class="album-scroll" id="album-scroll">
            <div id="ev-grid" class="ev-grid"><div class="empty">${this._t('common.loading')}</div></div>
          </div>
          <!-- the heat rail: one bar per time bucket, newest at the top -->
          <div class="album-heat" id="album-heat" title="${this._t('heat.title')}"></div>
        </div>
        <div class="album-viewer" id="album-viewer" style="display:none">
          <div class="album-vtools" id="album-vtools"></div>
          <button class="album-close" data-album-close title="${this._t('modal.close')}">${ICONS.close}</button>
          <div class="album-stage" id="album-stage"></div>
        </div>
        <div class="toast" id="toast" style="display:none"></div>
      </ha-card>`;
    if (!this._clickWired) { this._clickWired = true; this.shadowRoot.addEventListener('click', e=>this._click(e)); }
    this._applyCardStyle();
    this._renderLang = this._lang;
  }

  _wireFloatingMenu() {
    this._applyMenu();
  }
  // The menu is either open or closed, and its own button is the only control.
  // Hovering over a video to bring up a toolbar is not discoverable, and the
  // toolbar then sits in the way of the player's own controls. Closed leaves
  // just the button, which is exactly what keeps it clear of everything else.
  _applyMenu() {
    const menu = this.shadowRoot.querySelector('#floating-menu');
    if (!menu) return;
    menu.classList.toggle('collapsed', !this._menuOpen);
    const t = menu.querySelector('.float-toggle');
    if (t) {
      t.classList.toggle('active', this._menuOpen);
      t.title = this._menuOpen ? this._t('menu.close') : this._t('menu.open');
      t.innerHTML = this._menuOpen ? ICONS.close : ICONS.menu;
    }
  }
  _toggleMenu() { this._menuOpen = !this._menuOpen; this._applyMenu(); }

  _applyCardStyle() {
    const card = this.shadowRoot.querySelector('.card'); if (!card) return;

    // Stream height — also auto-detected from HA Sections --ha-card-height variable.
    // When a Sections row has a fixed height, HA injects --ha-card-height on the host.
    // We propagate it as --stream-h so the stream fills the section naturally.
    const vh = this._config.stream_height;
    if (vh) {
      card.style.setProperty('--stream-h', `${vh}vh`);
    } else {
      // Check if HA Sections injected a card height on the host element
      const haCardH = getComputedStyle(this).getPropertyValue('--ha-card-height').trim();
      if (haCardH) {
        card.style.setProperty('--stream-h', haCardH);
      } else {
        card.style.removeProperty('--stream-h');
      }
    }

    // Theme — for 'auto' prefer HA's own dark-mode flag, fall back to OS media query
    let theme = this._config.theme || 'dark';
    if (theme === 'auto') {
      const haDark = this._hass?.themes?.darkMode;
      const osDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      theme = (haDark ?? osDark ?? true) ? 'dark' : 'light';
    }
    card.classList.toggle('theme-light', theme === 'light');
    card.classList.remove('theme-auto'); // resolved to light/dark above

    // Custom accent color — compute bg/border variants from hex
    const acc = this._config.accent_color;
    if (acc && /^#[0-9a-f]{6}$/i.test(acc)) {
      const r = parseInt(acc.slice(1,3),16), g = parseInt(acc.slice(3,5),16), b = parseInt(acc.slice(5,7),16);
      card.style.setProperty('--c-acc',     acc);
      card.style.setProperty('--c-acc-bg',  `rgba(${r},${g},${b},.18)`);
      card.style.setProperty('--c-acc-bdr', `rgba(${r},${g},${b},.40)`);
    } else {
      card.style.removeProperty('--c-acc');
      card.style.removeProperty('--c-acc-bg');
      card.style.removeProperty('--c-acc-bdr');
    }

    // Custom background color
    const bg = this._config.bg_color;
    if (bg && /^#[0-9a-f]{6}$/i.test(bg)) {
      card.style.setProperty('--c-bg', bg);
    } else {
      card.style.removeProperty('--c-bg');
    }
  }

  _setupResizeObserver() {
    if (this._ro) return;
    this._ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      this._cardWidth = w;
      const card = this.shadowRoot.querySelector('.card');
      if (!card) return;
      const wide = w >= 560, mobile = w < 420;
      card.classList.toggle('wide', wide);
      card.classList.toggle('mobile', mobile);
      this._applyBrowse();
      this._applyEventsCollapsed();
      // The strip's own height is what the picture gives up for it, and the
      // legend wraps at some widths: re-measure whenever the card is resized.
      if (this._timelineVisible()) this._applyTimeline();
      if (wide) this._syncColHeight();
      // Crossing a width where the automatic column count changes (rotating a
      // phone, resizing a window) needs the grid rebuilt: the number of
      // placeholder tiles depends on it. Only on an actual change, since this
      // reconnects every stream.
      if (this._viewMode === 'grid' && this._gridCols
          && this._gridColumns(this._config.cameras.length) !== this._gridCols) {
        this._mountGrid();
      }
    });
    this._ro.observe(this);
  }

  // Match col-right height to col-left so the events panel never makes the card
  // taller than the stream side, and col-right scrolls within that bounded height.
  _syncColHeight() {
    requestAnimationFrame(() => {
      const l = this.shadowRoot.querySelector('.col-left');
      const r = this.shadowRoot.querySelector('.col-right');
      if (!l || !r) return;
      const h = l.offsetHeight;
      if (h > 0) r.style.maxHeight = h + 'px';
    });
  }

  // ── cam switcher ──────────────────────────────────────────
  _renderCamSwitcher() {
    const el = this.shadowRoot.querySelector('#cam-switcher'); if (!el) return;
    if (this._config.cameras.length < 2) { el.style.display='none'; return; }
    el.style.display = '';

    const tabs = this._config.cameras.map((c,i) => {
      const name = cap(camDisplayName(c));
      const active = this._viewMode === 'single' && i === this._activeCamIdx;
      const ok = this._hass?.states[c.entity]?.state !== 'unavailable';
      return `<button class="cam-tab ${active?'active':''}" data-camidx="${i}"><span class="cam-dot" style="color:${ok?'#4ade80':'#ef4444'}">●</span> ${name}</button>`;
    }).join('');
    el.innerHTML = `<div class="cam-tabs">${tabs}</div>
      <button class="cam-rotate ${this._rotateTimer?'on':''}" id="rotate-btn" title="${this._t('ctrl.autoRotate')}">${ICONS.rotate}</button>`;
  }

  // ── interactions ──────────────────────────────────────────
  _closeModal() {
    this._modalOpen = false;
    this._modalTab = null;
    const m = this.shadowRoot.querySelector('#modal-overlay');
    if (m) m.style.display = 'none';
    this._updateFloatingButtons();
  }
  _openModal(tab) {
    this._modalOpen = true;
    this._modalTab = tab;
    this._tab = tab;
    const m = this.shadowRoot.querySelector('#modal-overlay');
    const title = this.shadowRoot.querySelector('#modal-title');
    const body = this.shadowRoot.querySelector('#modal-body');
    if (m) m.style.display = 'flex';
    if (title) {
      const titles = { recordings: this._t('modal.recordings'), clips: this._t('modal.clips'), reviews: this._t('modal.reviews') };
      const icons = { recordings: ICONS.recordings, clips: ICONS.clips, reviews: ICONS.reviews };
      title.innerHTML = `${icons[tab] || ''} <span>${titles[tab] || tab}</span>`;
    }
    if (body) {
      body.innerHTML = `<div class="empty">${this._t('common.loading')}</div>`;
      if (tab === 'recordings') {
        this._renderRecordings(body);
      } else if (tab === 'reviews') {
        this._loadReviews().then(() => this._renderReviews(body));
      } else {
        const events = this._filtered();
        if (!events.length) {
          body.innerHTML = `<div class="empty">${this._t('modal.noEvents')}</div>`;
        } else {
          body.innerHTML = events.map(ev => this._eventCardHTML(ev, false)).join('');
        }
      }
    }
    this._updateFloatingButtons();
  }
  _togglePtz() {
    this._ptzOpen = !this._ptzOpen;
    const ptz = this.shadowRoot.querySelector('#ptz-overlay');
    if (ptz) ptz.style.display = this._ptzOpen ? 'flex' : 'none';
    // The centre button's meaning depends on the current view, and the markup
    // was rendered before either was known: sync both when the pad appears.
    if (this._ptzOpen) this._applyEngineTransform();
    this._updateFloatingButtons();
  }
  _updateFloatingButtons() {
    this.shadowRoot.querySelectorAll('[data-float-act]').forEach(btn => {
      const act = btn.dataset.floatAct;
      if (act === 'ptz') btn.classList.toggle('active', this._ptzOpen);
      else if (act === 'timeline') btn.classList.toggle('active', this._timelineVisible());
      else if (['recordings', 'clips', 'reviews'].includes(act)) btn.classList.toggle('active', this._modalOpen && this._modalTab === act);
    });
  }
  _click(e) {
    if (e.target.closest('[data-modal-close]')) return this._closeModal();
    if (e.target.closest('[data-album-close]')) return this._albumClose();
    if (e.target.id === 'album-viewer') return this._albumClose();
    const floatBtn = e.target.closest('[data-float-act]');
    if (floatBtn) {
      const act = floatBtn.dataset.floatAct;
      if (act === 'menu-toggle') return this._toggleMenu();
      // Anything else was picked out of the menu, so the menu has done its job
      // and closes: a toolbar still sitting over the camera after every press is
      // the one thing that makes it feel like it is in the way.
      if (this._menuOpen) { this._menuOpen = false; this._applyMenu(); }
      if (act === 'reload') return this._reloadStream();
      if (act === 'ptz') return this._togglePtz();
      if (act === 'timeline') return this._toggleTimeline();
      if (act === 'fs') {
        const target = this._viewMode === 'grid'
          ? this.shadowRoot.querySelector('#cam-grid')
          : this.shadowRoot.querySelector('#eng-wrap');
        return this._fullscreen(target);
      }
      if (act === 'grid') return this._setViewMode(this._viewMode === 'grid' ? 'single' : 'grid');
      if (['recordings', 'clips', 'reviews'].includes(act)) {
        if (this._modalOpen && this._modalTab === act) return this._closeModal();
        return this._openModal(act);
      }
    }
    const ptzBtn = e.target.closest('[data-ptz]');
    if (ptzBtn) {
      const p = ptzBtn.dataset.ptz;
      if (p === 'up') return this._ptzMove(0, 50);
      if (p === 'down') return this._ptzMove(0, -50);
      if (p === 'left') return this._ptzMove(50, 0);
      if (p === 'right') return this._ptzMove(-50, 0);
      if (p === 'reset') return this._ptzResetOrClose();
      if (p === 'zoom-in') return this._ptzZoomStep(0.5);
      if (p === 'zoom-out') return this._ptzZoomStep(-0.5);
    }

    if (e.target.closest('#back')) return this._showLive();
    if (e.target.closest('#feed-speed')) return this._cycleRate();
    if (e.target.closest('#sc-grid')) return this._setViewMode(this._viewMode === 'grid' ? 'single' : 'grid');
    if (e.target.closest('#sc-fs')) {
      const target = this._viewMode === 'grid'
        ? this.shadowRoot.querySelector('#cam-grid')
        : this.shadowRoot.querySelector('#eng-wrap');
      return this._fullscreen(target);
    }
    if (e.target.closest('#filter-btn')) return this._toggleFilter();
    if (e.target.closest('#cal-btn')) return this._toggleCal();
    if (e.target.closest('#now-btn')) return this._goNow();
    const tlMode = e.target.closest('[data-tl-mode]'); if (tlMode) return this._setTlMode(tlMode.dataset.tlMode);
    const tlFind = e.target.closest('[data-tl-find]'); if (tlFind) return this._findLastEvent(Number(tlFind.dataset.tlFind));
    if (e.target.closest('#browse-toggle')) return this._toggleBrowse();
    if (e.target.closest('#sc-events')) return this._toggleEvents();
    if (e.target.closest('#rotate-btn')) return this._toggleRotate();
    if (e.target.closest('[data-mark-all]')) return this._markAll();
    if (e.target.closest('[data-toggle-reviewed]')) { this._showReviewed=!this._showReviewed; this._renderList(); return; }

    const viewm = e.target.closest('[data-viewmode]'); if (viewm) return this._setViewMode(viewm.dataset.viewmode);
    const camTab = e.target.closest('[data-camidx]'); if (camTab) return this._switchCamera(Number(camTab.dataset.camidx));
    const calDay = e.target.closest('[data-cal-day]'); if (calDay) return this._pickDay(calDay.dataset.calDay);
    const calNav = e.target.closest('[data-cal-nav]'); if (calNav) return this._calNav(Number(calNav.dataset.calNav));
    const heat = e.target.closest('[data-heat]'); if (heat) return this._heatJump(Number(heat.dataset.heat));
    const fopt = e.target.closest('[data-flabel]'); if (fopt) { this._filterLabel=fopt.dataset.flabel; this._renderFilter(); this._renderList(); this._renderEvGrid(); return; }
    const zopt = e.target.closest('[data-fzone]'); if (zopt) { this._filterZone=zopt.dataset.fzone; this._renderFilter(); this._renderList(); this._renderEvGrid(); return; }
    const favo = e.target.closest('[data-favonly]'); if (favo) { this._favOnly=favo.dataset.favonly==='1'; this._renderFilter(); this._renderList(); this._renderEvGrid(); return; }

    const dl = e.target.closest('[data-dl]'); if (dl) { e.stopPropagation(); return this._download(dl.dataset.dl,dl.dataset.dlFile); }
    const fav = e.target.closest('[data-fav]'); if (fav) { e.stopPropagation(); return this._toggleFav(fav.dataset.fav); }
    const revMark = e.target.closest('[data-mark]'); if (revMark) { const rv=revMark.closest('[data-review-id]'); e.stopPropagation(); if(rv) return this._markReviewed(rv.dataset.reviewId); }
    const revOpen = e.target.closest('[data-review-open]'); if (revOpen) { this._closeModal(); return this._showClipById(revOpen.dataset.reviewOpen); }
    const pill = e.target.closest('[data-tab]'); if (pill) return this._setTab(pill.dataset.tab);
    const tick = e.target.closest('[data-tick]'); if (tick) return this._open(tick.dataset.tick);
    // Stop seek-bar clicks from bubbling up to the recording row handler
    if (e.target.closest('.rec-seek-wrap')) return;
    const recRow = e.target.closest('[data-rs]'); if (recRow) {
      if (this._modalOpen) {
        this._closeModal();
        return this._showRecording(Number(recRow.dataset.rs), Number(recRow.dataset.re));
      }
      return this._toggleRecSeek(recRow);
    }
    const restoreSlot = e.target.closest('[data-restore-slot]');
    if (restoreSlot) { e.stopPropagation(); this._restoreGridSlot(Number(restoreSlot.dataset.restoreSlot)); return; }
    // per-slot fullscreen (from innerHTML-created button in _openInGridSlot)
    const slotFs = e.target.closest('[data-slot-fs]');
    if (slotFs) { e.stopPropagation(); this._fullscreen(slotFs.closest('.grid-slot')); return; }
    const card = e.target.closest('[data-ev]'); if (card) {
      if (this._modalOpen) this._closeModal();
      if (this._viewMode === 'grid') {
        this._openInGridSlot(card.dataset.ev);
      } else if (this._viewMode === 'album') {
        this._albumOpen(card.dataset.ev);
      } else {
        this._open(card.dataset.ev);
      }
    }
  }

  _setTab(tab) {
    this._tab = tab;
    this.shadowRoot.querySelectorAll('[data-tab]').forEach(p=>p.classList.toggle('active',p.dataset.tab===tab));
    const lbl=this.shadowRoot.querySelector('#list-label');
    if (lbl) lbl.textContent=({
      live:this._t('card.listRecent'), recordings:this._t('card.listRecordings'), clips:this._t('card.listClips'),
      snapshot:this._t('card.listSnapshots'), reviews:this._t('card.listReviews'), kept:this._t('card.listKept'),
    })[tab]||tab;
    if (tab==='live') this._showLive();
    if (tab==='reviews') this._loadReviews().then(()=>this._renderList());
    if (tab==='kept') this._loadKept().then(()=>this._renderList());
    this._renderList();
  }

  // ── playback ──────────────────────────────────────────────
  _allDisplayEvents() {
    if (this._eventsMode==='all') {
      const seen=new Set(); const all=[];
      for (const c of this._config.cameras) { const cc=this._camCache[c.entity]; if(cc) for(const ev of (cc.events||[])) if(!seen.has(ev.id)){seen.add(ev.id);all.push(ev);} }
      return all.sort((a,b)=>b.start_time-a.start_time);
    }
    return this._events;
  }
  _stopSlotPlayer(slot) {
    const p = slot?.querySelector('frigate-go2rtc-player');
    if (!p) return;
    this._stopGo2rtcPlayer(p);
    this._gridPlayers = (this._gridPlayers || []).filter(x => x !== p);
  }
  // Put one tile back to its live stream. Rebuilding the whole grid would
  // drop and reconnect every other camera as well.
  _restoreGridSlot(idx) {
    const grid = this.shadowRoot.querySelector('#cam-grid');
    const slot = grid?.querySelectorAll('.grid-slot:not(.placeholder)')?.[idx];
    const cam = this._config.cameras[idx];
    if (!slot || !cam) { this._mountGrid(); return; }
    this._stopSlotPlayer(slot);
    slot.innerHTML = `<div class="grid-label">${cap(camDisplayName(cam))}</div>`;
    if (this._config.live_provider === 'go2rtc') {
      slot.insertAdjacentHTML('afterbegin', '<div class="ph"><div class="ph-spin"></div></div>');
      this._mountGridGo2rtc(slot, cam.entity);
    } else {
      this._mountGridHaStream(slot, cam.entity);
    }
  }
  // Play clip/snapshot inside the matching grid slot (stays in grid mode)
  async _openInGridSlot(id) {
    const ev = this._allDisplayEvents().find(e => e.id === id);
    if (!ev) return;
    const camIdx = this._config.cameras.findIndex(c => {
      const cc = this._camCache[c.entity]; return cc && cc.cam === ev.camera;
    });
    const grid = this.shadowRoot.querySelector('#cam-grid');
    const slots = grid?.querySelectorAll('.grid-slot:not(.placeholder)');
    const slot = slots?.[camIdx < 0 ? 0 : camIdx];
    if (!slot) { this._open(id); return; } // fallback to single view

    this._stopSlotPlayer(slot); // don't leave the tile's stream running headless
    const isSnap = this._tab === 'snapshot' || (!ev.has_clip && ev.has_snapshot);
    const camName = cap((ev.camera||'').replace(/_/g,' '));
    if (isSnap) {
      const url = await this._signed(this._media(ev.id,'snapshot.jpg'));
      slot.innerHTML = `
        <img src="${url}" style="width:100%;height:100%;object-fit:contain;background:#000;display:block">
        <div class="grid-label">${camName}</div>
        <button class="grid-close-btn" data-restore-slot="${camIdx}" title="${this._t('viewer.backToLive')}">✕</button>
        <button class="grid-fs-btn" data-slot-fs title="${this._t('ctrl.fullscreen')}">${ICONS.expand}</button>`;
    } else {
      const url = await this._resolveClipUrl(ev.id);
      slot.innerHTML = `
        <video src="${url}" controls playsinline
          style="width:100%;height:100%;object-fit:contain;background:#000;display:block"></video>
        <div class="grid-label">${camName}</div>
        <button class="grid-close-btn" data-restore-slot="${camIdx}" title="${this._t('viewer.backToLive')}">✕</button>`;
      this._playMedia(slot.querySelector('video'));
    }
  }

  // ── events grid (recording-first view) ────────────────────
  // Every camera's clips and snapshots in one wall, newest first, respecting
  // the same label/zone/favourite filters as the list beside it.
  _eventsForGrid() {
    let list = this._allDisplayEvents().filter(e => e.has_clip || e.has_snapshot);
    if (this._filterLabel !== 'all') list = list.filter(e => e.label === this._filterLabel);
    if (this._filterZone !== 'all') list = list.filter(e => (e.zones || []).includes(this._filterZone));
    if (this._favOnly) list = list.filter(e => e.retain_indefinitely);
    return list.sort((a, b) => b.start_time - a.start_time);
  }
  _evTileHTML(ev) {
    const col = labelColor(ev.label);
    const cam = cap((ev.camera || '').replace(/_/g, ' '));
    const dur = `${this._dur(ev)}s`;
    // The clock alone: every tile sits under the heading of its own day, so the
    // date would be the same one written on the tile all the way down.
    const timeLbl = this._time(ev.start_time);
    const thumb = (ev.has_snapshot || ev.has_clip)
      ? `<img src="${this._media(ev.id,'thumbnail.jpg')}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="tph" style="display:none">${ICONS.person}</div>`
      : `<div class="tph">${ICONS.person}</div>`;
    const dlClip = ev.has_clip ? `<button class="evg-btn" data-dl="${ev.id}" data-dl-file="clip.mp4" title="${this._t('list.dlClip')}">${ICONS.download}</button>` : '';
    const dlSnap = ev.has_snapshot ? `<button class="evg-btn" data-dl="${ev.id}" data-dl-file="snapshot.jpg" title="${this._t('list.dlSnapshot')}">${ICONS.snapshot}</button>` : '';
    return `<div class="evg${ev.has_clip ? ' has-clip' : ''}" data-ev="${ev.id}">
      <div class="evg-th">${thumb}
        <span class="evg-time">${timeLbl}</span>
        <span class="evg-cam" title="${cam}">${cam}</span>
        ${ev.has_clip ? `<span class="evg-play">${ICONS.play}</span>` : ''}
        <span class="evg-dur">${dur}</span>
      </div>
      <div class="evg-bar">
        <span class="tb" style="background:${col}33;color:${col}">${cap(ev.label)}</span>
        <span class="evg-sp"></span>
        ${dlSnap}${dlClip}
      </div>
    </div>`;
  }
  _renderEvGrid() {
    const el = this.shadowRoot.querySelector('#ev-grid');
    if (!el) return;
    const evs = this._eventsForGrid();
    if (!evs.length) { el.innerHTML = `<div class="empty">${this._t('evg.empty')}</div>`; return; }
    // A heading per day. It spans the grid, so the wall reads as days of moments
    // rather than as one run that happens to have dates on the tiles.
    el.innerHTML = this._byDay(evs.map(ev => ({ ts: ev.start_time, html: this._evTileHTML(ev) })));
  }
  // The album never leaves its own card: a tap opens the moment in an overlay on
  // top of the wall, and closing it comes straight back to the grid — no camera
  // view, no live feed.
  async _albumOpen(id) {
    const ev = this._allDisplayEvents().find(e => e.id === id);
    const viewer = this.shadowRoot.querySelector('#album-viewer');
    const stage = this.shadowRoot.querySelector('#album-stage');
    if (!ev || !viewer || !stage) return;
    viewer.style.display = 'flex';
    this._renderAlbumVTools(ev);
    stage.innerHTML = `<div class="ld">${this._t('common.loading')}</div>`;
    if (ev.has_clip) {
      const token = ++this._playSeq; // a second tap while this loads wins
      const url = await this._resolveClipUrl(ev.id);
      if (this._playSeq !== token) return;
      stage.innerHTML = `<video src="${url}" controls playsinline></video>`;
      this._playMedia(stage.querySelector('video'));
    } else {
      const url = await this._signed(this._media(ev.id, 'snapshot.jpg'));
      stage.innerHTML = `<img class="snap" src="${url}">`;
    }
  }
  // Save/label bar over the playing moment. A recording you cannot keep is a
  // dead end, so the clip and the still both get a button.
  _renderAlbumVTools(ev) {
    const t = this.shadowRoot.querySelector('#album-vtools'); if (!t) return;
    const multi = this._config.cameras.length > 1;
    const cam = cap((ev.camera || '').replace(/_/g, ' '));
    const clip = ev.has_clip ? `<button class="tool" data-dl="${ev.id}" data-dl-file="clip.mp4" title="${this._t('list.dlClip')}">${ICONS.download}</button>` : '';
    const snap = ev.has_snapshot ? `<button class="tool" data-dl="${ev.id}" data-dl-file="snapshot.jpg" title="${this._t('list.dlSnapshot')}">${ICONS.snapshot}</button>` : '';
    t.innerHTML = `<span class="album-vtxt">${cap(ev.label)} · ${this._time(ev.start_time)}${multi ? ' · ' + cam : ''}</span>${snap}${clip}`;
  }
  _albumClose() {
    const viewer = this.shadowRoot.querySelector('#album-viewer'); if (viewer) viewer.style.display = 'none';
    const stage = this.shadowRoot.querySelector('#album-stage'); if (stage) stage.innerHTML = '';
    const t = this.shadowRoot.querySelector('#album-vtools'); if (t) t.innerHTML = '';
    this._revokeClipBlob();
  }

  // ── heat rail ─────────────────────────────────────────────
  // A vertical density strip beside the wall: one bar per time bucket, taller
  // when more events fell in it, newest at the top so it reads the same way as
  // the grid. Tapping a bar scrolls the wall to that moment.
  _renderHeat() {
    const rail = this.shadowRoot.querySelector('#album-heat'); if (!rail) return;
    const start = this._winStart, end = this._winEnd, span = Math.max(1, end - start);
    const evs = this._eventsForGrid();
    const step = this._heatStep(span);            // align buckets to nice intervals
    const n = Math.max(1, Math.ceil(span / step));
    const counts = new Array(n).fill(0);
    for (const ev of evs) {
      const i = Math.min(n - 1, Math.max(0, Math.floor((ev.start_time - start) / step)));
      counts[i]++;
    }
    const max = Math.max(1, ...counts);
    let rows = '';
    for (let i = n - 1; i >= 0; i--) {            // newest first
      const ts = start + i * step, c = counts[i], ratio = c / max;
      const bar = c ? `<i class="heat-bar" style="width:${Math.max(8, Math.round(ratio * 100))}%;opacity:${(0.4 + 0.6 * ratio).toFixed(2)}"></i>` : '';
      rows += `<div class="heat-row" data-heat="${ts}" title="${this._time(ts)} · ${c}">${bar}</div>`;
    }
    // Hour ticks so the strip is readable, not just a red smear, and the days
    // marked over them: the wall runs across days, and a rail of identical red
    // bars says nothing about which day a bar belongs to. The hour tick that sits
    // on a midnight is dropped, since the day label is written in its place.
    const mids = this._midnights(start, end);
    let days = '';
    for (const m of mids) {
      const top = ((1 - (m - start) / span) * 100).toFixed(3);
      days += `<div class="heat-day" style="top:${top}%"></div>` +
              `<span class="heat-lbl heat-day-lbl" style="top:${top}%">${this._dayName(m)}</span>`;
    }
    let ticks = '';
    for (let t = Math.ceil(start / 3600) * 3600; t < end; t += 3600) {
      if (mids.some(m => Math.abs(m - t) < 60)) continue;
      ticks += `<span class="heat-lbl" style="top:${((1 - (t - start) / span) * 100).toFixed(3)}%">${this._time(t)}</span>`;
    }
    const now = Math.floor(Date.now() / 1000);
    const nowTick = (now >= start && now <= end)
      ? `<div class="heat-now" style="top:${((1 - (now - start) / span) * 100).toFixed(3)}%"></div>` : '';
    rail.innerHTML = `<div class="heat-rows">${rows}</div>${days}${ticks}${nowTick}`;
  }
  // Bucket size from a target of ~90 bars, snapped up to a step people read in.
  _heatStep(span) {
    const steps = [60, 120, 300, 600, 900, 1800, 3600, 7200, 10800, 21600, 43200, 86400];
    const want = span / 90;
    return steps.find(s => s >= want) || 86400;
  }
  _heatJump(ts) {
    const body = this.shadowRoot.querySelector('#album-scroll');
    const grid = this.shadowRoot.querySelector('#ev-grid');
    const rail = this.shadowRoot.querySelector('#album-heat');
    if (!body || !grid) return;
    rail?.querySelectorAll('.heat-row').forEach(r => r.classList.toggle('on', r.dataset.heat === String(ts)));
    const evs = this._eventsForGrid();            // newest → oldest
    if (!evs.length) return;
    const at = evs.findIndex(e => e.start_time <= Number(ts));
    // The tiles, not the children: a day heading is a child of the grid too, and
    // it must not be counted as one of the moments.
    const tiles = grid.querySelectorAll('.evg');
    const tile = tiles[at >= 0 ? at : evs.length - 1];
    if (!tile) return;
    const b = body.getBoundingClientRect(), t = tile.getBoundingClientRect();
    body.scrollTop += (t.top - b.top) - 8;
    tile.classList.add('heat-target');
    clearTimeout(this._heatT);
    this._heatT = setTimeout(() => tile.classList.remove('heat-target'), 1600);
  }

  _open(id) {
    const ev=this._allDisplayEvents().find(e=>e.id===id);
    if(!ev) return;
    if (this._tab==='snapshot'||(!ev.has_clip&&ev.has_snapshot)) this._showSnapshot(ev);
    else if (ev.has_clip) this._showClip(ev); else this._showSnapshot(ev);
  }
  _enter() {
    this.shadowRoot.querySelector('#engine').style.display='none';
    const v=this.shadowRoot.querySelector('#viewer'); v.style.display='flex';
    this.shadowRoot.querySelector('#feed-top').style.display='flex';
    // Flag it so CSS can nudge the floating menu out from under the back button.
    this.shadowRoot.querySelector('.card')?.classList.add('viewer-open');
    // The picture keeps playing behind the viewer — display:none does not stop a
    // <video> — and its sound would sit under the clip's, which is exactly what
    // makes the clip's own mute button look like it does nothing. Silence the
    // live feed while a moment is open, and hand the volume back on the way out
    // the way the user left it.
    const live = this._findVideo(this._engine, 0);
    if (live && this._liveWasMuted == null) { this._liveWasMuted = live.muted; live.muted = true; }
    this._renderFeedActions();
  }
  // Save buttons while a moment is open in the player: the clip and, when there
  // is one, the still. A recording without a way to keep it is a dead end. They
  // are icons with a title: the bar sits over the picture, and three words of
  // label are three words of the picture covered up.
  _renderFeedActions() {
    const el = this.shadowRoot.querySelector('#feed-actions'); if (!el) return;
    const p = this._playing;
    const ev = p?.ev || (p?.id ? this._allDisplayEvents().find(e => e.id === p.id) : null);
    if (!ev) { el.innerHTML = ''; return; }
    const clip = ev.has_clip ? `<button class="btn icon-only act" data-dl="${ev.id}" data-dl-file="clip.mp4" title="${this._t('viewer.saveClip')}">${ICONS.download}</button>` : '';
    const snap = ev.has_snapshot ? `<button class="btn icon-only act" data-dl="${ev.id}" data-dl-file="snapshot.jpg" title="${this._t('viewer.saveSnap')}">${ICONS.snapshot}</button>` : '';
    el.innerHTML = snap + clip;
  }
  // What the top bar can actually do depends on what is open, so it is synced
  // whenever the viewer is filled rather than drawn once with the shell. The
  // rate only means anything with a video on screen, and each new one starts at
  // 1× — the rate belongs to the video, not to the card.
  _syncFeedBar() {
    const vid = this.shadowRoot.querySelector('#viewer video');
    const spd = this.shadowRoot.querySelector('#feed-speed');
    if (!spd) return;
    spd.style.display = vid ? '' : 'none';
    // The rate outlives the clip: someone skimming at 12× wants the next
    // recording to open at 12× too, and the button says which rate is in force.
    if (vid) this._feedVid = vid;
    if (this._rate == null) this._rate = 1;
    spd.textContent = `${this._rate}×`;
    if (vid) vid.playbackRate = this._rate;
  }
  // 0.5× to 12×, in the steps that are worth having when hunting for a moment.
  // The browser takes a rate far past this, but a clip plays through what is
  // already buffered, so past 12× it spends its time waiting rather than playing.
  _cycleRate() {
    const RATES = [0.5, 1, 1.5, 2, 3, 6, 12];
    const vid = this.shadowRoot.querySelector('#viewer video'); if (!vid) return;
    const i = RATES.indexOf(this._rate == null ? 1 : this._rate);
    this._rate = RATES[(i + 1 + RATES.length) % RATES.length];
    vid.playbackRate = this._rate;
    const spd = this.shadowRoot.querySelector('#feed-speed');
    if (spd) spd.textContent = `${this._rate}×`;
  }
  _showLive() {
    this._playing=null;
    const v=this.shadowRoot.querySelector('#viewer'); v.innerHTML=''; v.style.display='none';
    this.shadowRoot.querySelector('#engine').style.display='block';
    this.shadowRoot.querySelector('#feed-top').style.display='none';
    this.shadowRoot.querySelector('.card')?.classList.remove('viewer-open');
    const live = this._findVideo(this._engine, 0);
    if (live && this._liveWasMuted === false) live.muted = false;
    this._liveWasMuted = null;
    this._feedVid = null;
    this._renderStreamCtrl();
    this._revokeClipBlob();
  }
  _revokeClipBlob() {
    if (this._clipBlobUrl) { URL.revokeObjectURL(this._clipBlobUrl); this._clipBlobUrl = null; }
  }
  // Fetch the clip as a Blob and hand the <video> a blob: URL instead of the
  // direct network URL. iOS' AVPlayer requires proper HTTP range-request support
  // to start progressive MP4 playback; the Frigate/HA media proxy doesn't always
  // provide that, so it fails there with MEDIA_ERR_SRC_NOT_SUPPORTED even though
  // the exact same URL plays fine elsewhere. A blob: URL sidesteps range requests
  // entirely — fine for short event clips, at the cost of no streaming start.
  async _loadClipBlob(url) {
    this._revokeClipBlob();
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const blob = await res.blob();
      this._clipBlobUrl = URL.createObjectURL(blob);
      return this._clipBlobUrl;
    } catch (_) {
      return url;
    }
  }
  // Clips and recordings are played deliberately, so they should be audible.
  // Browsers may still refuse to start unmuted playback (autoplay policy — the
  // user gesture can be lost across the awaits needed to resolve a signed URL,
  // notably on iOS). In that case retry muted rather than not playing at all;
  // the user can unmute from the native controls.
  async _playMedia(vid) {
    if (!vid?.play) return;
    try {
      await vid.play();
    } catch (err) {
      if (err?.name === 'NotAllowedError' && !vid.muted) {
        vid.muted = true;
        try { await vid.play(); } catch (_) { /* give up quietly */ }
      }
    }
  }
  _media(id,file,dl) { return `/api/frigate/${this._cc().clientId}/notifications/${id}/${file}${dl?'?download=true':''}`; }
  // Same HLS route the Home Assistant media browser uses to play this event
  // (custom_components/frigate/media_source.py: vod/event/<id>/index.m3u8).
  _vod(id) { return `/api/frigate/${this._cc().clientId}/vod/event/${id}/index.m3u8`; }
  // Safari/iOS support HLS natively in <video> (no library needed); other
  // browsers don't, but the blob-mp4 path already works fine for them there.
  _hlsNative() {
    const v = document.createElement('video');
    return !!v.canPlayType && v.canPlayType('application/vnd.apple.mpegurl') !== '';
  }
  async _resolveClipUrl(id) {
    if (this._hlsNative()) return this._signed(this._vod(id));
    return this._loadClipBlob(await this._signed(this._media(id,'clip.mp4')));
  }
  async _showClip(ev) {
    const token = ++this._playSeq;
    this._playing={id:ev.id, ev}; this._enter();
    const viewer = this.shadowRoot.querySelector('#viewer');
    viewer.innerHTML = '<div class="ld">' + this._t('common.loading') + '</div>';
    const playUrl = await this._resolveClipUrl(ev.id);
    if (this._playSeq !== token) return;
    viewer.innerHTML=`<video src="${playUrl}" controls playsinline></video>`;
    this._syncFeedBar();
    this._playMedia(viewer.querySelector('video'));
  }
  async _showClipById(id) {
    if(!id) return;
    const token = ++this._playSeq;
    this._playing={id}; this._enter();
    const viewer = this.shadowRoot.querySelector('#viewer');
    viewer.innerHTML = '<div class="ld">' + this._t('common.loading') + '</div>';
    const playUrl = await this._resolveClipUrl(id);
    if (this._playSeq !== token) return;
    viewer.innerHTML=`<video src="${playUrl}" controls playsinline></video>`;
    this._syncFeedBar();
    this._playMedia(viewer.querySelector('video'));
  }
  async _showSnapshot(ev) {
    this._playing={id:ev.id, ev}; this._enter();
    const url = await this._signed(this._media(ev.id,'snapshot.jpg'));
    this.shadowRoot.querySelector('#viewer').innerHTML=`<img class="snap" src="${url}">`;
    this._syncFeedBar(); // a still has no rate to set: the button goes away
  }
  _fmtDurS(s) { // format seconds → m:ss or h:mm:ss
    const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), ss=s%60;
    return h>0 ? `${h}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}` : `${m}:${String(ss).padStart(2,'0')}`;
  }
  async _showRecording(s, e, seekFrom) {
    // Never start on (or past) the end of the window. A zero-length window means
    // clipDur 0, and the progress bar below then runs max=0 while its timeupdate
    // guard fires on every tick — which pinned playback to the first frame the
    // moment you dropped the seek handle at the far right.
    const start = Math.max(s, Math.min(seekFrom || s, e - 1));
    const token = ++this._playSeq; // cancel any in-flight load
    this._playing={rec:s, recEnd:e}; this._enter();
    const viewer = this.shadowRoot.querySelector('#viewer');
    viewer.innerHTML='<div class="ld">' + this._t('common.loading') + '</div>';
    const {clientId,cam}=this._cc();
    const maxChunk = 7200;
    const chunkEnd = Math.min(e, start + maxChunk);
    const clipDur = chunkEnd - start; // real clip length in seconds
    // Anchor the progress bar to the whole recording (s..e), not to the chunk
    // that happens to be loaded. Reloading a chunk always restarts playback at
    // that chunk's own 0:00, so a chunk-relative handle snapped back to the
    // start after every seek — which made a jump that did work read as "it went
    // back to the beginning of the video".
    const rowDur = Math.max(1, e - s);
    const base = Math.max(0, Math.min(start - s, rowDur));
    const url=await this._signed(`/api/frigate/${clientId}/recording/${cam}/start/${start}/end/${chunkEnd}`);
    this._dbg('recording load', { rowStart: s, rowEnd: e, seekFrom, start, chunkEnd, clipDur, url });
    if (this._playSeq !== token) return;
    // No native `controls` — we show our own bar so the browser can't display
    // the wrong file duration (Frigate proxy may serve the full segment file).
    const poster = this._recordingThumbUrl(start, chunkEnd) || this._camPoster(this._activeCam?.entity) || '';
    viewer.innerHTML=`<video src="${url}" playsinline${poster?` poster="${poster}"`:''}></video>
      <div class="rec-dl-bar">
        <div class="rec-ctl-row">
          <button class="rec-pp-btn">⏸</button>
          <button class="rec-mute-btn" title="${this._t('viewer.mute')}">${ICONS.volOn}</button>
          <span class="rec-ctl-time">${this._time(s + base)} / ${this._time(e)}</span>
          <input type="range" class="rec-prog" min="0" max="${Math.max(1, rowDur)}" value="${base}" step="1">
        </div>
        <div class="rec-dl-row">
          <span>${this._t('viewer.downloadFrom', { time: `<span class="rec-dl-time">${this._time(start)}</span>` })}</span>
          <button class="rec-dl-btn">${this._t('viewer.download')}</button>
        </div>
      </div>`;
    this._syncFeedBar();
    const vid     = viewer.querySelector('video');
    const ppBtn   = viewer.querySelector('.rec-pp-btn');
    const muteBtn = viewer.querySelector('.rec-mute-btn');
    const ctTime  = viewer.querySelector('.rec-ctl-time');
    const prog    = viewer.querySelector('.rec-prog');
    const dlTime  = viewer.querySelector('.rec-dl-time');
    const dlBtn   = viewer.querySelector('.rec-dl-btn');
    if (vid) {
      vid.addEventListener('play',  () => { if (ppBtn) ppBtn.textContent = '⏸'; });
      vid.addEventListener('pause', () => { if (ppBtn) ppBtn.textContent = '▶'; });
      vid.addEventListener('ended', () => { if (ppBtn) ppBtn.textContent = '▶'; });
      vid.addEventListener('timeupdate', () => {
        const pos = Math.min(base + Math.floor(vid.currentTime), rowDur);
        if (ctTime) ctTime.textContent = `${this._time(s + pos)} / ${this._time(e)}`;
        if (prog && !prog._seeking) prog.value = pos;
        if (dlTime) dlTime.textContent = this._time(s + pos);
        // This chunk ends before the recording does, so roll into the next one
        // instead of stopping halfway through the window.
        if (clipDur > 0 && vid.currentTime >= clipDur - 0.3) {
          if (!vid._chained && start + clipDur < e - 1) {
            vid._chained = true;
            this._showRecording(s, e, start + clipDur);
            return;
          }
          // Never assign currentTime here: the stream has no range support, so
          // the player answers a seek by reloading from the start.
          if (!vid._ended) { vid._ended = true; vid.pause(); }
        }
      });
    }
    // The icon follows the element, not the click: the autoplay fallback can
    // mute it behind our back, and anything else that writes `muted` would
    // otherwise leave the button lying about the state it is in.
    const syncMute = () => {
      if (!muteBtn || !vid) return;
      muteBtn.innerHTML = vid.muted ? ICONS.volOff : ICONS.volOn;
      muteBtn.title = vid.muted ? this._t('viewer.unmute') : this._t('viewer.mute');
      muteBtn.classList.toggle('off', !!vid.muted);
    };
    if (vid) {
      vid.addEventListener('volumechange', syncMute);
      this._playMedia(vid).then(syncMute);
    }
    if (ppBtn && vid) ppBtn.addEventListener('click', () => { vid.paused ? vid.play() : vid.pause(); });
    if (muteBtn && vid) muteBtn.addEventListener('click', () => { vid.muted = !vid.muted; syncMute(); });
    if (prog && vid) {
      // Seeking inside a recording cannot be left to the browser's own seek.
      // Frigate builds each start/end window on the fly and streams it without
      // byte-range support, so assigning currentTime is ignored and the player
      // snaps back to where it already was. Seek the same way the recording rows
      // do — reload the chunk from the requested offset — which always lands on
      // the right moment. Dragging only moves the label; the reload happens on
      // release so a drag cannot fire one request per pixel.
      const showAt = pos => {
        if (ctTime) ctTime.textContent = `${this._time(s + pos)} / ${this._time(e)}`;
        if (dlTime) dlTime.textContent = this._time(s + pos);
      };
      // Pin the handle the instant the interaction starts, whatever generates it
      // (pointer, mouse, touch). Otherwise timeupdate — which runs a few times a
      // second — can write the *current* playback position over the value the
      // user just picked before `change` reads it, and the seek lands on the
      // start of the clip instead of where they clicked. That race is exactly
      // what "I click at 11:00 and it goes back to the beginning" looks like.
      prog._seeking = false;
      const begin = () => { prog._seeking = true; prog._done = false; };
      for (const ev of ['pointerdown','mousedown','touchstart']) prog.addEventListener(ev, begin);
      for (const ev of ['pointercancel','touchcancel']) prog.addEventListener(ev, () => { prog._seeking = false; });
      prog.addEventListener('input', () => {
        prog._seeking = true;
        prog._done = false;
        prog._target = Math.round(Number(prog.value));
        showAt(prog._target);
      });
      // Fire once per interaction: whichever of these three the browser sends
      // first wins, and the others are ignored.
      const commit = () => {
        if (prog._done) return;
        prog._done = true;
        prog._seeking = false;
        const pos = prog._target ?? Math.round(Number(prog.value));
        prog._target = null;
        // pos is now an offset into the whole recording, so the chunk currently
        // loaded starts at `base`. Landing inside it still needs a reload (the
        // stream is not seekable), so only skip a no-op click.
        if (!(pos >= 0) || pos >= rowDur || Math.abs(pos - base) < 1) return;
        this._showRecording(s, e, s + pos);
      };
      prog.addEventListener('change', commit);
      prog.addEventListener('pointerup', commit);
      prog.addEventListener('touchend', commit);
    }
    if (dlBtn && vid) dlBtn.addEventListener('click', () => {
      const offset = Math.floor(vid.currentTime);
      this._downloadRecRange(start + offset, e);
    });
  }
  // Toggle seek bar for a recording row
  _toggleRecSeek(row) {
    // Capture rs/re directly from this specific row's dataset — no shared state
    const rs = +row.dataset.rs;
    const re = +row.dataset.re;
    const existing = row.querySelector('.rec-seek-wrap');
    if (existing) {
      // Second click: close the seek bar, leave the video playing as-is
      existing.remove();
      return;
    }
    // First click: show seek bar and start playing from beginning immediately
    const d = Math.max(1, re - rs);
    const wrap = document.createElement('div');
    wrap.className = 'rec-seek-wrap';
    // Helper: offset seconds → absolute wall-clock label
    const toTime = v => new Date((rs + v) * 1000).toLocaleTimeString(this._locale, {hour:'2-digit', minute:'2-digit', second:'2-digit'});
    wrap.innerHTML = `<div class="rec-seek-row">
      <input type="range" class="rec-seek-bar" min="0" max="${d}" value="0" step="1">
      <span class="rec-seek-lbl">▶ ${this._time(rs)}</span>
    </div>`;
    row.querySelector('.rinf').appendChild(wrap);
    const bar = wrap.querySelector('.rec-seek-bar');
    const lbl = wrap.querySelector('.rec-seek-lbl');
    // Update label while dragging (no video load)
    bar.addEventListener('input', ev => { ev.stopPropagation(); lbl.textContent = `▶ ${toTime(+bar.value)}`; });
    // Load video at seeked position on mouse-up/touch-end
    bar.addEventListener('change', ev => {
      ev.stopPropagation();
      const offset = +bar.value;
      this._showRecording(rs, re, offset > 0 ? rs + offset : rs);
    });
    // Play from start immediately so user sees something while positioning the bar
    this._showRecording(rs, re);
  }
  // Click the timeline to move the recording on screen to that moment. There is
  // no in-stream seek to use: Frigate builds each start/end window on the fly and
  // streams it without byte-range support, so `currentTime` is ignored. Reload
  // the chunk starting at the clicked moment instead — the same path the player's
  // seek bar and the recording rows already take.
  _seekFromTimeline(ts) {
    const p = this._playing;
    this._dbg('timeline click', { clicked: this._time(ts), ts, playing: p });
    if (p && p.rec != null) {
      // A recording is open: jump within it, or open whichever recording covers
      // the clicked moment when the click fell outside the open one.
      const start = p.rec, end = p.recEnd ?? p.rec + 1;
      if (ts >= start && ts <= end) {
        this._showRecording(start, end, Math.max(start, Math.min(Math.floor(ts), end - 1)));
        return;
      }
    } else if (p || (this._tlMode !== 'recordings' && this._tab !== 'recordings')) {
      // A clip/snapshot is open, or the strip is showing events rather than
      // recordings: a click on the track itself has nothing of its own to open.
      return;
    }
    const rec = this._mergeRecs(this._recordings)
      .find(r => ts >= r.start_time && ts <= (r.end_time ?? r.start_time + 1));
    if (!rec) return; // nothing was recorded at this moment
    const start = Math.floor(rec.start_time), end = Math.floor(rec.end_time ?? ts + 1);
    this._showRecording(start, end, Math.max(start, Math.min(Math.floor(ts), end - 1)));
  }
  async _signed(path) { try { const r=await this._hass.callWS({type:'auth/sign_path',path,expires:3600}); return r?.path||path; } catch(_) { return path; } }
  // Recursively find a <video>, piercing open shadow roots (e.g. ha-camera-stream
  // renders its <video> inside its own shadow DOM, invisible to plain querySelector).
  _findVideo(root, depth) {
    if (!root || (depth | 0) > 8) return null;
    if (root.tagName === 'VIDEO') return root;
    const direct = root.querySelector?.('video');
    if (direct) return direct;
    // The element's *own* shadow root is not reachable through querySelectorAll,
    // which walks light DOM only. ha-hls-player renders its <video> exactly
    // there, so without this the player could never be found — and a player that
    // is never found is never revealed.
    if (root.shadowRoot) {
      const v = this._findVideo(root.shadowRoot, (depth | 0) + 1);
      if (v) return v;
    }
    const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const node of all) {
      if (node.shadowRoot) {
        const v = this._findVideo(node.shadowRoot, (depth | 0) + 1);
        if (v) return v;
      }
    }
    return null;
  }
  _exitFullscreen() {
    if (!(document.fullscreenElement || document.webkitFullscreenElement)) return;
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exit) { const p = exit.call(document); if (p?.catch) p.catch(() => {}); }
  }
  _fullscreen(el) {
    if (!el) return;
    // Toggle: a second press leaves fullscreen. Without this the button was a
    // one-way trip and users had to reach for Escape.
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      this._exitFullscreen();
      return;
    }
    // iPhone Safari/WKWebView: Element.requestFullscreen may exist as a function
    // but silently no-ops/rejects — document.fullscreenEnabled is the real signal.
    // Only native fullscreen on the <video> element itself works there.
    const fsEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled;
    if (!fsEnabled) {
      const vid = this._findVideo(el, 0);
      if (vid && typeof vid.webkitEnterFullscreen === 'function') { vid.webkitEnterFullscreen(); return; }
    }
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) { const p = req.call(el); if (p?.catch) p.catch(() => {}); }
  }
  _goNow() { const now=Math.floor(Date.now()/1000); this._resetWindows(now); this._calMonth=null; this._selDay=null; this._loadWindow(true); }
  _download(id,file) { const a=document.createElement('a'); a.href=this._media(id,file,true); a.download=`${this._cc().cam}_${id}_${file}`; document.body.appendChild(a); a.click(); a.remove(); }

  // ── favorites (realtime) ──────────────────────────────────
  _toggleFav(id) {
    const ev=this._events.find(e=>e.id===id); if(!ev) return;
    const next=!ev.retain_indefinitely;
    ev.retain_indefinitely=next;
    if (next) { if(!this._kept.find(e=>e.id===id)) this._kept=[{...ev},...this._kept]; }
    else { this._kept=this._kept.filter(e=>e.id!==id); }
    const ent=this._activeCam?.entity; if(ent&&this._camCache[ent]) this._camCache[ent].kept=this._kept;
    this._renderList(); this._renderLatest();
    const {clientId}=this._cc();
    this._hass.callWS({type:'frigate/event/retain',instance_id:clientId,event_id:id,retain:next})
      .catch(err=>{
        ev.retain_indefinitely=!next;
        if(next) this._kept=this._kept.filter(e=>e.id!==id);
        else if(!this._kept.find(e=>e.id===id)) this._kept=[{...ev},...this._kept];
        this._renderList();
        console.warn('[Frigate] retain failed',err);
        this._toast(this._t('ctrl.saveFailed'));
      });
  }
  async _markAll() {
    const ids=this._reviews.filter(r=>!r.has_been_reviewed).map(r=>r.id); if(!ids.length) return;
    const {clientId}=this._cc();
    try { await this._hass.callWS({type:'frigate/reviews/viewed',instance_id:clientId,ids,viewed:true}); this._reviews.forEach(r=>r.has_been_reviewed=true); this._renderList(); }
    catch(e) { console.warn(e); }
  }
  async _markReviewed(id) {
    const {clientId}=this._cc();
    try { await this._hass.callWS({type:'frigate/reviews/viewed',instance_id:clientId,ids:[id],viewed:true}); const r=this._reviews.find(x=>x.id===id); if(r) r.has_been_reviewed=true; this._renderList(); }
    catch(e) { console.warn(e); }
  }

  // ── browse / filter ───────────────────────────────────────
  _applyBrowse() {
    const card = this.shadowRoot.querySelector('.card');
    const isWide = card?.classList.contains('wide');
    const isGrid = card?.classList.contains('grid-mode');
    const b=this.shadowRoot.querySelector('#browse'); const c=this.shadowRoot.querySelector('#chev2');
    // Wide: always open. Narrow grid: open by default but collapsable via toggle.
    const forceOpen = isWide;
    if (b) b.style.display=(forceOpen||this._browseOpen)?'block':'none';
    if (c) c.style.transform=(forceOpen||this._browseOpen)?'rotate(180deg)':'';
  }
  _toggleBrowse() { this._browseOpen=!this._browseOpen; this._applyBrowse(); }
  _toast(msg,ms=3500) {
    const t=this.shadowRoot.querySelector('#toast'); if(!t) return;
    t.textContent=msg; t.style.display='block';
    clearTimeout(this._toastT); this._toastT=setTimeout(()=>{ t.style.display='none'; },ms);
  }
  _toggleFilter() { const p=this.shadowRoot.querySelector('#filter-panel'); const open=p.style.display==='none'; this.shadowRoot.querySelector('#cal-panel').style.display='none'; p.style.display=open?'block':'none'; if(open) this._renderFilter(); }
  _toggleCal() { const p=this.shadowRoot.querySelector('#cal-panel'); const open=p.style.display==='none'; this.shadowRoot.querySelector('#filter-panel').style.display='none'; p.style.display=open?'block':'none'; if(open){ this._calMonth=this._calMonth||new Date(this._winEnd*1000); this._renderCal(); } }

  // ── calendar ──────────────────────────────────────────────
  _calNav(d) { const m=this._calMonth||new Date(); m.setMonth(m.getMonth()+d); this._calMonth=new Date(m); this._renderCal(); }
  _pickDay(ds) {
    const [y,mo,da]=ds.split('-').map(Number);
    const s=Math.floor(new Date(y,mo-1,da,0,0,0).getTime()/1000);
    const e=Math.min(Math.floor(new Date(y,mo-1,da,23,59,59).getTime()/1000),Math.floor(Date.now()/1000));
    // A picked day is a deliberate zoom-out to a whole day, so it sets the view
    // and the fetched range together.
    this._setView(s, e-s);
    this._dataStart=s; this._dataEnd=e;
    this._selDay=ds;
    this.shadowRoot.querySelector('#cal-panel').style.display='none'; this._loadWindow(true);
  }
  _renderCal() {
    const p=this.shadowRoot.querySelector('#cal-panel'); if(!p) return;
    const m=this._calMonth||new Date(); const y=m.getFullYear(),mo=m.getMonth();
    const first=new Date(y,mo,1); const startDow=(first.getDay()+6)%7; const days=new Date(y,mo+1,0).getDate();
    const today=this._todayStr();
    let cells=''; for(let i=0;i<startDow;i++) cells+='<span></span>';
    for(let d=1;d<=days;d++){
      const ds=`${y}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      // Mark the two days that matter: the one you are looking at, and today.
      const cls=`cday${ds===today?' today':''}${ds===this._selDay?' sel':''}`;
      const ttl=`${ds}${ds===today?` (${this._t('cal.today')})`:''}`;
      cells+=`<button class="${cls}" data-cal-day="${ds}" title="${ttl}">${d}${this._daysWithActivity.has(ds)?'<i class="cdot"></i>':''}</button>`;
    }
    // Monday-first weekday initials in the user's language (2024-01-01 was a Monday).
    const dow = [...Array(7)].map((_,i)=>new Date(2024,0,1+i).toLocaleDateString(this._locale,{weekday:'narrow'}));
    p.innerHTML=`<div class="cal-head"><button data-cal-nav="-1">‹</button><b>${m.toLocaleDateString(this._locale,{month:'long',year:'numeric'})}</b><button data-cal-nav="1">›</button></div>
      <div class="cal-dow">${dow.map(d=>`<span>${d}</span>`).join('')}</div>
      <div class="cal-grid">${cells}</div>`;
  }
  _renderFilter() {
    const p=this.shadowRoot.querySelector('#filter-panel'); if(!p) return;
    const lbls=['all',...this._labels()]; const zones=['all',...this._zones()];
    const chip=(val,cur,attr)=>`<button class="chip ${val===cur?'on':''}" data-${attr}="${val}">${val==='all'?this._t('filter.all'):cap(val)}</button>`;
    p.innerHTML=`<div class="frow"><span class="frow-l">${this._t('filter.label')}</span>${lbls.map(l=>chip(l,this._filterLabel,'flabel')).join('')}</div>
      <div class="frow"><span class="frow-l">${this._t('filter.zone')}</span>${zones.map(z=>chip(z,this._filterZone,'fzone')).join('')}</div>
      <div class="frow"><span class="frow-l">${this._t('filter.show')}</span>
        <button class="chip ${!this._favOnly?'on':''}" data-favonly="0">${this._t('filter.all')}</button>
        <button class="chip ${this._favOnly?'on':''}" data-favonly="1">${this._t('filter.favorites')}</button></div>`;
  }

  // ── scrub / scroll ────────────────────────────────────────
  _wireScrub() {
    const track=this.shadowRoot.querySelector('#tl-track'); if(!track) return;
    let drag=false,sx=0,sws=0,swe=0,moved=false;
    const dn=x=>{drag=true;moved=false;sx=x;sws=this._winStart;swe=this._winEnd;track.classList.add('grab');};
    const mv=x=>{if(!drag)return;const w=track.clientWidth||1;const sp=swe-sws;
      // A press has to travel a few pixels before it counts as a pan. Seconds are
      // far finer than pixels here — one pixel is minutes on a wide window — so
      // measuring the drag in the window's own units made a click with a pixel of
      // handshake into a tiny pan, and a tiny pan never opens anything.
      if(!moved && Math.abs(x-sx)<=3) return;
      moved=true;
      const sh=Math.round((x-sx)/w*sp);
      this._setView(sws-sh,sp);this._renderTimeline();this._renderRange();pointAt(x);};
    // A press that never panned is a click: jump the recording to that moment.
    // A press that panned is the usual window drag, which only reaches for the
    // data when the pan went past what is already loaded.
    const up=()=>{if(!drag)return;drag=false;track.classList.remove('grab');
      if(moved){this._settleData();return;}
      const rect=track.getBoundingClientRect();const frac=Math.min(1,Math.max(0,(sx-rect.left)/(rect.width||1)));
      this._seekFromTimeline(Math.round(this._winStart+(this._winEnd-this._winStart)*frac));
    };
    // Reading the strip: a line where the pointer is and the time it is over,
    // spelled out beside the range. The line itself is drawn by the renderer from
    // _tlHover, so it survives the redraw a wheel step causes under a still
    // pointer; here it is only moved, which is cheap enough to do per mousemove.
    const readout=this.shadowRoot.querySelector('#tl-hover');
    const pointAt=x=>{
      const rect=track.getBoundingClientRect();
      const frac=Math.min(1,Math.max(0,(x-rect.left)/(rect.width||1)));
      const s=this._winStart,sp=this._winEnd-s;
      this._tlHover=frac;
      const cur=track.querySelector('.tl-cursor');
      if(cur){cur.style.display='block';cur.style.left=(frac*100).toFixed(3)+'%';}
      if(readout){ readout.textContent='· '+this._timeAt(s+sp*frac)+this._recAtLabel(s+sp*frac); this._measureTimeline(); }
    };
    const clearHover=()=>{
      this._tlHover=null;
      const cur=track.querySelector('.tl-cursor'); if(cur) cur.style.display='none';
      if(readout){ readout.textContent=''; this._measureTimeline(); }
    };
    // Resting on the strip magnifies what is under the pointer. Events that sit
    // on top of each other are the ones that cannot be picked, and a moment of
    // stillness is a clear enough way to ask for a closer look. It is a look and
    // not a move: leaving the strip puts the window back the way it was, and a
    // real gesture — drag, wheel, pinch — takes the magnified view as the new
    // one. Once magnified, the pointer is free to move: re-centring on every
    // twitch would slide the dot out from under the click.
    const MAG = 3, DWELL_MS = 1200, ANIM_MS = 300;
    let dwellX = null;
    const cancelDwell = () => { clearTimeout(this._tlDwell); this._tlDwell = null; };
    const nowMs = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());
    const stopAnim = () => { if (this._tlAnim) cancelAnimationFrame(this._tlAnim); this._tlAnim = null; this._tlAnimating = false; };
    const commitMag = () => { stopAnim(); this._tlMag = null; };
    // The magnify is the one view change that is only ever a look, so it is the
    // one that gets an animation: the window slides to its new size over a few
    // frames and reads as a zoom, where a single jump reads as the strip being
    // dragged sideways. Every frame is anchored on the same instant — the one
    // under the pointer — so the thing being looked at does not move a pixel.
    const animate = (anchor, from, target, frac) => {
      stopAnim();
      const [ts, tsp] = target;
      const t0 = nowMs();
      let mine = [this._winStart, this._winEnd];   // the window this animation last set
      this._tlAnimating = true;
      const frame = () => {
        // A view moved by anything else — a click on an event, a chip, the
        // calendar — is the answer, not something to be painted over: hand over
        // and drop the window that was going to be put back.
        if (this._winStart !== mine[0] || this._winEnd !== mine[1]) { stopAnim(); this._tlMag = null; return; }
        const p = Math.min(1, (nowMs() - t0) / ANIM_MS);
        const k = p < .5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2)/2;   // ease in, ease out
        const sp = from + (tsp - from) * k;
        // Last frame lands exactly on the window that was aimed at, not on one
        // more rounded step of the way there.
        this._setView(p < 1 ? anchor - sp*frac : ts, p < 1 ? sp : tsp);
        mine = [this._winStart, this._winEnd];
        this._renderTimeline(); this._renderRange();
        if (p < 1) { this._tlAnim = requestAnimationFrame(frame); }
        else { this._tlAnim = null; this._tlAnimating = false; }
      };
      this._tlAnim = requestAnimationFrame(frame);
    };
    const restoreMag = () => {
      const m = this._tlMag; if (!m) return;
      const wasAnimating = this._tlAnimating === true;
      this._tlMag = null;
      stopAnim();
      // Only put back a window that is still the magnified one. Anything that
      // moved on in the meantime — the pointer that leads to the newest event,
      // a chip, the calendar — meant the magnified view, and the jump out of it.
      if (!wasAnimating && (this._winStart !== m.view[0] || this._winEnd !== m.view[1])) return;
      const frac = (m.anchor - m.view[0]) / Math.max(1, m.view[1] - m.view[0]);
      animate(m.anchor, this._winEnd - this._winStart, this._viewClamp(m.start, m.end - m.start), frac);
    };
    const magnifyAt = x => {
      if (this._tlMag) return;
      const rect = track.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (x - rect.left) / (rect.width || 1)));
      const s0 = this._winStart, span0 = this._winEnd - s0;
      if (span0 < 900) return;                    // already close enough to pick from
      const nsp = Math.max(300, Math.round(span0 / MAG));
      const target = this._viewClamp(s0 + span0*frac - nsp*frac, nsp);
      // The instant the whole zoom is built around: the one the pointer is on.
      // Taking it from the target rather than from where we asked to go keeps the
      // animation honest when the window cannot go where it wanted (the present
      // is a hard edge).
      const anchor = target[0] + target[1]*frac;
      this._tlMag = { start: s0, end: this._winEnd, anchor, view: [target[0], target[0] + target[1]] };
      animate(anchor, span0, target, frac);
      pointAt(x);                                 // the line and its time stay put
    };
    // The anchor is the pointer's latest position, not the one the dwell was
    // armed on: six pixels of drift is six pixels the zoom would be off by, and
    // off by here means "the thing I was looking at slid sideways".
    let lastX = null;
    const armDwell = x => {
      if (dwellX != null && Math.abs(x - dwellX) <= 6) return; // a shaky hand is still resting
      dwellX = x; cancelDwell();
      this._tlDwell = setTimeout(() => { this._tlDwell = null; magnifyAt(lastX != null ? lastX : dwellX); }, DWELL_MS);
    };
    track.addEventListener('mousemove', e => { lastX = e.clientX; pointAt(lastX); if (!drag) armDwell(lastX); });
    track.addEventListener('mouseleave', () => { clearHover(); cancelDwell(); dwellX = null; lastX = null; restoreMag(); });
    // An event tick has its own click handler, and so has the pointer that leads
    // to the newest moment; a press on either must not also run the timeline
    // seek, or it would open the recording behind the clip.
    track.addEventListener('mousedown',e=>{if(e.target.closest('[data-tick]')||e.target.closest('[data-tl-find]'))return;e.preventDefault();cancelDwell();commitMag();dn(e.clientX);});
    // These two live on window, which a re-render does not touch, so drop the
    // previous pair first — a second copy pans the timeline twice per move.
    if (this._scrubWin) {
      window.removeEventListener('mousemove', this._scrubWin.mv);
      window.removeEventListener('mouseup', this._scrubWin.up);
    }
    const scrubMv = e => mv(e.clientX), scrubUp = up;
    this._scrubWin = { mv: scrubMv, up: scrubUp };
    window.addEventListener('mousemove', scrubMv);
    window.addEventListener('mouseup', scrubUp);
    // Pinch to zoom the window, the touch counterpart of the wheel below. One
    // finger pans, two zoom, and the moment the second finger lands the pan is
    // abandoned so the window does not jump. The time under the fingers stays
    // put, which is what makes a pinch feel like it is zooming and not sliding.
    const gap=(a,b)=>Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
    let pinch=null;
    // Pan and zoom are cheap while the data is already under the view: only go
    // back to the server once the view leaves what has been fetched.
    const settle=()=>{clearTimeout(this._wt);this._wt=setTimeout(()=>this._settleData(),350);};
    track.addEventListener('touchstart',e=>{
      cancelDwell(); commitMag();   // touch has no hover, and a touch is a gesture
      if(e.touches.length===2){
        drag=false;track.classList.remove('grab');
        const rect=track.getBoundingClientRect();
        const midX=(e.touches[0].clientX+e.touches[1].clientX)/2;
        const frac=Math.min(1,Math.max(0,(midX-rect.left)/rect.width));
        const span=this._winEnd-this._winStart;
        pinch={d0:gap(e.touches[0],e.touches[1])||1,span0:span,anchor:this._winStart+span*frac,frac};
      } else { pinch=null; dn(e.touches[0].clientX); }
    },{passive:true});
    track.addEventListener('touchmove',e=>{
      if(pinch&&e.touches.length===2){
        e.preventDefault(); // otherwise the browser zooms the page instead
        const d=gap(e.touches[0],e.touches[1])||1;
        const nsp=pinch.span0*(pinch.d0/d);
        this._setView(pinch.anchor-nsp*pinch.frac, nsp);
        this._renderTimeline();this._renderRange();
      } else if(!pinch) mv(e.touches[0].clientX);
    },{passive:false});
    track.addEventListener('touchend',e=>{
      if(pinch){ if(e.touches.length<2){pinch=null;settle();} return; }
      up(); clearHover();
    });
    // Wheel: the plain gesture slides the timeline sideways, and Ctrl zooms —
    // the same pairing as every map and editor. Scrolling down walks forward,
    // towards now, which is the way a sideways scroller moves everywhere else on
    // the web; backwards is scrolling up. A trackpad pinch arrives here as
    // ctrl+wheel, so pinching the strip zooms it too.
    track.addEventListener('wheel',e=>{
      e.preventDefault();
      cancelDwell(); commitMag();   // a real gesture: the magnified view is kept as it is
      const rect=track.getBoundingClientRect();const frac=Math.min(1,Math.max(0,(e.clientX-rect.left)/(rect.width||1)));
      const span=this._winEnd-this._winStart;
      // Browsers report pixels, lines or pages; everything below wants pixels.
      const unit=e.deltaMode===1?16:(e.deltaMode===2?rect.width:1);
      const dx=e.deltaX*unit, dy=e.deltaY*unit;
      if(e.ctrlKey){
        const anch=this._winStart+span*frac;
        const f=dy>0?1.25:0.8;
        this._setView(anch-span*f*frac, span*f);
      } else {
        // A horizontal wheel already means left/right; a vertical one means
        // forward, so scrolling down reaches towards now.
        const d=Math.abs(dx)>Math.abs(dy)?dx:dy;
        const shift=Math.round(d/(rect.width||1)*span);
        if(shift) this._setView(this._winStart+shift, span);
      }
      this._renderTimeline();this._renderRange();
      settle();
    },{passive:false});
  }
  _wireScroll() {
    const list=this.shadowRoot.querySelector('#list'); if(!list) return;
    list.addEventListener('scroll',()=>{if(this._loading||this._exhausted)return;if(list.scrollTop+list.clientHeight>=list.scrollHeight-40)this._loadOlder();});
  }
  async _loadOlder() {
    const before=this._events.length?Math.floor(Math.min(...this._events.map(e=>e.start_time))):this._dataStart;
    this._loading=true; const {clientId,cam}=this._cc();
    try{
      const older=await this._ws({type:'frigate/events/get',instance_id:clientId,cameras:[cam],before,limit:50});
      const arr=Array.isArray(older)?older.filter(o=>!this._events.some(e=>e.id===o.id)):[];
      if(!arr.length)this._exhausted=true; else{this._events=this._events.concat(arr);this._dataStart=Math.min(this._dataStart,...arr.map(e=>e.start_time));}
    }catch(_){}
    this._loading=false; this._renderList();this._renderTimeline();this._renderRange();
  }

  // ── render ────────────────────────────────────────────────
  _syncStatus() {
    const ent=this._hass?.states?.[this._activeCam?.entity]; if(!ent) return;
    const dot=this._$('#on-dot'),lbl=this._$('#on-lbl'),title=this._$('#info-title');
    const ok=ent.state!=='unavailable';
    if(dot) dot.style.color=ok?'#4ade80':'#ef4444';
    if(lbl) lbl.textContent=ok?this._t('info.online'):this._t('info.offline');
    if(title) {
      const c=this._activeCam; const n=this._config.title||(this._config.cameras.length>1?cap(camDisplayName(c)):this._t('card.camera'));
      title.textContent=n;
    }
  }
  // Cached querySelector — avoids repeated DOM lookups on every render tick
  _$(sel) { return this._domCache[sel] || (this._domCache[sel] = this.shadowRoot.querySelector(sel)); }

  _renderAll() { this._renderStats();this._renderLatest();this._renderTimeline();this._renderLegend();this._renderRange();this._renderList();this._renderEvGrid();this._renderHeat();this._syncStatus();this._renderCamSwitcher();if(this._cardWidth>=560)this._syncColHeight(); }
  _renderStats() { const el=this._$('#ev-count'); if(el) el.textContent=String(this._allDisplayEvents().length); }
  _renderRange() {
    const el=this._$('#tl-range');
    const sub=this.shadowRoot.querySelector('#album-sub');
    if(!el && !sub) return;
    const span=this._winEnd-this._winStart; const fmt=t=>new Date(t*1000).toLocaleTimeString(this._locale,{hour:'2-digit',minute:'2-digit'});
    const now=this._t('common.now');
    const text = span<=DAY+60
      ? `${new Date(this._winEnd*1000).toLocaleDateString(this._locale,{day:'2-digit',month:'short'})} · ${fmt(this._winStart)}–${this._isNowWindow()?now:fmt(this._winEnd)}`
      : `${new Date(this._winStart*1000).toLocaleDateString(this._locale,{day:'2-digit',month:'short'})} – ${this._isNowWindow()?now:new Date(this._winEnd*1000).toLocaleDateString(this._locale,{day:'2-digit',month:'short'})}`;
    if(el) el.textContent=text;
    if(sub) sub.textContent=text;
  }
  _renderLegend() {
    const el=this._$('#legend'); if(!el) return;
    let html='';
    if (this._tlMode === 'recordings') {
      // The legend explains the strip, and the strip is one thing at a time.
      if (this._eventsMode==='all') {
        // One colour for every camera's ribs, so the chips name the reading and
        // not a colour that is no longer there.
        html+=`<span class="lg"><i style="background:var(--c-acc)"></i>${this._t('card.allCameras')}</span>`;
      } else {
        html+=`<span class="lg"><i style="background:var(--c-acc)"></i>${this._t('list.rec')}</span>`;
      }
      // What the ribs mean: the same shape as the strip, and what it is saying.
      html+=`<span class="lg">${ICONS.bone}${this._t('tl.less')} → ${this._t('tl.more')}</span>`;
    } else {
      html=this._labels().map(l=>`<span class="lg"><i style="background:${labelColor(l)}"></i>${cap(l)}</span>`).join('');
    }
    el.innerHTML=html;
  }
  // Which strip the timeline is drawing. Kept as state rather than re-rendered
  // markup so the toggle does not rebuild the whole shell around it.
  _setTlMode(mode) {
    this._tlMode = mode === 'recordings' ? 'recordings' : 'events';
    this.shadowRoot.querySelectorAll('[data-tl-mode]').forEach(b =>
      b.classList.toggle('on', b.dataset.tlMode === this._tlMode));
    this._renderTimeline();
    this._renderLegend();
  }

  // ── latest event (always visible, compact, no toggle) ─────
  _renderLatest() {
    const row=this._$('#latest-row'); if(!row) return;
    const events=this._allDisplayEvents();
    if(!events.length||this._viewMode!=='single'){ row.style.display='none'; return; }
    row.style.display='block';
    row.innerHTML=`<div class="latest-label"><span class="section-label">${this._t('list.latest')}</span></div>
      <div class="latest-body">${this._eventCardHTML(events[0],false,true)}</div>`;
  }

  _time(ts) { return new Date(ts*1000).toLocaleTimeString(this._locale,{hour:'2-digit',minute:'2-digit'}); }
  // YYYY-MM-DD in the card's timezone, from a unix timestamp. The formatter is
  // cached because the album stamps a date on every tile it renders.
  _dayStr(ts) {
    const tz = this._tz();
    if (this._dayTz !== tz || !this._dayFmt) {
      this._dayTz = tz;
      try { this._dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year:'numeric', month:'2-digit', day:'2-digit' }); }
      catch (_) { this._dayFmt = null; }
    }
    const d = new Date(ts*1000);
    if (this._dayFmt) return this._dayFmt.format(d);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  _todayStr() { return this._dayStr(Math.floor(Date.now()/1000)); }
  // Local midnights inside [start, end). A day is 23 or 25 hours long twice a
  // year, so the boundaries cannot come out of a fixed 86400 step: each one is
  // the next midnight of the wall clock, taken one at a time.
  _midnights(start, end) {
    const out = [];
    const d = new Date(start * 1000);
    d.setHours(24, 0, 0, 0);                       // the next local midnight
    for (let t = Math.floor(d.getTime() / 1000); t < end && out.length < 90; ) {
      out.push(t);
      d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0);
      t = Math.floor(d.getTime() / 1000);
    }
    return out;
  }
  // A day named the way a person would: today and yesterday by name, anything
  // else by its date — long for a heading in a list, short for a chip on a strip.
  _dayName(ts, long) {
    const now = Math.floor(Date.now() / 1000);
    const y = new Date(now * 1000); y.setDate(y.getDate() - 1);
    if (this._dayStr(ts) === this._dayStr(now)) return this._t('day.today');
    if (this._dayStr(ts) === this._dayStr(Math.floor(y.getTime() / 1000))) return this._t('day.yesterday');
    return new Date(ts * 1000).toLocaleDateString(this._locale,
      long ? { weekday:'long', day:'2-digit', month:'long' } : { day:'2-digit', month:'short' });
  }
  _dayHead(ts) { return `<div class="day-head">${this._dayName(ts, true)}</div>`; }
  // Rows grouped by the day they belong to. The walls and the lists all run
  // newest first, so a heading simply goes in wherever the day changes.
  _byDay(rows) {
    let out = '', day = null;
    for (const r of rows) {
      const d = this._dayStr(r.ts);
      if (d !== day) { day = d; out += this._dayHead(r.ts); }
      out += r.html;
    }
    return out;
  }
  _dur(ev) { return Math.max(1,Math.round((ev.end_time||Date.now()/1000)-ev.start_time)); }
  _zones() { const z=new Set(); this._allDisplayEvents().forEach(e=>(e.zones||[]).forEach(x=>z.add(x))); return [...z]; }
  _labels() { const l=new Set(); this._allDisplayEvents().forEach(e=>e.label&&l.add(e.label)); return [...l]; }
  _filtered() {
    let list=this._allDisplayEvents();
    if(this._tab==='clips') list=list.filter(e=>e.has_clip);
    else if(this._tab==='snapshot') list=list.filter(e=>e.has_snapshot);
    if(this._filterLabel!=='all') list=list.filter(e=>e.label===this._filterLabel);
    if(this._filterZone!=='all') list=list.filter(e=>(e.zones||[]).includes(this._filterZone));
    if(this._favOnly) list=list.filter(e=>e.retain_indefinitely);
    return list;
  }
  _mergeRecs(recs) {
    if(!recs.length) return [];
    const segs=[...recs].sort((a,b)=>a.start_time-b.start_time); const out=[]; let cur={...segs[0]};
    for(let i=1;i<segs.length;i++){const s=segs[i];const ce=cur.end_time||cur.start_time;if(s.start_time-ce<=60){cur.end_time=Math.max(ce,s.end_time||s.start_time);cur.events=(cur.events||0)+(s.events||0);cur.objects=(cur.objects||0)+(s.objects||0);}else{out.push(cur);cur={...s};}}
    out.push(cur); return out;
  }

  _renderTimeline() {
    const track=this._$('#tl-track'),labels=this._$('#tl-labels'); if(!track) return;
    const s=this._winStart,e=this._winEnd,span=Math.max(1,e-s); let html='';

    // One thing at a time. The ticks and the bars used to share the strip, and a
    // tick sitting on a bar is exactly what stops the bar being clickable — so
    // the strip is either the events or the recordings, never both.
    if (this._tlMode === 'recordings') {
      // Every camera's recordings into one spine. On a strip this tall, four
      // sets of ribs would be four sets of ribs on top of one another, so what
      // gets drawn is the busiest of them at each moment.
      const recs = this._eventsMode==='all'
        ? this._config.cameras.reduce((all,c)=>{ const cc=this._camCache[c.entity]; return cc ? all.concat(cc.recordings||[]) : all; }, [])
        : this._recordings;
      html += this._recBones(recs, s, e, track);
    } else {
      // Dots, not ticks: a 4px sliver is a poor target, and the moments that sit
      // close together were the worst of all. The newest moment in the window is
      // ringed — the one landmark the strip always has, whatever else it shows.
      const all=this._allDisplayEvents();
      const last=all.reduce((m,v)=>(!m||v.start_time>m.start_time?v:m),null);
      let shown=false;
      for(const ev of all){
        if(ev.start_time<s||ev.start_time>e) continue;
        shown=true;
        const left=(ev.start_time-s)/span*100;
        html+=`<div class="t-ev${last&&ev.id===last.id?' last':''}" data-tick="${ev.id}" style="left:${left}%;background:${labelColor(ev.label)}" title="${cap(ev.label)} ${this._time(ev.start_time)}"></div>`;
      }
      // A quiet stretch shows nothing at all, which reads as a broken strip
      // rather than a quiet one: point at where the newest moment was, and make
      // the pointer a way to get there.
      if(last && !shown){
        const right=last.start_time>e;
        html+=`<button class="tl-find${right?' right':' left'}" data-tl-find="${last.start_time}" title="${this._t('tl.findLast',{time:this._time(last.start_time)})}">${right?ICONS.right:ICONS.left}</button>`;
      }
    }
    // Day by day: a window that crosses midnight is one long run of ribs or dots
    // until the days are marked, so a line goes at each local midnight with its
    // date written after it. The date is left out where the day is too narrow to
    // hold it, and the window's own opening day is only named when the window is
    // wide enough that the range label above is not already saying it.
    {
      const W = track.clientWidth || 0;
      const bounds = [{ t: s, lbl: this._dayName(s) }];
      for (const m of this._midnights(s, e)) bounds.push({ t: m, lbl: this._dayName(m) });
      if (bounds.length > 1 || span >= 21600) {
        for (let i = 0; i < bounds.length; i++) {
          const left = Math.min(100, Math.max(0, (bounds[i].t - s) / span * 100));
          html += `<div class="tl-day" style="left:${left.toFixed(3)}%"></div>`;
          const next = i + 1 < bounds.length ? bounds[i + 1].t : e;
          const px = W ? (next - bounds[i].t) / span * W : 999;
          if (px >= 52) html += `<div class="tl-day-lbl" style="left:${left.toFixed(3)}%">${bounds[i].lbl}</div>`;
        }
      }
    }
    // The pointer line, drawn from the last position we were told about so it
    // survives a redraw (a wheel step under a still pointer).
    html+=`<div class="tl-cursor" style="${this._tlHover==null?'display:none':`left:${(this._tlHover*100).toFixed(3)}%`}"></div>`;
    const nowPct=(Math.min(Math.floor(Date.now()/1000),e)-s)/span*100;
    html+=`<div class="tl-now" style="left:${Math.max(0,Math.min(100,nowPct))}%"></div>`;
    track.innerHTML=html;
    // A click on the strip plays from that moment when the strip is the
    // recordings (or the recordings tab is the one open): say so with the cursor.
    track.classList.toggle('seekable', this._tlMode === 'recordings' || this._tab === 'recordings');
    track.classList.toggle('rec', this._tlMode === 'recordings');
    if(labels){let l='';for(let i=0;i<5;i++){const ts=s+span*i/4;l+=`<span>${i===4&&this._isNowWindow()?'now':this._time(ts)}</span>`;}labels.innerHTML=l;}
  }
  // ── the recordings strip: a spine with ribs ───────────────
  // Frigate keeps, for every recording segment, how much of the frame moved
  // (`motion`, 0-100) and how many detections it held (`objects`), and its own
  // timeline sizes a bar by that number. Time runs sideways here, so the number
  // becomes the height of a rib standing on the spine — taller where more went
  // on — and the shape of the strip is the activity itself. One colour and no
  // shading: a rib is read by how tall it is, not by how hot it looks. Nothing
  // is painted behind them either: no spine and no rib means nothing recorded.
  _recBones(recs, s, e, track) {
    if (!recs || !recs.length) return '';
    const w = track.clientWidth || 640, span = Math.max(1, e - s);
    // A rib every few pixels, which is as fine as the strip can show, and the
    // cost is the width of the strip rather than the number of segments.
    const R = Math.max(24, Math.min(400, Math.round(w / 4)));
    const cov = new Array(R).fill(false), heat = new Array(R).fill(0);
    for (const r of recs) {
      const a = r.start_time, b = r.end_time || e;
      if (b < s || a > e) continue;
      const v = this._recIntensity(r);
      const i0 = Math.max(0, Math.floor((Math.max(a, s) - s) / span * R));
      const i1 = Math.min(R - 1, Math.ceil((Math.min(b, e) - s) / span * R) - 1);
      for (let i = i0; i <= i1; i++) { cov[i] = true; if (v > heat[i]) heat[i] = v; }
    }
    let html = '';
    for (let i = 0; i < R; i++) {                 // the spine: one line per recorded stretch
      if (!cov[i]) continue;
      let j = i; while (j + 1 < R && cov[j + 1]) j++;
      html += `<div class="t-spine" style="left:${(i/R*100).toFixed(3)}%;width:${((j - i + 1)/R*100).toFixed(3)}%"></div>`;
      i = j;
    }
    for (let i = 0; i < R; i++) {                 // the ribs
      if (!cov[i]) continue;
      const h = 12 + Math.round(heat[i] * 88);    // a recorded minute is never nothing
      html += `<div class="t-rib" style="left:${((i + .5)/R*100).toFixed(3)}%;height:${h}%"></div>`;
    }
    return html;
  }
  // How busy a segment was, 0-1. `motion` is Frigate's own reading — the share of
  // the frame that moved — and `objects` the number of detections in it. Either
  // alone places a segment on the scale and the busier of the two wins, so a
  // windy hour and a busy one both come out hot; `events` is the fallback for
  // answers that carry only those.
  _recIntensity(r) {
    let v = 0;
    const m = Number(r.motion);
    if (Number.isFinite(m) && m > 0) v = Math.min(1, m / 100);
    const o = Number(r.objects);
    if (Number.isFinite(o) && o > 0) v = Math.max(v, 1 - Math.exp(-o / 5));
    if (!v) { const n = Number(r.events); if (Number.isFinite(n) && n > 0) v = 1 - Math.exp(-n / 2); }
    return v;
  }
  // The reading under the pointer, spelled out: the spine says "busier here",
  // the number says how much. Motion is Frigate's own figure, so it is the one
  // worth printing; a deployment without it just shows the time.
  _recAtLabel(t) {
    if (this._tlMode !== 'recordings' || this._eventsMode === 'all') return '';
    const list = this._recordings; if (!list || !list.length) return '';
    for (const r of list) {
      if (r.start_time <= t && t <= (r.end_time || Infinity)) {
        const m = Number(r.motion);
        return Number.isFinite(m) && m > 0 ? ` · ${Math.round(m)}%` : '';
      }
    }
    return '';
  }
  // The time under the pointer. Seconds once the window is small enough for them
  // to be a position on the strip rather than noise, and the date whenever the
  // window has moved onto another day.
  _timeAt(ts) {
    const opts={hour:'2-digit',minute:'2-digit'};
    if(this._winEnd-this._winStart<=3600) opts.second='2-digit';
    const day=this._dayStr(ts)!==this._dayStr(this._winStart)
      ? new Date(ts*1000).toLocaleDateString(this._locale,{day:'2-digit',month:'2-digit'})+' ' : '';
    return day+new Date(ts*1000).toLocaleTimeString(this._locale,opts);
  }
  // Land on the newest moment: the strip can be sitting on a quiet stretch, and
  // the last event is the one worth being able to get back to.
  _findLastEvent(ts) {
    const span=this._winEnd-this._winStart;
    this._setView(ts-span/2, span);
    this._renderTimeline(); this._renderRange(); this._settleData();
  }

  _favIcon(ev) { return ev.retain_indefinitely?`<button class="ico fav on" data-fav="${ev.id}">${ICONS.star}</button>`:`<button class="ico fav" data-fav="${ev.id}">${ICONS.starO}</button>`; }

  _eventCardHTML(ev,expanded,compact=false) {
    const col=labelColor(ev.label); const score=ev.top_score!=null?Math.round(ev.top_score*100)+'%':'';
    const zone=ev.zones&&ev.zones.length?ev.zones[0]:''; const subl=ev.sub_label?`<span class="subl">${ev.sub_label}</span>`:'';
    const desc=expanded&&ev.data?.description?`<div class="desc">${ev.data.description}</div>`:'';
    const thumb=ev.has_snapshot||ev.has_clip?`<img src="${this._media(ev.id,'thumbnail.jpg')}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="tph" style="display:none">${ICONS.person}</div>`:`<div class="tph">${ICONS.person}</div>`;
    const badge=ev.has_clip?`<span class="bc">${this._t('list.clip')}</span>`:(ev.has_snapshot?`<span class="bs">${this._t('list.snap')}</span>`:'');
    const dlClip=ev.has_clip?`<button class="ico" data-dl="${ev.id}" data-dl-file="clip.mp4" title="${this._t('list.dlClip')}">${ICONS.download}</button>`:'';
    const dlSnap=ev.has_snapshot?`<button class="ico" data-dl="${ev.id}" data-dl-file="snapshot.jpg" title="${this._t('list.dlSnapshot')}">${ICONS.snapshot}</button>`:'';
    // show camera name in multi-cam all-events mode
    const camLabel=(this._eventsMode==='all'&&this._config.cameras.length>1)?`<span class="cam-badge">${(ev.camera||'').replace(/_/g,' ')}</span>`:'';
    // compact: wrap everything in a tighter layout, actions horizontal
    return `<div class="ec${compact?' compact':''}" data-ev="${ev.id}">
      <div class="et">${thumb}<div class="ed">${this._dur(ev)}s</div></div>
      <div class="ei">
        <div class="etop"><span class="tb" style="background:${col}33;color:${col}">${cap(ev.label)}</span>${subl}${badge}${camLabel}${score?`<span class="esc">${score}</span>`:''}</div>
        <div class="em"><span>${ICONS.clock}${this._time(ev.start_time)}</span>${zone?`<span>${ICONS.pin}${zone}</span>`:''}</div>
        ${desc}
      </div>
      <div class="eact${compact?' h':''}">${this._favIcon(ev)}${dlClip}${dlSnap}</div>
    </div>`;
  }

  _renderList() {
    const list=this._$('#list'); if(!list) return;
    if(this._tab==='recordings') {
      // Don't blow away the recording list (and seek bar) while the user is watching a recording
      const viewerActive = this._$('#viewer')?.style.display !== 'none';
      if (viewerActive && this._playing?.rec != null) return;
      return this._renderRecordings(list);
    }
    if(this._tab==='reviews') return this._renderReviews(list);
    if(this._tab==='kept'){
      if(!this._kept.length){list.innerHTML=`<div class="empty">${this._t('list.emptyKept')}<br><span style="opacity:.6">${this._t('list.emptyKeptHint')}</span></div>`;return;}
      list.innerHTML=this._byDay(this._kept.map(ev=>({ts:ev.start_time,html:this._eventCardHTML(ev,false)}))); return;
    }
    const events=this._filtered();
    if(!events.length){list.innerHTML=`<div class="empty">${this._t('list.emptyPeriod')}</div>`;return;}
    // A heading per day: the list can hold the whole history window, and without
    // one a day's events run straight into the next day's.
    list.innerHTML=this._byDay(events.map(ev=>({ts:ev.start_time,html:this._eventCardHTML(ev,false)})))
      +(this._exhausted?`<div class="end">${this._t('list.end')}</div>`:`<div class="more">${this._t('list.more')}</div>`);
  }
  // Frigate's per-recording snapshot (api/<cam>/recordings/<t>/snapshot.jpg) is
  // not exposed through the Home Assistant integration proxy, so the old URL
  // always 404'd. Use the thumbnail of an event that happened inside the segment
  // instead — same camera, same moment — served through the notifications proxy
  // that already works for the event list.
  _recordingThumbUrl(rs, re) {
    const ev = (this._events || []).find(e =>
      e.start_time >= rs && e.start_time <= re && (e.has_snapshot || e.has_clip));
    return ev ? this._media(ev.id, 'thumbnail.jpg') : null;
  }
  _renderRecordings(list) {
    const recs=this._mergeRecs(this._recordings).sort((a,b)=>b.start_time-a.start_time);
    if(!recs.length){list.innerHTML=`<div class="empty">${this._t('list.emptyRecordings')}</div>`;return;}
    list.innerHTML=this._byDay(recs.map(r=>{
      const rs=Math.floor(r.start_time), re=Math.floor(r.end_time||Date.now()/1000);
      const d=Math.max(1,re-rs); const mm=Math.floor(d/60),ss=d%60;
      const dur=`${mm?mm+'m ':''}${ss}s`;
      const seekHint = d > 300 ? ` <span class="seek-hint">· ${this._t('list.clickToSeek')}</span>` : '';
      const thumbUrl = this._recordingThumbUrl(rs, re);
      const thumb = thumbUrl
        ? `<img src="${thumbUrl}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="ric" style="display:none;width:100%;height:100%;border-radius:0;">${ICONS.recordings}</div>`
        : `<div class="ric" style="width:100%;height:100%;border-radius:0;">${ICONS.recordings}</div>`;
      return { ts: rs, html: `<div class="rec" data-rs="${rs}" data-re="${re}">
        <div class="rec-th">${thumb}</div>
        <div class="rinf">
          <div class="rt">${this._time(r.start_time)} – ${this._time(r.end_time||Date.now()/1000)}</div>
          <div class="rsub">${dur}${r.events?' · '+r.events+' ev':''}${seekHint}</div>
        </div>
        <div class="rp">▶</div>
      </div>` };
    }));
  }
  _renderReviews(list) {
    if(!this._reviews.length){list.innerHTML=`<div class="empty">${this._t('list.emptyReviews')}</div>`;return;}
    const allRevs=[...this._reviews].sort((a,b)=>b.start_time-a.start_time);
    const unrev=allRevs.filter(r=>!r.has_been_reviewed).length;
    const revs=this._showReviewed ? allRevs : allRevs.filter(r=>!r.has_been_reviewed);
    const toggleLbl=this._showReviewed?this._t('list.hideReviewed'):this._t('list.showReviewed');
    const head=`<div class="rev-head"><span>${this._t('list.toReview', { n: unrev })}</span><div style="display:flex;gap:5px;align-items:center">${unrev?`<button class="chip on" data-mark-all>${this._t('list.markAll')}</button>`:''}<button class="chip" data-toggle-reviewed>${toggleLbl}</button></div></div>`;
    if(!revs.length){list.innerHTML=head+`<div class="empty">${this._t('list.nothingToReview')}</div>`;return;}
    list.innerHTML=head+revs.map(r=>{
      const sev=r.severity==='alert'?'alert':'detection';
      const objs=(r.data?.objects||[]).map(cap).join(', ');
      const title=r.data?.metadata?.title||objs||cap(r.severity);
      const firstDet=(r.data?.detections&&r.data.detections[0])||'';
      const reviewed=r.has_been_reviewed;
      const thumb=firstDet?`<div class="rev-th"><img src="${this._media(firstDet,'thumbnail.jpg')}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`:'';
      return`<div class="rev ${sev}" data-review-id="${r.id}" ${firstDet?`data-review-open="${firstDet}"`:''}><div class="rev-sev ${sev}"></div>${thumb}<div class="rev-inf"><div class="rev-t">${title}</div><div class="rev-m">${this._time(r.start_time)} · ${cap(sev)}${reviewed?' · ✓':firstDet?` · ${this._t('list.tap')}`:''}</div></div>${reviewed?'':`<button class="ico" data-mark>${ICONS.reviews}</button>`}</div>`;
    }).join('');
  }

  // ── clip download range ───────────────────────────────────
  async _downloadRecRange(dlStart, dlEnd) {
    const {clientId, cam} = this._cc();
    const base = `/api/frigate/${clientId}/recording/${cam}/start/${dlStart}/end/${Math.min(dlEnd, dlStart+7200)}`;
    const signed = await this._signed(base);
    const url = signed + (signed.includes('?') ? '&' : '?') + 'download=true';
    const a = document.createElement('a');
    a.href = url; a.download = `${cam}_${this._time(dlStart).replace(/:/g,'-')}.mp4`;
    document.body.appendChild(a); a.click(); a.remove();
  }
}

// editor.js — FrigateModernHassCardEditor config panel

class FrigateModernHassCardEditor extends HTMLElement {
  setConfig(c) { this._config=c; this._render(); }
  set hass(h) {
    this._hass = h;
    this._lang = pickLang(h);
    // Only re-render when the camera entity list (or the language) changes —
    // prevents dropdown closing while the user is choosing.
    const key = this._lang + '|' + this._frigateEntities().join(',');
    if (key !== this._lastEntityKey) { this._lastEntityKey = key; this._render(); }
  }

  // Editor labels in the user's language, same dictionary as the card.
  _t(key, vars) { return translate(this._lang || 'en', key, vars); }

  _frigateEntities() {
    if (!this._hass) return [];
    return Object.keys(this._hass.states)
      .filter(e => e.startsWith('camera.'))
      .filter(e => {
        const a = this._hass.states[e].attributes;
        return a?.client_id || a?.mqtt_client_id || a?.camera_name; // Frigate-specific attrs
      })
      .sort();
  }

  _render() {
    const frigEntities = this._frigateEntities();
    const allCamEntities = this._hass ? Object.keys(this._hass.states).filter(e=>e.startsWith('camera.')).sort() : [];
    const entityList = frigEntities.length ? frigEntities : allCamEntities;

    const cams = this._config?.cameras
      ? this._config.cameras
      : (this._config?.camera_entity ? [{ entity: this._config.camera_entity, name: '' }] : [{ entity: '', name: '' }]);

    const opts = (sel) => entityList.map(e => `<option value="${e}" ${e===sel?'selected':''}>${e}</option>`).join('');

    const layoutId = this._config?.grid_layout || 'auto';
    const usingLayout = layoutId !== 'auto';
    // Offering a layout with fewer tiles than there are cameras is just wrong,
    // so hide those. If nothing is big enough, show everything rather than an
    // empty picker.
    const fitting = GRID_LAYOUTS.filter(l => l.id === 'auto' || l.tiles >= cams.length);
    const layoutChoices = fitting.length > 1 ? fitting : GRID_LAYOUTS;
    // The tile number leads the row, so you read "tile 1 shows this camera",
    // which is the direction people think in. Picking a camera that already
    // sits in another tile swaps the two, so choosing is also positioning and
    // no separate reorder control is needed.
    const camRows = cams.map((c,i) => `
      <div class="cr" data-row="${i}">
        <span class="cnum" title="${this._t('ed.tileN', { n: i+1 })}">${i+1}</span>
        <select name="cam-entity-${i}" class="ce" data-cam-entity="${i}">
          <option value="">${this._t('ed.selectCamera')}</option>
          ${opts(c.entity||'')}
        </select>
        <input type="text" name="cam-name-${i}" class="cn" data-cam-name="${i}" placeholder="${this._t('ed.displayName')}" value="${c.name||''}">
        ${usingLayout ? '' : `
        <select class="cs" data-cam-span="${i}" title="${this._t('ed.tileSize')}">
          ${[1,2,3].map(v => `<option value="${v}" ${Number(c.span?.cols ?? c.span ?? 1)===v?'selected':''}>${v}x${v}</option>`).join('')}
        </select>`}
        ${cams.length > 1 ? `<button class="xb" data-remove-cam="${i}" title="${this._t('ed.remove')}">✕</button>` : ''}
      </div>`).join('');

    const hiddenTabs = new Set(this._config?.hidden_tabs || []);
    const tabCheck = (id, label) => `<label class="chk-lbl">
      <input type="checkbox" name="hide-${id}" data-hide-tab="${id}" ${hiddenTabs.has(id)?'checked':''}> ${label}
    </label>`;

    const defaultView = this._config?.default_view || 'single';
    const rotateOnLoad = this._config?.rotate_on_load === true;
    // 'auto' (the card's own rule), on, or off — a checkbox could not express
    // "leave the card alone", which is what most people want.
    const timelineSetting = typeof this._config?.timeline === 'boolean' ? this._config.timeline : 'auto';
    const multiCam = cams.length > 1 || (cams.length === 1 && !cams[0].entity);

    this.innerHTML = `<style>
      /* The editor lives in Home Assistant's own dialog, not in a shadow root of
         ours, so it has to follow the user's theme. Fixed colours here meant an
         unreadable panel on every dark theme. Each variable keeps a light
         fallback for the rare theme that does not define it. */
      .ed-wrap{display:flex;flex-direction:column;gap:14px;padding:6px 2px;
        font-family:var(--paper-font-body1_-_font-family,sans-serif);
        color:var(--primary-text-color,#111);
        --ed-dim:var(--secondary-text-color,#6b7280);
        --ed-line:var(--divider-color,#e5e7eb);
        --ed-field:var(--card-background-color,#fff);
        --ed-acc:var(--primary-color,#3b82f6);}
      .field-label{font-size:12px;font-weight:600;margin-bottom:4px;display:block;color:var(--primary-text-color,#111);}
      .section{border-top:1px solid var(--ed-line);padding-top:12px;}
      .hint{color:var(--ed-dim);font-size:11px;}
      .cr{display:flex;gap:5px;align-items:center;margin-bottom:6px;}
      .ce,.cn,.tf,.cs{border:1px solid var(--ed-line);border-radius:6px;font-size:12px;
        background:var(--ed-field);color:var(--primary-text-color,#111);box-sizing:border-box;}
      .ce,.cn{flex:1;padding:7px;min-width:0;}
      .tf{width:100%;padding:7px;}
      .cs{padding:7px 4px;flex-shrink:0;}
      .xb{padding:5px 8px;border:1px solid var(--error-color,#f87171);background:transparent;
        color:var(--error-color,#b91c1c);border-radius:6px;cursor:pointer;font-size:12px;flex-shrink:0;}
      .add-btn{padding:6px 12px;border:1px solid var(--ed-acc);background:transparent;color:var(--ed-acc);
        border-radius:7px;cursor:pointer;font-size:12px;margin-top:2px;}
      .radio-row,.chk-row{display:flex;gap:14px;flex-wrap:wrap;}
      .radio-lbl,.chk-lbl{display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;color:var(--primary-text-color,#111);}
      .chk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;}
      .cnum{width:26px;height:26px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
        background:transparent;color:var(--ed-acc);border:1px solid var(--ed-acc);border-radius:6px;font-size:11px;font-weight:700;}
      .lay-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:8px;margin:4px 0 8px;}
      .lay{padding:6px 5px 5px;border:1px solid var(--ed-line);border-radius:8px;background:transparent;
        color:inherit;cursor:pointer;display:flex;flex-direction:column;gap:4px;align-items:center;}
      .lay:hover{border-color:var(--ed-acc);}
      .lay.sel{border-color:var(--ed-acc);box-shadow:0 0 0 1px var(--ed-acc) inset;}
      .lay-prev{width:100%;aspect-ratio:4/3;display:grid;gap:2px;grid-auto-flow:dense;grid-auto-rows:1fr;}
      /* Neutral grey reads on a light and a dark theme alike. */
      .lay-prev span{background:rgba(128,128,128,.35);border-radius:2px;display:flex;align-items:center;
        justify-content:center;font-size:9px;color:var(--primary-text-color,#475569);font-weight:700;}
      .lay.sel .lay-prev span{background:var(--ed-acc);color:var(--text-primary-color,#fff);}
      .lay-auto{width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;
        color:var(--ed-dim);font-size:10px;text-align:center;border:1px dashed var(--ed-line);border-radius:4px;}
      .lay-lbl{font-size:10px;color:var(--primary-text-color,#374151);text-align:center;line-height:1.2;}
    </style>
    <div class="ed-wrap">
      <div>
        <span class="field-label">${this._t('ed.cameras')} ${frigEntities.length ? `<small class="hint" style="font-weight:400">${this._t('ed.frigateDetected')}</small>` : ''}</span>
        <div id="cam-list">${camRows}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button class="add-btn" id="add-cam">${this._t('ed.addCamera')}</button>
          <button class="add-btn" id="toggle-layout">${this._t('ed.gridLayout')}${usingLayout ? `: ${this._layLabel(findLayout(layoutId))}` : ''}</button>
        </div>
        ${cams.length > 1 ? `<small class="hint" style="display:block;margin-top:4px">${this._t('ed.camSwapHint')}</small>` : ''}
        ${cams.length > 4 ? `<small class="hint" style="display:block;margin-top:4px">${this._t('ed.camLoadHint')}</small>` : ''}
        <div id="layout-picker" style="display:${this._layoutOpen ? 'block' : 'none'};margin-top:8px">
          <div class="lay-grid">${layoutChoices.map(l => this._layoutButton(l, layoutId)).join('')}</div>
          <small class="hint">${this._t('ed.layoutHint')}</small>
          <div style="border-top:1px solid var(--divider-color);margin-top:10px;padding-top:8px">
            <label class="chk-lbl"><input type="checkbox" name="stack_on_mobile" id="stack_on_mobile" ${this._config?.stack_on_mobile!==false?'checked':''}> ${this._t('ed.stackOnMobile')}</label>
            <small class="hint" style="display:block;margin-top:4px">${this._t('ed.stackHint')}</small>
          </div>
        </div>
      </div>

      <label><span class="field-label">${this._t('ed.title')}</span>
        <input name="title" class="tf" id="title" type="text" value="${this._config?.title||''}" placeholder="${this._t('ed.titlePlaceholder')}">
      </label>
      <label><span class="field-label">${this._t('ed.subtitle')}</span>
        <input name="subtitle" class="tf" id="subtitle" type="text" value="${this._config?.subtitle||''}" placeholder="${this._t('ed.subtitlePlaceholder')}">
      </label>

      <div class="section">
        <span class="field-label">${this._t('ed.view')}</span>
        <div class="radio-row">
          <label class="radio-lbl"><input type="radio" name="default_view" value="single" ${defaultView==='single'?'checked':''}> ${this._t('ed.single')}</label>
          <label class="radio-lbl"><input type="radio" name="default_view" value="grid" ${defaultView==='grid'?'checked':''}> ${this._t('ed.gridAll')}</label>
        </div>
        <div style="margin-top:8px">
          <label class="chk-lbl"><input type="checkbox" name="camera_only" id="camera_only" ${this._config?.camera_only===true?'checked':''}> <b>${this._t('ed.cameraOnly')}</b> (${this._t('ed.cameraOnlyHint')})</label>
        </div>
        <div style="margin-top:6px">
          <label class="chk-lbl"><input type="checkbox" name="events_only" id="events_only" ${this._config?.events_only===true?'checked':''}> <b>${this._t('ed.eventsOnly')}</b> (${this._t('ed.eventsOnlyHint')})</label>
        </div>
        <div style="margin-top:6px">
          <label class="chk-lbl"><input type="checkbox" name="floating_menu" id="floating_menu" ${this._config?.floating_menu!==false?'checked':''}> ${this._t('ed.floatingMenu')}</label>
        </div>
        <div style="margin-top:6px">
          <label class="chk-lbl"><input type="checkbox" name="ptz" id="ptz" ${this._config?.ptz!==false?'checked':''}> ${this._t('ed.ptzEnable')}</label>
        </div>
        <div style="margin-top:6px">
          <span class="field-label" style="font-size:11px">${this._t('ed.menuPosition')}</span>
          <select class="tf" id="menu_position" name="menu_position" style="margin-top:2px">
            ${OVERLAY_POSITIONS.map(pos => `<option value="${pos}" ${(this._config?.menu_position||'right')===pos?'selected':''}>${this._t('pos.'+pos)}</option>`).join('')}
          </select>
        </div>
        <div style="margin-top:6px">
          <span class="field-label" style="font-size:11px">${this._t('ed.ptzPosition')}</span>
          <select class="tf" id="ptz_position" name="ptz_position" style="margin-top:2px">
            ${OVERLAY_POSITIONS.map(pos => `<option value="${pos}" ${(this._config?.ptz_position||'bottom-right')===pos?'selected':''}>${this._t('pos.'+pos)}</option>`).join('')}
          </select>
        </div>
        <div style="margin-top:6px">
          <span class="field-label" style="font-size:11px">${this._t('ed.timeline')}</span>
          <select class="tf" id="timeline" name="timeline" style="margin-top:2px">
            <option value="auto" ${timelineSetting==='auto'?'selected':''}>${this._t('ed.timelineAuto')}</option>
            <option value="on" ${timelineSetting===true?'selected':''}>${this._t('ed.timelineOn')}</option>
            <option value="off" ${timelineSetting===false?'selected':''}>${this._t('ed.timelineOff')}</option>
          </select>
        </div>
        <div style="margin-top:8px">
          <label class="chk-lbl"><input type="checkbox" name="rotate_on_load" id="rotate_on_load" ${rotateOnLoad?'checked':''}> ${this._t('ed.autoRotateOnLoad')}</label>
        </div>
        <div style="margin-top:6px">
          <label><span class="hint">${this._t('ed.rotateInterval', { n: DEFAULT_ROTATE_S })}</span>
            <input name="rotate_seconds" class="tf" id="rotate_seconds" type="number" value="${this._config?.rotate_seconds??0}" min="0" style="margin-top:3px">
          </label>
        </div>
      </div>
      <div class="section">
        <span class="field-label">${this._t('ed.theme')}</span>
        <div class="radio-row">
          <label class="radio-lbl"><input type="radio" name="theme" value="auto"  ${(this._config?.theme||'auto')==='auto' ?'checked':''}> ${this._t('ed.themeAuto')}</label>
          <label class="radio-lbl"><input type="radio" name="theme" value="dark"  ${this._config?.theme==='dark' ?'checked':''}> ${this._t('ed.themeDark')}</label>
          <label class="radio-lbl"><input type="radio" name="theme" value="light" ${this._config?.theme==='light'?'checked':''}> ${this._t('ed.themeLight')}</label>
        </div>
      </div>
      <div class="section">
        <span class="field-label">${this._t('ed.colors')}</span>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px;">
          <div>
            <label class="chk-lbl" style="margin-bottom:4px">
              <input type="checkbox" id="use_accent" ${this._config?.accent_color?'checked':''}> ${this._t('ed.customAccent')}
            </label>
            <div style="display:flex;align-items:center;gap:6px">
              <input type="color" id="accent_color" value="${this._config?.accent_color||'#3b82f6'}" style="width:40px;height:30px;border:none;padding:2px;border-radius:6px;cursor:pointer">
              <span class="hint" id="accent_lbl">${this._config?.accent_color||'#3b82f6'}</span>
            </div>
          </div>
          <div>
            <label class="chk-lbl" style="margin-bottom:4px">
              <input type="checkbox" id="use_bg" ${this._config?.bg_color?'checked':''}> ${this._t('ed.customBg')}
            </label>
            <div style="display:flex;align-items:center;gap:6px">
              <input type="color" id="bg_color" value="${this._config?.bg_color||'#1c2233'}" style="width:40px;height:30px;border:none;padding:2px;border-radius:6px;cursor:pointer">
              <span class="hint" id="bg_lbl">${this._config?.bg_color||'#1c2233'}</span>
            </div>
          </div>
        </div>
        <small class="hint">${this._t('ed.colorHint')}</small>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.hiddenTabs')}</span>
        <div class="chk-grid">
          ${tabCheck('recordings',this._t('tab.recordings'))}
          ${tabCheck('clips',this._t('tab.clips'))}
          ${tabCheck('snapshot',this._t('tab.snapshots'))}
          ${tabCheck('reviews',this._t('tab.reviews'))}
          ${tabCheck('kept',this._t('tab.kept'))}
        </div>
      </div>

      <div class="section" ${usingLayout ? 'style="display:none"' : ''}>
        <span class="field-label">${this._t('ed.gridColumns')}</span>
        <div class="radio-row">
          <label class="radio-lbl"><input type="radio" name="grid_columns" value="auto" ${(this._config?.grid_columns||'auto')==='auto'?'checked':''}> ${this._t('ed.auto')}</label>
          <label class="radio-lbl"><input type="radio" name="grid_columns" value="1" ${String(this._config?.grid_columns)==='1'?'checked':''}> ${this._t('ed.col1')}</label>
          <label class="radio-lbl"><input type="radio" name="grid_columns" value="2" ${String(this._config?.grid_columns)==='2'?'checked':''}> 2</label>
          <label class="radio-lbl"><input type="radio" name="grid_columns" value="3" ${String(this._config?.grid_columns)==='3'?'checked':''}> 3</label>
          <label class="radio-lbl"><input type="radio" name="grid_columns" value="4" ${String(this._config?.grid_columns)==='4'?'checked':''}> 4</label>
        </div>
        <small class="hint">${this._t('ed.colsHint', { cols: `<b>${this._colsAt(800, cams.length)}</b>` })}</small>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.eventsPanel')}</span>
        <label class="chk-lbl"><input type="checkbox" name="events_collapsed" id="events_collapsed" ${this._config?.events_collapsed===true?'checked':''}> ${this._t('ed.eventsCollapsed')}</label>
        <small class="hint" style="display:block;margin-top:4px">${this._t('ed.eventsHint')}</small>
      </div>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.liveProvider')}</span>
        <div class="radio-row">
          <label class="radio-lbl"><input type="radio" name="live_provider" value="hls" ${(this._config?.live_provider||'hls')==='hls'?'checked':''}> ${this._t('ed.providerHls')}</label>
          <label class="radio-lbl"><input type="radio" name="live_provider" value="go2rtc" ${this._config?.live_provider==='go2rtc'?'checked':''}> ${this._t('ed.providerGo2rtc')}</label>
        </div>
        <small class="hint">${this._t('ed.providerHint')}</small>
        <div style="margin-top:8px">
          <span class="field-label">${this._t('ed.transport')}</span>
          <div class="radio-row">
            <label class="radio-lbl"><input type="radio" name="go2rtc_mode" value="mse" ${(this._config?.go2rtc_mode||'mse')==='mse'?'checked':''}> ${this._t('ed.mse')}</label>
            <label class="radio-lbl"><input type="radio" name="go2rtc_mode" value="webrtc" ${this._config?.go2rtc_mode==='webrtc'?'checked':''}> ${this._t('ed.webrtc')}</label>
            <label class="radio-lbl"><input type="radio" name="go2rtc_mode" value="auto" ${this._config?.go2rtc_mode==='auto'?'checked':''}> ${this._t('ed.transportAuto')}</label>
          </div>
          <small class="hint">${this._t('ed.transportHint')}</small>
        </div>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.maxHeight')}</span>
        <input name="stream_height" class="tf" id="stream_height" type="number"
          value="${this._config?.stream_height||''}" min="20" max="100"
          placeholder="${this._t('ed.maxHeightPlaceholder')}">
        <small class="hint">${this._t('ed.maxHeightHint')}</small>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.windowHours')}</span>
        <input name="window_hours" class="tf" id="window_hours" type="number" value="${this._config?.window_hours||24}" min="1" max="720">
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.timelineHours')}</span>
        <input name="timeline_hours" class="tf" id="timeline_hours" type="number" value="${this._config?.timeline_hours||2}" min="1" max="720">
        <small class="hint">${this._t('ed.timelineHoursHint')}</small>
        <div style="margin-top:6px">
          <span class="field-label" style="font-size:11px">${this._t('ed.timelineMode')}</span>
          <select class="tf" id="timeline_mode" name="timeline_mode" style="margin-top:2px">
            <option value="events" ${this._config?.timeline_mode!=='recordings'?'selected':''}>${this._t('ed.tlEvents')}</option>
            <option value="recordings" ${this._config?.timeline_mode==='recordings'?'selected':''}>${this._t('ed.tlRecordings')}</option>
          </select>
        </div>
      </div>

      <div class="section">
        <span class="field-label">${this._t('ed.eventsLimit')}</span>
        <input name="events_limit" class="tf" id="events_limit" type="number" value="${this._config?.events_limit??300}" min="20" max="2000">
        <small class="hint">${this._t('ed.eventsLimitHint')}</small>
      </div>

    </div>`;

    this.querySelector('#add-cam')?.addEventListener('click', () => {
      const cur = this._getCams(); cur.push({ entity:'', name:'' });
      this._config = { ...this._config, cameras: cur }; delete this._config.camera_entity; this._render(); this._dispatch();
    });
    this.querySelectorAll('[data-remove-cam]').forEach(b => b.addEventListener('click', e => {
      const cur = this._getCams(); cur.splice(Number(e.currentTarget.dataset.removeCam), 1);
      this._config = { ...this._config, cameras: cur }; delete this._config.camera_entity; this._render(); this._dispatch();
    }));
    this.querySelector('#toggle-layout')?.addEventListener('click', () => {
      this._layoutOpen = !this._layoutOpen; this._render();
    });
    // Picking a camera that is already shown in another tile moves it here and
    // sends whatever stood here back to the tile it came from. Without this you
    // would end up with the same camera twice and no way to place it. Runs
    // before the generic change handler so it can take over the update.
    this.querySelectorAll('[data-cam-entity]').forEach(el => el.addEventListener('change', ev => {
      const i = Number(ev.currentTarget.dataset.camEntity);
      const picked = ev.currentTarget.value;
      if (!picked) return;
      const before = cams;
      const j = before.findIndex((c, k) => k !== i && c.entity === picked);
      if (j < 0) return; // not in use elsewhere, nothing to swap
      ev.stopImmediatePropagation();
      const cur = this._getCams(); // keeps the sizes, which belong to the tile
      const nameOf = k => before[k]?.name || '';
      cur[i] = { ...cur[i], entity: picked, name: nameOf(j) };
      cur[j] = { ...cur[j], entity: before[i]?.entity || '', name: nameOf(i) };
      this._config = { ...this._config, cameras: cur }; delete this._config.camera_entity;
      this._render(); this._dispatch();
    }));
    this.querySelectorAll('[data-layout]').forEach(b => b.addEventListener('click', () => {
      this._config = { ...this._config, grid_layout: b.dataset.layout };
      this._render(); this._dispatch();
    }));
    this.querySelectorAll('select,input').forEach(el => el.addEventListener('change', () => this._u()));
    // prevent click outside from closing select while user is choosing
    this.querySelectorAll('select').forEach(sel => sel.addEventListener('mousedown', e => e.stopPropagation()));
    // sync color picker label as user drags
    ['accent','bg'].forEach(key => {
      const picker = this.querySelector(`#${key}_color`);
      const lbl    = this.querySelector(`#${key}_lbl`);
      if (picker && lbl) picker.addEventListener('input', () => { lbl.textContent = picker.value; });
    });
  }

  // What the current settings produce at a given card width. The card does this
  // same sum; showing it beats making someone resize a phone to find out.
  _colsAt(width, camCount) {
    if (this._config?.stack_on_mobile !== false && width < 500) return '1 camera';
    const min = Number(this._config?.min_tile_width) > 0 ? Number(this._config.min_tile_width) : 200;
    const layout = findLayout(this._config?.grid_layout || 'auto');
    const pinned = Number(this._config?.grid_columns);
    let cols = layout && layout.cols ? layout.cols
      : (pinned > 0 ? pinned
      : (camCount <= 1 ? 1 : camCount <= 4 ? 2 : camCount <= 9 ? 3 : 4));
    cols = Math.max(1, Math.min(cols, Math.floor(width / min)));
    return cols === 1 ? this._t('ed.oneCamera') : this._t('ed.nCameras', { n: cols });
  }

  // Layout names in the user's language, falling back to the English label if a
  // translation has not been added for that id yet.
  _layLabel(l) {
    if (!l) return '';
    const key = 'lay.' + l.id;
    const v = this._t(key);
    return v === key ? l.label : v;
  }

  // Draw a layout as numbered cells. Seeing the shape is the point; a written
  // span tells nobody what they will end up with.
  _layoutButton(l, selected) {
    const sel = l.id === selected ? ' sel' : '';
    if (l.id === 'auto') {
      return `<button type="button" class="lay${sel}" data-layout="auto">
        <div class="lay-auto">${this._t('ed.fitsCount')}</div>
        <div class="lay-lbl">${this._layLabel(l)}</div></button>`;
    }
    const cells = Array.from({ length: l.tiles }, (_, i) => {
      const sp = l.spans[i];
      const style = sp ? ` style="grid-column:span ${sp[0]};grid-row:span ${sp[1]}"` : '';
      return `<span${style}>${i + 1}</span>`;
    }).join('');
    return `<button type="button" class="lay${sel}" data-layout="${l.id}">
      <div class="lay-prev" style="grid-template-columns:repeat(${l.cols},1fr)">${cells}</div>
      <div class="lay-lbl">${this._layLabel(l)}</div></button>`;
  }

  _getCams() {
    const rows = [...this.querySelectorAll('[data-row]')];
    return rows.map(r => {
      const span = Number(r.querySelector('[data-cam-span]')?.value || 1);
      return {
        entity: r.querySelector('[data-cam-entity]')?.value || '',
        name: r.querySelector('[data-cam-name]')?.value || '',
        // Only carry a size when it is not the default, to keep configs clean.
        ...(span > 1 ? { span } : {}),
      };
    });
  }
  _u() {
    const g = id => this.querySelector('#'+id)?.value?.trim() || '';
    const cams = this._getCams().filter(c => c.entity);
    const c = { ...this._config };
    if (cams.length > 1) { c.cameras = cams; delete c.camera_entity; }
    else if (cams.length === 1) { c.camera_entity = cams[0].entity; delete c.cameras; }
    const t=g('title'),s=g('subtitle'),w=g('window_hours'),r=g('rotate_seconds'),el=g('events_limit');
    if(t) c.title=t; else delete c.title;
    if(s) c.subtitle=s; else delete c.subtitle;
    if(w) c.window_hours=Number(w);
    const th=g('timeline_hours'); if(th) c.timeline_hours=Number(th);
    c.timeline_mode = this.querySelector('#timeline_mode')?.value === 'recordings' ? 'recordings' : 'events';
    if(el) c.events_limit=Number(el); else delete c.events_limit;
    c.rotate_seconds = Number(r)||0;
    // custom colors
    c.accent_color = this.querySelector('#use_accent')?.checked
      ? (this.querySelector('#accent_color')?.value || null) : null;
    c.bg_color = this.querySelector('#use_bg')?.checked
      ? (this.querySelector('#bg_color')?.value || null) : null;
    // theme
    c.theme = this.querySelector('input[name="theme"]:checked')?.value || 'dark';
    // default view
    const dv = this.querySelector('input[name="default_view"]:checked')?.value || 'single';
    c.default_view = dv;
    // rotate on load
    c.rotate_on_load = this.querySelector('#rotate_on_load')?.checked === true;
    // hidden tabs
    const hidden = [...this.querySelectorAll('[data-hide-tab]')]
      .filter(el => el.checked).map(el => el.dataset.hideTab);
    c.hidden_tabs = hidden.length ? hidden : [];
    const sh = this.querySelector('#stream_height')?.value;
    c.stream_height = sh ? Number(sh) : null;
    c.events_collapsed = this.querySelector('#events_collapsed')?.checked === true;
    if (this._config?.grid_layout) c.grid_layout = this._config.grid_layout;
    const gc = this.querySelector('input[name="grid_columns"]:checked')?.value || 'auto';
    c.grid_columns = gc === 'auto' ? 'auto' : Number(gc);
    c.stack_on_mobile = this.querySelector('#stack_on_mobile')?.checked !== false;
    c.live_provider = this.querySelector('input[name="live_provider"]:checked')?.value === 'go2rtc' ? 'go2rtc' : 'hls';
    c.go2rtc_mode = this.querySelector('input[name="go2rtc_mode"]:checked')?.value || 'mse';
    c.camera_only = this.querySelector('#camera_only')?.checked === true;
    c.events_only = this.querySelector('#events_only')?.checked === true;
    c.floating_menu = this.querySelector('#floating_menu')?.checked !== false;
    c.menu_position = this.querySelector('#menu_position')?.value || 'right';
    c.ptz_position = this.querySelector('#ptz_position')?.value || 'bottom-right';
    const tl = this.querySelector('#timeline')?.value || 'auto';
    c.timeline = tl === 'auto' ? 'auto' : tl === 'on';
    c.ptz = this.querySelector('#ptz')?.checked !== false;
    this._config=c; this._dispatch();
  }
  _dispatch() { this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this._config}})); }
}

// index.js — registers custom elements and announces card to HA

if (!customElements.get(CARD_TAG))
  customElements.define(CARD_TAG, FrigateModernHassCard);
if (!customElements.get(CARD_TAG + '-editor'))
  customElements.define(CARD_TAG + '-editor', FrigateModernHassCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.find(c => c.type === CARD_TAG))
  window.customCards.push({
    type: CARD_TAG,
    name: 'Frigate Modern Hass Card',
    description: `Multi-camera Frigate NVR card — v${VERSION}`,
    preview: true,
  });

console.info(
  `%c FRIGATE-MODERN-HASS-CARD %c v${VERSION} `,
  'color:#fff;background:#1d4ed8;padding:2px 4px;border-radius:3px 0 0 3px;font-weight:bold',
  'color:#1d4ed8;background:#dbeafe;padding:2px 4px;border-radius:0 3px 3px 0'
);
