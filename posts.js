/* =====================================================================
   ROBERT'S CORNER — post data + release logic
   ---------------------------------------------------------------------
   RELEASE
   - Set DROP_DATE to the day your ARG goes live.
   - "offset" = days after DROP_DATE a post appears. Filler posts use
     negative offsets (always shown). The story posts run 0..5:
        cabin  = day 0 (live at drop)
        picture= day 1
        noise  = day 2
        pink   = day 3
        mail   = day 4
        cipher = day 5   (the final corrupted post + the ??? tape)
   - Per-post override: show:true forces visible now, show:false hides it.
   ===================================================================== */

const DROP_DATE = "2026-09-25";   // <-- change to your launch day (YYYY-MM-DD)

const POSTS = [

  /* ---------------- filler: nature-filming, a little materialistic ---------------- */
  { id: "f1", offset: -420, mood: "excited", music: "the birds outside",
    title: "got a camcorder",
    body: `<p>Finally bought a proper video camera. A Sony &mdash; the DCR-DVD203. Been wanting one for years to film when I'm out on the trails. Deer, hawks, whatever I run into.</p>
           <p>Records to these little discs. Files come off it kind of funny but I'll figure it out.</p>` },

  { id: "f2", offset: -392, mood: "beat", music: "the radio",
    title: "long week",
    body: `<p>Depp Fabrication has us on overtime again. Ten, twelve hour days on the line. Nothing to say about it. It pays.</p>
           <p>All I think about the whole shift is getting back out to the woods this weekend.</p>` },

  { id: "f3", offset: -360, mood: "great", music: "none, just quiet",
    title: "red-tailed hawk",
    body: `<p>Got a beautiful red-tailed hawk on tape this morning up on the ridge. Sat still for almost ten minutes before it took off. The camcorder held focus the whole time.</p>
           <p>This is why I bought the thing. Days like this.</p>` },

  { id: "f4", offset: -320, mood: "pleased", music: "classic rock",
    title: "new watch",
    body: `<p>Treated myself. Nice heavy Fossil, big face, looks like way more than I paid. Guy at the mall thought it was a $500 watch. Ha.</p>
           <p>Someday it'll be a real Rolex. Datejust. A man can want things.</p>` },

  { id: "f5", offset: -285, mood: "peaceful", music: "wind",
    title: "deer at dawn",
    body: `<p>Up before sunrise, hiked out to the meadow. Three does and a fat little fawn. Filmed all of it. Something about watching them through the viewfinder, quiet, like you're not even there.</p>
           <p>Could do this every day and never get tired of it.</p>` },

  { id: "f6", offset: -240, mood: "good", music: "—",
    title: "new boots + pack",
    body: `<p>Kitted out. New waterproof boots, a real pack, a little tripod for the camcorder. If I'm gonna do this I'm gonna do it right.</p>
           <p>Planning to start going farther out. There's a lot of country back past the ridge nobody bothers with.</p>` },

  { id: "f7", offset: -200, mood: "delighted", music: "woodpeckers",
    title: "pileated woodpecker!!",
    body: `<p>Huge one. Size of a crow, red crest, hammering on a dead pine. Got maybe two minutes of it before it flew. These are rare to catch this close.</p>
           <p>The tape came out great. Watched it three times last night.</p>` },

  { id: "f8", offset: -150, mood: "content", music: "the game",
    title: "raise",
    body: `<p>Bumped up to line lead at Depp. Little more money. Already spending it in my head &mdash; new TV, maybe start the Rolex fund for real.</p>
           <p>Mom says save more. I save plenty. I earned it.</p>` },

  { id: "f9", offset: -100, mood: "pleased", music: "—",
    title: "estate sale find",
    body: `<p>Hit an estate sale two towns over. Got a big framed oil painting for $15. A landscape, kind of dark, trees and a little house. Lady said it'd been in the family a long time. Fifteen bucks! Hung it in the front room.</p>
           <p>People throw away real value.</p>` },

  { id: "f10", offset: -55, mood: "restless", music: "none",
    title: "going deeper this weekend",
    body: `<p>Been staring at the topo maps. There's a whole stretch of woods northwest of the ridge, no trails marked, no roads. Old growth. Bet there's wildlife back there nobody's filmed in years.</p>
           <p>Packing up Saturday. Camcorder, batteries, the works. Might be gone all day.</p>` },

  { id: "f11", offset: -18, mood: "happy", music: "an owl, somewhere",
    title: "a fox on the old logging road",
    body: `<p>Red fox, middle of the afternoon, just trotted right across the old logging road while I was filming. Stopped and looked dead into the lens for a second. Got chills.</p>
           <p>Every time I think I've seen it all out there, it shows me something else. Going out again next weekend, farther than ever.</p>` },

  /* ---------------------------- the story posts ---------------------------- */

  { id: "s1_cabin", offset: 0, mood: "curious", music: "—",
    title: "found a cabin way out there",
    body: `<p>Went deep today. Hours past the ridge, off any trail, following a creek. And out in the middle of nowhere I found a cabin. Old, small, boarded up half-rotted. No road to it. No reason for it to be there.</p>
           <p>Of course I filmed it. Went inside even &mdash; you know me. Empty except for some junk and a smell I can't describe. The camcorder acted up the whole time, but it kept recording.</p>
           <p>Watched the tape back home tonight and there's something on it near the end I didn't see while I was standing right there. Take a look. You'll need the Archive Viewer to open it.</p>`,
    tape: { file: "cabin.arcv", size: "160 KB" } },

  { id: "s2_picture", offset: 1, mood: "unsettled", music: "none",
    title: "the painting isn't staying put",
    body: `<p>Something's wrong in the house since I got back from that cabin. That estate-sale painting &mdash; the landscape &mdash; it won't stay where I hang it. Found it this morning facing the wall. I did NOT move it.</p>
           <p>Hung it back up. Filmed it, sat and watched it for an hour. The little house in the painting... there's a light on in the window now. There was no light before. I know there wasn't.</p>
           <p>Probably the old house settling and me not sleeping. But here's the tape. Tell me I'm crazy.</p>`,
    tape: { file: "picture.arcv", size: "118 KB" } },

  { id: "s3_noise", offset: 2, mood: "not sleeping", music: "—",
    title: "it's in the walls now",
    body: `<p>The sound started the night after the painting. Every night, same time, a low drone, then something underneath it that's almost a voice. It's in the walls. It's under the floor. I ripped up a board. Nothing there. It didn't stop.</p>
           <p>I called out of work. I can't go stand on that line for twelve hours running on no sleep. I left the camcorder in the hall all night. Turn this one UP. Tell me you hear it too. Tell me it's not just me.</p>
           <p>I keep filming because the camera sees things I don't. It's the only thing I trust right now.</p>`,
    tape: { file: "noise.arcv", size: "3.6 MB" } },

  { id: "s4_pink", offset: 3, mood: "wrong", music: "—",
    title: "the pink room",
    body: `<p>i keep waking up standing up. not in bed. once in the front room in front of the painting. once outside in the yard with no shoes, the camcorder in my hand, still recording.</p>
           <p>and the dream. always the same. a room, all pink, no windows, no door i can find. something behind me i can't turn around to see. i think i've stopped being able to tell the dream from the house.</p>
           <p>this was on the camera when i woke up this morning. i don't remember filming it. watch it backwards. it's different backwards. everything is different backwards now.</p>`,
    tape: { file: "pink.arcv", size: "149 KB" } },

  { id: "s5_mail", offset: 4, mood: "—", music: "—",
    title: "they sent an invitation",
    body: `<p>there was a letter in the mailbox. no stamp. no return address. just my name, in my own handwriting, which i did not write.</p>
           <p>it's an invitation. to a museum. there's a date. it's tomorrow. i filmed it so you can read it if you slow it down, before it changes again, because it keeps changing.</p>
           <p>i'm going. i want to be clear that i am not being asked. i haven't been asked anything in a long time. the cabin, the painting, the sounds, the pink room &mdash; it was all one thing pointing here. i understand that now. i'm not scared. that's the part that scares me. thanks for watching. open them in order.</p>`,
    tape: { file: "mail.arcv", size: "157 KB" } },

  /* ---------------------------- the final, corrupted post ---------------------------- */

  { id: "s6_cipher", offset: 5, mood: "&#9632;&#9632;&#9632;", music: "&#9632;&#9632;&#9632;",
    title: "i can see all of it now",
    body: `<p class="glitch">i went to the museum i went to the museum i went to the museum the doors were already open for me they were always open for me</p>
           <p class="glitch">THE ROOMS DO NOT END. every painting is a window and every window looks OUT not in. the birds i filmed were never birds. they were watching for them. they were always watching for them and i carried the camera right to them.</p>
           <p>they let me leave one message. hold it to a mirror if your mind still bends the right way. the alphabet folds in half &mdash; the first letter is the last.</p>
           <p class="cipher">NB&nbsp;&nbsp;YLWB&nbsp;&nbsp;RH&nbsp;&nbsp;GSVRI&nbsp;&nbsp;RMHGIFNVMG</p>
           <p class="glitch">the last tape is me. or it is what is left in the place where i used to be. watch it. do not watch it. it does not matter. once you have seen it they can see you. i can see you. i can see all of you.</p>
           <p class="glitch">&#9608;&#9608;&#9608; R O B E R T &#9608;&#9608;&#9608; is not here &#9608;&#9608;&#9608;</p>`,
    tape: { file: "mystery.arcv", size: "5.0 MB" } },
];

/* --------------------------- render --------------------------- */
(function () {
  function addDays(iso, n) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n);
    return d;
  }
  function fmt(d) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  const now = new Date();
  const visible = POSTS
    .map(p => ({ ...p, date: addDays(DROP_DATE, p.offset) }))
    .filter(p => p.show === true || (p.show !== false && p.date <= now))
    .sort((a, b) => b.date - a.date);

  const el = document.getElementById("posts");
  if (!visible.length) { el.innerHTML = "<p>no posts yet.</p>"; return; }

  el.innerHTML = visible.map(p => {
    const attach = p.tape ? `
      <div class="attach">
        <span class="fico">&#9654; ${p.tape.file}</span> &nbsp;
        <a href="tapes/${p.tape.file}" download>download</a> (${p.tape.size})
        <span class="note">opens only in the Archive Viewer</span>
      </div>` : "";
    return `
      <div class="post">
        <h2>${p.title}</h2>
        <div class="meta">${fmt(p.date)} &middot; mood: ${p.mood} &middot; listening to: ${p.music}</div>
        <div class="body">${p.body}${attach}</div>
        <div class="foot">posted by robert</div>
      </div>`;
  }).join("");
})();
