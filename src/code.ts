import { ColorGroupType } from "./lib";

// Main
figma.showUI(__html__, { themeColors: true });
figma.ui.resize(320, 480);

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-assets") {
    figma.notify("Start process.. 🚀")
    startProgress(msg.lightTag, msg.darkTag)
      .then(() => {
        figma.notify("Done");
        figma.closePlugin()
      })
      .catch((error) => {
        figma.notify(`ERROR OCCURRED : ${error}`);
        figma.closePlugin();
      });
  } else if (msg.type === "finish-process") {
    figma.notify("Done!");
    figma.closePlugin();
  } else if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
// END


// Prepare to generate asset files
async function startProgress(lightTag: string, darkTag: string) {
  const colorGroups: ColorGroupType = {};
  const localPaints = figma.getLocalPaintStyles();

  localPaints.forEach((localPaint) => {
    if (localPaint.paints[0].type !== "SOLID") { return };
    const paint = localPaint.paints[0] as SolidPaint;
    
    if (localPaint.name.includes(lightTag)) {
      // 🌞 Light appearance
      const actualName = removeTag(localPaint.name, lightTag);
      if (colorGroups[actualName]) {
        colorGroups[actualName].light = paint
      } else {
        colorGroups[actualName] = {
          light: paint
        }
      }
    } else if (localPaint.name.includes(darkTag)) {
      // 🌙 Dark appearance
      const actualName = removeTag(localPaint.name, darkTag);
      if (colorGroups[actualName]) {
        colorGroups[actualName].dark = paint
      } else {
        colorGroups[actualName] = {
          dark: paint
        }
      }
    } else {
      // 🌞 Light appearance only
      if (colorGroups[localPaint.name]) {
        colorGroups[localPaint.name].light = paint
      } else {
        colorGroups[localPaint.name] = {
          light: paint
        }
      }
    }
  });

  return new Promise(() => {
    // Request ui to make files and download
    figma.ui.postMessage(colorGroups);
  });
};

function removeTag(name: string, tag: string): string {
  const pattern = RegExp(`\\[(${tag})\\]`);
  let result = name.replace(pattern, "");
  return result.trim();
};
