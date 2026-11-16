# Data models — shape của mọi bảng dữ liệu

Sinh tự động bởi `tools/gen-data-models.mjs`. Các bảng literal lấy từ `data/*.json` (chạy `npm run data:export`),
các bảng có getter/hàm lấy trực tiếp từ AST của module nguồn.

> Ghi chú: repo có thêm **content pack gen 5–9** — 532 entry #494–#1025 được `src/ext/js/003b-*.js`
> push vào `t.POKEDEX` lúc boot (cùng field/kiểu với bảng dưới); evolution/base exp tương tự ở
> `004b`/`014b`, region/chapter ở `094b`. Shape không đổi, chỉ tăng số dòng — xem
> [GEN5-9.md](GEN5-9.md).

## POKEDEX

Mỗi entry là một loài: tên, key sprite, hệ, base stats, captureRate, learnset…

| trường | kiểu | ví dụ |
|---|---|---|
| `id` | number | `1` |
| `name` | string | `"Bulbizarre"` |
| `key` | string | `"bulbasaur"` |
| `types` | array | `["grass","poison"]` |
| `stats` | object | `{"hp":45,"atk":49,"def":49,"spa":65,"spd":65,"spe":45}` |
| `captureRate` | number | `45` |
| `legendary` | boolean | `false` |
| `mythical` | boolean | `false` |
| `height` | number | `0.7` |
| `weight` | number | `6.9` |
| `genus` | string | `"Pokémon Graine"` |
| `flavor` | string | `"Quand il est jeune, il absorbe les nutriments conservés dans son dos pour grandir et se…` |
| `learn` | array | `[[1,"tackle"],[1,"growl"],[3,"vine-whip"],[6,"growth"],[9,"leech-seed"],[12,"razor-leaf"…` |

## MOVES

Bảng chiêu: hệ, power, accuracy, category, hiệu ứng.

| trường | kiểu | ví dụ |
|---|---|---|
| `name` | string | `"Repli"` |
| `type` | string | `"water"` |
| `power` | number | `0` |
| `acc` | number | `100` |
| `cat` | string | `"status"` |

## EVOLUTIONS

Đồ thị tiến hoá `{from: [{to, level?, item?, …}]}`.

| trường | kiểu | ví dụ |
|---|---|---|
| `to` | number | `2` |
| `level` | number | `16` |

## ENCOUNTERS

Bảng gặp theo zone: mảng `[id, minLv, maxLv, weight, điều kiện]`.

| trường | kiểu | ví dụ |
|---|---|---|

## HABITATS

Metadata zone/habitat: vùng, bg, danh sách loài, spawn.

| trường | kiểu | ví dụ |
|---|---|---|
| `base` | object | `{"16":30,"19":15,"102":3,"161":30,"165":8,"204":5}` |
| `night` | object | `{"16":0,"19":25,"155":4,"161":0,"163":30,"165":0,"167":8}` |
| `rain` | object | `{"60":6}` |
| `storm` | object | `{"60":10}` |

## SCENES

Background: catalog (scene id → webp) + places + css().

