# ExBeast rebrand: handoff for Claude Code

## Overview
This changes the existing **Exbotix** React site into **ExBeast**:
1. **Brand name:** "Exbotix" becomes "ExBeast" in all visible text (in all-caps spots, "EXBOTIX" becomes "EXBEAST").
2. **Logo:** a new ExBeast wordmark in the navbar and footer (`assets/img/exbeast-logo.png`, transparent background).
3. **Coin:** a new EXBT coin image (`assets/img/exbt-coin.png`), shown on the homepage in the "The EXBT token" section.
4. **Theme:** the purple palette becomes a lime palette.

**Keep these exactly as they are:** the token name `EXBT`, Chain IDs `11311` (mainnet) and `11211` (testnet), chain hex `0x2c2f` / `0x2bcb`, the RPC URLs (`https://rpc.exbotix.net/`, `http://testnet.rpc.exbotix.net`), the explorer URLs (`https://scan.exbotix.net/`, `http://testnet.explorer.exbotix.net`), the wallet `chainName` values ("Exbotix Mainnet" / "Exbotix Testnet"), lowercase code identifiers such as the hardhat network keys `exbotix` / `exbotixTestnet`, localStorage keys, and the LBank link `https://www.lbank.com/trade/exbt_usdt`.

## About the design files
The `reference-site/` folder holds **HTML design references** that show the finished result. It is not production code to copy over. Apply the same changes inside the existing React app, using its own theme or token files, components and asset pipeline. The page layout and structure stay the same; only colours, brand name and logo assets change.

## Fidelity
**High fidelity.** Use the exact hex values below.

## Colour tokens (old to new)
| Role | Old (purple) | New (lime) |
|---|---|---|
| Background | `#0A0613` | `#080A06` |
| Background 2 | `#0E0819` | `#0C0F09` |
| Surface | `#160F28` | `#131710` |
| Surface 2 | `#1E1538` | `#1A2015` |
| Lines (alpha .11 / .20) | `rgba(170,132,255,a)` | `rgba(191,255,0,a)` |
| **Accent (main)**: buttons, selected tabs, progress bars, highlights | `#9D5CFF` | **`#BFFF00`** |
| Accent 2 (darker lime, used for Futures and as the gradient end) | `#6E54F2` | **`#6FA800`** |
| Accent 3 (light lime, used on hover and for highlight text) | `#D6B4FF` | **`#D6FF66`** |
| Accent pop (was magenta) | `#D14BFF` | `#9BE000` |
| Accent glow | `rgba(157,92,255,.5)` | `rgba(191,255,0,.5)` |
| Text | `#F2ECFF` | `#F3F7EC` |
| Dim text | `#B7A9D8` | `#AEB8A2` |
| Muted text | `#786C97` | `#6F7A66` |
| Nav background | `rgba(18,11,34,.42/.66)` | `rgba(14,18,10,.42/.66)` |
| Dropdown background | `rgba(24,16,44,.92)` | `rgba(18,22,14,.92)` |
| Selection text | `#11061F` | `#0A0D05` |

Other purple shades that appear here and there: `#2A1D4A→#222A1A`, `#140C28→#10140C`, `#C9A9FF→#D6FF66`, `#7A5CFF→#8FCC00`, `#F3E8FF→#F4FAE6`, `#B98CFF→#C8F23A`, `#5B3CC4→#557F00`, `#C77DFF→#C8F23A`, `#B14BFF→#A6E000`, `#7B6CFF→#8FCC00`, `#8A6BF0→#8FCC00`, `#E59CFF→#E3FF8F`, `#CBB4FF→#DDF59A`, `#7A6FA8→#748064`.
The same mapping applies to their rgba versions: `185,140,255→200,242,58`, `214,180,255→214,255,102`, `209,75,255→155,224,0`, `110,84,242→111,168,0`, `135,92,255 / 180,120,255→191,255,0`, `230,200,255→230,255,170`, `220,188,255→220,255,140`, `180,150,255 / 190,150,255→200,240,120`, `120,60,220→111,168,0`, `40,24,68→30,38,22`, `20,12,38 / 20,13,38→16,20,12`, `10,6,19→8,10,6`.

**Do not change:** testnet amber `#FFB454`, success green `#34E0A1`, the LBank gold (`#F4C24B`, `#C8932B`), or the macOS window dots in code blocks.

## Component changes
- **Primary button:** a solid `#BFFF00` background (it used to be a violet gradient) with **dark text `#0A0D05`** for contrast. Hover background is `#D6FF66` with the existing 2px lift.
- **Gradient text (`.gradtext`, the rotating hero word):** `linear-gradient(100deg, #F3F7EC 14%, #D6FF66 48%, #BFFF00)`.
- **Brand logo:** replace the old `exbotix-full.png` with `exbeast-logo.png` (1396×283, about 4.9:1). It is 28px tall in the nav and 30px tall in the footer, width auto, alt text "ExBeast".
- **Homepage token section:** add `exbt-coin.png` (640×640) at 96×96 above the "The EXBT token" eyebrow, with `filter: drop-shadow(0 10px 30px rgba(191,255,0,.35))` and `margin-bottom: 18px`.
- Everything else (glows, borders, chips, dots, nav hover, focus rings) follows automatically once the tokens change.

## Assets
- `assets/exbeast-logo.png`: ExBeast wordmark ("EX" in white, "BEAST" in lime), transparent background.
- `assets/exbt-coin.png`: EXBT-CHAIN coin, transparent background.
- `assets/source/`: the original full-resolution uploads, in case a different size is needed.

## Files
- `reference-site/`: the complete rebranded HTML site (10 pages plus css, js and img). The key files are `assets/css/theme.css` (all tokens), `assets/js/chrome.js` (shared nav and footer, logo path) and `index.html` (coin placement).
- `CLAUDE_CODE_PROMPT.md`: a prompt you can paste straight into Claude Code.
