import { convert } from 'tsconfig-to-swcconfig'

convert('tsconfig-filename.json', process.cwd(), {
  // more swc config to override...
  minify: false,
})
