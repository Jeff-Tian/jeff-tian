const { sourceNode, sourceNodes, getYuqueConfig } = require('../src/gatsby-node');
const assert = require('assert');

const context = {
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
};

const yuqueConfig = {};

describe('source nodes', () => {
  it('returns empty array', async () => {
    const articles = await sourceNodes(context,
      yuqueConfig,
    );

    assert(articles.length === 0);
  });

  it('source node', async () => {
    const article = await sourceNode(context, yuqueConfig)

    assert.deepStrictEqual(article, {})
  })
});

describe('gets yuque config', () => {
  it('gets yuque config', () => {
    assert.throws(() => getYuqueConfig({}), Error, "")
  })
})