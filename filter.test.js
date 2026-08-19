/* ============================================================
   Ada Voices filter engine - unit tests (pure logic, no HTTP)
   Verifies the AND-intersection semantics described in the
   technical design, including the deliberate empty state.
   ============================================================ */
const AdaFilter = require('./public/js/filter');

const FIXTURES = [
  { id: 'a', route: 'support', tags: ['women', 'firstfam'] },
  { id: 'b', route: 'build',   tags: ['alevels'] },
  { id: 'c', route: 'support', tags: ['money'] }
];

describe('Ada Voices filter engine', () => {

  // Test Case 10: no active filters -> everything shows
  it('TC10 returns all stories when no filters are active', () => {
    expect(AdaFilter.applyFilters(FIXTURES, new Set())).toHaveLength(3);
  });

  // Test Case 11: AND-intersection across route + tag
  it('TC11 returns only stories matching EVERY active filter (AND semantics)', () => {
    const result = AdaFilter.applyFilters(FIXTURES, new Set(['support', 'women']));
    expect(result.map(s => s.id)).toEqual(['a']);
  });

  // Test Case 12: conflicting chips -> deliberate empty state
  it('TC12 returns an empty array for conflicting filters (drives the UI empty state)', () => {
    const result = AdaFilter.applyFilters(FIXTURES, new Set(['build', 'money']));
    expect(result).toEqual([]);
  });

});
