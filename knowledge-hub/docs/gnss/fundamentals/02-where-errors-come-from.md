# Module 2 — Where Errors Come From

_Read time: 9–12 minutes_

**By the end of this module, you can:** name the main sources of GNSS
error, explain what ground control corrects versus what a reference
(base) station corrects, sort each error into _shared_ or _local_ to
predict whether a correction can remove it, and name the three kinds
of reference station you might use in the field.

## 2.1 The Error Sources

Before asking what fixes an error, it helps to know exactly what
you're looking at. Seven sources account for nearly all GNSS error in
the field:

**Satellite clock error.** A satellite's onboard atomic clock is
extremely precise, but not perfect — it drifts by tiny fractions of a
second. Since your receiver turns signal travel time directly into
distance, even a tiny clock error becomes a real distance error.

**Orbit error (also called ephemeris error).** A satellite's actual
position in space can differ slightly from the position it broadcasts
in its own signal. Your receiver calculates distance from that
broadcast position, so a wrong starting point throws off the whole
calculation.

**Ionospheric delay.** High in the atmosphere, charged particles slow
a satellite signal down. The amount of delay changes with solar
activity, time of day, and how low the satellite sits toward the
horizon — a satellite near the horizon passes through far more
ionosphere than one directly overhead.

**Tropospheric delay.** Lower in the atmosphere, ordinary weather —
temperature, pressure, humidity — slows the signal in a similar way,
independent of the ionosphere.

**Multipath.** The signal bounces off a nearby surface — water, a
metal roof, a vehicle, a wall — before reaching your antenna, arriving
slightly late and distorted.

**Receiver noise.** Small random electronic noise inherent to your
specific receiver's hardware, present even under perfect sky
conditions.

**Signal obstruction.** Trees, buildings, and canyon walls don't
distort a signal so much as block or weaken it outright, reducing the
satellite count and geometry you learned to check in Module 1.

_Each of these seven sources adds its own small piece to your final
position error; a real-world fix is the sum of all seven at once, not
just one._

## 2.2 Ground Control: Why Clock and Orbit Errors Aren't Zero Already

The first two error sources in 2.1 — satellite clock and orbit error —
are already being corrected before your receiver ever sees them, just
not perfectly. Every constellation has a **ground control segment**:
a network of tracking stations, run by whoever operates that
constellation (the U.S. Space Force for GPS, equivalent agencies for
the others), that continuously watches each satellite, works out how
far its actual clock and orbit have drifted from prediction, and
uploads an updated correction to the satellite itself.

The satellite folds that correction into its ongoing broadcast — the
same signal your receiver already uses for ranging — refreshed roughly
every couple of hours for GPS. **Every receiver already listening to
that satellite picks this up automatically:** your rover, a reference
station, anyone's phone. There's no separate feed to connect to; it
rides along with the normal signal.

This is why satellite clock and orbit error are only a few meters,
not kilometers, even with no correction service running at all —
ground control already caught most of it. What's left is the gap
between updates: the correction is a periodic prediction, not a live
fix, so a small residual drifts back in during the hours before the
next upload. That residual — plus everything ground control has no
way to see, like the atmosphere over your specific location — is
exactly what a reference station exists to catch, covered next.

**Ground control and a reference station are not the same layer.**
Ground control corrects the satellite's own broadcast, once, for every
receiver on Earth. A reference station corrects what's left over after
that, live, for receivers near it specifically. Neither replaces the
other — RTK and the other correction methods in Module 4 depend on
both having already happened.

## 2.3 What a Reference Station Does

A **reference station** — you'll also hear it called a **base
station**, and the two terms are used interchangeably in the field —
is a GNSS receiver sitting at a location whose exact position is
already known and published in advance. Because it already knows the
right answer, it compares that known position to what its own live
GNSS calculation says, moment by moment. Whatever the difference is,
that's error, and the station broadcasts it (or the raw data needed to
compute it) so a receiver out in the field can apply the same
correction to its own reading.

## 2.4 Three Kinds of Reference Station

A reference station can come from any of three places. All three do
the identical job from 2.3 — compare a known position to a live GNSS
reading and report the difference — they differ only in who runs the
station and how long it stays put.

**Public / CORS.** **CORS** stands for **Continuously Operating
Reference Station** — a permanent station that runs around the clock
so individual field teams don't have to set up their own base. In
practice, "CORS" usually means the free network run by government or
academic bodies: NGS's national network, university-run stations, and
many state DOT networks. This is the network your organization mostly
draws from for PPK's downloaded base data (Module 6).

**Commercial network.** A paid subscription service — Leica SmartNet,
Trimble VRS, and similar — technically also made of continuously
operating stations, but usually denser than the public network in
populated areas. Many commercial networks also synthesize a "virtual"
nearby station for wherever you happen to be, rather than pointing you
to one fixed physical station — this is what Module 4 calls **Network
RTK**.

**Your own second receiver.** Instead of relying on someone else's
permanent station, you deploy a second GNSS receiver yourself, occupy
a known point (or survey one in), and use it as a temporary base for
just that session — a **base/rover** setup. Nothing about it stays
running after you pack up. Full setup mechanics — the radio link
between the two receivers, and how it differs from Network RTK — are
in Module 4.

