# Module 4: Corrections — What Each Method Buys, Costs, and Breaks

*Read time: 12–14 minutes*

**By the end of this module, you can:** explain why RTK (Real-Time Kinematic), PPK (Post-Processed Kinematic), and PPP (Precise Point Positioning) reach centimeter accuracy at all, choose the right method for a given project, log data the right way for each, tell float from fixed, and plan a field day so RTK problems are avoided rather than fixed on the fly.

## 4.1 What It Takes to Reach Centimeter Accuracy

Getting from raw GNSS (2–10 m) down to centimeters means correction methods have to solve two problems — plus live with a third one they can't touch at all.

**Problem one: the shared error.** Satellite clocks drift slightly, and the atmosphere bends the signal by an amount that changes with weather and time of day. Both errors are *shared*: you and a base station (or a global correction service) are looking through roughly the same sky, so whatever is throwing the base off is probably throwing you off too.

A nearby base station, or a global precise-orbit product (used by PPP), tells your receiver almost exactly how far off those numbers are right now, and that amount gets subtracted out.

**Problem two: how precisely you measure your distance to each satellite.** DGNSS (Differential GNSS) measures distance the simple way — timing how long the signal took to arrive, like reading a stopwatch that only ticks once a second.

RTK, PPK, and PPP all measure something much finer: the shape of the radio wave itself as it arrives (its "phase"), which is like switching to a stopwatch that ticks a thousand times a second. That's a far more precise ruler — precise to a small fraction of the signal's wavelength (about 19 cm).

**The one piece no correction method touches: local error.** This is the same shared-vs-local split from Module 2, and it's worth seeing again here because it's the reason solving problems one and two isn't the whole story.

Multipath (the signal bouncing off a nearby surface) and receiver noise (small electronic jitter in the hardware) happen at your own antenna, at your own spot, at the moment you're standing there. No base station or global correction service — however close, however good — ever experiences what's happening right at your antenna, so no correction message can subtract it out.

This is the one factor that's on *you*, not the method: open sky, antenna placement away from reflective surfaces, a stable mount. It holds no matter how close or well-placed your base is — a nearby base cancels the shared error faster (4.4), but it has no effect on local error at all.

Put the pieces together — subtract out the shared error, measure what's left with the fine ruler, and keep local error small yourself with good field practice — and RTK, PPK, and PPP all reach centimeters. That's the ceiling all three are built to reach; local error is the floor they're built on top of.

**So why does PPP need so much more time than RTK?** Not because it measures distance any less precisely — it uses the exact same fine ruler from problem two. The difference is entirely in problem one.

RTK and PPK have a base station standing nearby, so the shared error cancels out almost instantly. PPP has no base at all — it has to work that same shared error out for itself, from a global orbit/clock model, without anything nearby to compare against.

That's a slower way to solve problem one, which is why PPP needs minutes to hours instead of seconds, and why its real-world accuracy depends so heavily on how long you sit at the point (4.2.2). The ceiling is identical; reaching it just takes longer.

DGNSS never switches to the fine ruler — it only ever does the timing-based measurement from problem two.

So even with the shared error perfectly removed and local error kept small, its distance measurement itself is only good to about a meter. No amount of correction fixes that; it's a limit built into how DGNSS measures distance in the first place.

## 4.2 Correction Methods

Four methods add a correction layer on top of raw GNSS, and each solves the two problems from 4.1 differently — DGNSS only ever solves problem one; RTK, PPK, and PPP solve both, which is what unlocks centimeters. Here's how they compare before we go through each in turn:

| **Method** | **What it needs** | **Live or post?** | **Accuracy** | **What fails first** |
| --- | --- | --- | --- | --- |
| DGNSS | A nearby beacon or SBAS signal | Live | ~1–3 m | Range from the beacon (radio) — SBAS itself rarely fails |
| PPP | Global precise orbit/clock products, or Galileo HAS, or none | Live (after convergence) or post | ~2 cm–2 m, depending on service and session length (see 4.2.2) | Convergence time — cut a session short and accuracy drops with it |
| RTK | A base station + a live link (radio or NTRIP) | Live | 1–3 cm | The link — line-of-sight, cell signal, or battery |
| PPK | A rover log + a base/CORS log, combined later | Post | 1–3 cm | The overlap — if the logs don't cover the same window, nothing to combine |

