import { FileTreeItemDirectoryType, FileTreeItemType } from "../types/FileTreeTypes";

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

/**
 * Sorts children in directory
 *
 * @param directory FileTreeItemDirectoryType
 */
export function sortChildren(
  directory: FileTreeItemDirectoryType,
): void {
  directory.children.sort((a, b) => {
    // If both are same kind sort by name
    if (a.kind === b.kind) {
      return a.name.localeCompare(b.name);
    }

    // Directories on top
    return a.kind === 'directory' ? -1 : 1;
  });
}

/**
 * Get item by path string
 *
 * @param directory FileTreeItemDirectoryType
 * @param path string Expects path to include directory.name
 * @returns 
 */
export function getItemByPath(
  directory: FileTreeItemDirectoryType,
  path: string
): FileTreeItemType | undefined {
  // Split path without current directory item
  const aPath = path.split('/').slice(1);

  // Empty path returns current directory
  if (aPath.length === 0) {
    return directory;
  }

  // Find path in children
  const foundItem = directory.children.find((c) => c.name === aPath[0]);

  // Recursive call
  if (foundItem && aPath.length > 1) {
    // Path doesn't exists
    if (foundItem.kind !== 'directory') {
      return undefined;
    }

    return getItemByPath(
      foundItem as FileTreeItemDirectoryType,
      aPath.join('/')
    );
  }

  return foundItem;
}

/**
 * Get the last directory by path string
 *
 * @param directory FileTreeItemDirectoryType
 * @param path string Expects path to include directory.name
 * @returns 
 */
export function getDirectoryByPath(
  directory: FileTreeItemDirectoryType,
  path: string
): FileTreeItemDirectoryType {
  // Split path without current directory item
  const aPath = path.split('/').slice(1);

  // Empty path returns current directory
  if (aPath.length === 0) {
    return directory;
  }

  // Find path in children
  const foundDirectory = directory.children.find(
    (c) => c.kind === 'directory' && c.name === aPath[0]
  ) as FileTreeItemDirectoryType;

  // Recursive call
  if (foundDirectory && aPath.length > 1) {
    return getDirectoryByPath(foundDirectory, aPath.join('/'));
  }

  return foundDirectory || directory;
}

/**
 * Generate new item name without repetition
 *
 * @param directory FileTreeItemDirectoryType
 * @param filename string
 * @returns string
 */
export function makeNewItemName(
  directory: FileTreeItemDirectoryType,
  filename: string
): string {
  // Get all children names
  const cNames = directory.children.map(c => c.name);

  // Get name without extension (if any)
  const name = filename.indexOf('.') !== -1
    ? filename.substring(0, filename.indexOf('.'))
    : filename;

  // Get extension (if any)
  const extension = filename.indexOf('.') !== -1
    ? filename.substring(filename.indexOf('.'))
    : '';

  let newName = name + extension;
  let i = 2;

  while(cNames.includes(newName)) {
    newName = `${name}${i}${extension}`;
    i++;
  }

  return newName;
}
