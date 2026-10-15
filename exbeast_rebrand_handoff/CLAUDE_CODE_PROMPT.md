# Claude Code prompt: ExBeast rebrand

Unzip `exbeast_rebrand_handoff/` into your React repo root, then paste this into Claude Code:

---

Rebrand this React app from **Exbotix** to **ExBeast**. The full spec is in `./exbeast_rebrand_handoff/README.md`; read it first. `./exbeast_rebrand_handoff/reference-site/` is an HTML reference of the finished result (start with `assets/css/theme.css`, `assets/js/chrome.js` and `index.html`). Use it as a reference only: make the changes inside this codebase's own theme, tokens and components, and do not paste raw HTML.

Tasks:

1. **Theme:** find where colours are defined (CSS variables, Tailwind config, theme object or styled-components theme) and remap every purple value to the lime value in the README tables. The main accent is `#BFFF00`, hover is `#D6FF66` and the darker lime is `#6FA800`. Then search the whole codebase for hard-coded purple hex or rgba values outside the theme and remap those as well. Leave amber `#FFB454`, green `#34E0A1`, the LBank gold `#F4C24B` / `#C8932B` and the macOS window dots untouched.

2. **Primary buttons:** make them solid `#BFFF00` with dark text `#0A0D05` (white text on lime is unreadable), and set the hover background to `#D6FF66`. Check every other place where text sits on an accent background and switch it to dark text.

3. **Brand name:** replace every user-facing "Exbotix" with "ExBeast" ("EXBOTIX" becomes "EXBEAST"). That covers page titles, meta tags, copy, alt text, footer copyright and the manifest. **Do not change** these:
   - URLs and domains (`rpc.exbotix.net`, `scan.exbotix.net`, `testnet.*.exbotix.net`)
   - wallet `chainName` values ("Exbotix Mainnet" / "Exbotix Testnet")
   - lowercase code identifiers, hardhat network keys, localStorage keys
   - the token name `EXBT`, the Chain IDs 11311 / 11211 and the hex values 0x2c2f / 0x2bcb

4. **Assets:** copy `exbeast_rebrand_handoff/assets/exbeast-logo.png` and `exbt-coin.png` into the app's assets folder. Swap the navbar and footer logo for `exbeast-logo.png` (28px tall in the nav, 30px in the footer, width auto, alt "ExBeast") and remove references to the old logo. Replace any existing EXBT coin image with the new one.

5. **Homepage token section:** add the coin at 96×96 above the "The EXBT token" eyebrow, with `drop-shadow(0 10px 30px rgba(191,255,0,.35))` and 18px of bottom margin.

6. **Favicon:** if the app has one built from the old logo, regenerate it from `exbt-coin.png`.

Keep layout, spacing, copy (apart from the brand name), routing and logic exactly as they are. When you're done, list the changed files, show a grep proving no purple hex values remain outside the excluded set, and confirm the network constants are unchanged.