*Four correction methods arranged by what they need, what they deliver, and where they're most likely to let you down.*

### 4.2.1 DGNSS (Differential GNSS)

**How it works:** a nearby beacon or an SBAS satellite compares its own known position to its GNSS fix, broadcasts the difference, and your receiver applies it — the timing-only correction described in 4.1.

**Accuracy:** ~1–3 m.

**Use it when:** you need better than raw GNSS but survey accuracy isn't the goal — general mapping, asset location, navigation.

**Don't use it when:** the project has a 1–3 cm requirement. A meter of error is built into the method; no amount of care in the field changes that.

**Example:** logging the rough location of a storm drain for an inventory map, where "within a couple of meters" is fine.

### 4.2.2 PPP (Precise Point Positioning)

**How it works:** the receiver computes its own position using global precise satellite orbit and clock products, with no base station — trading a nearby reference for convergence time.

**Accuracy:** this is the one method where accuracy depends heavily on how long you sit at the point, so there's no single number:

- **A few minutes** (subscription real-time PPP, or Galileo HAS): roughly decimeter-level, ~15–20 cm to ~40 cm.
- **5–30 minutes**, fully converged (subscription real-time PPP): ~2–4 cm.
- **Several hours**, post-processed against free IGS data: ~2–5 cm, the best PPP can typically do.

Cutting a session short doesn't just add noise — it directly trades away accuracy, so match the session length to what the project actually needs.

**Subscription vs. free:** real-time PPP that converges in minutes and holds a live fix is usually a **paid subscription** (Trimble RTX, Leica SmartLink, NovAtel TerraStar).

There's also a free real-time option worth knowing about: **Galileo HAS** (High Accuracy Service), broadcast at no cost from Galileo satellites. It converges in about 5 minutes and targets roughly 20 cm horizontal / 40 cm vertical — not centimeter-grade, but a genuinely free middle ground between a subscription and hours of post-processing.

Post-processed PPP (logging raw, then processing against free IGS data afterward) is always free, regardless of which live option you do or don't have.

**Use it when:** no base or network access is available, and the tolerance can accept the accuracy your session length actually delivers.

**Don't use it when:** the project needs a firm 1–3 cm — a short session may only reach 15–20 cm or worse, and that shouldn't be logged as centimeter data. Also don't reach for post-processed PPP as a same-day RTK fallback if a base or CORS log is available for the site — see 4.5.1, step 3.

**Example:** a single remote point far outside RTK network and CORS coverage, with no base station to deploy.

### 4.2.3 RTK (Real-Time Kinematic)

**How it works:** a base station at a known point streams live carrier-phase corrections; your rover resolves the ambiguity (4.3) and locks a centimeter fix you can confirm on the spot.

**Accuracy:** 1–3 cm, live — the default method for this project's work, because it's the only method that lets you verify the fix before leaving the point.

**Not the same idea as a DGNSS beacon (4.2.1).** Both compare a known point to a GNSS reading and send you the difference, so it's tempting to think of single-base RTK as "DGNSS with your own beacon." It isn't — the two correct different kinds of measurements.

A DGNSS beacon corrects the same **timing-based** measurement covered in 4.2.1, which tops out around a meter no matter how good the correction is. Single-base RTK corrects a **carrier-phase** measurement instead — the far finer, wave-based reading from 4.1 — which is why the same basic idea (correct against a known point) delivers meters in one case and centimeters in the other.

**The measurement sets the ceiling; the correction only gets you up to that ceiling, not past it.**

**NTRIP and RTCM, in plain terms.** These two names show up together but aren't the same thing. **RTCM** (Radio Technical Commission for Maritime Services, the group that defined it) is the correction *message* itself — the standardized format a base station's correction is written in, whatever carries it.

