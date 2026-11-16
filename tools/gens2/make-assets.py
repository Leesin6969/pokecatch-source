# make-assets.py — gen 5-9 forms: still frames + region badge sheets + primal orb icons.
#
#   * art/still/<formId>.png : first frame of the form's animated gif (same method as the base game)
#   * badges/<region>-sheet.png : 8-cell badge sheet recoloured from the shipped Sinnoh sheet
#   * items/red-orb.png, items/blue-orb.png : recoloured from the shipped orb icons
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path("src/assets")
FORMS = json.loads(Path("src/ext/data/forms.json").read_text(encoding="utf-8"))["forms"]

def first_frame(src: Path, dst: Path) -> bool:
    if not src.exists():
        return False
    with Image.open(src) as im:
        im.seek(0)
        im.convert("RGBA").save(dst, "PNG")
    return True

made = 0
missing = []
for f in FORMS:
    fid = f["id"]
    for shiny in (False, True):
        gif = ROOT / "pokemon" / "art" / ("shiny/" if shiny else "") / f"{fid}.gif"
        png = ROOT / "pokemon" / "art" / ("shiny/still/" if shiny else "still/") / f"{fid}.png"
        png.parent.mkdir(parents=True, exist_ok=True)
        if first_frame(gif, png):
            made += 1
        else:
            missing.append(str(gif))

# ---- badge sheets: recolour the 256x32 Sinnoh sheet per region ------------------------------
REGIONS = {
    "unova": "#8a8a8a",
    "kalos": "#3b6fe0",
    "alola": "#ee8130",
    "galar": "#a33ea1",
    "paldea": "#c22e28",
}
def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def tint(src: Path, dst: Path, color: str) -> None:
    with Image.open(src) as im:
        im = im.convert("RGBA")
        r, g, b, a = im.split()
        gray = Image.merge("RGB", (r, g, b)).convert("L")
        dark = tuple(int(c * 0.25) for c in hex_rgb(color))
        bright = tuple(min(255, int(c * 0.55 + 110)) for c in hex_rgb(color))
        out = ImageOps.colorize(gray, black=dark, white=bright).convert("RGBA")
        out.putalpha(a)
        out.save(dst, "PNG")

sheet = ROOT / "badges" / "dppt.png"
for name, color in REGIONS.items():
    dst = ROOT / "badges" / f"{name}-sheet.png"
    tint(sheet, dst, color)
print("badge sheets:", ", ".join(f"{n}-sheet.png" for n in REGIONS))

# ---- primal orbs ----------------------------------------------------------------------------
ORBS = {"red-orb": "lustrous-orb.png", "blue-orb": "adamant-orb.png"}
ORB_COLORS = {"red-orb": "#e3353b", "blue-orb": "#3b6fe0"}
for orb, src in ORBS.items():
    s = ROOT / "items" / src
    if s.exists():
        tint(s, ROOT / "items" / f"{orb}.png", ORB_COLORS[orb])
print("forms stills made:", made, "| missing:", len(missing))
if missing:
    print("MISSING:", missing[:5])
