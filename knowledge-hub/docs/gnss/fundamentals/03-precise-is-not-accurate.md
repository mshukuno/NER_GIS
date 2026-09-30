# Module 3 — Precise Is Not Accurate

*Read time: 7–10 minutes*

**By the end of this module, you can:** explain why a stable, "±1 cm"
reading can still be wrong, recognize the patterns that reveal three
common setup errors, and describe the one check that catches them —
including how to find or create a known point to check against.

## 3.1 Two Different Things

Picture two dart throws. In the first, all five darts land tightly
grouped — but in the lower-left corner of the board, nowhere near the
bullseye. In the second, five darts scatter widely, but their average
sits right on the bullseye. The first thrower is **precise**
(consistent) but not **accurate** (correct). The second is accurate on
average but not precise.

**Accuracy** is how close a measurement is to the true position.
**Precision** is how consistent repeated measurements are with each
other — whether or not they're actually correct. A GNSS receiver can
be extremely precise and still be wrong, and nothing about a steady
number on the screen tells you which one you're looking at.

## 3.2 What Your Screen Is Actually Telling You

Two numbers on your controller describe precision, not accuracy.
**DOP**, from Module 1, describes satellite *geometry* — how much a
given amount of ranging error gets amplified by where the satellites
sit in the sky. It's a multiplier, not a measurement of the position
itself. The **±cm estimate** your receiver reports (often labeled
H-RMS/V-RMS) is a separate number: how tightly the solution has
converged, factoring in DOP along with signal noise.

Both numbers are the receiver grading its own homework. Neither one is
checked against anything outside the receiver. A receiver reporting
good DOP and a tight ±1 cm has simply converged on a *consistent*
answer — it has no way of knowing whether that answer started from the
right assumptions.

| **WHY IT MATTERS** | |
|---|---|
| Good DOP and a tight ±cm estimate only mean the math converged — neither one can detect a wrong datum, a mistyped antenna height, or bad base coordinates. Those errors produce numbers that look just as clean as a correct one. Don't treat a steady screen as proof of a correct position. | |

## 3.3 Where a Wrong-but-Precise Number Comes From

The errors a stable reading can't catch are **setup errors** —
mistakes in what you told the receiver, not in what the satellites are
doing. Three show up most often:

A **base coordinate mismatch** happens when the known position your
correction is measured against — your own RTK base station, or the
fixed coordinates behind a network/CORS station — is wrong or in the
wrong datum. Every point you log that day is corrected relative to
that same wrong reference, so the whole dataset inherits the same
shift.

An **antenna height error** happens when the height you measured or
entered — from the ground to the antenna's true reference point — is
wrong or entered in the wrong spot. This throws off the vertical
result only; horizontal position is unaffected.

A **height-type mismatch** happens when ellipsoid height and
orthometric height get confused. **Ellipsoid height** is measured
against a smooth mathematical model of the Earth's shape;
**orthometric height** (elevation) is measured against mean sea level.
The two disagree by a fixed, location-dependent amount, so entering or
reading the wrong one shifts every vertical value by that amount.

All three can sit behind a perfectly stable, confident-looking fix.

## 3.4 Reading the Pattern

You can often guess *which* setup error you're facing before you dig
into settings, just by looking at how the offset behaves across
several points:

| Pattern | Likely cause |
|---|---|
| Horizontal offset, roughly the same size and direction at every point | Base coordinate or datum mismatch |
| Vertical offset only, horizontal matches | Antenna height entry, or ellipsoid/orthometric height mismatch |
| Offset varies point to point, no consistent direction | Local error (multipath, noise) — not a setup problem |

*A constant horizontal offset across every point points to the setup;
a scattered, inconsistent offset points to local conditions at each
site.*

Treat these as heuristics, not proof — they narrow down where to look,
but only one thing confirms what's actually wrong.

## 3.5 The Only Real Check

DOP and the ±cm estimate both describe how *consistent* your solution
is — not whether it's *correct*. Consistency can be perfect while the
position is still wrong, because a base coordinate mismatch, a bad
antenna height, or a wrong height type all shift the answer in a way
the receiver has no way to detect on its own. The **known-point
check** is the one step that catches this class of error, because
it's the only point in the workflow where you compare against a
position from outside the receiver.

**What it involves:**
- Set up your receiver on a point with a published, trusted position.
- Compare your receiver's live reading to that published position.
- Any mismatch beyond your project's tolerance means the setup — not
  the satellites — needs attention. Fix it before logging a single
  real point.

**Finding a known point.** NGS (National Geodetic Survey) publishes
exact positions for existing control monuments nationwide, searchable
by location through NGS Data Explorer, each identified by a Permanent
Identifier (PID). Your organization's own previously-established
control points work just as well, and are often more convenient.

