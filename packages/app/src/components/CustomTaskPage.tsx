import React from "react"
import { Page, Content } from "@backstage/core-components"
import { TaskPage } from "@backstage/plugin-scaffolder"
import { scaffolderPlugin } from "@backstage/plugin-scaffolder"
import { useTaskEventStream } from "@backstage/plugin-scaffolder-react"
import { useRouteRefParams } from "@backstage/core-plugin-api"
import { CodeSnippet } from "@backstage/core-components"


export default function ModdedTaskPage() {
  const { taskId } = useRouteRefParams(scaffolderPlugin.routes.ongoingTask)
  const task = useTaskEventStream(taskId)

  return (
  <Page themeId="tool">
    <Content noPadding>
    <TaskPage />
    <h1>Sample Code</h1>
    {task.output?.data ?
      task.output.data.map((val, i) => {
        return (
          <>
          <h4>{val.file}</h4>
          <CodeSnippet text={val.content} />
          </>
        )
      })
    : null
    }
    </Content>
  </Page>)

}
