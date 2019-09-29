import unified from 'unified';
import markdown from 'remark-parse';
import fs from 'fs';
import path from 'path';

const markdownFiles = [
  ['../README', 'Getting Started'],
  ['Core_Concepts', 'Core Concepts'],
  ['Read_Data', 'Retrieving Data'],
  ['Manage_Data', 'Managing Data'],
  ['Subcollections', 'SubCollections'],
  ['Transactions', 'Transactions'],
  ['Custom_Repositories', 'Custom Repositories'],
];

const extractHeadingsFromMarkdown = (fileName, fileTitle, text) => {
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
    fileTitle,
  };
};

const createSideBarFromHeadings = async headings => {
  const toLink = str =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z1-9]|[ ]/g, '-')
      .trim();

  return headings.reduce((acc, cur) => {
    const title = `- ${cur.fileTitle}\n`;
    const children = cur.children.map(c => {
      return `  - [${c}](${cur.fileName.replace('../', '')}.md#${toLink(c)})`;
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
    path: path.join(__dirname, `${f[0]}.md`),
    name: f[0],
    title: f[1],
  }));

  const headings = await Promise.all(
    files.map(async file => {
      const buffer = await fs.promises.readFile(file.path);
      return extractHeadingsFromMarkdown(
        file.name,
        file.title,
        buffer.toString()
      );
    })
  );

  const sidebar = await createSideBarFromHeadings(headings);
  await saveSidebar(__dirname, sidebar);

  console.log('Sidebar.md built successfully!');
})();
