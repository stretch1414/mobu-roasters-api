import glob from 'glob';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
// import { resolvers } from './Book';

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const DEFAULT_SCOPES = ['USER'];

// const scopesMap = {};

// console.log('resolvers', resolvers);

// const resolversArray = await loadFiles('**/Book.js', {
//   // onlyFiles: false,
//   // globOptions: { absolute: false },
//   ignore: ['./index.js'],
// });

// console.log('resolversArray', { resolversArray });

// const mergedResolvers = mergeResolvers(resolversArray);

// console.log('mergedResolvers', { mergedResolvers });
// console.log(JSON.stringify(mergedResolvers));

const resolversArray = await Promise.all(
  glob
    .sync('./*', { ignore: ['./index.js'], cwd: __dirname })
    .map((file) => import(pathToFileURL(path.resolve(__dirname, file))))
);

console.log('resolversArray', resolversArray);

const mergedResolvers = mergeResolvers(
  resolversArray.map((resolverMap) => {
    console.log('resolverMap', resolverMap);
    return resolverMap.default;
  })
);

console.log('mergedResolvers', mergedResolvers);
console.log(JSON.stringify(mergedResolvers));

export default mergedResolvers;
