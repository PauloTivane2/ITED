import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '8eg6szpi',
    dataset: 'production',
  },
  /**
   * Após rodar `sanity deploy`, o Studio será publicado em:
   * https://ited.sanity.studio
   */
  studioHost: 'ited',
});
