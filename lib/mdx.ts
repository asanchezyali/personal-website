import matter from "gray-matter";
import path from "path";
import fs from "fs";
import getAllfilesRecursively from "@/lib/utils/files";
const root = process.cwd();

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a: any, b: any) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getAllFilesFrotMatter(folder: string) {
  const prefixPaths = path.join(root, "data", folder);
  const files = getAllfilesRecursively(prefixPaths);
  const allFrontMatter: any[] = [];
  files.forEach((file: any) => {
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");

    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter } = matter(source);
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      });
    }
  });
  return allFrontMatter.sort((a: any, b: any) => dateSortDesc(a.date, b.date));
}
