/* ============================================================
   Ada Voices - filter engine
   ------------------------------------------------------------
   Pure functions, no DOM access, so the same file runs in the
   browser (window.AdaFilter) and under Jest (module.exports).

   Semantics: AND. A story shows only if it matches EVERY active
   filter, where its filterable set is its tags plus its route.
   This changed from the hackathon's OR behaviour: the wall is
   for finding "someone like me", so each extra chip should
   narrow the results, not widen them. Conflicting chips give
   zero results on purpose - the UI's empty state handles it.
   ============================================================ */

/** The set of values a story can be matched on: tags + route. */
function storyTagSet(story) {
  return new Set([...(story.tags || []), story.route]);
}

/** True if the story satisfies every active filter (AND). */
function matchesFilters(story, activeFilters) {
  if (!activeFilters || activeFilters.size === 0) return true;
  const tagSet = storyTagSet(story);
  for (const filter of activeFilters) {
    if (!tagSet.has(filter)) return false;
  }
  return true;
}

/** Apply the active filter Set to a story array. One pass over the list. */
function applyFilters(stories, activeFilters) {
  return stories.filter(function (s) { return matchesFilters(s, activeFilters); });
}

// Make the engine available to the browser page and to Jest.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { storyTagSet: storyTagSet, matchesFilters: matchesFilters, applyFilters: applyFilters };
}
if (typeof window !== 'undefined') {
  window.AdaFilter = { storyTagSet: storyTagSet, matchesFilters: matchesFilters, applyFilters: applyFilters };
}
