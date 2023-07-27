import {sourceNodes} from "../src/gatsby-node.js";
import assert from "assert";

const yuqueConfig = {};
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

describe('source nodes', () => {
    it('returns empty array', async () => {
        const articles = await sourceNodes(context,
            yuqueConfig,
        );

        assert(articles.length === 0);
    });
});
