const { sourceNodes } = require('../src/gatsby-node');
const assert = require('assert');

describe('source nodes', () => {
  it('returns empty array', async () => {
    const articles = await sourceNodes({
          reporter: {
            panic: console.error,
            info: console.log,
            error: console.error,
          },
          actions: {
            createNode: () => ({}),
          },
          emitter: {
            on: console.log,
          },
          createNodeId: () => 'abcd',
          createContentDigest: () => 'aaaa',
        },
        {},
    );

    assert(articles.length === 0);
  });
});
