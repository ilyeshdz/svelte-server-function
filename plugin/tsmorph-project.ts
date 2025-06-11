import { Project } from "ts-morph";

export const tsProject = new Project({
  useInMemoryFileSystem: true,
  skipAddingFilesFromTsConfig: true,
});
