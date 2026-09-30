# Module 5 — Hard Places

*Read time: 7–10 minutes*

**By the end of this module, you can:** explain why logging longer at a
hard site sometimes helps and sometimes doesn't, spot a fix that looks
confident but may be false, choose between logging longer, moving,
revisiting, or switching method, and know when to record a point as
not achievable at this site.

## 5.1 What Makes a Place Hard

A "hard place" is any site where the sky works against you: tree
canopy, building edges, steep slopes, or a spot next to water or metal.
Two things go wrong there, and you've already met both.

**Obstruction cuts the sky.** Trees and buildings block satellites
outright. Fewer satellites, bunched in the part of the sky that's still
open, means a higher DOP (Module 1).

**Multipath bends what's left.** The signals that do get through often
bounce off trunks, walls, or water first. That's a *local* error, so no
base station or correction service can remove it (Module 2).

Under canopy you usually get both at once. Leaves also weaken the
signals that pass through them, which makes the receiver's
measurements noisier.

## 5.2 Will Waiting Help? Noise vs. Bias

Picture two bathroom scales. The first wobbles by a few hundred grams
each time you step on. Weigh yourself ten times, average the readings,
and you get very close to your true weight. The second scale doesn't
wobble at all, but it reads 2 kg heavy. Average ten readings and you
get a very steady number that is still 2 kg wrong.

**Receiver noise is the wobbly scale.** It's random, so it averages
out. A few extra minutes at the point genuinely helps.

**Multipath is the heavy scale.** It's a *bias*: it pushes your
position the same way for a while. It does change, but only slowly, as
satellites move across the sky over tens of minutes. Five more minutes
at the same spot averages the bias *in*, not out. The result is a
stable reading, which is precision, not accuracy (Module 3).

This is why Part 1's rule "log longer, not shorter" has a limit. Longer
logging reduces noise, and a much longer wait lets satellite geometry
change. But a few more minutes in the same multipath spot mostly makes
a wrong answer look more convincing.

## 5.3 A Fix That Isn't

In Module 4 you learned that a *fixed* solution is necessary but not
sufficient. Hard places are where that matters most. With few
satellites and reflected signals, the receiver can lock onto the wrong
solution and still report "fixed" with a small ± value. Nothing on the
screen tells you it's wrong.

The warning signs show up only when you compare. A fix that drops and
comes back at a noticeably different coordinate is one. Repeat visits
to the same point that disagree by decimeters, while each one claimed
centimeters, is another. A common safeguard at hard sites is to take a
second, independent fix: let the fix drop, reacquire it, and check that
both observations agree within your tolerance.

## 5.4 Your Four Options

When a site won't give you a trustworthy point, each option changes
something different:

| Option | What it changes | Helps with | Won't help with |
| --- | --- | --- | --- |
| **Log longer** | Time on the same spot | Random noise | Multipath bias, false fixes |
| **Move or offset** | Where the antenna sits | Obstruction and multipath at that spot | Nothing, if the new spot is just as blocked |
| **Revisit later** | Where the satellites are | Poor geometry, multipath from that geometry | A site that's blocked at all hours |
| **Switch to PPK** | When the solution is computed | A dropping or unreliable link | Multipath (still local) |

*Each option attacks a different cause. Match the option to the cause,
not to how much time you have.*

**Moving or offsetting** means setting up at the nearest open spot and
measuring distance and direction to the real point. It adds a small
measurement error of its own, but that's usually far smaller than a
multipath bias. Your how-to guide covers the offset steps for your
device.

**Revisiting** works because satellite positions change through the
day. Come back a few hours later, not at the same clock time tomorrow:
GPS satellites return to nearly the same sky positions about four
minutes earlier each day, so the same time tomorrow can mean the same
problem.

**Switching to PPK** means logging raw data so the office can compute
the solution afterward. It removes the dependence on a live link and
gives processing a second chance, but multipath is still in the data.
Planning that logging so the office step works is covered in Module 6.

**Worked example.** You have a fixed solution under canopy at ±1 cm,
but last week's visit to the same point differs by 50 cm. Logging
longer won't settle it, because either reading could be a false fix
biased by multipath. Instead, move to an opening and offset, or come
back later in the day and take two independent fixes. If those agree,
keep them. If they don't, go to 5.5.

## 5.5 When to Stop

Some points can't reach 1–3 cm at their location with the methods you
have. The honest record is more useful than a confident wrong
coordinate. If you've tried the options that match the cause and still
can't get independent fixes that agree within tolerance, stop. Record
the point as **not achievable at this site** to the project accuracy,
and note the method used, the accuracy you actually achieved, and why
(for example, "dense canopy, fixes disagreed by 40 cm").

| **WHY IT MATTERS** | |
|---|---|
| At a hard site, a steady "fixed, ±1 cm" reading is not proof. Multipath and false fixes produce confident, stable, wrong points. Trust a hard-site point only when independent fixes agree, and record it honestly when they don't. | |

### Self-Check

Try explaining each of these out loud before moving on. If one doesn't
come easily, that's the concept to revisit:

1. Hard places combine obstruction (fewer satellites, higher DOP) and
   multipath (a local error no correction removes).
2. Longer logging averages out random noise but not multipath, which is
   a slowly changing bias.
3. A "fixed" solution at a hard site can be false; only independent
   fixes that agree reveal it.
4. Log longer, move or offset, revisit later, and switch to PPK each fix
   a different cause. Pick by cause.
5. Revisit a few hours later, not at the same time the next day.
6. When independent fixes won't agree within tolerance, record the
   point as not achievable at this site, with the accuracy you actually
   got.
