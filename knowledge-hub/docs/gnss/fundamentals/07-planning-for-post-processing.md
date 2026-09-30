---
title: "Module 6 — Planning for Post-Processing (PPK)"
---

# Module 6: Planning for Post-Processing (PPK)

*Read time: 9–11 minutes, plus a 3-minute activity*

**By the end of this module, you can:** explain what a CORS station
contributes to PPK, recognize the common file format used for GNSS
logs, record field data so it can be corrected later, and check that
a CORS station's data covers your collection time before you process.

Module 4 covers when to choose PPK. This module picks up once PPK is
the plan, and follows the job from the field through processing —
usually done by the same person who collected the data.

## 6.1 What a Base Station (CORS) Does

A **CORS** (Continuously Operating Reference Station) is a permanent
base station at a precisely known position, run by an agency such as
NGS or a state DOT — in Massachusetts, for example, MassDOT runs the
MaCORS network. Each station records satellite signals all day, every
day, as **reference data**. This is completely separate from your data
collection: you never connect to it in the field, and it sends you
nothing while you work.

**How it corrects your data:** because the station's exact position is
known, processing software can compare that position with what the
station recorded and work out how far off the satellite signals were at
each moment. Your receiver, recording nearby at the same time, was off
by nearly the same amount — the shared-error idea from Module 4.1 — so
the software removes that error from your recording, leaving 1–3 cm
positions.

**Outages are rare, but they happen.** A station can stop recording for
equipment failure or planned maintenance. If it stopped while you were
collecting, that part of your data has nothing to be corrected against.
That's why it's good practice to check the station covered your
collection time (6.4) — and if it didn't, use the next nearest station.

*(A second receiver set up on a known point can also act as your own
base station. Most of our work uses CORS instead, so this module
focuses on CORS.)*

![What happens in the field and after fieldwork](img/fig-6-1-ppk-field-office.svg)

*Figure 6.1: In the field (left), your receiver records at your site
while a CORS station records on its own, with no connection between
them. After fieldwork (right), processing software uses the CORS
recording to correct yours.*

## 6.2 The Common Log File Format: RINEX

Your receiver and the CORS station are usually different brands, and
each brand saves raw data in its own format. To combine them, both
recordings need to be in a common format. That format is **RINEX**
(Receiver Independent Exchange Format) — the standard that nearly all
processing software reads.

**CORS data already comes as RINEX.** NGS and state networks provide
their files in RINEX, usually compressed (ending in `.gz`), so you may
need to unzip them before use.

**Your own recording may not.** Depending on your receiver and app, your
raw log may be saved in the manufacturer's format and need converting
to RINEX before processing, or your processing software may read it
directly. Your device how-to guide covers which applies.

**Reading a RINEX file name.** NGS files follow the pattern
`ssssDDD0.YYo`: a four-character station ID, the **day of the year**
(001–366; September 22 is day 265), then the year and a letter for the
file type — `o` is the observation file, the one you need. RINEX times
are in **GPS time, close to UTC**, not local time: a session from
8:00 a.m. to noon Eastern Daylight Time is 12:00 to 16:00 in the file.
An evening session can spill into the next UTC day, and so into the
next day's file.

## 6.3 In the Field: Record Everything

**You can only correct what you recorded.** Processing can refine your
data, but it can't fill a gap — so the field job is to leave with one
complete recording and the notes that go with it. A gap in the CORS
data can be covered by another station; a gap in your own recording
can't be covered by anything (Figure 6.2, C).

**What a gap costs depends on how you collect.** On a moving platform,
positions during the gap are lost. Some software can draw a straight
line across the gap, but that's a guess, not a measurement — never
report it as centimeter data. On a static point, the point may still
process if enough continuous data remains; the test is whether it
still reaches a fixed solution (Module 4.6). If it only reaches float,
re-collect the point. Either way, expect a stretch of float right after
a gap while the receiver re-resolves its solution.

**Log continuously** for the whole session. On a moving platform, keep
logging while you travel between points too (Module 4.5).

**Write down what the file can't record:** the antenna height and how
you measured it, your start and stop times, and anything that
interrupted logging, such as a battery swap. These notes are what let
you match your file to the right CORS hours later.

**Before you leave the site,** confirm the file exists, copy it to a
second device, and name it by site, date, and receiver.

| **WHY IT MATTERS** | |
|---|---|
| A missing file or a gap discovered during processing means a return trip. A two-minute check before you leave the site is the only time you can still fix it. | |

## 6.4 After Fieldwork: Choosing and Checking a CORS Station

Before you process, you need a station that was close enough, recorded
often enough, and was running during your collection time. You can
check all three yourself:

| Question | Where to look |
|---|---|
| Is the station operating? | NGS's list of CORS sites shows each station's status (Operational, Non-Operational, Suspended). State networks such as MaCORS show their own station status. |
| How often does it record? | The same NGS list shows each station's recording rate in seconds. Many record every second; some every 15 or 30. |
| Is it close enough? | The NGS Web Map shows CORS stations around your site (see Module 4.7 for distance). |
| Did it record during my collection? | The downloaded file itself: its start and end times, and any gaps, show in your processing software. |

For planned maintenance, ask the network operator; NGS and state
networks list contacts on their sites. The downloaded file is always
the final check.

**Download within 30 days.** NGS keeps full-rate data for about 30
days. After that, its daily files are thinned to one record every 30
seconds, which is too sparse for a moving platform. Original full-rate
data can still be ordered from NOAA's archive (NCEI), but it's easier to
download promptly.

