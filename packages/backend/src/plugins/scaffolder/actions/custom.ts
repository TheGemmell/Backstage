import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';
import path from 'node:path'
import { z } from 'zod';

export const createNewFileAction = () => {
  return createTemplateAction({
    id: 'gemmell:file:create',
    schema: {
      input: z.object({
        contents: z.string().describe('The contents of the file'),
        filename: z
          .string()
          .describe('The filename of the file that will be created'),
      }),
    },

    async handler(ctx) {

      const files = await fs.readdir(ctx.workspacePath)
      ctx.logger.log("info", "hey")
      ctx.logStream.write(__dirname)
      const outputPath = path.resolve(__dirname, 'test')
      await fs.copy(ctx.workspacePath, outputPath)
      const str = (await fs.readFile(`${outputPath}/catalog-info.yaml`)).toString()
      const strings = []
      for (let i = 0; i < files.length; i++) {
        const string = (await fs.readFile(`${outputPath}/${files[i]}`)).toString()
        strings.push({file: files[i], content: string})
      }
      ctx.output('str', strings)
      ctx.output('fileUrl', `${outputPath}/index.js`)
    },
  });
};