| trường | kiểu | ví dụ |
|---|---|---|
| `1` | object | `{"src":"assets/bg/scenes/01-prairie-ouverte-710x400.webp","indoor":false,"source":"outpu…` |
| `2` | object | `{"src":"assets/bg/scenes/02-chemin-boise-lisiere-710x400.webp","indoor":false,"source":"…` |
| `3` | object | `{"src":"assets/bg/scenes/03-sentier-rocheux-710x400.webp","indoor":false,"source":"outpu…` |
| `4` | object | `{"src":"assets/bg/scenes/04-berge-riviere-710x400.webp","indoor":false,"source":"output/…` |
| `5` | object | `{"src":"assets/bg/scenes/05-pont-pepite-v2-710x400.webp","indoor":false,"source":"output…` |
| `6` | object | `{"src":"assets/bg/scenes/06-pontons-peche-710x400.webp","indoor":false,"source":"output/…` |
| `7` | object | `{"src":"assets/bg/scenes/07-prairie-cotiere-710x400.webp","indoor":false,"source":"outpu…` |
| `8` | object | `{"src":"assets/bg/scenes/08-piste-cyclable-710x400.webp","indoor":false,"source":"output…` |
| `9` | object | `{"src":"assets/bg/scenes/09-plage-710x400.webp","indoor":false,"source":"output/imagegen…` |
| `10` | object | `{"src":"assets/bg/scenes/10-pleine-mer-710x400.webp","indoor":false,"source":"output/ima…` |
| `11` | object | `{"src":"assets/bg/scenes/11-approche-ligue-710x400.webp","indoor":false,"source":"output…` |
| `12` | object | `{"src":"assets/bg/scenes/12-foret-jade-v2-710x400.webp","indoor":false,"source":"output/…` |
| `14` | object | `{"src":"assets/bg/scenes/14-grotte-taupiqueur-710x400.webp","indoor":true,"source":"outp…` |
| `15` | object | `{"src":"assets/bg/scenes/15-grotte-sombre-710x400.webp","indoor":true,"source":"output/i…` |
| `16` | object | `{"src":"assets/bg/scenes/16-tour-pokemon-710x400.webp","indoor":true,"source":"output/im…` |
| `17` | object | `{"src":"assets/bg/scenes/17-safari-prairie-710x400.webp","indoor":false,"source":"output…` |
| `18` | object | `{"src":"assets/bg/scenes/18-safari-zone-humide-710x400.webp","indoor":false,"source":"ou…` |
| `19` | object | `{"src":"assets/bg/scenes/19-centrale-abandonnee-710x400.webp","indoor":true,"source":"ou…` |
| `20` | object | `{"src":"assets/bg/scenes/20-iles-ecume-v2-710x400.webp","indoor":true,"source":"output/i…` |
| `21` | object | `{"src":"assets/bg/scenes/21-manoir-pokemon-710x400.webp","indoor":true,"source":"output/…` |
| `22` | object | `{"src":"assets/bg/scenes/22-repaire-rocket-710x400.webp","indoor":true,"source":"output/…` |
| `23` | object | `{"src":"assets/bg/scenes/23-sylphe-sarl-710x400.webp","indoor":true,"source":"output/ima…` |
| `24` | object | `{"src":"assets/bg/scenes/24-route-victoire-710x400.webp","indoor":true,"source":"output/…` |
| `25` | object | `{"src":"assets/bg/scenes/25-caverne-azuree-710x400.webp","indoor":true,"source":"output/…` |
| `26` | object | `{"src":"assets/bg/scenes/26-arene-pierre-710x400.webp","indoor":true,"source":"output/im…` |
| `27` | object | `{"src":"assets/bg/scenes/27-arene-ondine-710x400.webp","indoor":true,"source":"output/im…` |
| `28` | object | `{"src":"assets/bg/scenes/28-arene-major-bob-710x400.webp","indoor":true,"source":"output…` |
| `29` | object | `{"src":"assets/bg/scenes/29-arene-erika-710x400.webp","indoor":true,"source":"output/ima…` |
| `30` | object | `{"src":"assets/bg/scenes/30-arene-koga-710x400.webp","indoor":true,"source":"output/imag…` |
| `31` | object | `{"src":"assets/bg/scenes/31-arene-morgane-710x400.webp","indoor":true,"source":"output/i…` |
| `32` | object | `{"src":"assets/bg/scenes/32-arene-auguste-710x400.webp","indoor":true,"source":"output/i…` |
| `33` | object | `{"src":"assets/bg/scenes/33-arene-giovanni-710x400.webp","indoor":true,"source":"output/…` |
| `34` | object | `{"src":"assets/bg/scenes/34-ligue-olga-710x400.webp","indoor":true,"source":"output/imag…` |
| `35` | object | `{"src":"assets/bg/scenes/35-ligue-aldo-v2-710x400.webp","indoor":true,"source":"output/i…` |
| `36` | object | `{"src":"assets/bg/scenes/36-ligue-agatha-710x400.webp","indoor":true,"source":"output/im…` |
| `37` | object | `{"src":"assets/bg/scenes/37-ligue-peter-710x400.webp","indoor":true,"source":"output/ima…` |
| `38` | object | `{"src":"assets/bg/scenes/38-maitre-blue-710x400.webp","indoor":true,"source":"output/ima…` |
| `39` | object | `{"src":"assets/bg/scenes/39-bourg-palette-710x400.webp","indoor":false,"source":"output/…` |
| `40` | object | `{"src":"assets/bg/scenes/40-jadielle-710x400.webp","indoor":false,"source":"output/image…` |
| `41` | object | `{"src":"assets/bg/scenes/41-argenta-710x400.webp","indoor":false,"source":"output/imageg…` |
| `42` | object | `{"src":"assets/bg/scenes/42-azuria-710x400.webp","indoor":false,"source":"output/imagege…` |
| `43` | object | `{"src":"assets/bg/scenes/43-carmin-port-710x400.webp","indoor":false,"source":"output/im…` |
| `44` | object | `{"src":"assets/bg/scenes/44-lavanville-710x400.webp","indoor":false,"source":"output/ima…` |
| `45` | object | `{"src":"assets/bg/scenes/45-celadopole-710x400.webp","indoor":false,"source":"output/ima…` |
| `46` | object | `{"src":"assets/bg/scenes/46-safrania-710x400.webp","indoor":false,"source":"output/image…` |
| `47` | object | `{"src":"assets/bg/scenes/47-parmanie-710x400.webp","indoor":false,"source":"output/image…` |
| `48` | object | `{"src":"assets/bg/scenes/48-cramois-ile-710x400.webp","indoor":false,"source":"output/im…` |
| `49` | object | `{"src":"assets/bg/scenes/49-plateau-indigo-710x400.webp","indoor":false,"source":"output…` |
| `50` | object | `{"src":"assets/bg/scenes/50-centre-pokemon-v2-710x400.webp","indoor":true,"source":"outp…` |
| `51` | object | `{"src":"assets/bg/scenes/51-labo-cramois-710x400.webp","indoor":true,"source":"output/im…` |
| `52` | object | `{"src":"assets/bg/scenes/52-oceane-interieur-710x400.webp","indoor":true,"source":"outpu…` |
| `53` | object | `{"src":"assets/bg/scenes/53-oceane-pont-710x400.webp","indoor":false,"source":"output/im…` |
| `54` | object | `{"src":"assets/bg/scenes/54-dojo-safrania-710x400.webp","indoor":true,"source":"output/i…` |
| `55` | object | `{"src":"assets/bg/scenes/55-casino-celadopole-710x400.webp","indoor":true,"source":"outp…` |
| `56` | object | `{"src":"assets/bg/scenes/56-musee-argenta-710x400.webp","indoor":true,"source":"output/i…` |
| `57` | object | `{"src":"assets/bg/scenes/57-maison-leo-710x400.webp","indoor":true,"source":"output/imag…` |
| `58` | object | `{"src":"assets/bg/scenes/58-manoir-celadon-710x400.webp","indoor":false,"source":"output…` |
| `59` | object | `{"src":"assets/bg/scenes/59-souterrains-710x400.webp","indoor":true,"source":"output/ima…` |
| `60` | object | `{"src":"assets/bg/scenes/60-boutique-pokemon-710x400.webp","indoor":true,"source":"outpu…` |
| `61` | object | `{"src":"assets/bg/scenes/61-pantheon-710x400.webp","indoor":true,"source":"output/imageg…` |
| `62` | object | `{"src":"assets/bg/scenes/labo-professeur-chen-710x400.webp","indoor":true,"source":"outp…` |
| `63` | object | `{"src":"assets/bg/scenes/parc-pension-710x400.webp","indoor":false,"source":"output/imag…` |
| `johto-bois-chenes` | object | `{"src":"assets/bg/scenes/johto-bois-chenes-v2-710x400.webp","indoor":false,"source":"out…` |
| `johto-caves-jumelles` | object | `{"src":"assets/bg/scenes/johto-caves-jumelles-v8-710x400.webp","indoor":true,"source":"o…` |
| `johto-tour-cendree` | object | `{"src":"assets/bg/scenes/johto-tour-cendree-710x400.webp","indoor":true,"source":"output…` |
| `johto-phare-oliville` | object | `{"src":"assets/bg/scenes/johto-phare-oliville-710x400.webp","indoor":true,"source":"outp…` |
| `johto-iles-tourbillon` | object | `{"src":"assets/bg/scenes/johto-iles-tourbillon-710x400.webp","indoor":true,"source":"out…` |
| `johto-mont-creuset` | object | `{"src":"assets/bg/scenes/johto-mont-creuset-710x400.webp","indoor":true,"source":"output…` |
| `johto-lac-colere` | object | `{"src":"assets/bg/scenes/johto-lac-colere-v2-710x400.webp","indoor":false,"source":"outp…` |
| `johto-tour-radio` | object | `{"src":"assets/bg/scenes/johto-tour-radio-v2-710x400.webp","indoor":true,"source":"outpu…` |
| `johto-route-glace` | object | `{"src":"assets/bg/scenes/johto-route-glace-v2-710x400.webp","indoor":true,"source":"outp…` |
| `johto-antre-dragon` | object | `{"src":"assets/bg/scenes/johto-antre-dragon-v2-710x400.webp","indoor":true,"source":"out…` |
| `johto-tour-carillon-v2` | object | `{"src":"assets/bg/scenes/johto-tour-carillon-v2-710x400.webp","indoor":false,"source":"o…` |
| `johto-mont-argente-v2` | object | `{"src":"assets/bg/scenes/johto-mont-argente-v2-710x400.webp","indoor":true,"source":"out…` |
| `johto-arene-mauville` | object | `{"src":"assets/bg/scenes/johto-arene-mauville-710x400.webp","indoor":true,"source":"outp…` |
| `johto-arene-ecorcia` | object | `{"src":"assets/bg/scenes/johto-arene-ecorcia-710x400.webp","indoor":true,"source":"outpu…` |
| `johto-arene-doublonville` | object | `{"src":"assets/bg/scenes/johto-arene-doublonville-710x400.webp","indoor":true,"source":"…` |
| `johto-arene-rosalia` | object | `{"src":"assets/bg/scenes/johto-arene-rosalia-710x400.webp","indoor":true,"source":"outpu…` |
| `johto-arene-irisia` | object | `{"src":"assets/bg/scenes/johto-arene-irisia-710x400.webp","indoor":true,"source":"output…` |
| `johto-arene-oliville` | object | `{"src":"assets/bg/scenes/johto-arene-oliville-710x400.webp","indoor":true,"source":"outp…` |
| `johto-arene-acajou` | object | `{"src":"assets/bg/scenes/johto-arene-acajou-710x400.webp","indoor":true,"source":"output…` |
| `johto-arene-ebenelle` | object | `{"src":"assets/bg/scenes/johto-arene-ebenelle-710x400.webp","indoor":true,"source":"outp…` |
| `johto-ligue-clement` | object | `{"src":"assets/bg/scenes/johto-ligue-clement-710x400.webp","indoor":true,"source":"outpu…` |
| `johto-ligue-koga` | object | `{"src":"assets/bg/scenes/johto-ligue-koga-710x400.webp","indoor":true,"source":"output/i…` |
| `johto-ligue-aldo` | object | `{"src":"assets/bg/scenes/johto-ligue-aldo-710x400.webp","indoor":true,"source":"output/i…` |
| `johto-ligue-marion-v2` | object | `{"src":"assets/bg/scenes/johto-ligue-marion-v2-710x400.webp","indoor":true,"source":"out…` |
| `johto-maitre-peter` | object | `{"src":"assets/bg/scenes/johto-maitre-peter-710x400.webp","indoor":true,"source":"output…` |
| `johto-bourg-geon` | object | `{"src":"assets/bg/scenes/johto-bourg-geon-710x400.webp","indoor":false,"source":"output/…` |
| `johto-ville-griotte` | object | `{"src":"assets/bg/scenes/johto-ville-griotte-710x400.webp","indoor":false,"source":"outp…` |
| `johto-mauville` | object | `{"src":"assets/bg/scenes/johto-mauville-710x400.webp","indoor":false,"source":"output/im…` |
| `johto-ecorcia` | object | `{"src":"assets/bg/scenes/johto-ecorcia-710x400.webp","indoor":false,"source":"output/ima…` |
| `johto-doublonville` | object | `{"src":"assets/bg/scenes/johto-doublonville-710x400.webp","indoor":false,"source":"outpu…` |
| `johto-rosalia` | object | `{"src":"assets/bg/scenes/johto-rosalia-710x400.webp","indoor":false,"source":"output/ima…` |
| `johto-oliville` | object | `{"src":"assets/bg/scenes/johto-oliville-710x400.webp","indoor":false,"source":"output/im…` |
| `johto-irisia` | object | `{"src":"assets/bg/scenes/johto-irisia-710x400.webp","indoor":false,"source":"output/imag…` |
| `johto-acajou` | object | `{"src":"assets/bg/scenes/johto-acajou-710x400.webp","indoor":false,"source":"output/imag…` |
| `johto-ebenelle` | object | `{"src":"assets/bg/scenes/johto-ebenelle-710x400.webp","indoor":false,"source":"output/im…` |
| `johto-prairies` | object | `{"src":"assets/bg/scenes/johto-prairies-710x400.webp","indoor":false,"source":"output/im…` |
| `johto-cote` | object | `{"src":"assets/bg/scenes/johto-cote-710x400.webp","indoor":false,"source":"output/imageg…` |
| `jungle-x` | object | `{"src":"assets/bg/scenes/jungle-x-710x400.webp","indoor":false,"source":"output/imagegen…` |
| `johto-sentier-montagne` | object | `{"src":"assets/bg/scenes/johto-sentier-montagne-710x400.webp","indoor":false,"source":"o…` |
| `johto-repaire-rocket` | object | `{"src":"assets/bg/scenes/johto-repaire-rocket-710x400.webp","indoor":true,"source":"outp…` |
| `johto-sous-sol-doublonville` | object | `{"src":"assets/bg/scenes/johto-sous-sol-doublonville-710x400.webp","indoor":true,"source…` |
| `johto-maison-irisia` | object | `{"src":"assets/bg/scenes/johto-maison-irisia-710x400.webp","indoor":true,"source":"outpu…` |
| `johto-sommet-mont-argente` | object | `{"src":"assets/bg/scenes/johto-sommet-mont-argente-710x400.webp","indoor":false,"source"…` |
| `johto-labo-orme` | object | `{"src":"assets/bg/scenes/johto-labo-orme-710x400.webp","indoor":true,"source":"output/im…` |
| `johto-tour-chetiflor` | object | `{"src":"assets/bg/scenes/johto-tour-chetiflor-710x400.webp","indoor":true,"source":"outp…` |
| `johto-ruines-alpha` | object | `{"src":"assets/bg/scenes/johto-ruines-alpha-710x400.webp","indoor":true,"source":"output…` |
| `johto-puits-ramoloss` | object | `{"src":"assets/bg/scenes/johto-puits-ramoloss-710x400.webp","indoor":true,"source":"outp…` |
| `johto-parc-naturel` | object | `{"src":"assets/bg/scenes/johto-parc-naturel-710x400.webp","indoor":false,"source":"outpu…` |
| `johto-theatre-rosalia` | object | `{"src":"assets/bg/scenes/johto-theatre-rosalia-710x400.webp","indoor":true,"source":"out…` |
| `hoenn-algatia` | object | `{"src":"assets/bg/scenes/hoenn-algatia-710x400.webp","indoor":false}` |
| `hoenn-archipel-recifs` | object | `{"src":"assets/bg/scenes/hoenn-archipel-recifs-710x400.webp","indoor":false}` |
| `hoenn-atalanopolis` | object | `{"src":"assets/bg/scenes/hoenn-atalanopolis-710x400.webp","indoor":false}` |
| `hoenn-autequia` | object | `{"src":"assets/bg/scenes/hoenn-autequia-710x400.webp","indoor":false}` |
| `hoenn-bois-clementi` | object | `{"src":"assets/bg/scenes/hoenn-bois-clementi-710x400.webp","indoor":false}` |
| `hoenn-bourg-en-vol` | object | `{"src":"assets/bg/scenes/hoenn-bourg-en-vol-710x400.webp","indoor":false}` |
| `hoenn-cimetronelle` | object | `{"src":"assets/bg/scenes/hoenn-cimetronelle-710x400.webp","indoor":false}` |
| `hoenn-clementi-ville` | object | `{"src":"assets/bg/scenes/hoenn-clementi-ville-710x400.webp","indoor":false}` |
| `hoenn-contreforts-volcaniques` | object | `{"src":"assets/bg/scenes/hoenn-contreforts-volcaniques-710x400.webp","indoor":false}` |
| `hoenn-cote-rocheuse` | object | `{"src":"assets/bg/scenes/hoenn-cote-rocheuse-710x400.webp","indoor":false}` |
| `hoenn-courants-marins` | object | `{"src":"assets/bg/scenes/hoenn-courants-marins-710x400.webp","indoor":false}` |
| `hoenn-desert-route-111` | object | `{"src":"assets/bg/scenes/hoenn-desert-route-111-710x400.webp","indoor":false}` |
| `hoenn-eternara` | object | `{"src":"assets/bg/scenes/hoenn-eternara-710x400.webp","indoor":false}` |
| `hoenn-foret-lacs-route-120` | object | `{"src":"assets/bg/scenes/hoenn-foret-lacs-route-120-710x400.webp","indoor":false}` |
| `hoenn-ile-du-sud` | object | `{"src":"assets/bg/scenes/hoenn-ile-du-sud-710x400.webp","indoor":false}` |
| `hoenn-ile-mirage` | object | `{"src":"assets/bg/scenes/hoenn-ile-mirage-710x400.webp","indoor":false}` |
| `hoenn-jungle-route-119` | object | `{"src":"assets/bg/scenes/hoenn-jungle-route-119-710x400.webp","indoor":false}` |
| `hoenn-lavandia` | object | `{"src":"assets/bg/scenes/hoenn-lavandia-710x400.webp","indoor":false}` |
| `hoenn-lisiere-humide` | object | `{"src":"assets/bg/scenes/hoenn-lisiere-humide-710x400.webp","indoor":false}` |
| `hoenn-merouville` | object | `{"src":"assets/bg/scenes/hoenn-merouville-710x400.webp","indoor":false}` |
| `hoenn-myokara` | object | `{"src":"assets/bg/scenes/hoenn-myokara-710x400.webp","indoor":false}` |
| `hoenn-nenucrique` | object | `{"src":"assets/bg/scenes/hoenn-nenucrique-710x400.webp","indoor":false}` |
| `hoenn-pacifiville` | object | `{"src":"assets/bg/scenes/hoenn-pacifiville-710x400.webp","indoor":false}` |
| `hoenn-parc-safari-hoenn` | object | `{"src":"assets/bg/scenes/hoenn-parc-safari-hoenn-710x400.webp","indoor":false}` |
| `hoenn-piste-cyclable-maritime` | object | `{"src":"assets/bg/scenes/hoenn-piste-cyclable-maritime-710x400.webp","indoor":false}` |
| `hoenn-plage-tropicale` | object | `{"src":"assets/bg/scenes/hoenn-plage-tropicale-710x400.webp","indoor":false}` |
| `hoenn-pilier-celeste-sommet` | object | `{"src":"assets/bg/scenes/hoenn-pilier-celeste-sommet-710x400.webp","indoor":false}` |
| `hoenn-pleine-mer` | object | `{"src":"assets/bg/scenes/hoenn-pleine-mer-710x400.webp","indoor":false}` |
| `hoenn-poivressel` | object | `{"src":"assets/bg/scenes/hoenn-poivressel-710x400.webp","indoor":false}` |
| `hoenn-prairie-tropicale` | object | `{"src":"assets/bg/scenes/hoenn-prairie-tropicale-710x400.webp","indoor":false}` |
| `hoenn-rosyeres` | object | `{"src":"assets/bg/scenes/hoenn-rosyeres-710x400.webp","indoor":false}` |
| `hoenn-route-cendres` | object | `{"src":"assets/bg/scenes/hoenn-route-cendres-710x400.webp","indoor":false}` |
| `hoenn-sentier-sinuroc` | object | `{"src":"assets/bg/scenes/hoenn-sentier-sinuroc-710x400.webp","indoor":false}` |
| `hoenn-sommet-mont-chimnee` | object | `{"src":"assets/bg/scenes/hoenn-sommet-mont-chimnee-710x400.webp","indoor":false}` |
| `hoenn-sommet-mont-memoria` | object | `{"src":"assets/bg/scenes/hoenn-sommet-mont-memoria-710x400.webp","indoor":false}` |
| `hoenn-tour-mirage` | object | `{"src":"assets/bg/scenes/hoenn-tour-mirage-710x400.webp","indoor":false}` |
| `hoenn-vallee-route-114` | object | `{"src":"assets/bg/scenes/hoenn-vallee-route-114-710x400.webp","indoor":false}` |
| `hoenn-vergazon` | object | `{"src":"assets/bg/scenes/hoenn-vergazon-710x400.webp","indoor":false}` |
| `hoenn-vergers-est-hoenn` | object | `{"src":"assets/bg/scenes/hoenn-vergers-est-hoenn-710x400.webp","indoor":false}` |
| `hoenn-vermilava` | object | `{"src":"assets/bg/scenes/hoenn-vermilava-710x400.webp","indoor":false}` |
| `hoenn-voie-du-desert` | object | `{"src":"assets/bg/scenes/hoenn-voie-du-desert-710x400.webp","indoor":false}` |
| `hoenn-zone-combat-exterieur` | object | `{"src":"assets/bg/scenes/hoenn-zone-combat-exterieur-710x400.webp","indoor":false}` |
| `hoenn-arene-algatia` | object | `{"src":"assets/bg/scenes/hoenn-arene-algatia-710x400.webp","indoor":true}` |
| `hoenn-arene-atalanopolis` | object | `{"src":"assets/bg/scenes/hoenn-arene-atalanopolis-710x400.webp","indoor":true}` |
| `hoenn-arene-cimetronelle` | object | `{"src":"assets/bg/scenes/hoenn-arene-cimetronelle-710x400.webp","indoor":true}` |
| `hoenn-arene-clementi-ville` | object | `{"src":"assets/bg/scenes/hoenn-arene-clementi-ville-710x400.webp","indoor":true}` |
| `hoenn-arene-lavandia` | object | `{"src":"assets/bg/scenes/hoenn-arene-lavandia-710x400.webp","indoor":true}` |
| `hoenn-arene-merouville` | object | `{"src":"assets/bg/scenes/hoenn-arene-merouville-710x400.webp","indoor":true}` |
| `hoenn-arene-myokara` | object | `{"src":"assets/bg/scenes/hoenn-arene-myokara-710x400.webp","indoor":true}` |
| `hoenn-arene-vermilava` | object | `{"src":"assets/bg/scenes/hoenn-arene-vermilava-710x400.webp","indoor":true}` |
| `hoenn-caverne-fondmer` | object | `{"src":"assets/bg/scenes/hoenn-caverne-fondmer-710x400.webp","indoor":true}` |
| `hoenn-centre-spatial` | object | `{"src":"assets/bg/scenes/hoenn-centre-spatial-710x400.webp","indoor":true}` |
| `hoenn-chambre-ancienne-sous-marine` | object | `{"src":"assets/bg/scenes/hoenn-chambre-ancienne-sous-marine-710x400.webp","indoor":true,…` |
| `hoenn-chemin-ardent` | object | `{"src":"assets/bg/scenes/hoenn-chemin-ardent-710x400.webp","indoor":true}` |
| `hoenn-conseil4-aragon` | object | `{"src":"assets/bg/scenes/hoenn-conseil4-aragon-710x400.webp","indoor":true}` |
| `hoenn-conseil4-damien` | object | `{"src":"assets/bg/scenes/hoenn-conseil4-damien-710x400.webp","indoor":true}` |
| `hoenn-conseil4-glacia` | object | `{"src":"assets/bg/scenes/hoenn-conseil4-glacia-710x400.webp","indoor":true}` |
| `hoenn-conseil4-spectra` | object | `{"src":"assets/bg/scenes/hoenn-conseil4-spectra-710x400.webp","indoor":true}` |
| `hoenn-devon-sarl` | object | `{"src":"assets/bg/scenes/hoenn-devon-sarl-710x400.webp","indoor":true}` |
| `hoenn-dojo-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-dojo-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-dome-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-dome-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-epave` | object | `{"src":"assets/bg/scenes/hoenn-epave-710x400.webp","indoor":true}` |
| `hoenn-fonds-sous-marins` | object | `{"src":"assets/bg/scenes/hoenn-fonds-sous-marins-710x400.webp","indoor":true,"sky":"unde…` |
| `hoenn-grotte-granite` | object | `{"src":"assets/bg/scenes/hoenn-grotte-granite-710x400.webp","indoor":true}` |
| `hoenn-grotte-island` | object | `{"src":"assets/bg/scenes/hoenn-grotte-island-710x400.webp","indoor":true}` |
| `hoenn-grotte-marine` | object | `{"src":"assets/bg/scenes/hoenn-grotte-marine-710x400.webp","indoor":true}` |
| `hoenn-grotte-origine` | object | `{"src":"assets/bg/scenes/hoenn-grotte-origine-710x400.webp","indoor":true}` |
| `hoenn-grotte-terra` | object | `{"src":"assets/bg/scenes/hoenn-grotte-terra-710x400.webp","indoor":true}` |
| `hoenn-grotte-trefonds-glace` | object | `{"src":"assets/bg/scenes/hoenn-grotte-trefonds-glace-710x400.webp","indoor":true}` |
| `hoenn-grotte-trefonds-marees` | object | `{"src":"assets/bg/scenes/hoenn-grotte-trefonds-marees-710x400.webp","indoor":true}` |
| `hoenn-institut-meteo` | object | `{"src":"assets/bg/scenes/hoenn-institut-meteo-710x400.webp","indoor":true}` |
| `hoenn-laboratoire-seko` | object | `{"src":"assets/bg/scenes/hoenn-laboratoire-seko-710x400.webp","indoor":true}` |
| `hoenn-maison-pieges` | object | `{"src":"assets/bg/scenes/hoenn-maison-pieges-710x400.webp","indoor":true}` |
| `hoenn-maitre-pierre-rochard` | object | `{"src":"assets/bg/scenes/hoenn-maitre-pierre-rochard-710x400.webp","indoor":true}` |
| `hoenn-mont-memoria-interieur` | object | `{"src":"assets/bg/scenes/hoenn-mont-memoria-interieur-710x400.webp","indoor":true}` |
| `hoenn-musee-oceanographique` | object | `{"src":"assets/bg/scenes/hoenn-musee-oceanographique-710x400.webp","indoor":true}` |
| `hoenn-new-lavandia` | object | `{"src":"assets/bg/scenes/hoenn-new-lavandia-710x400.webp","indoor":true}` |
| `hoenn-palace-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-palace-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-pilier-celeste-interieur` | object | `{"src":"assets/bg/scenes/hoenn-pilier-celeste-interieur-710x400.webp","indoor":true}` |
| `hoenn-planque-aqua` | object | `{"src":"assets/bg/scenes/hoenn-planque-aqua-710x400.webp","indoor":true}` |
| `hoenn-planque-magma` | object | `{"src":"assets/bg/scenes/hoenn-planque-magma-710x400.webp","indoor":true}` |
| `hoenn-pyramide-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-pyramide-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-reptile-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-reptile-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-route-victoire-hoenn` | object | `{"src":"assets/bg/scenes/hoenn-route-victoire-hoenn-710x400.webp","indoor":true}` |
| `hoenn-ruines-desert` | object | `{"src":"assets/bg/scenes/hoenn-ruines-desert-710x400.webp","indoor":true}` |
| `hoenn-salle-concours` | object | `{"src":"assets/bg/scenes/hoenn-salle-concours-710x400.webp","indoor":true}` |
| `hoenn-sanctuaire-chambre-emergee` | object | `{"src":"assets/bg/scenes/hoenn-sanctuaire-chambre-emergee-710x400.webp","indoor":true}` |
| `hoenn-site-meteore` | object | `{"src":"assets/bg/scenes/hoenn-site-meteore-710x400.webp","indoor":true}` |
| `hoenn-tombeau-antique` | object | `{"src":"assets/bg/scenes/hoenn-tombeau-antique-710x400.webp","indoor":true}` |
| `hoenn-tour-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-tour-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-usine-combat-interieur` | object | `{"src":"assets/bg/scenes/hoenn-usine-combat-interieur-710x400.webp","indoor":true}` |
| `hoenn-tunnel-merazon` | object | `{"src":"assets/bg/scenes/hoenn-tunnel-merazon-710x400.webp","indoor":true,"source":"outp…` |
| `hoenn-route-118` | object | `{"src":"assets/bg/scenes/hoenn-route-118-710x400.webp","indoor":false,"source":"output/i…` |
| `hoenn-route-116` | object | `{"src":"assets/bg/scenes/hoenn-route-116-710x400.webp","indoor":false,"source":"output/i…` |
| `hoenn-route-123` | object | `{"src":"assets/bg/scenes/hoenn-route-123-710x400.webp","indoor":false,"source":"output/i…` |
| `hoenn-archipel-routes-105-108` | object | `{"src":"assets/bg/scenes/hoenn-archipel-routes-105-108-710x400.webp","indoor":false,"sou…` |
| `hoenn-haute-mer-routes-129-131` | object | `{"src":"assets/bg/scenes/hoenn-haute-mer-routes-129-131-710x400.webp","indoor":false,"so…` |
| `hoenn-cote-route-125` | object | `{"src":"assets/bg/scenes/hoenn-cote-route-125-710x400.webp","indoor":false,"source":"out…` |
| `hoenn-sommet-des-voeux-jirachi` | object | `{"src":"assets/bg/scenes/hoenn-sommet-des-voeux-jirachi-710x400.webp","indoor":false,"so…` |
| `hoenn-ile-aurore-deoxys` | object | `{"src":"assets/bg/scenes/ile-aurore-deoxys-710x400.webp","indoor":false,"source":"output…` |
| `groudon-chambre-magmatique` | object | `{"src":"assets/bg/scenes/groudon-chambre-magmatique-710x400.webp","indoor":true}` |
| `kyogre-arene-tempete` | object | `{"src":"assets/bg/scenes/kyogre-arene-tempete-710x400.webp","indoor":false}` |
| `rayquaza-pilier-celeste` | object | `{"src":"assets/bg/scenes/rayquaza-pilier-celeste-710x400.webp","indoor":false}` |
| `artikodin-mer-gelee` | object | `{"src":"assets/bg/scenes/artikodin-mer-gelee-710x400.webp","indoor":false}` |
| `sulfura-grotte-ardente` | object | `{"src":"assets/bg/scenes/sulfura-grotte-ardente-710x400.webp","indoor":true,"veil":false}` |
| `sinnoh-bonaugure` | object | `{"src":"assets/bg/scenes/sinnoh-bonaugure-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-littorella` | object | `{"src":"assets/bg/scenes/sinnoh-littorella-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-feli-cite` | object | `{"src":"assets/bg/scenes/sinnoh-feli-cite-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-charbourg` | object | `{"src":"assets/bg/scenes/sinnoh-charbourg-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-floraville` | object | `{"src":"assets/bg/scenes/sinnoh-floraville-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-vestigion` | object | `{"src":"assets/bg/scenes/sinnoh-vestigion-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-unionpolis` | object | `{"src":"assets/bg/scenes/sinnoh-unionpolis-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-bonville` | object | `{"src":"assets/bg/scenes/sinnoh-bonville-710x400.webp","indoor":false,"source":"output/i…` |
| `sinnoh-voilaroc` | object | `{"src":"assets/bg/scenes/sinnoh-voilaroc-710x400.webp","indoor":false,"source":"output/i…` |
| `sinnoh-verchamps` | object | `{"src":"assets/bg/scenes/sinnoh-verchamps-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-celestia` | object | `{"src":"assets/bg/scenes/sinnoh-celestia-710x400.webp","indoor":false,"source":"output/i…` |
| `sinnoh-joliberges` | object | `{"src":"assets/bg/scenes/sinnoh-joliberges-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-frimapic` | object | `{"src":"assets/bg/scenes/sinnoh-frimapic-710x400.webp","indoor":false,"source":"output/i…` |
| `sinnoh-rivamar` | object | `{"src":"assets/bg/scenes/sinnoh-rivamar-710x400.webp","indoor":false,"source":"output/im…` |
| `sinnoh-ligue-pokemon` | object | `{"src":"assets/bg/scenes/sinnoh-ligue-pokemon-710x400.webp","indoor":false,"source":"out…` |
| `sinnoh-aire-combat` | object | `{"src":"assets/bg/scenes/sinnoh-aire-combat-710x400.webp","indoor":false,"source":"outpu…` |
| `sinnoh-aire-survie` | object | `{"src":"assets/bg/scenes/sinnoh-aire-survie-710x400.webp","indoor":false,"source":"outpu…` |
| `sinnoh-aire-detente` | object | `{"src":"assets/bg/scenes/sinnoh-aire-detente-710x400.webp","indoor":false,"source":"outp…` |
| `sinnoh-route-201` | object | `{"src":"assets/bg/scenes/sinnoh-route-201-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-202` | object | `{"src":"assets/bg/scenes/sinnoh-route-202-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-203` | object | `{"src":"assets/bg/scenes/sinnoh-route-203-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-204` | object | `{"src":"assets/bg/scenes/sinnoh-route-204-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-205` | object | `{"src":"assets/bg/scenes/sinnoh-route-205-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-206` | object | `{"src":"assets/bg/scenes/sinnoh-route-206-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-207` | object | `{"src":"assets/bg/scenes/sinnoh-route-207-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-208` | object | `{"src":"assets/bg/scenes/sinnoh-route-208-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-209` | object | `{"src":"assets/bg/scenes/sinnoh-route-209-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-210` | object | `{"src":"assets/bg/scenes/sinnoh-route-210-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-211` | object | `{"src":"assets/bg/scenes/sinnoh-route-211-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-212` | object | `{"src":"assets/bg/scenes/sinnoh-route-212-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-213` | object | `{"src":"assets/bg/scenes/sinnoh-route-213-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-214` | object | `{"src":"assets/bg/scenes/sinnoh-route-214-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-215` | object | `{"src":"assets/bg/scenes/sinnoh-route-215-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-216` | object | `{"src":"assets/bg/scenes/sinnoh-route-216-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-217` | object | `{"src":"assets/bg/scenes/sinnoh-route-217-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-218` | object | `{"src":"assets/bg/scenes/sinnoh-route-218-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-219` | object | `{"src":"assets/bg/scenes/sinnoh-route-219-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-chenal-220` | object | `{"src":"assets/bg/scenes/sinnoh-chenal-220-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-route-221` | object | `{"src":"assets/bg/scenes/sinnoh-route-221-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-222` | object | `{"src":"assets/bg/scenes/sinnoh-route-222-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-chenal-223` | object | `{"src":"assets/bg/scenes/sinnoh-chenal-223-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-route-224` | object | `{"src":"assets/bg/scenes/sinnoh-route-224-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-225` | object | `{"src":"assets/bg/scenes/sinnoh-route-225-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-chenal-226` | object | `{"src":"assets/bg/scenes/sinnoh-chenal-226-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-route-227` | object | `{"src":"assets/bg/scenes/sinnoh-route-227-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-228` | object | `{"src":"assets/bg/scenes/sinnoh-route-228-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-route-229` | object | `{"src":"assets/bg/scenes/sinnoh-route-229-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-chenal-230` | object | `{"src":"assets/bg/scenes/sinnoh-chenal-230-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-route-210-sud` | object | `{"src":"assets/bg/scenes/sinnoh-route-210-sud-710x400.webp","indoor":false,"source":"out…` |
| `sinnoh-route-212-nord` | object | `{"src":"assets/bg/scenes/sinnoh-route-212-nord-710x400.webp","indoor":false,"source":"ou…` |
| `sinnoh-lac-verite` | object | `{"src":"assets/bg/scenes/sinnoh-lac-verite-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-lac-courage` | object | `{"src":"assets/bg/scenes/sinnoh-lac-courage-710x400.webp","indoor":false,"source":"outpu…` |
| `sinnoh-lac-savoir` | object | `{"src":"assets/bg/scenes/sinnoh-lac-savoir-710x400.webp","indoor":false,"source":"output…` |
| `sinnoh-lac-courage-asseche` | object | `{"src":"assets/bg/scenes/sinnoh-lac-courage-asseche-710x400.webp","indoor":false,"source…` |
| `sinnoh-entree-charbourg` | object | `{"src":"assets/bg/scenes/sinnoh-entree-charbourg-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-mine-charbourg` | object | `{"src":"assets/bg/scenes/sinnoh-mine-charbourg-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-chemin-rocheux` | object | `{"src":"assets/bg/scenes/sinnoh-chemin-rocheux-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-pre-floraville` | object | `{"src":"assets/bg/scenes/sinnoh-pre-floraville-710x400.webp","indoor":false,"source":"ou…` |
| `sinnoh-eoliennes` | object | `{"src":"assets/bg/scenes/sinnoh-eoliennes-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-foret-vestigion` | object | `{"src":"assets/bg/scenes/sinnoh-foret-vestigion-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-vieux-chateau` | object | `{"src":"assets/bg/scenes/sinnoh-vieux-chateau-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-grotte-reveche` | object | `{"src":"assets/bg/scenes/sinnoh-grotte-reveche-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-mont-couronne-interieur` | object | `{"src":"assets/bg/scenes/sinnoh-mont-couronne-interieur-710x400.webp","indoor":true,"sou…` |
| `sinnoh-colonnes-lances` | object | `{"src":"assets/bg/scenes/sinnoh-colonnes-lances-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-grand-marais` | object | `{"src":"assets/bg/scenes/sinnoh-grand-marais-710x400.webp","indoor":false,"source":"outp…` |
| `sinnoh-ruines-bonville` | object | `{"src":"assets/bg/scenes/sinnoh-ruines-bonville-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-tour-perdue` | object | `{"src":"assets/bg/scenes/sinnoh-tour-perdue-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-forge-fuego` | object | `{"src":"assets/bg/scenes/sinnoh-forge-fuego-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-ile-fer` | object | `{"src":"assets/bg/scenes/sinnoh-ile-fer-710x400.webp","indoor":true,"source":"output/ima…` |
| `sinnoh-route-victoire` | object | `{"src":"assets/bg/scenes/sinnoh-route-victoire-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-chemin-source` | object | `{"src":"assets/bg/scenes/sinnoh-chemin-source-710x400.webp","indoor":false,"source":"out…` |
| `sinnoh-source-adieu` | object | `{"src":"assets/bg/scenes/sinnoh-source-adieu-710x400.webp","indoor":false,"source":"outp…` |
| `sinnoh-grotte-retour` | object | `{"src":"assets/bg/scenes/sinnoh-grotte-retour-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-temple-frimapic` | object | `{"src":"assets/bg/scenes/sinnoh-temple-frimapic-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-mont-abrupt` | object | `{"src":"assets/bg/scenes/sinnoh-mont-abrupt-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-souterrains-sinnoh` | object | `{"src":"assets/bg/scenes/sinnoh-souterrains-sinnoh-710x400.webp","indoor":true,"source":…` |
| `sinnoh-square-paisible` | object | `{"src":"assets/bg/scenes/sinnoh-square-paisible-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-jardin-trophee` | object | `{"src":"assets/bg/scenes/sinnoh-jardin-trophee-710x400.webp","indoor":false,"source":"ou…` |
| `sinnoh-manoir-pokemon` | object | `{"src":"assets/bg/scenes/sinnoh-manoir-pokemon-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-tunnel-ruinemaniac` | object | `{"src":"assets/bg/scenes/sinnoh-tunnel-ruinemaniac-710x400.webp","indoor":true,"source":…` |
| `sinnoh-laboratoire-sorbier` | object | `{"src":"assets/bg/scenes/sinnoh-laboratoire-sorbier-710x400.webp","indoor":true,"source"…` |
| `sinnoh-musee-minier-charbourg` | object | `{"src":"assets/bg/scenes/sinnoh-musee-minier-charbourg-710x400.webp","indoor":true,"sour…` |
| `sinnoh-bibliotheque-joliberges` | object | `{"src":"assets/bg/scenes/sinnoh-bibliotheque-joliberges-710x400.webp","indoor":true,"sou…` |
| `sinnoh-pokemontre-sa` | object | `{"src":"assets/bg/scenes/sinnoh-pokemontre-sa-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-batiment-galaxie-vestigion` | object | `{"src":"assets/bg/scenes/sinnoh-batiment-galaxie-vestigion-710x400.webp","indoor":true,"…` |
| `sinnoh-hangar-galaxie` | object | `{"src":"assets/bg/scenes/sinnoh-hangar-galaxie-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-qg-galaxie-voilaroc` | object | `{"src":"assets/bg/scenes/sinnoh-qg-galaxie-voilaroc-710x400.webp","indoor":true,"source"…` |
| `sinnoh-salle-concours-unionpolis` | object | `{"src":"assets/bg/scenes/sinnoh-salle-concours-unionpolis-710x400.webp","indoor":true,"s…` |
| `sinnoh-arene-charbourg` | object | `{"src":"assets/bg/scenes/sinnoh-arene-charbourg-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-arene-vestigion` | object | `{"src":"assets/bg/scenes/sinnoh-arene-vestigion-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-arene-voilaroc` | object | `{"src":"assets/bg/scenes/sinnoh-arene-voilaroc-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-arene-verchamps` | object | `{"src":"assets/bg/scenes/sinnoh-arene-verchamps-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-arene-unionpolis` | object | `{"src":"assets/bg/scenes/sinnoh-arene-unionpolis-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-arene-joliberges` | object | `{"src":"assets/bg/scenes/sinnoh-arene-joliberges-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-arene-frimapic` | object | `{"src":"assets/bg/scenes/sinnoh-arene-frimapic-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-arene-rivamar` | object | `{"src":"assets/bg/scenes/sinnoh-arene-rivamar-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-conseil-aaron` | object | `{"src":"assets/bg/scenes/sinnoh-conseil-aaron-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-conseil-terry` | object | `{"src":"assets/bg/scenes/sinnoh-conseil-terry-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-conseil-adrien` | object | `{"src":"assets/bg/scenes/sinnoh-conseil-adrien-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-conseil-lucio` | object | `{"src":"assets/bg/scenes/sinnoh-conseil-lucio-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-salle-cynthia` | object | `{"src":"assets/bg/scenes/sinnoh-salle-cynthia-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-pantheon-sinnoh` | object | `{"src":"assets/bg/scenes/sinnoh-pantheon-sinnoh-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-hall-ligue-sinnoh` | object | `{"src":"assets/bg/scenes/sinnoh-hall-ligue-sinnoh-710x400.webp","indoor":true,"source":"…` |
| `sinnoh-tour-combat` | object | `{"src":"assets/bg/scenes/sinnoh-tour-combat-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-mont-couronne-neige` | object | `{"src":"assets/bg/scenes/sinnoh-mont-couronne-neige-710x400.webp","indoor":false,"source…` |
| `sinnoh-monde-distorsion` | object | `{"src":"assets/bg/scenes/sinnoh-monde-distorsion-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-ile-pleine-lune` | object | `{"src":"assets/bg/scenes/sinnoh-ile-pleine-lune-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-ile-nouvellelune` | object | `{"src":"assets/bg/scenes/sinnoh-ile-nouvellelune-710x400.webp","indoor":false,"source":"…` |
| `sinnoh-passage-marin` | object | `{"src":"assets/bg/scenes/sinnoh-passage-marin-710x400.webp","indoor":false,"source":"out…` |
| `sinnoh-paradis-fleuri` | object | `{"src":"assets/bg/scenes/sinnoh-paradis-fleuri-710x400.webp","indoor":false,"source":"ou…` |
| `sinnoh-salle-originelle` | object | `{"src":"assets/bg/scenes/sinnoh-salle-originelle-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-colonnes-lances-portail` | object | `{"src":"assets/bg/scenes/sinnoh-colonnes-lances-portail-710x400.webp","indoor":false,"so…` |
| `sinnoh-caverne-verite` | object | `{"src":"assets/bg/scenes/sinnoh-caverne-verite-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-caverne-courage` | object | `{"src":"assets/bg/scenes/sinnoh-caverne-courage-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-caverne-savoir` | object | `{"src":"assets/bg/scenes/sinnoh-caverne-savoir-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-ruines-celestia` | object | `{"src":"assets/bg/scenes/sinnoh-ruines-celestia-710x400.webp","indoor":true,"source":"ou…` |
| `sinnoh-parc-amis` | object | `{"src":"assets/bg/scenes/sinnoh-parc-amis-710x400.webp","indoor":false,"source":"output/…` |
| `sinnoh-hotel-grand-lac` | object | `{"src":"assets/bg/scenes/sinnoh-hotel-grand-lac-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-phare-panorama` | object | `{"src":"assets/bg/scenes/sinnoh-phare-panorama-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-pension-bonville` | object | `{"src":"assets/bg/scenes/sinnoh-pension-bonville-710x400.webp","indoor":false,"source":"…` |
| `sinnoh-maison-joueur-bonaugure` | object | `{"src":"assets/bg/scenes/sinnoh-maison-joueur-bonaugure-710x400.webp","indoor":true,"sou…` |
| `sinnoh-ecole-dresseurs-felicite` | object | `{"src":"assets/bg/scenes/sinnoh-ecole-dresseurs-felicite-710x400.webp","indoor":true,"so…` |
| `sinnoh-feli-tele` | object | `{"src":"assets/bg/scenes/sinnoh-feli-tele-710x400.webp","indoor":true,"source":"output/i…` |
| `sinnoh-grand-magasin-voilaroc` | object | `{"src":"assets/bg/scenes/sinnoh-grand-magasin-voilaroc-710x400.webp","indoor":true,"sour…` |
| `sinnoh-usine-combat` | object | `{"src":"assets/bg/scenes/sinnoh-usine-combat-710x400.webp","indoor":true,"source":"outpu…` |
| `sinnoh-scene-combat` | object | `{"src":"assets/bg/scenes/sinnoh-scene-combat-710x400.webp","indoor":true,"source":"outpu…` |
| `sinnoh-castel-combat` | object | `{"src":"assets/bg/scenes/sinnoh-castel-combat-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-arcade-combat` | object | `{"src":"assets/bg/scenes/sinnoh-arcade-combat-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-villa-aire-detente` | object | `{"src":"assets/bg/scenes/sinnoh-villa-aire-detente-710x400.webp","indoor":true,"source":…` |
| `sinnoh-club-rubans` | object | `{"src":"assets/bg/scenes/sinnoh-club-rubans-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-cafe-combat` | object | `{"src":"assets/bg/scenes/sinnoh-cafe-combat-710x400.webp","indoor":true,"source":"output…` |
| `sinnoh-restaurant-sept-etoiles` | object | `{"src":"assets/bg/scenes/sinnoh-restaurant-sept-etoiles-710x400.webp","indoor":true,"sou…` |
| `sinnoh-auberge-marin` | object | `{"src":"assets/bg/scenes/sinnoh-auberge-marin-710x400.webp","indoor":true,"source":"outp…` |
| `sinnoh-ile-fer-exterieur` | object | `{"src":"assets/bg/scenes/sinnoh-ile-fer-exterieur-710x400.webp","indoor":false,"source":…` |
| `sinnoh-cafe-cabane-interieur` | object | `{"src":"assets/bg/scenes/sinnoh-cafe-cabane-interieur-710x400.webp","indoor":true,"sourc…` |
| `sinnoh-sanctuaire-unionpolis` | object | `{"src":"assets/bg/scenes/sinnoh-sanctuaire-unionpolis-710x400.webp","indoor":true,"sourc…` |
| `sinnoh-ruines-pic-roche` | object | `{"src":"assets/bg/scenes/sinnoh-ruines-pic-roche-710x400.webp","indoor":true,"source":"o…` |
| `sinnoh-ruines-iceberg` | object | `{"src":"assets/bg/scenes/sinnoh-ruines-iceberg-710x400.webp","indoor":true,"source":"out…` |
| `sinnoh-ruines-fer` | object | `{"src":"assets/bg/scenes/sinnoh-ruines-fer-710x400.webp","indoor":true,"source":"output/…` |
| `sinnoh-tour-sacree` | object | `{"src":"assets/bg/scenes/sinnoh-tour-sacree-710x400.webp","indoor":false,"source":"outpu…` |
| `sinnoh-rive-lac-verite` | object | `{"src":"assets/bg/scenes/sinnoh-rive-lac-verite-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-rive-lac-courage` | object | `{"src":"assets/bg/scenes/sinnoh-rive-lac-courage-710x400.webp","indoor":false,"source":"…` |
| `sinnoh-rive-lac-savoir` | object | `{"src":"assets/bg/scenes/sinnoh-rive-lac-savoir-710x400.webp","indoor":false,"source":"o…` |
| `sinnoh-zone-combat-esplanade` | object | `{"src":"assets/bg/scenes/sinnoh-zone-combat-esplanade-710x400.webp","indoor":false,"sour…` |
| `sinnoh-arceus-sommet` | object | `{"src":"assets/bg/scenes/sinnoh-arceus-sommet-710x400.webp","indoor":false,"source":"out…` |
| `sinnoh-arceus-sommet-sombre` | object | `{"src":"assets/bg/scenes/sinnoh-arceus-sommet-sombre-710x400.webp","indoor":false,"sourc…` |

