import { eslint } from "rollup-plugin-eslint";
import pkg from './package.json';

export default [
  {
		input: 'src/index.js',
    external: ['knockout', 'jquery'],
		output: {
			name: 'kodiagram',
			file: pkg.main,
      format: 'umd',
      globals: {
        knockout: 'ko',
        jquery: 'jQuery'
      }
		}
  },

  {
    input: 'src/index.js',
    external: ['knockout', 'jquery'],
    output: [
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      eslint()
    ]
  }
];
