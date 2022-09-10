import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { css } from "@emotion/react";
import JSZip from "jszip";
import folderContentsJSON, { ColorContentsEntry, ColorEntry, DarkAppearanceEntry } from "./lib";
import { ColorGroupType } from "./lib";
import { textInputStyle } from "./Components/textInputStyle";
import { textInputHeaderStyle } from "./Components/textInputHeaderStyle";
import { accentButtonStyle } from "./Components/accentButtonStyle";
import { borderButtonStyle } from "./Components/borderButtonStyle";
import { produce } from "immer";


function App() {
  const lightAppearanceTagName = React.useRef<HTMLInputElement>(null);
  const darkAppearanceTagName = React.useRef<HTMLInputElement>(null);

  const defaultLightTag = "day";
  const defaultDarkTag = "night";

  const onCreate = () => {
    const lightTag = lightAppearanceTagName.current?.value || defaultLightTag;
    const darkTag = darkAppearanceTagName.current?.value || defaultDarkTag;
    parent.postMessage(
      { pluginMessage: { type: "create-assets", lightTag, darkTag } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  function colorContentsFactory(colorGroup: ColorGroupType) {
    if (colorGroup.light && colorGroup.dark) {
      let colorComponentsEntry = ColorContentsEntry;
      let lightColorEntry = ColorEntry;
      let darkColorEntry = ColorEntry;
      
      lightColorEntry = produce(lightColorEntry, (drafter) => {
        drafter.color.components.red = formatNumber(colorGroup.light.color.r);
        drafter.color.components.green = formatNumber(colorGroup.light.color.g);
        drafter.color.components.blue = formatNumber(colorGroup.light.color.b);
        drafter.color.components.alpha = formatNumber(colorGroup.light.opacity);
      }), 
      
      darkColorEntry = produce(darkColorEntry, (drafter) => {
        drafter.color.components.red = formatNumber(colorGroup.dark.color.r);
        drafter.color.components.green = formatNumber(colorGroup.dark.color.g);
        drafter.color.components.blue = formatNumber(colorGroup.dark.color.b);
        drafter.color.components.alpha = formatNumber(colorGroup.dark.opacity);
      });

      colorComponentsEntry = produce(colorComponentsEntry, (drafter) => {
        drafter.colors.push(lightColorEntry);
        drafter.colors.push({ ...DarkAppearanceEntry, ...darkColorEntry });
      });
      
      return colorComponentsEntry
    } else {
      let colorComponentsEntry = ColorContentsEntry;
      let singleColor = colorGroup.light || colorGroup.dark;
      let singleColorEntry = ColorEntry;

      singleColorEntry = produce(singleColorEntry, (drafter) => {
        drafter.color.components.red = formatNumber(singleColor.color.r);
        drafter.color.components.green = formatNumber(singleColor.color.g);
        drafter.color.components.blue = formatNumber(singleColor.color.b);
        drafter.color.components.alpha = formatNumber(singleColor.opacity);
      });

      colorComponentsEntry = produce(colorComponentsEntry, (drafter) => {
        drafter.colors.push(singleColorEntry);
      });
      
      return colorComponentsEntry
    }
  };

  function zipColors(zip: JSZip, colorGroups: ColorGroupType) {
    // Make the root Contents.json
    var blob = new Blob([folderContentsJSON], { type: "application/json" });
    zip.folder("./").file(`Contents.json`, blob, { base64: true })

    for (let key of Object.keys(colorGroups))  {
      let value = colorGroups[key];
      let paths = key.split("/");

      paths.forEach((_, index) => {
        if (index == paths.length - 1) {
          // Make a color contents.json
          let path = `/${key}.colorset`
          let json = colorContentsFactory(value);
          let colorContentsJSON = JSON.stringify(json, null, 2);
          var blob = new Blob([colorContentsJSON], { type: "application/json" });
          zip.folder(path).file(`Contents.json`, blob, { base64: true })
        } else {
          // MAke a folder contents.json
          let path = paths.slice(0, index + 1).join("/")
          var blob = new Blob([folderContentsJSON], { type: "application/json" });
          zip.folder(path).file(`Contents.json`, blob, { base64: true })
        }
      });
    }
  }

  function formatNumber(value: number) {
    return value.toFixed(3);
  }

  window.onmessage = async (event) => {
    if (!event.data.pluginMessage) return;
    const colorGroups = event.data.pluginMessage;

    return new Promise<void>((resolve) => {
      let zip = new JSZip();

      zipColors(zip, colorGroups)

      zip.generateAsync({ type: "blob" }).then((content: Blob) => {
        const blobURL = window.URL.createObjectURL(content);
        const link = document.createElement("a");
        link.className = "button button--primary";
        link.href = blobURL;
        link.download = "colors.zip";
        link.click();
        link.setAttribute("download", name + ".zip");
        resolve()
      });
    }).then(() => {
      parent.postMessage({ pluginMessage: { type: "finish-process" } }, "*");
    })
  }


  // UI

  return (
    <main>
      <header
        css={
          css`
            font-size: 20px;
            width: 100%;
            margin-bottom: 40px;
            text-align: left;
          `
      }>
        <h3>Xcode color asset exporter</h3>
      </header>
      <div css={
        css`
          display: flex;
          flex-direction: column;
          height: auto;
          gap: 12px;
          width: 100%;
          height: auto;
          margin-bottom: 40px;
        `
      }>
        <div css={
          css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `
        }>
          <label 
            htmlFor="input"
            css={
              css`
                ${textInputHeaderStyle}
                width: 100%;
                margin-bottom: 8px;
              `
            }
          >🌞 Light appearance tag
          </label>
          <input 
            id="input"
            type="text"
            ref={lightAppearanceTagName}
            placeholder={`input your tag name [${defaultLightTag}]`}
            css={
              css`
                ${textInputStyle}
                width: 100%;
                height: 44px;
              `
            }
          />
        </div>
        <div css={
          css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `
        }>
          <label 
            htmlFor="input"
            css={
              css`
                ${textInputHeaderStyle}
                width: 100%;
                margin-bottom: 8px;
              `
            }
          >🌙 Dark appearance tag
          </label>
          <input 
            id="input"
            type="text"
            ref={darkAppearanceTagName}
            placeholder={`input your tag name [${defaultDarkTag}]`}
            css={
              css`
                ${textInputStyle}
                width: 100%;
                height: 44px;
              `
            }
          />
        </div>
      </div>
      <div css={
        css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 8px;
          width: auto;
          height: 44px;
        `
      }>
        <button 
          className="brand" 
          onClick={onCreate}
          css={
            css`
              ${accentButtonStyle}
              width: 100px;
              height: auto;
            `
          }
        >
          Create
        </button>
        <button 
          onClick={onCancel}
          css={
            css`
              ${borderButtonStyle}
              width: 100px;
              height: auto;
            `
          }
        >
          Cancel
        </button>
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
