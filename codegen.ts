
import type { CodegenConfig } from '@graphql-codegen/cli';
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: [`${process.env.NEXT_PUBLIC_API_URL}`, "./client-schema.graphql"],
  documents: "lib/**/*.tsx",
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
