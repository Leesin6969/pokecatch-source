# make-stills.py — generate art/still PNGs from the animated GIFs, and synthesize art for the few
# species that only have a static Showdown still (no animated sprite exists upstream).
#
# The original game's `art/still/<id>.png` is exactly the first frame of the corresponding
# gen5ani GIF — this script reproduces that. For static-only species it builds a single-frame GIF
# and a still from the trimmed, downscaled artwork so the UI (which always requests a .gif) works.
import sys
from pathlib import Path
from PIL import Image

ROOT = Path("src/assets/pokemon")
STATIC = Path(".cache/gens/static")
MAX_SIDE = 96  # keep the battle art in the same size range as the shipped gifs


def first_frame_png(src: Path, dst: Path) -> None:
    with Image.open(src) as im:
        im.seek(0)
        im.convert("RGBA").save(dst, "PNG")


def static_to_gif_and_png(src: Path, gif: Path, png: Path) -> None:
    with Image.open(src) as im:
        im = im.convert("RGBA")
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        w, h = im.size
        scale = min(1.0, MAX_SIDE / max(w, h))
        if scale < 1.0:
            im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.NEAREST)
        # palette frame keeps the gif small and crisp (pixel art)
        frame = im.convert("P", palette=Image.ADAPTIVE, colors=255)
        frame.save(gif, "GIF", save_all=False, transparency=255)
        im.save(png, "PNG")


def main() -> int:
    made_still = made_gen = 0
    ids = range(494, 1026)
    for dex in ids:
        gif = ROOT / "art" / f"{dex}.gif"
        still = ROOT / "art" / "still" / f"{dex}.png"
        sgif = ROOT / "art" / "shiny" / f"{dex}.gif"
        sstill = ROOT / "art" / "shiny" / "still" / f"{dex}.png"
        static = STATIC / f"{dex}.png"
        if gif.exists() and not static.exists():
            if not still.exists():
                first_frame_png(gif, still)
                made_still += 1
            if sgif.exists() and not sstill.exists():
                first_frame_png(sgif, sstill)
                made_still += 1
        elif static.exists():
            static_to_gif_and_png(static, gif, still)
            static_to_gif_and_png(static, sgif, sstill)
            made_gen += 1
        elif not gif.exists():
            print("MISSING art for", dex, file=sys.stderr)
    print(f"stills made: {made_still} | static-derived art: {made_gen}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
