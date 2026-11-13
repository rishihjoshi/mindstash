// Run: node test/extract.test.mjs   (fails loudly if the parser breaks)
import assert from 'node:assert';
import { extractIdeas } from '../docs/extract.js';

// plain array
assert.equal(extractIdeas('[{"idea":"A","detail":"d","topic":"T"}]').length, 1);

// fenced JSON surrounded by prose + field aliases + missing topic -> General
const r = extractIdeas('Sure:\n```json\n[{"title":"B","insight":"x"}]\n```\nenjoy');
assert.equal(r[0].idea, 'B');
assert.equal(r[0].detail, 'x');
assert.equal(r[0].topic, 'General');

// drops entries with no idea text
assert.equal(extractIdeas('[{"detail":"no idea here"},{"idea":"keep"}]').length, 1);

// unknown topic is clamped to the enum (General); known topic (any case) is kept
assert.equal(extractIdeas('[{"idea":"x","topic":"Crypto Nonsense"}]')[0].topic, 'General');
assert.equal(extractIdeas('[{"idea":"x","topic":"productivity"}]')[0].topic, 'Productivity');

// junk / wrong types -> []
assert.deepEqual(extractIdeas('no json at all'), []);
assert.deepEqual(extractIdeas(123), []);

console.log('extract.test: all passed');
