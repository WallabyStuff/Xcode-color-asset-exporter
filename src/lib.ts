export interface ColorGroupType {
  light?: SolidPaint, 
  dark?: SolidPaint
} 

export interface ColorGroupsType {
  [name: string]: ColorGroupType
}

export const ColorContentsEntry = {
  "colors" : [],
  "info" : {
    "author" : "xcode-color-asset-exporter",
    "version" : 1
  },
  "properties" : {
     "provides-namespace" : false
  },
}

export const ColorEntry = {
  "color" : {
    "color-space" : "srgb",
    "components" : {
      "alpha" : "1.000",
      "blue" : "1.000",
      "green" : "1.000",
      "red" : "1.000"
    }
  },
  "idiom" : "universal"
}

export const DarkAppearanceEntry = {
  "appearances" : [
    {
      "appearance" : "luminosity",
      "value" : "dark"
    }
  ]
}

export const FolderContentsEntry = {
  "info" : {
    "author" : "xcode-color-asset-exporter",
    "version" : 1
  }
}

// Folder Contents.json
let folderContentsJSON = JSON.stringify(FolderContentsEntry, null, 2);
export default folderContentsJSON;