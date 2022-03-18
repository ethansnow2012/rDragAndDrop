import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
    //input: path.resolve(__dirname, 'src'),
    input: "src/rDragAndDrop/index.js",
    output: {
      name:"RDragAndDrop",
      file: './dist/index.js',
      format: 'esm'
    },
    external: [
      'react',
      'react-dom',
    ],
    plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
        }),
        resolve(),
        babel({
          exclude: "node_modules/**",
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }),
        //commonjs()
        commonjs({
            include: 'node_modules/**',
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            namedExports: {
              'node_modules/react/index.js': Object.keys(require('react')),
              'node_modules/react-is/index.js': Object.keys(require('react-is')),
              'node_modules/react-dom/index.js': ['render', 'hydrate'],
            }
          })
      ]
  };