# Frigate Modern Hass Card

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/QuadNL/frigate-modern-hass-card.svg)](https://github.com/QuadNL/frigate-modern-hass-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ko-Fi][ko_fi_shield]][ko_fi]

> **AI Assistance Notice**
> This card was built with the help of an AI coding assistant. All code has been personally reviewed, tested on a real Frigate setup, and is actively maintained. Found a bug or have a suggestion? Open an issue on GitHub.

A modern, feature-rich Lovelace card for [Frigate NVR](https://frigate.video) in Home Assistant.

## Features

- **Live stream**: native player controls (play, mute, volume, fullscreen), with optional low-latency go2rtc streaming
- **Multi-camera grid**: any number of cameras, with a configurable column count; tap a camera to open it, or go fullscreen for a wall view
- **Camera switcher**: with several cameras, a row of chips under the picture to move between them — each with a dot for whether that camera is available — and an auto-rotate toggle
- **Timeline**: visual event and recording timeline - wheel to scroll sideways, Ctrl+wheel to zoom, drag to pan, resting the pointer to magnify a cluttered stretch, a pointer line that reads out the time under it, a marked line and date at every midnight; switch the strip between events and recordings, the recordings drawn as a spine with activity ribs, and click-a-time playback in recordings mode
- **Event tabs**: Clips · Snapshots · Recordings · Reviews · Kept (favourites), each grouped by day under a heading
- **Floating menu**: a collapsible toolbar over the camera — recordings, clips, reviews, stream reload, the events timeline, digital PTZ, the grid switch and fullscreen — in any of eight positions, always clear of the back button
- **Digital PTZ**: pointer-anchored zoom, drag and pinch panning on the live view, with an optional on-screen pad in any of the same eight positions
- **Events album**: an optional recording-only card that shows every camera's clips and snapshots as a grid, with no live feed, plus a heat rail beside it to jump through time
- **Recording viewer**: custom playback controls with correct clip duration, seek bar, mute and download-from-position, played at any speed from 0.5x to 12x
- **Reviews**: alert/detection severity, mark-reviewed, hide-reviewed filter
- **Clip download**: download any event's clip or snapshot, or any recording from your current seek position
- **Responsive layout**: wide mode shows stream + events side-by-side
- **Theming**: dark / light / auto, custom accent + background colour picker
- **Languages**: the card and its editor follow the language Home Assistant is set to (English and Portuguese included)
- **Auto-rotate**: configurable interval rotation across cameras

## Installation via HACS

1. Open HACS → Frontend
2. Click ⋮ → Custom repositories
3. Add `https://github.com/QuadNL/frigate-modern-hass-card` as type **Dashboard**
4. Install "Frigate Modern Hass Card"
5. Hard-refresh your browser

> Once the repo is accepted in the HACS default store, you'll find it directly under HACS → Frontend without adding a custom repository.

## Manual Installation

Download `frigate-modern-hass-card.js` from the [latest release](https://github.com/QuadNL/frigate-modern-hass-card/releases/latest) and place it in your `config/www/` folder.

Add to your Lovelace resources:
```yaml
url: /local/frigate-modern-hass-card.js
type: module
```

## Configuration

### Minimal (single camera)
```yaml
type: custom:frigate-modern-hass-card
camera_entity: camera.front_door
```

![Single camera view](https://github.com/user-attachments/assets/9e10b2f5-1069-4265-b949-8589283353d4)

### Multi-camera
```yaml
type: custom:frigate-modern-hass-card
title: Security
cameras:
  - entity: camera.front_door
    name: Front Door
  - entity: camera.backyard
    name: Backyard
  - entity: camera.garage
    name: Garage
  - entity: camera.side_gate
    name: Side Gate
default_view: single     # or 'grid'
```
![Multi-camera grid view](https://github.com/user-attachments/assets/51109eec-b8b3-424a-aa77-322c9a00e71a)

### All options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `camera_entity` | string | none | Single camera entity (shorthand) |
| `cameras` | list | none | List of `{entity, name, span}` objects. `span` makes a camera occupy several tiles |
| `title` | string | none | Card title |
| `subtitle` | string | none | Card subtitle |
| `default_view` | string | `single` | `single` or `grid` |
| `theme` | string | `dark` | `dark`, `light`, `auto` |
| `accent_color` | string | none | Custom accent colour (hex) |
| `bg_color` | string | none | Custom background colour (hex) |
| `window_hours` | number | `24` | History window in hours: how far back the events list and the recordings reach |
| `refresh_seconds` | number | `45` | How often the rolling window reloads (minimum 15). It only reloads while the view is sitting on now |
| `timeline_hours` | number | `2` | How much history the timeline opens on, in hours. The list keeps the full window; `Ctrl`+wheel (or a pinch) zooms the timeline from here |
| `timeline_mode` | string | `events` | What the timeline strip draws: `events` (dots, click one to open it) or `recordings` (the activity spine, click a time to play from it). Switchable from the strip itself |
| `rotate_on_load` | boolean | `false` | Auto-rotate cameras on load |
| `rotate_seconds` | number | `30` | Rotation interval in seconds |
| `stream_height` | number | none | Max stream height in vh |
| `hidden_tabs` | list | `[]` | Tabs to hide: `recordings`, `clips`, `snapshot`, `reviews`, `kept` |
| `grid_layout` | string | `auto` | Named layout, see below. Sets the columns and tile sizes together |
| `grid_columns` | string/number | `auto` | Grid columns: `auto`, or `1`–`6`. Use `1` to stack cameras vertically |
| `stack_on_mobile` | boolean | `true` | Show one camera per row on a phone, whatever the layout says |
| `min_tile_width` | number | `200` | Narrowest a grid tile may get, in pixels, before the grid drops a column |
| `events_collapsed` | boolean | `false` | Start with the events panel hidden, giving the cameras the full width |
| `browse_expanded` | boolean | `false` | Start with the Browse panel — the tabs and the events list — open. On a wide card it is always open; on a narrow one the toggle collapses it |
| `live_provider` | string | `hls` | Live view source: `hls` (Home Assistant stream) or `go2rtc` |
| `go2rtc_mode` | string | `mse` | go2rtc transport: `mse`, `webrtc`, or `auto` |
| `camera_only` | boolean | `false` | Clean mode showing only the camera stream without timeline and footer |
| `timeline` | boolean | `auto` | Whether the events timeline sits under the live camera. Unset follows the card's own rule: shown in the full card, hidden in `camera_only`. The floating menu's timeline button overrides it while the card is open |
| `events_only` | boolean | `false` | Album mode: the card is only a grid of every camera's clips and snapshots — no live feed, no timeline, no camera controls |
| `events_limit` | number | `300` | Events fetched **per camera** for the album and the all-cameras grid (the single-camera list pages on its own) |
| `floating_menu` | boolean | `true` | Show the floating action button over the camera. It starts collapsed; tap its button to open the toolbar |
| `menu_position` | string | `right` | Position of floating menu: `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `left`, `right` |
| `ptz` | boolean | `true` | Enable digital PTZ overlay and controls (pan, tilt, zoom with mouse/touch/D-pad) |
| `ptz_position` | string | `bottom-right` | Position of the PTZ buttons: `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `left`, `right` |
| `debug` | boolean | `false` | Log to the browser console why the live view picked what it picked |

### Switching cameras

With more than one camera, the single view carries a row of chips under the
picture: one per camera, the one you are looking at lit, and each with a dot
showing whether that camera is available (green) or not (red). The ⟳ button
beside them starts **auto-rotate**, which walks through the cameras on a timer —
and it can start that way on load:

```yaml
rotate_on_load: true
rotate_seconds: 30
```

### Grid layout

Easiest in the visual editor: **Grid layout** shows each arrangement as numbered
tiles, so you can see what you are picking. Choosing a layout sets both the column
count and the tile sizes. Layouts with fewer tiles than you have cameras are not
offered.

The number in front of each camera in the list is the tile it fills. To move a
camera, pick it in the tile where you want it: if it was already somewhere else,
the two cameras swap places.

In YAML the same thing is one line:

```yaml
grid_layout: 6-big   # one large camera with five smaller ones
```

| Layout | Arrangement |
| --- | --- |
| `auto` | Fits the number of cameras and the space available |
| `2-row` / `2-col` | Two cameras, stacked or side by side |
| `3-big` | One large plus two |
| `4` / `9` / `16` | Equal tiles |
| `6-big` | One large plus five |
| `8-big` | One large plus seven |
| `10-big` | Two large plus eight |

Layouts scale down: the columns reduce and the large tiles shrink with them, so
one configuration works on every screen.

On a phone the cameras stack, one per row, whatever the layout says. A grid on a
phone leaves every camera too small to see anything in. If you want the grid
there anyway, for two cameras side by side or a small overview:

```yaml
stack_on_mobile: false
```

With stacking off, `min_tile_width` decides how narrow a tile may get before a
column is dropped. Lower it for more columns on a small screen.

If none of them fit, build your own with `grid_columns` and a `span` per camera.
`span` takes a number for a square or `{cols: 2, rows: 1}` for a wide tile:

```yaml
grid_columns: 3
cameras:
  - entity: camera.front_door
    span: 2
  - entity: camera.garden
  - entity: camera.shed
```

### Events panel

On a wide screen the events list sits beside the cameras, under the tabs:
**Live**, **Recordings**, **Clips**, **Snapshots**, **Reviews** and **Kept**
(favourites). On a narrow card the whole panel is collapsible — the **Browse**
button opens and closes it — and the button next to the fullscreen control folds
it away, which gives the cameras the full width. To start that way:

```yaml
events_collapsed: true
```

The list is grouped **by day** — a heading opens each one, *Today* and *Yesterday*
by name and the rest by date — in every tab that holds rows, so a list that
reaches back over days never runs one day's rows into the next day's. Picking a
row opens that clip, still or recording in the player; a recording long enough to
be worth seeking in says so on its row. In the single view the newest moment is
shown under the picture as a card of its own as well (**Latest**), so the last
thing that happened is visible without opening the list at all.

## Timeline

Under the picture sits the timeline: a strip of event markers and of recording
coverage, with the time labels under it and the ⟳ button to jump back to now.
Every local **midnight** in the window is marked on the strip with its own line
and its date written after it — *Today*, *Yesterday*, then the date — so a window
that runs across days reads as days rather than as one long stretch; the date is
left off when the day is too narrow on screen to hold it.

It opens on the last few hours (`timeline_hours`, 2 by default) rather than on
the whole history window — a day-wide strip is one smear in which nothing can be
picked out. From there:

- **Wheel** scrolls the strip sideways, the way a sideways scroller moves
  everywhere else: scrolling down walks forward towards now, scrolling up walks
  back. The present is the hard edge it stops at.
- **Ctrl + wheel** zooms, anchored on the pointer, so the moment under the
  cursor stays put. A trackpad pinch arrives as the same gesture, so pinching
  zooms too.
- **Drag** pans, and a **pinch** zooms on a touch screen. A press that never
  travels a few pixels is a click instead of a drag, which is what makes clicking
  a time reliable — measured in seconds, one pixel of handshake on a wide window
  used to read as a pan, and a pan opens nothing.
- **Resting** on the strip magnifies it: stay still for a moment and the window
  closes in on the time under the pointer over a short animation, which is what
  pulls events that are on top of each other far enough apart to click one. The
  zoom is built around the instant the pointer is on, so that instant does not
  move by a pixel while it happens. It is a look rather than a move — leaving the
  strip puts the window back exactly as it was, and any real gesture (drag, wheel,
  pinch) keeps the closer view instead.

The strip shows one thing at a time, chosen with the two chips on its header:
**Events** draws the markers and **Recordings** draws the recording activity. The
two used to share the strip, and a marker sitting on a bar is exactly what stops
the bar being clickable — hence the split. Which one opens is `timeline_mode`.

**Recordings** — click any time to play the recording from there, and a click is a
click: the strip only treats a press as a pan once it has travelled a few pixels.
What is drawn is a **spine with ribs** — a line where something was recorded, and a
rib standing on it whose height is how much went on. Frigate keeps, for each
recording segment, how much of the frame moved (`motion`, 0–100) and how many
detections it held (`objects`), and its own timeline sizes a bar by that number;
here the number is the height of the rib. So the shape of the strip *is* the
activity: taller is busier, at a rib every few pixels, which costs the width of
the strip rather than the number of segments. A recorded minute with nothing in it
still shows a short rib — the line and the rib together are the two readings, and
where there is neither, nothing was recorded. Ribs are one solid colour and are
read by height alone, so no shading and nothing painted behind them; the legend
carries the same shape, less to more. Segments that only report events fall back
to those, and hovering a spot adds the motion figure next to the time. With every
camera on screen at once the strip draws the busiest of them at each moment —
four sets of ribs would just be four sets of ribs on top of one another.

**Events** — click a dot to open that moment. Moments close together are separate
dots rather than one sliver, and the newest one in the window is **ringed**, so
the strip always has a landmark. When the window is sitting on a quiet stretch and
would show nothing at all, a **‹** or **›** appears at the edge pointing to where
that newest moment is; click it to go there.

**Reading the strip** — wherever the pointer is, a thin line marks the spot and
the time it is over is spelled out next to the range, to the second once the
window is small enough for seconds to mean a position. The date joins in whenever
the window has moved onto another day.

Zooming only ever looks at what has already been fetched: the fetch window is
`window_hours` wide (a day by default) and reaches back from the present, so
panning inside it costs nothing. Going past its far edge fetches that stretch,
the same way picking a day in the calendar does.

## Recording viewer

A time clicked on the timeline, or a row in the Recordings tab, opens that
recording in place of the live picture.

Frigate builds each recording window on the fly and streams it **without
byte-range support**, so the browser's own timeline cannot seek inside it: asking
the `<video>` to jump does nothing. The card's bar therefore reloads the chunk
from the moment you ask for. That is also why the bar is the card's own and not
the native `controls` — the browser would show the length of whatever file it
happened to have loaded, not of the recording you opened.

The controls are icons with tooltips, because they sit over the picture:

- **Play / pause**, **mute**, and a readout of where you are inside the
  recording, its end included.
- A **seek bar** the full length of the recording window, down to the second.
  Seeking reloads from that second, and playback rolls on into the next chunk by
  itself rather than stopping halfway.
- **Speed**, cycling through 0.5×, 1×, 1.5×, 2×, 3×, 6× and 12×. The rate
  outlives the clip — hunting through recordings at 12× should not cost five
  clicks per recording — and the button always shows the rate in force.
- **Download from here**: saves the recording starting at the moment you are
  sitting on, not the whole window.

Sorting the sound out took two pieces: the clip's own mute button silences the
clip, and the **live feed behind it is muted too while a moment is open** and
gets its volume back the way you left it on the way out. The live picture keeps
playing behind the viewer — a hidden `<video>` does not stop — and its sound
sitting under the clip's is exactly what made the mute button look like it did
nothing.

## Events album (recording-only)

Turn the card into an album of recordings: a wall of every camera's clips and
snapshots, newest first, with nothing else. There is no live stream, no timeline,
no camera tabs and no camera controls — nothing streams, so it costs the browser
and Frigate nothing to leave on screen.

```yaml
events_only: true
```

Or in the visual editor: **View → Events album**.

Each tile is one moment and says what it is without a click: the picture carries
the **time**, the **origin camera** and the clip length, and the bar below carries
the label and the two save buttons. The wall is grouped **by day**, each group
opening under a heading that names it — *Today*, *Yesterday*, then the date — so a
window that crosses midnight reads as two days rather than as one run with dates
sprinkled on the tiles. Tap the tile to play the clip right there, in an overlay
over the
wall (a snapshot-only event opens as a still); the **✕** or the backdrop closes
it and comes straight back to the grid. While a moment is open the overlay
carries **Save clip** / **Save snapshot** buttons — the same two the camera view's
player shows, next to its playback rate button (see
[Recording viewer](#recording-viewer)). The buttons are icons with a
tooltip rather than words: they sit over the picture, and a caption over the
picture is just picture covered up. The
label / zone / favourite filters and the calendar work here too.

The grid takes whatever height the dashboard gives the card — stretch it in a
Sections layout, set `stream_height`, or leave it to size itself — and scrolls
inside once there are more events than fit, so tiles stay full size on a phone
and on a wall display alike. Tiles are as wide as the card allows: wider cards
simply fit more columns.

### Heat rail

Beside the wall sits a vertical density strip: one bar per time bucket, taller
where more events fell, newest at the top so it reads the same way as the grid.
Hour labels and a red line at the current time keep it readable, and each local
**midnight** is marked with its own line and date, so a rail of identical red bars
still says which day a bar belongs to. Tap a bar to
scroll the wall straight to that moment — the tile it lands on is outlined.

### How many events

The album (and the all-cameras grid) pulls `events_limit` events **per camera**
from Frigate — 300 by default, which is plenty for a busy day. If a day is being
cut short, raise it:

```yaml
events_limit: 800
```

The camera's own events list is separate and still pages as you scroll.

### Calendar

The calendar marks the day you are looking at (**filled chip**) and today
(**ringed**), so you always know where you are and what "today" is, on top of the
dot that marks a day with recordings. Picking a day shows its recordings; the ⟳
button returns to the rolling window.

## Floating menu

The floating button over the camera opens a toolbar with Recordings, Clips,
Reviews, a **stream reload**, the **events timeline**, digital PTZ, the grid
switch and fullscreen. It starts **collapsed** to a single button, so it never
sits over the player's own controls; tap it to open, tap again to close — the
handle itself becomes an **✕** while the toolbar is out. Picking anything out of
the menu closes it: the toolbar has done its job, and one still sitting over the
camera after every press is the thing that makes it feel in the way. There is no
Live button either: every window that is not the feed already has its own way
back.

The handle and the toolbar are two separate pills. The handle is a round button
pinned against the outer edge of the camera and is deliberately faint; the
toolbar opens beside it as a column of icons with its own soft panel. Keeping
them apart is what lets the toolbar appear without the handle moving an inch —
same distance from the edge, same height, same size, open or shut — and what
keeps the column a plain column of icons.

On a device with a mouse the handle fades away completely until the pointer is
anywhere over the card, where it comes back; on touch there is no hover to bring
it back, so it stays visible but faint, and brightens while pressed.

`menu_position` moves it: `top`, `bottom`, `top-left`, `top-right`,
`bottom-left`, `bottom-right`, `left`, `right`. It defaults to `right`, where
the button sits on the side of the camera and clear of the player's own
controls. Whatever the position, the menu steps out of the way of the **back**
button when a clip or recording is open, so it is never covered. On a side
position the toolbar opens **beside** the handle, inwards into the picture, and
only wraps into a second column on a card too short to hold the column, rather
than growing past the video, where it would be clipped.

The stream reload button rebuilds the live player in place — use it when a feed
has gone blank, instead of reloading the whole dashboard.

The **events timeline** button puts the strip with the recordings and the event
markers under the live picture, so you can see where the last moments of the day
sit relative to now without leaving the camera — and without opening the
Recordings tab. In `camera_only`, where the strip is otherwise hidden, this is
the way to have both. The button shows the current state, and `timeline` in the
configuration sets where it starts; the picture gives up the height the strip
takes, so nothing is cut off in a fixed-height section.

```yaml
floating_menu: true
menu_position: right
timeline: auto
```

## Digital PTZ

`ptz` adds the pan/tilt/zoom gestures to the live view — pinch or double-tap to
zoom, drag to pan, mouse wheel to zoom, and a small pad of buttons for the same
thing with a tap. The pad only appears while the PTZ button in the floating menu
is on.

The pad has no panel behind it. Each button keeps its own dark, translucent
background — enough to read against any picture, without a slab covering the
camera. `ptz_position` moves them, with the same eight positions as
`menu_position`; the default is `bottom-right`.

```yaml
ptz: true
ptz_position: bottom-right
```

Zoom follows the pointer: the wheel (and the pinch on a touch screen) keeps the
point under the cursor fixed, and zooming back out lands on the framing it
started from. The `+`/`-` buttons aim at the last place the pointer was over the
picture, falling back to the centre.

The player's own control bar lives *inside* the video, so plain zooming scaled it
along with the picture and pushed it off the frame. The card now takes that bar
out of the picture while a zoom is active and puts it back at `1x`, so only the
image zooms.

The pad's centre button does the thing that is missing, not the thing it is
labelled: with the picture zoomed or panned it puts it back to the default
framing, and at that default — where there is nothing to put back — it closes
the pad instead. Its icon and tooltip say which of the two it will do.

## Before the first frame

While a stream is still connecting the card paints a still of the camera — the
entity's own picture — in place of the empty player. It is drawn to *fill* the
frame, the same way the live video is (cover, not letterboxed), so it uses the
full height of the card and does not sit inside black bars.

## Language

The card and its editor follow the language Home Assistant is set to, and fall
back to English for anything a translation is missing. English and Portuguese
are included.

Adding a language is adding one block to `src/i18n.js`, keyed by the language
code Home Assistant reports (the part before the dash is enough — `pt-BR` finds
`pt`). Nothing else has to change:

```js
export const TRANSLATIONS = {
  en: { /* source of truth */ },
  pt: { /* … */ },
  de: { 'menu.live': 'Live', /* … */ },
};
```

## Low-latency live view with go2rtc

By default the live view uses Home Assistant's own stream, which buffers several
seconds ahead. Frigate ships with go2rtc built in, and streaming through that
instead cuts the delay to roughly a second and is noticeably lighter on the
browser, which matters most in grid view, where every camera streams at once.

This is **opt-in**. To enable it, add one line to your card configuration:

```yaml
type: custom:frigate-modern-hass-card
camera_entity: camera.front_door
live_provider: go2rtc
```

Or in the visual editor: **Live view provider → go2rtc**.

No extra setup is needed. The card reaches go2rtc through the Frigate
integration's own proxy, so there is no separate URL or port to configure and it
keeps working remotely and in the companion apps. If go2rtc can't be reached,
the card falls back to the Home Assistant stream on its own. In grid view each
camera falls back independently, so one problematic camera won't take the others
down with it.

### Transport

| Value | Behaviour |
| --- | --- |
| `mse` (default) | Everything runs over the proxied connection. Works locally, remotely and in the companion apps. |
| `webrtc` | Lowest possible latency, but connects straight to go2rtc's own port, which usually only resolves on the local network. |
| `auto` | Leaves the choice to the player, which tries WebRTC first. |

```yaml
live_provider: go2rtc
go2rtc_mode: webrtc   # only worth trying on a local network
```

### When it does not start

go2rtc picks the codec from what the browser claims to support, and some
browsers report H.265 as supported and then fail to decode it. The card notices
that and asks go2rtc for H.264 instead before giving up; if that does not work
either, it falls back to the Home Assistant stream.

The player stops its stream when the browser tab is hidden and reconnects when
you come back. Taking a player down empties its `<video>`, which the browser
reports as an error — the card no longer mistakes that for a decode failure, so
returning to the tab goes straight back to the stream instead of starting a
second, pointless attempt first.

## Requirements

- [Frigate NVR](https://frigate.video) with the [Frigate Home Assistant integration](https://github.com/blakeblackshear/frigate-hass-integration)
- Home Assistant 2023.x or later

## Support

If you like this card; why don't buy me a coffee? 😊
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U2W120MCVZ)

[ko_fi_shield]: https://img.shields.io/static/v1.svg?label=%20&message=Ko-Fi&color=F16061&logo=ko-fi&logoColor=white
[ko_fi]: https://ko-fi.com/U2W120MCVZ


## License

MIT © QuadNL
