export default {
  files: ['tests/**/**.spec.ts'],
  typescript: {
    compile: 'tsc',
    rewritePaths: { 'tests/': '.test/tests/', 'src/': '.test/src/' },
  },
}
