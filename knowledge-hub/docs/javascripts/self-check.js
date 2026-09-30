document$.subscribe(function () {
    document.querySelectorAll(".self-check").forEach(function (box) {
      if (box.dataset.ready) return;
      box.dataset.ready = "1";

      const cards = box.querySelectorAll(":scope > .sc-card");
      let i = 0, score = 0;

      cards.forEach(function (card) {
        const answer = card.dataset.answer;
        const opts = card.querySelectorAll(".sc-options li");
        const explain = card.querySelector(".sc-explain");
        if (explain) explain.hidden = true;

        opts.forEach(function (li) {
          li.tabIndex = 0;
          li.setAttribute("role", "button");

          function pick() {
            if (card.dataset.done) return;
            card.dataset.done = "1";
            const ok = li.dataset.key === answer;
            if (ok) score++;
            li.classList.add(ok ? "sc-right" : "sc-wrong");
            opts.forEach(function (o) {
              if (o.dataset.key === answer) o.classList.add("sc-right");
            });
            if (explain) explain.hidden = false;
            update();
          }

          li.onclick = pick;
          li.onkeydown = function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
          };
        });
      });

      const nav = document.createElement("div");
      nav.className = "sc-nav";
      nav.innerHTML =
        '<button class="sc-btn sc-prev">← Previous</button>' +
        '<span class="sc-count"></span>' +
        '<button class="sc-btn sc-next">Next →</button>';
      box.appendChild(nav);

      const prev = nav.querySelector(".sc-prev");
      const next = nav.querySelector(".sc-next");
      const count = nav.querySelector(".sc-count");

      function update() {
        cards.forEach(function (c, k) { c.hidden = k !== i; });
        count.textContent =
          (i + 1) + " / " + cards.length + " · Score: " + score;
        prev.disabled = i === 0;
        next.disabled = i === cards.length - 1;
      }

      prev.onclick = function () { i--; update(); };
      next.onclick = function () { i++; update(); };
      update();
    });
  });