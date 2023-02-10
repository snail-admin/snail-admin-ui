import { src, dest } from "gulp";
import { componentPath } from "../utils/paths";
const sass = require("gulp-sass")(require("sass"));
import autoprefixer from "gulp-autoprefixer";
import delpath from "../utils/delpath";
import run from "../utils/run";
//删除dist
export const removeDist = () => {
  return delpath(`${componentPath}/snail-admin`);
};

//处理样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/snail-admin/lib/src`))
    .pipe(dest(`${componentPath}/snail-admin/es/src`));
};

//打包组件
export const buildComponent = async () => {
  run("pnpm run build", componentPath);
};
