#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const styles = ["diagonal-drift", "flow-field", "radial-burst", "data-streams", "orbit-arcs", "signal-waves", "circuit-traces"];
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => x.startsWith("--") ? (a.push([x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : "true"]), a) : a, []));
const style = args.style || "diagonal-drift";
const title = args.repo || "Shantanu Dhatrak";
const tagline = args.tagline || "AI & Data Science Engineer";
const handle = args.handle || "@Shantanu5505";
const animate = args.animate !== "false";
const out = args.out || "banners/generated.svg";
if (args.list === "true") { console.log(styles.join("\n")); process.exit(0); }
if (!styles.includes(style)) throw new Error(`Unknown style: ${style}. Use --list.`);
const safe = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const motifs = {
 "diagonal-drift": '<path d="M760 30L930 200 1090 40M840 330l180-180 180 180" fill="none" stroke="#39E6C5" stroke-width="2" opacity=".6"/>',
 "flow-field": '<path d="M740 80q130-90 250 0t250 0M730 140q150-90 290 0t220 0M740 210q130-90 250 0t250 0M760 280q120-90 230 0t240 0" fill="none" stroke="#39E6C5" stroke-width="2" opacity=".55"/>',
 "radial-burst": Array.from({length:24},(_,i)=>{const a=i*Math.PI/12,x=1030+Math.cos(a)*70,y=170+Math.sin(a)*70,X=1030+Math.cos(a)*180,Y=170+Math.sin(a)*180;return `<path d="M${x} ${y}L${X} ${Y}" stroke="#39E6C5" opacity=".55"/>`;}).join(""),
 "data-streams": Array.from({length:12},(_,i)=>`<path d="M760 ${70+i*20}h${80+(i*37)%180}l20 -8h${60+(i*19)%130}" fill="none" stroke="#39E6C5" opacity=".55"/>`).join(""),
 "orbit-arcs": '<ellipse cx="1030" cy="170" rx="230" ry="95" transform="rotate(-28 1030 170)" fill="none" stroke="#39E6C5" opacity=".6"/><ellipse cx="1030" cy="170" rx="180" ry="70" transform="rotate(35 1030 170)" fill="none" stroke="#6D8CFF" opacity=".65"/>',
 "signal-waves": Array.from({length:6},(_,i)=>`<path d="M760 ${100+i*32}q70-35 140 0t140 0t140 0" fill="none" stroke="#39E6C5" stroke-width="2" opacity=".6"/>`).join(""),
 "circuit-traces": '<g fill="none" stroke="#39E6C5" stroke-width="2" opacity=".65"><path d="M760 70h100v70h90m-190 80h150v-45h110m-30 115v-55h140"/><circle cx="860" cy="70" r="5"/><circle cx="950" cy="140" r="5"/><circle cx="930" cy="220" r="5"/></g>'
};
const animation = animate ? `<style>@keyframes drift{to{transform:translateX(18px) rotate(2deg)}} .motif{transform-origin:1030px 170px;animation:drift 12s ease-in-out infinite alternate}@media(prefers-reduced-motion:reduce){.motif{animation:none}}</style>` : "";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="360" viewBox="0 0 1280 360" role="img" aria-label="${safe(title)}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#071A2B"/><stop offset="1" stop-color="#172D63"/></linearGradient><pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#8CC8DF" opacity=".08"/></pattern><linearGradient id="accent"><stop stop-color="#39E6C5"/><stop offset="1" stop-color="#6D8CFF"/></linearGradient></defs><rect width="1280" height="360" rx="24" fill="url(#bg)"/><rect width="1280" height="360" rx="24" fill="url(#grid)"/>${animation}<g class="motif">${motifs[style]}</g><g font-family="Arial,sans-serif"><text x="82" y="105" fill="#39E6C5" font-size="17" letter-spacing="5">HELLO, I'M</text><text x="78" y="180" fill="#F4FAFF" font-size="56" font-weight="700">${safe(title)}</text><rect x="82" y="208" width="360" height="4" rx="2" fill="url(#accent)"/><text x="82" y="254" fill="#D5E7F2" font-size="24">${safe(tagline)}</text><text x="82" y="296" fill="#9CB5C8" font-size="16" letter-spacing="2">${safe(handle)}</text></g></svg>`;
mkdirSync(dirname(out), {recursive:true});
writeFileSync(out, svg);
console.log(`Created ${out} using ${style}`);
