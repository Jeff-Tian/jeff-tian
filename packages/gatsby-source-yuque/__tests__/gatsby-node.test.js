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
  it('throws when login is not specified', () => {
    assert.throws(() => getYuqueConfig({}), Error, "login in option is required")
  })

  it('throws when repo is not specified', () => {
    assert.throws(() => getYuqueConfig({ login: 'hello' }), Error, "repo in option is required")
  })

  it('throws when TOKEN is missing', () => {
    assert.throws(()=>getYuqueConfig({ login: 'hello', repo: 'world' }), Error, "token in option is required")
  })

  it('gets yuque config', ()=>{
    process.env.YUQUE_TOKEN = 'token'

    const res = getYuqueConfig({ login: 'hello', repo: 'world' })

    assert(res !== null)
    assert(res.baseUrl === 'https://www.yuque.com/api/v2/')
    assert(res.namespace === 'hello/world')
    assert(res.timeout === 10000)
    assert(res.token === 'token')
    assert(res.yuquePath.endsWith('json'))
  })
  
  it('gets yuque config', () => {
    assert.throws(() => getYuqueConfig({}), Error, "")
  })
})