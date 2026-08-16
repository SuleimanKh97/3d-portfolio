import {
  siAngular,
  siBootstrap,
  siCss,
  siDocker,
  siDotnet,
  siFigma,
  siFirebase,
  siGit,
  siHtml5,
  siJavascript,
  siPostgresql,
  siPython,
  siReact,
  siTrello,
  siTypescript,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list below for the static skills grid that replaces the
// hover-driven keyboard interaction. Taglines live in the i18n dictionary
// under `keyboard.taglines.<slug>`.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [siJavascript, siTypescript, siHtml5, siCss, siBootstrap],
  [siAngular, siReact, siDotnet, siPython, siFirebase],
  [siPostgresql, siTrello, siDocker, siGit, siFigma],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();

