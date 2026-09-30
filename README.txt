ROBERT'S CORNER — fake ARG blog
================================

An early-2000s personal blog for "Robert," a factory worker at Depp Fabrication
who lives for hiking and filming wildlife on his Sony camcorder — until a hike
turns everything wrong. Filler posts (nature clips, a new watch, the job) make
it look lived-in; the story posts each carry a downloadable tape (.arcv) that
players open in the Archive Viewer, and Robert comes apart across them.

FILES
-----
index.html   the page
style.css    styling
posts.js     ALL the writing + the release schedule (edit this)
tapes/       the .arcv files players download
downloads/   put your built ArchiveViewer-Setup.exe here (the site links to it)

HOSTING
-------
Plain static HTML — upload the whole folder to any host (Neocities, GitHub
Pages, itch.io, your own domain). Open index.html to preview locally.

THE ARCHIVE VIEWER DOWNLOAD
---------------------------
All the "download the Archive Viewer" links point to downloads/ArchiveViewer.zip.

IMPORTANT: the zip that ships here right now is the app's SOURCE CODE. It needs
Node.js + `npm install` + `npm start` to run — that's fine for you, but NOT what
you want players downloading. Before you launch, replace downloads/ArchiveViewer.zip
with one of these (keep the same filename so the links still work):

  1. BEST for players: a zip of your built, ready-to-run app. Run `npm run dist`
     (or `npm run pack`) in the Archive Viewer project, then zip the
     dist/win-unpacked/ folder. Players unzip and double-click "Archive Viewer.exe"
     — no install, no Node.
  2. Or the installer: rename the two links to downloads/ArchiveViewer-Setup.exe
     and drop your built "Archive Viewer Setup 0.1.0.exe" in downloads/.

Either way the site already explains the Sony .arcv format and that only the
viewer opens the tapes.

STORY POSTS  (map to the tapes; escalating breakdown)
-----------------------------------------------------
  day 0  cabin.arcv    "found a cabin way out there"      (curious)
  day 1  picture.arcv  "the painting isn't staying put"   (unsettled)
  day 2  noise.arcv    "it's in the walls now"            (not sleeping)
  day 3  pink.arcv     "the pink room"                    (losing time)
  day 4  mail.arcv     "they sent an invitation"          (fatalistic)
  day 5  mystery.arcv  "i can see all of it now"          (gone / corrupted)

THE CIPHER (final post)
-----------------------
The last post is written as corrupted text and contains one ciphered line:
  NB  YLWB  RH  GSVRI  RMHGIFNVMG
It's ATBASH (mirror alphabet: A<->Z, B<->Y, ...). Decoded it reads:
  MY BODY IS THEIR INSTRUMENT
The post hints at it ("hold it to a mirror... the first letter is the last"),
which also ties to the "watch it backwards" motif from the pink-room post.
The ??? tape (mystery.arcv) is attached to this post.

DAILY RELEASE
-------------
In posts.js set DROP_DATE to your launch day. Story posts have offset 0..5, so
one appears each day (cabin at drop, the cipher post on day 5). Filler posts
have negative offsets, always visible.

Per-post override in posts.js: show:true forces a post visible now; show:false
hides it. Release uses the visitor's clock — fine for a blog; use the show:
flags (or only upload each day's tape when you want it live) for hard control.

SWAPPING IN YOUR REAL TAPES
---------------------------
Replace files in tapes/ with your real encoded tapes (same names: cabin.arcv,
picture.arcv, noise.arcv, pink.arcv, mail.arcv, mystery.arcv). Make them with
`node tools/encode.js <video> <name>` in the Archive Viewer project. Update the
size labels in posts.js if you care (cosmetic).

EDITING
-------
All post text is plain HTML in posts.js. Character: "Robert," Depp Fabrication.