**How close does it need to be?** On network RTK/NTRIP, the correction
service already accounts for distance to its own reference stations,
so the known point mainly needs to be reachable before or at the start
of your session — it doesn't need to sit next to your survey site. On
your own RTK base station, the known point should sit at roughly the
same distance from your base as the points you're about to survey, so
the check reflects the same baseline conditions *(confirm this
guideline with your GNSS specialist for your specific setup)*.

**No monument nearby?** Log several hours of static data at a stable,
open-sky point and submit it to **OPUS** (NGS's free Online
Positioning User Service). It returns a precise published position for
that point, which you can then reuse as your own known point for every
future check — no monument required.

**When to do it:**
- Before starting any project.
- Again every morning on multi-day work — settings, batteries, and
  connections can drift or get bumped overnight.

If a check turns up an offset, use the pattern in 3.4 as your first
guess for where to look, then repeat the check once you've made a
correction. Skipping this step means every point you collect that day
carries the same unverified assumption.

### Self-Check

Pick the best answer for each question. If one surprises you, revisit that section.

<div class="self-check" markdown>

<div class="sc-card" data-answer="c" markdown>
**Q1. Five repeated readings land within 1 cm of each other, but all sit 1.5 m from the true position. The receiver is:**

<ul class="sc-options">
  <li data-key="a">a. Accurate but not precise</li>
  <li data-key="b">b. Neither accurate nor precise</li>
  <li data-key="c">c. Precise but not accurate</li>
  <li data-key="d">d. Both accurate and precise</li>
</ul>

<div class="sc-explain" markdown>
Precision is consistency between measurements; accuracy is closeness to the truth. A tight cluster in the wrong place is precise but not accurate.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q2. What do DOP and the ±cm estimate on your controller tell you?**

<ul class="sc-options">
  <li data-key="a">a. How close your position is to the true position</li>
  <li data-key="b">b. How consistent the solution is, not whether it is correct</li>
  <li data-key="c">c. Whether your datum and antenna height are right</li>
  <li data-key="d">d. Whether your base coordinates were entered correctly</li>
</ul>

<div class="sc-explain" markdown>
Both numbers come from the receiver's own math and are never checked against anything outside it, so they can't detect setup errors.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q3. Which of these can produce a stable, confident-looking, but wrong position?**

<ul class="sc-options">
  <li data-key="a">a. A base coordinate mismatch only</li>
  <li data-key="b">b. An antenna height error only</li>
  <li data-key="c">c. An ellipsoid/orthometric height mix-up only</li>
  <li data-key="d">d. Any of the three</li>
</ul>

<div class="sc-explain" markdown>
All three are setup errors: mistakes in what you told the receiver, not in what the satellites are doing, so the screen looks just as clean as it would for a correct setup.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q4. Every point you log is shifted about 1.5 m in roughly the same direction horizontally, and heights match. What does the pattern suggest first?**

<ul class="sc-options">
  <li data-key="a">a. A base coordinate or datum mismatch</li>
  <li data-key="b">b. An antenna height entry error</li>
  <li data-key="c">c. Multipath at each site</li>
  <li data-key="d">d. An ellipsoid/orthometric height mix-up</li>
</ul>

<div class="sc-explain" markdown>
A constant horizontal offset points to the setup. A vertical-only offset points to height, and an offset that varies point to point points to local conditions. These patterns are heuristics; only a known-point check confirms the cause.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q5. Why is the known-point check the only real check on your setup?**

<ul class="sc-options">
  <li data-key="a">a. It gives the receiver more satellites to work with</li>
  <li data-key="b">b. It is the one step that compares your reading to a position from outside the receiver</li>
  <li data-key="c">c. It lowers your DOP</li>
  <li data-key="d">d. It only needs to be done if a reading looks suspicious</li>
</ul>

<div class="sc-explain" markdown>
Everything else on the screen is the receiver grading its own homework. Do the check before every project and every morning on multi-day work, not just when something looks off.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q6. No published monument is near your site. What can you do?**

<ul class="sc-options">
  <li data-key="a">a. Skip the check, since the ±cm estimate is good enough</li>
  <li data-key="b">b. Use the receiver's average of a few minutes of readings as the known position</li>
  <li data-key="c">c. Log several hours of static data at a stable, open-sky point and submit it to OPUS for a reusable known point</li>
  <li data-key="d">d. Enter the coordinates from a map app as the known position</li>
</ul>

<div class="sc-explain" markdown>
OPUS returns a precise published position tied to the national reference system, which you can reuse for every future check.
</div>
</div>

</div>
