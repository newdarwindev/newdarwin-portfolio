(() => {
  "use strict";
  const filters = document.querySelector("#filters");
  const query = document.querySelector("#query");
  const state = document.querySelector("#state");
  const count = document.querySelector("#count");
  const groups = [...document.querySelectorAll("[data-group]")];
  const rows = groups.flatMap(group => [...group.querySelectorAll("[data-repo]")]);
  if (!filters || !query || !state || !count || !rows.length) return;
  const update = () => {
    const words = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const row of rows) {
      const indexed = row.textContent.toLowerCase();
      row.hidden = !words.every(word => indexed.includes(word)) ||
        (state.value !== "all" && state.value !== row.dataset.state);
      if (!row.hidden) visible++;
    }
    for (const group of groups) group.hidden = !group.querySelector("[data-repo]:not([hidden])");
    count.textContent = visible === 0 ? "No matching repositories." : `${visible} of ${rows.length} repositories`;
  };
  filters.addEventListener("submit", e => { e.preventDefault(); update(); });
  query.addEventListener("input", update);
  state.addEventListener("change", update);
  filters.hidden = false;
  update();
})();
