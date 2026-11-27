# Nusantara in Numbers

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/cffilham-jpg/makefun-statistics-site-v1/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/cffilham-jpg/makefun-statistics-site-v1/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original, independent statistical atlas of Indonesia. Six linked views cover the national overview, population, economy, health and education, all 38 provinces, and sources and methods. Vanilla JavaScript, CSS and code-drawn SVG charts; no dependencies, external assets, remote requests or build step.

Run `node serve.ts` and open the local server on port 8080. Use `node main.ts` to package `app/`, `screenshots/` and a canonical dossier into `out/`. Set `MAKEFUN_OUTPUT_DIR` to choose another output directory. Node 22.18+ is required.

The economy year selector updates its annual snapshot and chart history; province search includes capitals and supports four sort orders. All views include reference years and sources. Sources & Methods distinguishes approximate reference figures, the illustrative age pyramid, indicative regional GRDP, and the life-expectancy methodology break.

Screenshot routes and viewport sizes are recorded in `shots.json`. The four JPEGs are unedited Chromium renders of this code. This repository is prepared for review only; no bounty submission is performed by the application or packager.

MIT licensed. The required make.fun dossier utility is included unchanged under `vendor/`.

Verification results, screenshot sizes and the build session ID are recorded in [VERIFICATION.md](VERIFICATION.md). With a local Playwright installation and Chromium available, run `node verify.mjs`; `--capture` also regenerates the four real browser screenshots. Set `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` when using different local installation paths. These tools are for verification only and are never loaded by the site or the packager.
