import {
  window,
  ViewColumn,
  Uri,
  ExtensionContext,
  WebviewPanel,
} from "vscode";
import path from "path";
import { configState, PANEL_TITLE } from "./utils/config";

export class Panel {
  onDidDispose: any;
  // private panel: WebviewPanel;
  constructor(context: ExtensionContext) {
    let panel: WebviewPanel | undefined = window.createWebviewPanel(
      "wxread",
      PANEL_TITLE,
      ViewColumn.One,
      {
        enableScripts: true, // 启用js
        retainContextWhenHidden: true, // 状态保存
      }
    );

    // 设定标题图标
    panel.iconPath = Uri.file(
      path.join(context.extensionPath, "resources/weread.png")
    );

    panel.webview.html = `<!DOCTYPE html>
								<html lang="en">
								<head>
									<meta charset="UTF-8">
									<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
									<meta content="portrait" name="x5-orientation">
									<meta content="true" name="x5-fullscreen">
									<meta content="portrait" name="screen-orientation">
									<meta content="yes" name="full-screen">
									<meta content="webkit" name="renderer">
									<meta content="IE=Edge" http-equiv="X-UA-Compatible">
									<title>${PANEL_TITLE}</title>
									<style>
									html,body,iframe{
										width:100%;
										height:100%;
										border:0;
										overflow: hidden;
									}
									</style>
								</head>
								<body>
									<iframe src="http://localhost:${configState.proxyPort}"/>
								</body>
								</html>`;

    return panel;
  }
}
