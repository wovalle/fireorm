import unified from 'unified';
import markdown from 'remark-parse';
import fs from 'fs';
import path from 'path';

const markdownFiles = [
  '../README',
  'Core_Concepts',
  'Read_Data',
  'Manage_Data',
  'Subcollections',
  'Transactions',
  'Custom_Repositories',
];

const extractHeadingsFromMarkdown = (fileName, text) => {
  const tokens = unified()
    .use(markdown)
    .parse(text) as any;

  const headings = tokens.children.filter(
    c => c.type === 'heading' && c.depth <= 3
  );

  return {
    title: headings.find(c => c.depth === 1).children[0].value,
    children: headings
      .filter(c => [2, 3].includes(c.depth))
      .map(c => c.children[0].value),
    fileName,
  };
};

const createSideBarFromHeadings = async headings => {
  const toLink = str =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z1-9]|[ ]/g, '-')
      .trim();

  return headings.reduce((acc, cur) => {
    const title = `- [${cur.title}](${cur.fileName}.md#${toLink(cur.title)})\n`;
    const children = cur.children.map(c => {
      return `  - [${c}](${cur.fileName}.md#${toLink(c)})`;
    });

    // tslint:disable-next-line:no-parameter-reassignment
    acc += '\n' + title + children.join('\n');

    return acc;
  }, '');
};

const saveSidebar = (basePath, sidebar) => {
  return fs.promises.writeFile(`${basePath}/_sidebar.md`, sidebar);
};

(async () => {
  const files = markdownFiles.map(f => ({
    path: path.join(__dirname, `${f}.md`),
    name: f.replace('../', ''),
  }));

  const headings = await Promise.all(
    files.map(async file => {
      const buffer = await fs.promises.readFile(file.path);
      return extractHeadingsFromMarkdown(file.name, buffer.toString());
    })
  );

  const sidebar = await createSideBarFromHeadings(headings);
  await saveSidebar(__dirname, sidebar);

  console.log('Sidebar.md built successfully!');
})();
