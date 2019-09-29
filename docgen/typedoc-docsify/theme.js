const fs = require('fs-extra');
const { RendererEvent } = require('typedoc/dist/lib/output/events');

const MarkdownTheme = require('typedoc-plugin-markdown/dist/theme').default;

class DocsifyTheme extends MarkdownTheme {
  constructor(renderer, basePath) {
    super(renderer, basePath);
    this.listenTo(renderer, RendererEvent.END, this.writeSummary, 1024);
  }

  writeSummary(renderer) {
    const outputDirectory = renderer.outputDirectory;
    const summaryMarkdown = this.getSummaryMarkdown(renderer);
    try {
      fs.writeFileSync(`${outputDirectory}/_sidebar.md`, summaryMarkdown);
      this.application.logger.write(
        `[typedoc-plugin-markdown] _sidebar.md written to ${outputDirectory}`
      );
    } catch (e) {
      this.application.logger.write(
        `[typedoc-plugin-markdown] failed to write _sidebar at ${outputDirectory}`
      );
    }
  }

  getSummaryMarkdown(renderer) {
    const md = [];
    md.push('- Types Documentation');
    md.push('- [Summary](globals.md)');
    this.getNavigation(renderer.project).children.forEach(rootNavigation => {
      if (rootNavigation.children) {
        md.push(`  - ${rootNavigation.title}`);
        rootNavigation.children.forEach(item => {
          md.push(`    - [${item.title}](${item.url})`);
        });
      }
    });
    return md.join('\n');
  }

  allowedDirectoryListings() {
    return [
      'README.md',
      'globals.md',
      'classes',
      'enums',
      'interfaces',
      'modules',
      'media',
      '.DS_Store',
      'SUMMARY.md',
    ];
  }
}

module.exports = DocsifyTheme;