**NTRIP** (Networked Transport of RTCM via Internet Protocol) is a delivery route: the internet "pipe" that carries an RTCM message from a base or network to your rover, the way a streaming app is the pipe for a movie rather than the movie itself. NTRIP only changes how a correction reaches you, not what it says or how accurate it is.

**Two flavors, one method.** RTK comes in two forms, depending on where the base's known position comes from and how the correction travels to you. Both are still RTK underneath — same carrier-phase measurement, same ambiguity resolution, same float/fixed states (4.3). The difference is entirely in the setup.

#### 4.2.3.1 Single-Base RTK (Base/Rover)

**How it works:** you bring two receivers — one stays fixed at a surveyed or published point for the whole session as the **base**; the other is the **rover** you carry to log points.

**Delivery:** the correction travels over a **radio link** — a UHF radio modem, built into or attached to each receiver — not Bluetooth. Bluetooth is a separate, short-range link between each receiver and its own controller or tablet; it has nothing to do with carrying the correction from base to rover.

Radio range is the binding limit here: typically a few km with clear line-of-sight, less through trees or hills — well inside the atmosphere-driven range covered next, so the radio itself usually runs out before shared atmosphere does.

**Accuracy:** 1–3 cm, and it holds fast and reliably close to the base. Plan on solid fixes within roughly **10–20 km**.

Fixes are still often achievable out to 30–50 km, but take longer to lock and are more prone to dropping to float, for the reason covered in 4.4 — the shared atmosphere between you and the base diverges with distance. *(Rule of thumb — flag for your GNSS specialist or provider to confirm, since the exact number varies by receiver.)*

**Use it when:** neither CORS nor a commercial network covers the site — remote work outside any network's reach — or you want the base close enough to guarantee the fastest possible fix, tighter than any fixed public or commercial station happens to sit.

**Don't use it when:** a network already covers the site. Single-base RTK adds real overhead a network doesn't: a second receiver, someone to set up and survey in the base, and a base whose own position is only as good as the monument or survey-in step behind it — a wrong base coordinate here produces exactly the "constant offset at every point" pattern from Module 3.

For this organization, Network RTK (4.2.3.2) is the default; reach for single-base only when the site genuinely falls outside network coverage.

**Example:** a remote site with no CORS or commercial network signal, where a project base is set up and surveyed in for the day.

#### 4.2.3.2 Network RTK

**How it works:** instead of a physical base you deploy yourself, the correction comes from a network of permanent stations — CORS, a commercial network, or your organization's own — computing a synthesized "virtual" base for wherever you happen to be. No second receiver to deploy or survey in.

**Delivery:** always **NTRIP**, over an internet connection — cell signal or Wi-Fi, connected to a corrections account. NTRIP accounts aren't always paid: many state DOTs and regional agencies run free public NTRIP networks (their own CORS network), and your organization may run its own.

**Accuracy:** 1–3 cm, and it typically holds over a wider area than single-base RTK, since the network synthesizes a nearby virtual base for wherever you are rather than relying on one fixed physical station.

**Use it when:** the site falls within CORS, commercial, or your organization's network coverage — the normal case for this region, and the same coverage this organization already relies on for CORS-based PPK (Module 6). No base to haul, set up, or survey in.

**Don't use it when:** the site is outside every available network's reach, or your mobile device has no signal to carry NTRIP (see 4.5.1, step 2) — either case pushes you back to single-base RTK or another method entirely.

**Example:** setting boundary or utility points on a site with good cell coverage and existing CORS or commercial network reach.

**Log raw, even on a good RTK day — either flavor.** If your link mostly holds but drops occasionally, or you're ever unsure whether a fix was reliable, turn on raw logging alongside RTK.

It costs nothing in the field — RTK and PPK use the same underlying measurements, RTK just also computes a live answer — and it means any point you're later unsure about can be reprocessed as PPK instead of re-collected.

