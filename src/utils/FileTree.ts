import { FileTreeItemDirectoryType } from "../types/FileTreeTypes";

/**
 * Return array of all children paths for a given directory
 *
 * @param directory FileTreeItemDirectoryType
 * @param path string
 * @returns string[]
 */
export function getNestedDirectories(
  directory: FileTreeItemDirectoryType,
  path: string
): string[] {
  return directory.children.flatMap((c) => {
    if (c.kind === 'directory') {
      const itemPath = `${path}/${c.name}`;
      return [
        itemPath,
        ...getNestedDirectories(c, itemPath),
      ];
    }
    return [];
  });
}