## 2.5 Which Errors a Reference Station Can Actually Catch

A reference station can only report an error it also experiences
itself. That splits the seven sources into two groups:

**Shared** (a reference station experiences it too): satellite clock
error, orbit error, and — when the reference is reasonably close —
ionospheric and tropospheric delay.

**Local** (specific to your exact antenna and surroundings, so no
reference station anywhere can see or correct it): multipath, receiver
noise, and signal obstruction.

_A base station's correction cancels the error two receivers share
from the same satellite through the same sky; it has no way to touch
an error that happens only inside or right next to one specific
antenna._

This distinction is the whole reason correction methods — DGNSS, RTK,
PPP, PPK — work at all, and it's also their shared limit: every one of
them still leaves multipath, receiver noise, and obstruction on the
table, no matter how good the correction is otherwise. **What to
actually do about a difficult multipath or obstruction environment is
covered in Module 5 (Hard Places).** This module is only about
recognizing which category an error falls into.

| **WHY IT MATTERS**                                                                                                                                                                                                                                                      |     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Before assuming a correction service will fix a bad reading, ask which of the seven sources is behind it. A correction can only remove what you and a reference station share — no method, however good, corrects multipath, receiver noise, or obstruction on its own. |     |

### Self-Check

Try explaining each of these out loud before moving on. If one doesn't
come easily, that's the concept to revisit:

<div class="self-check" markdown>

<div class="sc-card" data-answer="b" markdown>
**Q1. Which set lists the sources of GNSS error covered in this module?**

<ul class="sc-options">
  <li data-key="a">a. Satellite clock, orbit, ionospheric delay, WAAS, multipath</li>
  <li data-key="b">b. Satellite clock, orbit, ionospheric delay, tropospheric delay, multipath, receiver noise, signal obstruction</li>
  <li data-key="c">c. Base station error, radio interference, DOP, multipath, receiver noise</li>
  <li data-key="d">d. Datum mismatch, antenna height, multipath, ground control, orbit</li>
</ul>

<div class="sc-explain" markdown>
Seven sources account for most field error. WAAS is a correction system, DOP is a geometry measure, and datum and antenna height are setup errors (Module 3).
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q2. What does a reference (base) station do?**

<ul class="sc-options">
  <li data-key="a">a. Adds extra satellites to your count</li>
  <li data-key="b">b. Uploads corrected clock and orbit data to the satellites</li>
  <li data-key="c">c. Compares its known position to its live GNSS reading and reports the difference as error</li>
  <li data-key="d">d. Removes multipath from your antenna</li>
</ul>

<div class="sc-explain" markdown>
Because it already knows the right answer, whatever its live reading differs by is error, and nearby receivers can apply that same correction.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q3. Why can a correction remove some errors but not others?**

<ul class="sc-options">
  <li data-key="a">a. It can only remove an error the reference station also experiences</li>
  <li data-key="b">b. It can only remove errors smaller than 1 cm</li>
  <li data-key="c">c. It can only remove errors that happen at night</li>
  <li data-key="d">d. It can only remove errors the receiver has already logged</li>
</ul>

<div class="sc-explain" markdown>
This is the shared/local distinction: a base station cancels what it and your rover both see, and nothing else.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q4. Which three errors are local, so no reference station can correct them?**

<ul class="sc-options">
  <li data-key="a">a. Satellite clock error, orbit error, ionospheric delay</li>
  <li data-key="b">b. Tropospheric delay, ionospheric delay, orbit error</li>
  <li data-key="c">c. Satellite clock error, multipath, receiver noise</li>
  <li data-key="d">d. Multipath, receiver noise, signal obstruction</li>
</ul>

<div class="sc-explain" markdown>
These happen only at your antenna and its surroundings. Clock, orbit, and (when the reference is close) atmospheric errors are shared.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q5. How does ground control differ from a reference station?**

<ul class="sc-options">
  <li data-key="a">a. Ground control corrects your rover live; a reference station corrects the satellites</li>
  <li data-key="b">b. Ground control corrects each satellite's broadcast clock and orbit for all receivers, roughly every couple of hours; a reference station corrects what's left, live, for nearby receivers</li>
  <li data-key="c">c. They are the same thing under different names</li>
  <li data-key="d">d. Ground control is only used with PPK; a reference station is only used with RTK</li>
</ul>

<div class="sc-explain" markdown>
They are two layers. Ground control's correction rides on the normal satellite signal, and the reference station handles the residual.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q6. Which of these is NOT a kind of reference station?**

<ul class="sc-options">
  <li data-key="a">a. Public / CORS station</li>
  <li data-key="b">b. Commercial network</li>
  <li data-key="c">c. A satellite in a GNSS constellation</li>
  <li data-key="d">d. Your own second receiver</li>
</ul>

<div class="sc-explain" markdown>
The three real types do the same job (compare a known position to a live reading) and differ in who runs them and how long they stay in place. Satellites are not reference stations.
</div>
</div>

</div>
