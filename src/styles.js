// styles.js — card CSS
// ── styles ───────────────────────────────────────────────────
export const STYLES = `
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
