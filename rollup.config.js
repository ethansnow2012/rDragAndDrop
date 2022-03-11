import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
    //input: path.resolve(__dirname, 'src'),
    input: "src/rDragAndDrop/index.js",
    output: {
      name:"RDragAndDrop",
      file: './dist/rDragAndDrop.js',
      format: 'esm'
    },
    plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
        }),
        babel({
          exclude: "node_modules/**"
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**',
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            namedExports: {
              'node_modules/react/index.js': [
                'createContext',
                'useState'
              ],
              'node_modules/react-dom/index.js': ['render', 'hydrate'],
              'node_modules/react-is/index.js': [
                'isElement',
                'isValidElementType',
                'ForwardRef'
              ]
            }
          })
      ]
  };