Not every field app supports this. Some GNSS data-collection software streams and stores only the finished RTK position, with no option to also record raw observations — so raw logging isn't a setting you can just turn on everywhere.

Confirm this capability before you count on it: if raw logging matters to a project, choose a device-and-software combination that offers it, so you keep the choice between RTK and later PPK rather than losing it by default.

### 4.2.4 PPK (Post-Processed Kinematic)

**How it works:** mechanically identical to RTK — a base and rover comparing carrier-phase data — but nothing is streamed live. The rover logs raw data continuously; a base or CORS log covering the same window is combined with it afterward in the office.

**Accuracy:** 1–3 cm.

**How to log it:** turn on raw observation logging on the rover (not just positions — the actual satellite signal data) and set a logging interval that matches what your base or CORS source uses (commonly 1 second).

Keep the receiver logging continuously for the full session, including travel between points if you're on a moving platform, and note your start and stop times so they can be matched to the base log in the office.

**Use it when:** the link can't be trusted (weather, seasonal or remote sites) or the platform moves continuously (coastal vehicle, drone) — for moving-platform work, PPK is the standard approach, not a fallback.

It's also the better choice whenever a base or CORS log is available for the site, even as a same-day RTK fallback — see 4.5.1, step 3.

**Don't use it when:** you need to confirm accuracy in the field before leaving — PPK gives you no live readout; a logging gap isn't discovered until the office processes the data.

**A safety net worth knowing:** if you run RTK on a moving platform without realizing PPK was the better call, the data isn't necessarily lost — *if* raw logging was turned on the whole time. RTK and PPK use the same underlying raw measurements; RTK just also computes a live answer on top of them.

A raw log collected during an RTK session can be reprocessed with PPK afterward, using a base or CORS log for the same window, exactly as if you'd planned it that way. What can't be recovered is a gap: if raw logging wasn't on, or the receiver was set to log positions only, there's nothing to reprocess.

That's the practical argument for logging raw by default any time you're on a moving platform, even when you're confident RTK will hold.

**Example:** a coastal survey run from a moving vehicle where RTK would drop in radio or cell dead zones.

## 4.3 Float vs. Fixed: Has the Receiver Locked a Precise Answer?

RTK and PPK's centimeter accuracy comes from the fine ruler in 4.1 — measuring the wave's phase. To use that ruler, the receiver first has to figure out something more basic: exactly how many *whole wavelengths* fit between it and each satellite.

Each wavelength is only about 19 cm, so the receiver can measure the leftover fraction of a wavelength very precisely — but on its own, that fraction doesn't tell it whether it's 3 wavelengths and a bit away, or 300,003 wavelengths and a bit away. It has to solve for that whole number first, by comparing signals from many satellites over a few seconds to a couple of minutes.

- **Float** = the receiver hasn't pinned down that whole number yet, so it's estimating instead of counting exactly — accurate to tens of centimeters to a couple of meters.
- **Fixed** = it has pinned the number down exactly, unlocking the full centimeter-level accuracy.

Your screen tells you which state you're in — check the differential or solution-type status before you trust a point, not just the ±cm number next to it. This applies to **both RTK and PPK**, since both rely on the same phase measurement and whole-number count.

PPP doesn't have this same on/off state — it *converges* gradually instead (4.2.2). DGNSS never does this step at all, since it only uses the simple timing measurement from 4.1.

| **WHY IT MATTERS** | |
|---|---|
| Fixed is necessary but not sufficient. Under bad conditions — multipath, a marginal link, poor geometry — a receiver can lock onto the *wrong* whole number and still show "fixed": confident, precise, and wrong. A fix tells you the receiver settled on an answer; it doesn't tell you the answer was correct. That's a separate check (the known-point check), not something the fixed/float status can catch on its own. | |

## 4.4 Baseline Length

**Baseline** is simply the straight-line distance between the base station and your rover (your receiver). It matters because of the same shared-error idea from 4.1: the correction only helps with what you and the base experience in common.

Close to the base — say, a few km — you're both looking through nearly the same slice of atmosphere, so the correction cancels almost all of that shared error immediately, and the fix locks fast.

