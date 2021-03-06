import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { row, fullHeight, fullscreen, expand } from "@jimengio/flex-styles";

import Home from "./home";
import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter } from "controller/generated-router";
import DemoImageViewer from "./demo-image-viewer";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import DemoCloseBackdrop from "./demo-close-backdrop";

const renderChildPage = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case genRouter.imageViewer.name:
        return <DemoImageViewer />;
      case genRouter.closeOnBackdrop.name:
        return <DemoCloseBackdrop />;
      default:
        return <HashRedirect to={genRouter.imageViewer.path()} noDelay />;
    }
  }
  return <div>NOTHING</div>;
};

let items: ISidebarEntry[] = [
  {
    title: "image viewer",
    path: genRouter.imageViewer.name,
  },
  {
    title: "Close on backdrop",
    path: genRouter.closeOnBackdrop.name,
  },
];

let onSwitch = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target) {
    target.go();
  } else {
    console.error("Unknown path", path);
  }
};

export default (props: { router: IRouteParseResult }) => {
  return (
    <div className={cx(row, fullscreen, styleContainer)}>
      <DocSidebar title="Image Viewer" currentPath={props.router.name} items={items} onSwitch={(item) => onSwitch(item.path)} />
      <div style={{ width: 20 }} />
      <div className={cx(expand, stylePage)}>{renderChildPage(props.router)}</div>
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

let stylePage = css`
  padding: 40px;
`;
