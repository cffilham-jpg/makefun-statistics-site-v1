# Verification record

Verified on 2026-11-27 in Codex session `01a21b77-a3ae-7b23-9315-98f3c1718210`. Built and verified only; no make.fun submission was made.

- All six persistent navigation links passed in headless Chromium at desktop and 390px phone widths.
- Province search by name/capital, empty results, clear search, all four sort orders, profile opening and closing passed. The explorer has 38 unique provinces.
- Population table sorting passed. The illustrative pyramid totals 283.5 million within floating-point precision.
- Every economy year from 2015 through 2024 passed; figures and all four charts update without showing a later year.
- The mobile menu opens and closes, including when selecting the current page. No horizontal overflow on any page.
- Zero browser console errors, page errors, external requests or runtime data requests. The initial six local files total 54,480 bytes raw / 18,526 bytes gzip-9.
- `MAKEFUN_OUTPUT_DIR=out node main.ts` and `env -u MAKEFUN_OUTPUT_DIR node main.ts` wrote byte-identical output, confirmed with `diff -r`.
- Both packaging modes also exited 0 as `nobody` (uid 65534), reading a copy under `/tmp` whose files and directories were not writable by that user. Explicit and default output directories were writable working locations. Those outputs match each other and the normal build byte for byte.
- Gate size checks passed: app has six regular files, 54,480 bytes; index.html is 1,611 bytes; dossier.json is 540,687 bytes. No app symlinks, external references, assets or dependencies.
- The vendor utility SHA-256 is `4c8da1c8e76490b3a847670f49137d3ec23953e3c988fe6a6cb320fce5739240`, identical to the supplied kit file.
- GitHub repository is public, created 2026-11-27T05:27:38Z, with the required make.fun homepage, topic, README badges, owner claim and MIT license.

All screenshots are unedited JPEGs captured from the running site by Chromium. Each was opened for visual inspection and independently decoded and dimension-checked.

| File | Dimensions | Bytes | Visible content |
| --- | --- | ---: | --- |
| `screenshots/1-overview.jpg` | 1280 × 800 | 108,658 | Teal atlas hero, six headline statistics, complete population trend and decade comparison |
| `screenshots/2-population.jpg` | 1280 × 800 | 105,543 | National population indicators, age pyramid, all ten province table rows and their source |
| `screenshots/3-regions.jpg` | 1280 × 800 | 99,429 | Search and population sort, province cards, selected West Java profile and national GRDP comparison |
| `screenshots/4-phone.jpg` | 390 × 844 | 49,179 | Collapsed navigation, responsive hero, all six headline statistics and chart heading |

First-test revisions included improving cover framing, correcting the single-year chart boundary, tightening the population table, and closing the phone menu when its current page is selected. All relevant browser checks were repeated after the changes.