As the baseline grows longer, that atmosphere diverges between you and the base, the correction gets less complete, and the fix takes longer to resolve. On a long enough baseline, the leftover error can be too large for the receiver to ever pin down the exact whole-wavelength count from 4.3 — so instead of just taking longer, it never resolves at all, and the receiver is stuck reporting **float** (the lower-accuracy estimate from 4.3) indefinitely.

This is why a receiver that fixes instantly next to its own base can sit on float for minutes — or never fix — when connected to a network base tens of kilometers away.

## 4.5 Good Practice: Planning for a Reliable Field Day

Most field problems are avoided, not fixed — by deciding a few things before you ever leave the office. Some of this holds no matter which method you're using that day:

**Match the season to the site.** For canopy or otherwise obstructed sites, schedule for leaf-off months where possible. A bare canopy lets far more open sky through than full summer foliage, so you avoid the obstruction instead of fighting it once you're there.

**Choose the most open-sky location available, and keep the antenna away from reflective surfaces.** Water, metal roofs, vehicles, and chain-link fences are common multipath sources — set up away from them whenever the project allows it, rather than fighting the resulting noise later.

**Set the accuracy target the project actually needs.** Confirm whether 1–3 cm is genuinely required before assuming a live-link method is mandatory for that site. A looser tolerance opens up simpler, more reliable options.

**Locate a known point near the site beforehand.** Find a nearby survey monument through CORS or your organization's monument map before you leave, so the known-point check is ready to go on arrival instead of something you're searching for once you're on site.

**Confirm your device has enough storage and battery for the day.** This matters most if you're logging raw data alongside your session — raw observation logs are larger than position-only logs, and a moving-platform survey can mean logging continuously for hours, including travel between points.

**Back up raw logs before leaving the field, whatever method you used.** Even on a day that went smoothly with a live fix the whole time, a backed-up raw log gives you the option to reprocess a point later if anything about it turns out to be in doubt.

### 4.5.1 Planning for a Reliable RTK Day

RTK adds its own planning on top of the general practices above. In order:

**1. Confirm your NTRIP source, its distance, and that it's actually running, in advance.** Look up which mountpoint (the specific NTRIP connection point for a station or network) or base you'll be connecting to for that site and how far it is. Roughly 10–20 km is the comfortable range; beyond that, expect slower fixes and more time spent on float.

NTRIP corrections come from the same kind of network PPK draws base data from — a state DOT network, a commercial network, or NGS/university CORS stations — just delivered live instead of downloaded afterward. That means the same failure applies: if the source station or mountpoint is down for maintenance or has an outage, RTK has nothing to correct against.

Check the provider's status page or outage notices for that mountpoint before you leave. If a site falls outside the comfortable range, or the source is flagged as down, treat it as a candidate for the fallback in step 3 rather than assuming RTK will hold once you arrive.

**2. Confirm your mobile device will actually have a signal at the site.** NTRIP corrections travel over the internet connection on your phone or tablet, not the GNSS receiver itself — cell signal, Wi-Fi, or a satellite communicator/hotspot if you're carrying one.

A correct, nearby NTRIP mountpoint doesn't help if the device streaming it has no signal: that's exactly what produces a fluctuating or repeatedly dropping fix, separate from anything about the base or the sky.

