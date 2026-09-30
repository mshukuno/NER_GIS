# Module 2 — Where Errors Come From

*Read time: 9–12 minutes*

**By the end of this module, you can:** name the main sources of GNSS
error, explain what ground control corrects versus what a reference
(base) station corrects, sort each error into *shared* or *local* to
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

*Each of these seven sources adds its own small piece to your final
position error; a real-world fix is the sum of all seven at once, not
just one.*

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

*A base station's correction cancels the error two receivers share
from the same satellite through the same sky; it has no way to touch
an error that happens only inside or right next to one specific
antenna.*

This distinction is the whole reason correction methods — DGNSS, RTK,
PPP, PPK — work at all, and it's also their shared limit: every one of
them still leaves multipath, receiver noise, and obstruction on the
table, no matter how good the correction is otherwise. **What to
actually do about a difficult multipath or obstruction environment is
covered in Module 5 (Hard Places).** This module is only about
recognizing which category an error falls into.

| **WHY IT MATTERS** | |
|---|---|
| Before assuming a correction service will fix a bad reading, ask which of the seven sources is behind it. A correction can only remove what you and a reference station share — no method, however good, corrects multipath, receiver noise, or obstruction on its own. | |

### Self-Check

Try explaining each of these out loud before moving on. If one doesn't
come easily, that's the concept to revisit:

1. Seven sources account for most GNSS error: satellite clock, orbit,
   ionospheric delay, tropospheric delay, multipath, receiver noise,
   and signal obstruction.
2. A reference (or base) station knows its own exact position and
   compares that to its live GNSS reading to find its own error.
3. A correction can only remove an error the reference station also
   experiences — that's the shared/local distinction.
4. Multipath, receiver noise, and obstruction are local; no reference
   station, however good, can see or correct them.
5. Ground control corrects each satellite's own broadcast clock and
   orbit, roughly every couple of hours, for every receiver on Earth
   at once — a reference station corrects what's left over after
   that, live, for receivers near it specifically.
6. A reference station can be a public/CORS station, a commercial
   network, or your own second receiver — different sources, same
   job: comparing a known position to a live GNSS reading.
