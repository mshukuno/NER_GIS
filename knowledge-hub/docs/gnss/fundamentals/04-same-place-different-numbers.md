---
title: "Module 4: Same Place, Different Numbers"
---

# Module 4: Same Place, Different Numbers

*Read time: 7–10 minutes*

**By the end of this module, you can:** explain in plain words what a
reference frame, an epoch, a time-dependent transformation, and a
velocity model are; name the frame each of your position sources
delivers; and recognize when two sources disagree because of the frame,
not the satellites.

## 4.1 Two Good Answers That Disagree

**Start with a puzzle.** You set up on a survey monument in
Pennsylvania. Network RTK agrees with the published coordinates to
within 2 cm. You switch to SBAS or a PPP service on the same spot, and
the reading lands more than half a meter away — steady, with a small ±
on screen. Come back next year, and the gap is a little larger.

Neither receiver is broken, and both answers are precise. They disagree
because they measure with different rulers, and one of those rulers is
attached to ground that moves. This is the "precise but not accurate"
problem from Module 3, with one new twist: this offset grows every
year.

## 4.2 The Ruler: Reference Frames

**Picture yourself on a moving train.** Measure the distance from your
seat to the door, and you get the same number every day, because you and
the door ride together. Someone on the platform measuring where your
seat is gets a different answer every time the train moves.

A **reference frame** (also called a datum) is the ruler that
coordinates are measured with. **NAD83(2011)** is a ruler glued to the
North American tectonic plate — the view from inside the train. A fence
post in Pennsylvania or Massachusetts keeps nearly the same NAD83(2011)
coordinates year after year, changing only about 1–2 mm per year.

**Global frames** such as ITRF and WGS84 are the view from the platform:
a ruler fixed to the Earth as a whole. The continent slides underneath
it at roughly 2 cm per year, so the same fence post's global
coordinates change every year.

Both rulers are legitimate. Trouble starts only when data measured with
one is compared with data measured with the other. **Our standard in PA
and MA is NAD83(2011).**

## 4.3 The Date: Epochs

**A photo of a moving train only tells you where it was if you know when
the photo was taken.** Coordinates in a moving frame work the same way.
The **epoch** is the date a set of coordinates is valid for.
NAD83(2011) coordinates are defined at **epoch 2010.00** — 1 January
2010.

A global-frame position measured today is valid for today's date. Since
2010, the ground in the Northeast has moved roughly 30 cm in a global
frame, and the two frames also differ by a built-in offset from how each
was originally defined. Together, mixing them produces an offset of
roughly **50 cm to 1 m** in the Northeast — many times your 1–3 cm
target — and it gets larger each year.

*Figure: The same fence post plotted in two frames, 2010 to today. In
NAD83(2011), its dot stays in place. In a global frame, its dot moves a
little further from the 2010 position each year.*

## 4.4 Converting Between Frames

**A fixed shift can't close a gap that keeps growing.** A shift that's
correct this year is off by about 2 cm next year, and by more the year
after.

A **time-dependent transformation** converts coordinates between a
global frame and NAD83(2011) epoch 2010.00 **using the date the data
were collected.** To do that, it needs to know how fast and in which
direction the ground under each point has moved. That's the job of a
**velocity model**: a map of ground motion, in millimeters per year, at
each location. NGS's HTDP software is the standard one; in the
Northeast, its values are dominated by smooth plate motion. In the
train picture, the velocity model is the speedometer, and the
transformation works out where a passenger would have been sitting in
2010.

**About the software update:** [SME to confirm — which software applies
the time-dependent transformation (Zeno Connect, Field Maps, or both),
the version number, and the velocity model it uses.]

| **WHY IT MATTERS** | |
|---|---|
| A receiver can be fixed, show ±1 cm, and still be 50 cm to 1 m off if two frames are mixed. The ± number can't see it. Only a known-point check, repeated with each position source you use, catches a frame mismatch. | |

## 4.5 PA11 and MA11 Are Not Pennsylvania and Massachusetts

You may see **NAD83(PA11)** and **NAD83(MA11)** listed next to
NAD83(2011) in software menus. The letters are a coincidence.
**PA11** is the frame for the **Pacific** plate (Hawaii, American
Samoa), and **MA11** is the frame for the **Mariana** plate (Guam,
Northern Mariana Islands). Pennsylvania and Massachusetts both sit on
the North American plate. Choosing PA11 or MA11 here adds a large,
plate-motion-sized error. **In PA and MA, choose NAD83(2011).**

## 4.6 Which Frame Is Each Source In?

Each position source arrives in its own frame. Knowing which one tells
you whether a transformation is needed before the data reach your map.

| **Source** | **Typical frame** | **Needs a transformation to NAD83(2011)?** |
| --- | --- | --- |
| Network or base RTK in PA/MA | NAD83(2011), epoch 2010.00 — depends on the provider's mountpoint | Usually no; confirm with each provider |
| SBAS (WAAS) | Global (ITRF) | Yes |
| Real-time PPP (subscription) | Usually global, at today's date | Yes — this is where the date matters most |
| PPK / post-processed | Whatever frame the base or CORS coordinates are in | Depends on the base coordinates used |
| Standalone | WGS84 | Yes |