Check cell coverage for the site beforehand (a coverage map, or a call to someone who's worked there); if the area is a known dead zone, plan for a satellite communicator as your connection, or treat the site as another fallback candidate in step 3.

**3. Decide the fallback strategy before you go — PPK, live PPP, or post-processed PPP?** For any site flagged in steps 1–2 as likely to struggle (long baseline, weak cell coverage), check base/CORS availability for that site first.

If a base or CORS log is available — the normal case in this region — default to **PPK**: it reaches the same 1–3 cm target as RTK for the same field effort (log raw, process later), which post-processed PPP can't match.

Reserve **post-processed PPP** for the rare site with no base or CORS coverage at all, since that's the one situation where it has an advantage — no base station required. **Live PPP** (subscription, or the free Galileo HAS) is worth choosing instead of either when the accuracy target allows something looser and you want a same-day answer without any base dependency.

**4. Choose GNSS hardware and software that actually support that fallback.** Confirm the device-and-app combination you're bringing can do what step 3 calls for. Not every setup supports raw logging, so pick equipment where the fallback is genuinely available on the day — not something you discover you don't have once you need it.

**One on-site check worth knowing, regardless of planning:** your controller shows whether corrections are actually arriving, usually as a "correction age" number (seconds since the last update received) or a link status indicator.

A connection that still *looks* active but whose correction age keeps climbing instead of resetting every second or two is the real sign that corrections have stopped — the link icon alone can lag behind what's actually happening.

### 4.5.2 Planning for a Reliable PPK Day

PPK adds its own planning on top of the general practices above. In order:

**1. Confirm base or CORS coverage for the site, in advance.** This organization relies on CORS stations rather than deploying a second receiver as a base, so before the day, check two things about the station you plan to use. First, its baseline distance from your site — how far away it sits — since a shorter distance means you and the station are looking through nearly the same atmosphere, giving a stronger correction; a long distance weakens it. Second, check the station's current status: confirm it isn't flagged for an outage or scheduled maintenance, and that it isn't reporting degraded or coarse correction data instead of its normal full-precision output. A station that's technically running but putting out a lower-quality signal can cause just as much trouble as one that's down entirely.

**2. Confirm your GNSS receiver and software can actually log raw data.** Not every GNSS receiver or field app supports this — some only stream and store the finished position, with no option to record the raw satellite observations PPK needs to combine with a base log later. Confirm this capability on your specific device-and-software combination before you count on PPK for the day; finding out it can't log raw only after you're back in the office means redoing the whole session.

**3. Match your logging interval to your base or CORS source.** Commonly 1 second. A mismatched interval can complicate — or block — combining the two logs back in the office.

**4. Plan your session's start and stop times to guarantee overlap with the base log window.** Your rover's logging window has to sit fully inside the base or CORS log's coverage — a gap can't be recovered later. If the station has a known outage or maintenance window, treat that as a reason to shift your schedule or pick a different source.

**5. Confirm whoever processes the data knows the workflow before the day, not after.** On this team, the person who collects the data usually also processes it — so make sure that's a workflow you're comfortable running (combining rover and base logs) before you're relying on it after a full day in the field.

**One on-site check worth knowing, regardless of planning:** confirm logging is still active periodically through the day. A receiver that silently stopped logging looks identical to one that's still running, and that gap isn't discovered until someone tries to process the data afterward.

### Self-Check

Pick the best answer for each question. If one surprises you, revisit that section.

<div class="self-check" markdown>

<div class="sc-card" data-answer="c" markdown>
**Q1. What two things must happen together to reach centimeter accuracy?**

<ul class="sc-options">
  <li data-key="a">a. Track more constellations and lower your DOP</li>
  <li data-key="b">b. Use a longer antenna pole and a faster radio link</li>
  <li data-key="c">c. Remove the shared error, and measure distance with the wave's phase instead of just its arrival time</li>
  <li data-key="d">d. Remove multipath, and remove receiver noise</li>
</ul>

<div class="sc-explain" markdown>
RTK, PPK, and PPP do both. DGNSS only removes the shared error, so its timing-based measurement limits it to about a meter. Local error (multipath, noise) is on you, not the method.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q2. Which pairing correctly states what each method trades for accuracy?**

<ul class="sc-options">
  <li data-key="a">a. RTK trades time, PPP trades infrastructure, PPK trades office effort</li>
  <li data-key="b">b. RTK trades infrastructure, PPP trades time, PPK trades office effort</li>
  <li data-key="c">c. RTK trades office effort, PPP trades infrastructure, PPK trades time</li>
  <li data-key="d">d. All three trade only time</li>
</ul>

<div class="sc-explain" markdown>
RTK needs a live link and a base or network, PPP needs convergence time at each point, and PPK needs planning in the field and processing back in the office.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q3. A team plans a few minutes of PPP per point on a job that requires 1–3 cm. What is the problem?**

<ul class="sc-options">
  <li data-key="a">a. PPP cannot be used in the Northeast</li>
  <li data-key="b">b. PPP measures distance less precisely than RTK</li>
  <li data-key="c">c. Nothing, since PPP is always centimeter-grade</li>
  <li data-key="d">d. A short session may only reach about 15–20 cm or worse, so the data shouldn't be logged as centimeter data</li>
</ul>

<div class="sc-explain" markdown>
PPP uses the same fine ruler as RTK, but without a nearby base it has to work out the shared error itself, and that takes time. Accuracy depends directly on session length.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q4. Which methods have a float vs. fixed state?**

<ul class="sc-options">
  <li data-key="a">a. RTK and PPK, because both count whole wavelengths</li>
  <li data-key="b">b. PPP and DGNSS</li>
  <li data-key="c">c. RTK and DGNSS</li>
  <li data-key="d">d. All four methods</li>
</ul>

<div class="sc-explain" markdown>
PPP converges gradually instead of switching from float to fixed, and DGNSS never does the whole-wavelength step because it only uses the timing measurement.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q5. You ran RTK on a moving platform and now doubt part of the data. When can it be reprocessed as PPK?**

<ul class="sc-options">
  <li data-key="a">a. Always, since RTK and PPK are the same</li>
  <li data-key="b">b. Never, since RTK discards the raw data</li>
  <li data-key="c">c. Only if raw logging was on the whole time, and a base or CORS log covers the same window</li>
  <li data-key="d">d. Only if the fix was fixed throughout</li>
</ul>

<div class="sc-explain" markdown>
RTK and PPK use the same raw measurements, but a gap can't be recovered. Not every device and software combination supports raw logging, so confirm before you count on it.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q6. Which of these is planning that applies no matter which method you use?**

<ul class="sc-options">
  <li data-key="a">a. Checking correction age on the controller</li>
  <li data-key="b">b. Matching the season to the site, choosing open sky, confirming the accuracy target, locating a known point, checking storage and battery, and backing up raw logs</li>
  <li data-key="c">c. Matching your logging interval to the CORS source</li>
  <li data-key="d">d. Checking mobile signal at the site</li>
</ul>

<div class="sc-explain" markdown>
Correction age and mobile signal are RTK-specific, and logging interval is PPK-specific. The general practices are decided before you leave the office.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q7. Before an RTK day at a site with weak cell coverage and a network mountpoint 35 km away, what should you decide in advance?**

<ul class="sc-options">
  <li data-key="a">a. Nothing, since RTK will adapt once you arrive</li>
  <li data-key="b">b. Switch to DGNSS, since it needs no link</li>
  <li data-key="c">c. Use post-processed PPP, since it is always the best fallback</li>
  <li data-key="d">d. A fallback: PPK by default if a base or CORS log is available, and post-processed PPP only if there is no base access at all</li>
</ul>

<div class="sc-explain" markdown>
A long baseline and a weak link both push a site toward the fallback. PPK reaches the same 1–3 cm target as RTK, which PPP can't match. Also confirm your device can log raw.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q8. Which set covers PPK-specific planning?**

<ul class="sc-options">
  <li data-key="a">a. Confirm base/CORS coverage and status, confirm raw logging support, match the logging interval, plan overlap with the base window, and know who processes the data</li>
  <li data-key="b">b. Confirm the NTRIP account, cell signal, and correction age</li>
  <li data-key="c">c. Confirm the datum, antenna height, and known point</li>
  <li data-key="d">d. Confirm DOP, satellite count, and sky plot</li>
</ul>

<div class="sc-explain" markdown>
The office step can only use what was recorded, so gaps in overlap or missing raw data can't be fixed later. Option b is RTK planning, c is setup checks (Module 3), and d is geometry checks (Module 1).
</div>
</div>

</div>