## LEAGUE_TEAMS

Đội hình Elite Four / Champion theo vùng.

| trường | kiểu | ví dụ |
|---|---|---|
| `sprite` | string | `"lass"` |
| `name` | string | `"Fillette Zoé"` |
| `team` | array | `[117,99]` |

## CHANGELOG

Entry changelog: title, date, notes…

| trường | kiểu | ví dụ |
|---|---|---|
| `date` | string | `"2026-11-14"` |
| `title` | string | `"🐛 v0.4.104 · Correctifs"` |
| `md` | string | `"\nCette version rend définitifs les résultats de la Pension et du Souterrain.\n\n## 🐛 …` |
| `en` | object | `{"title":"🐛 v0.4.104 · Bug fixes","md":"\nThis version makes Day Care and Underground r…` |
| `es` | object | `{"title":"🐛 v0.4.104 · Correcciones","md":"\nEsta versión hace definitivos los resultad…` |

## SPRITE_BOUNDS

Bounding box cắt sprite: `{path: [x, y, w, h]}`.

| trường | kiểu | ví dụ |
|---|---|---|

## STORY

Chiến dịch: REGIONS → CHAPTERS → steps. Shape đọc từ AST `src/js/028-story.js`.

| cấp | trường |
|---|---|
| STORY | `TRAINER_CLASSES`, `TRAINER_CLASSES_JOHTO`, `TRAINER_CLASSES_HOENN`, `TRAINER_CLASSES_SINNOH`, `TRAINER_CLASSES_TEAMS`, `classesOf`, `GYM_CLASSES`, `CLASS_TYPES`, `trainerFor`, `TRAINER_NAMES`, `TRAINER_NAMES_F`, `trainerName`, `trainerLabel`, `TOWNS`, `TOWN_TRADES`, `ITEM_TABLE`, `BADGE_IMG`, `BADGE_IMG_JOHTO`, `BADGE_IMG_HOENN`, `BADGE_IMG_SINNOH`, `badgeSheet`, `badgeSrc`, `badgeHtml`, `REGIONS`, `regionOf`, `firstChapterOf`, `leagueOf`, `chaptersOf`, `placeName`, `levelAt`, `aceOf`, `bandOf`, `staticLevel`, `capOf`, `nextGymOf`, `levelCap`, `regionCap`, `gymTeam`, `trainerTeam`, `routeBand`, `regionUnlocked`, `TIDE_MS`, `lowTide`, `TIDES`, `tide`, `tidal`, `MEW_CHANCE`, `RARE_SHARE`, `RARE_WILD`, `CHAPTERS` |
| REGIONS[0] | `key`, `name`, `gen`, `color`, `open`, `dex`, `offset`, `ace`, `economy`, `mythical` |
| CHAPTERS[0] | `name`, `region`, `day`, `aceUp`, `capMargin`, `zoneFrom`, `steps` |
| step kind `gift` | `kind`, `name`, `bg`, `gift` |
| step kind `route` | `kind`, `name`, `bg`, `areas`, `lv`, `wild`, `trainers`, `item` |
| step kind `heal` | `kind`, `name`, `bg` |
| step kind `find` | `kind`, `name`, `bg`, `item`, `once` |
| step kind `gym` | `kind`, `name`, `bg`, `fallback`, `leader`, `sprite`, `type`, `badge`, `color`, `reward`, `power`, `ace`, `team` |

