import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b3xeqab7',
    dataset: 'production'
  },
  deployment: {
    appId: 'zy9cjucj3n9bfaku7vmc832a',
    autoUpdates: true,
  },
})