import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '8eg6szpi',
    dataset: 'production',
  },
  deployment: {
    appId: 'r1kkey2971e1huvlepucsdvg',
  },
  /**
   * Studio publicado em: https://ited.sanity.studio
   * Para fazer deploy: bun run studio:deploy
   */
  studioHost: 'ited',
});