![CORS recording coverage timeline](img/fig-6-2-cors-coverage-timeline.svg)

*Figure 6.2: In A, both recordings are complete, so all of your data can
be corrected. In B, the CORS station had a 40-minute outage; another
station recorded the same satellites at the same time, so that part can
still be corrected with the next nearest station. In C, your own
receiver stopped recording for 40 minutes; no one else was recording at
your antenna, so that part is gone.*

## 6.5 Processing and Checking the Result

With both files in RINEX and covering the same hours, the processing
software does the correction; how to run it is in your software how-to
guide. The result still needs checking: confirm each point reached a
fixed solution (Module 4.6), then compare a known point with its
published coordinates (Module 3) before you trust the dataset.

**Example:** after a coastal vehicle survey on September 22, you
download day-265 files from the nearest station that records every
second, confirm they cover 12:00–16:00 UTC with no gaps, process, and
check the result against a nearby monument.

## Try It: Spot the Gap

Each plan below has one gap. Find it before reading the answers.

1. **Coastal vehicle survey.** Your receiver records every second along
   the shoreline. You plan to process against the nearest CORS station
   without checking how often it records.
2. **Morning of control points.** You download the CORS file and start
   processing without looking at it. The station had a 40-minute outage
   mid-morning.
3. **Processing later.** You collect a moving-platform survey in July
   and download the CORS data in September.

**Answers.**
(1) *Recording rate:* if the station records every 30 seconds, there
are far fewer moments to match against a moving receiver. Check the
rate on the NGS list first.
(2) *Outage:* points collected during the outage can't be corrected with
that file. Check coverage first, and use the next nearest station for
the gap.
(3) *30-day limit:* by September, NGS's daily files are thinned to
30-second records. Download within 30 days, or order full-rate data
from NCEI.

### Self-Check

Pick the best answer for each question. If one surprises you, revisit that section.

<div class="self-check" markdown>

<div class="sc-card" data-answer="b" markdown>
**Q1. What does a CORS station do for PPK?**

<ul class="sc-options">
  <li data-key="a">a. It streams corrections to your receiver while you work</li>
  <li data-key="b">b. It records reference data all day at a known position, separately from your work, and processing software uses it to correct your recording</li>
  <li data-key="c">c. It adds extra satellites to your count</li>
  <li data-key="d">d. It removes multipath from your antenna</li>
</ul>

<div class="sc-explain" markdown>
You never connect to it in the field. Because its exact position is known, the software can work out how far off the signals were at each moment and remove that shared error from your data.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q2. Which statement about RINEX is correct?**

<ul class="sc-options">
  <li data-key="a">a. Both your log and the CORS file always arrive in RINEX</li>
  <li data-key="b">b. RINEX is a brand of receiver</li>
  <li data-key="c">c. Neither your log nor the CORS file ever needs converting</li>
  <li data-key="d">d. It is the common format both files need; CORS data already comes as RINEX, and your own log may need converting</li>
</ul>

<div class="sc-explain" markdown>
Receivers of different brands save raw data in their own formats, so processing software needs a common one. Your device how-to guide covers whether your log needs converting.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q3. You collected from 8:00 a.m. to noon Eastern Daylight Time on day 265. Which CORS data should you download?**

<ul class="sc-options">
  <li data-key="a">a. Day 265, covering 12:00–16:00 in GPS time (close to UTC)</li>
  <li data-key="b">b. Day 265, covering 8:00–12:00</li>
  <li data-key="c">c. Day 264, covering 12:00–16:00</li>
  <li data-key="d">d. Any day, since the time doesn't matter</li>
</ul>

<div class="sc-explain" markdown>
RINEX files are organized by day of year and use GPS time, not local time. An evening session can spill into the next UTC day, and so into the next day's file.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q4. Before processing, what should you check about a CORS station?**

<ul class="sc-options">
  <li data-key="a">a. Only that it is the closest station</li>
  <li data-key="b">b. Only that it belongs to NGS</li>
  <li data-key="c">c. Its status, recording rate, distance, and whether the file covers your collection time, and download within 30 days</li>
  <li data-key="d">d. Only its brand of receiver</li>
</ul>

<div class="sc-explain" markdown>
After about 30 days NGS thins its daily files to one record every 30 seconds, which is too sparse for a moving platform. The downloaded file is always the final check.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q5. Your CORS station had a 40-minute outage, and separately your own receiver stopped logging for 40 minutes. What can be recovered?**

<ul class="sc-options">
  <li data-key="a">a. Neither gap</li>
  <li data-key="b">b. Only your own gap, by drawing a straight line across it</li>
  <li data-key="c">c. Both gaps, using the next nearest station</li>
  <li data-key="d">d. The CORS gap, using the next nearest station; your own gap can't be recovered</li>
</ul>

<div class="sc-explain" markdown>
Another station recorded the same satellites, so it can cover the CORS gap. Nobody else was recording at your antenna. Drawing a straight line across your gap is a guess, not a measurement.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q6. What should you do before leaving the site on a PPK day?**

<ul class="sc-options">
  <li data-key="a">a. Confirm the file exists, copy it to a second device, name it by site, date, and receiver, and keep notes on antenna height, start and stop times, and interruptions</li>
  <li data-key="b">b. Confirm the RTK fix is fixed</li>
  <li data-key="c">c. Download the CORS file from the field</li>
  <li data-key="d">d. Nothing, since problems can be fixed in the office</li>
</ul>

<div class="sc-explain" markdown>
A missing file or a gap discovered during processing means a return trip. A two-minute check before you leave is the only time you can still fix it.
</div>
</div>

</div>
