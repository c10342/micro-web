import { AppItem } from "./app-list";
import { fetchResource } from "./helper";
import { sandbox } from "./sandbox";

export const loadHtml = async (app: AppItem) => {
  const html = await fetchResource(app.entry);

  const { dom, scripts } = await parseHtml(html, app);

  const ct = document.querySelector(app.container);

  if (!ct) {
    throw new Error("容器不存在，请检查");
  }

  ct.innerHTML = dom;

  scripts.forEach((item) => {
    sandbox(item, app);
  });
  return app
};

export const parseHtml = async (htmlStr: string, app: AppItem) => {
  const div = document.createElement("div");

  div.innerHTML = htmlStr;

  const { dom, scriptUrl, script } = await getResources(div, app);

  const fetchScripts = await Promise.all(scriptUrl.map(fetchResource));
  const allScript = [...script, ...fetchScripts];
  return { dom, scripts: allScript };
};

export const getResources = async (root: HTMLElement, app: AppItem) => {
  const scriptUrl: string[] = [];
  const script: string[] = [];
  const dom = root.outerHTML;
  const scriptElements = root.querySelectorAll("script");
  const linkElements = root.querySelectorAll("link");

  for (let i = 0; i < scriptElements.length; i++) {
    const element = scriptElements[i];
    const src = element.getAttribute("src");
    if (!src) {
      script.push(element.outerHTML);
    } else {
      if (src.startsWith("http")) {
        scriptUrl.push(src);
      } else {
        scriptUrl.push(`http:${app.entry}/${src}`);
      }
    }
  }
  //   link中也会有js的内容
  for (let i = 0; i < linkElements.length; i++) {
    const element = linkElements[i];
    const href = element.getAttribute("href");
    if (href?.endsWith(".js")) {
      if (href.startsWith("http")) {
        scriptUrl.push(href);
      } else {
        scriptUrl.push(`http:${app.entry}/${href}`);
      }
    }
    element.parentElement?.replaceChild(
      document.createComment("已经被替换"),
      element
    );
  }

  //   return [dom, scriptUrl, script];
  return { dom, script, scriptUrl };
};