**The data path adds its own risk.** Points travel from the receiver
through Zeno Connect into Esri Field Maps, and then onto a map with
other layers. Any step can apply a transformation. Field Maps can hold
only **two** transformations in its location profile; if a third would
be needed, the data won't line up. Esri and Eos both give the same
advice: keep basemaps, layers, and GNSS output in **one coordinate
system**, so fewer transformations are needed.

**The signature to recognize:** points that look right against the
basemap but sit shifted against an older layer usually mean a missing
or extra transformation somewhere in that chain, or a layer stored in a
different datum.

## 4.7 Where to Check It

Before collecting, confirm that three settings agree on NAD83(2011):
the coordinate system and correction source in Zeno Connect, the
transformations in your Field Maps location profile, and the coordinate
system of the map layers you'll compare against. The step-by-step
settings are in your device how-to guides. The final check is the one
from Module 3: a known-point check, repeated for each source.

### Self-Check

Pick the best answer for each question. If one surprises you, revisit that section.

<div class="self-check" markdown>

<div class="sc-card" data-answer="b" markdown>
**Q1. What is the difference between NAD83(2011) and a global frame such as ITRF or WGS84?**

<ul class="sc-options">
  <li data-key="a">a. NAD83(2011) is less precise than global frames</li>
  <li data-key="b">b. NAD83(2011) moves with the North American plate, so a fence post keeps nearly the same coordinates; global frames don't, so its coordinates change every year</li>
  <li data-key="c">c. Global frames are only used outside the U.S.</li>
  <li data-key="d">d. NAD83(2011) is fixed to the Earth as a whole; global frames move with the plate</li>
</ul>

<div class="sc-explain" markdown>
Both are legitimate rulers. NAD83(2011) is the view from inside the train, and global frames are the view from the platform, with the continent sliding underneath at roughly 2 cm per year.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q2. What does "epoch 2010.00" mean for NAD83(2011)?**

<ul class="sc-options">
  <li data-key="a">a. The year the receiver was manufactured</li>
  <li data-key="b">b. The date your survey was collected</li>
  <li data-key="c">c. The date (1 January 2010) the coordinates are valid for</li>
  <li data-key="d">d. The version number of the correction software</li>
</ul>

<div class="sc-explain" markdown>
An epoch is the timestamp on the photo. In a moving frame, coordinates only mean something if you know the date they are valid for.
</div>
</div>

<div class="sc-card" data-answer="a" markdown>
**Q3. Why can't a single fixed shift fix a frame mismatch?**

<ul class="sc-options">
  <li data-key="a">a. The gap grows each year, so a shift that is right this year is off by about 2 cm next year</li>
  <li data-key="b">b. The gap changes with the weather</li>
  <li data-key="c">c. Fixed shifts are not allowed in Field Maps</li>
  <li data-key="d">d. The gap is different for every receiver model</li>
</ul>

<div class="sc-explain" markdown>
A time-dependent transformation uses the collection date, plus a velocity model of ground motion in mm per year, to work out the right shift.
</div>
</div>

<div class="sc-card" data-answer="d" markdown>
**Q4. A colleague says to pick NAD83(PA11) because the project is in Pennsylvania. What should you do?**

<ul class="sc-options">
  <li data-key="a">a. Agree, since PA stands for Pennsylvania</li>
  <li data-key="b">b. Pick NAD83(MA11) instead, since it is closer to the Northeast</li>
  <li data-key="c">c. Use whichever one the basemap uses</li>
  <li data-key="d">d. Use NAD83(2011), because PA11 is the Pacific plate frame and MA11 is the Mariana plate frame</li>
</ul>

<div class="sc-explain" markdown>
The letters are a coincidence. Pennsylvania and Massachusetts both sit on the North American plate, and choosing PA11 or MA11 adds a large, plate-motion-sized error.
</div>
</div>

<div class="sc-card" data-answer="b" markdown>
**Q5. Network RTK agrees with a monument to 2 cm, but SBAS on the same spot is more than half a meter off. Both show a small ± on screen. What is the most likely reason?**

<ul class="sc-options">
  <li data-key="a">a. The SBAS receiver has a hardware fault</li>
  <li data-key="b">b. The two sources are in different frames, and SBAS is in a global frame that was not transformed to NAD83(2011)</li>
  <li data-key="c">c. There are too few satellites</li>
  <li data-key="d">d. Multipath at the monument</li>
</ul>

<div class="sc-explain" markdown>
The ± number can't see a frame mismatch. A constant offset of 50 cm to 1 m in the Northeast that grows each year is the frame signature.
</div>
</div>

<div class="sc-card" data-answer="c" markdown>
**Q6. How do you catch a frame mismatch before it ends up in your dataset?**

<ul class="sc-options">
  <li data-key="a">a. Check that the ± estimate is small</li>
  <li data-key="b">b. Check that the satellite count is high</li>
  <li data-key="c">c. Confirm each setting agrees on NAD83(2011), then do a known-point check with each position source you use</li>
  <li data-key="d">d. Only check when points look shifted against the basemap</li>
</ul>

<div class="sc-explain" markdown>
The ± number and satellite count can't detect a frame mismatch, and the known-point check is the one step that compares against a position from outside the receiver. Repeat it for every source, since each can arrive in a different frame.
</div>
</div>

</div>
