# Xcode-color-asset-exporter
<a><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/version-1.0.0-green.svg"></a>
<a href="https://choosealicense.com/licenses/mit/"><img src="https://img.shields.io/cocoapods/l/SafeAreaBrush.svg?style=flat"></img></a>

This plugin automatically exports color styles to assets which can be adopted in Xcode project. <br>
Also supports dark appearance colors 🌙.

**NOTE**: It doesn't support gradient colors like Xcode does.

<br>

<img src="https://user-images.githubusercontent.com/63496607/189515936-5e4f36d9-2638-4738-b95a-a3ff41377635.png" width="100%"></img>

<a href="https://www.figma.com/community/plugin/1150751463239037438">Check out on Figma community</a>

<br>
<br>


How to use?
---
**1. Prepare for export** <br>
Rename your color styles with tag wrapped with brackets if you have a dark appearance color. <br>
If you don't get the dark appearance color or if the color doesn't make a pair, this plugin will turn it into an universal asset. <br>

**NOTE**: It doesn't matter what the tag name is, but the tag name has to be same as the others. <br>

e.g
- `BackgroundColor [day]`
- `BackgroundColor [night]`

or

- `BackgroundColor [light]`
- `BackgroundColor [dark]`


<br>

**2. Run the plugin in Figma** <br>
Fill out the tag names with your tag names or just leave them empty if you're using tag names by default `[day]`, `[night]`. <br>


<br>

**3. Create** <br>
Press create button to download `colors.zip` file


<br>

**4. Use in Xcode** <br>
Unzip `colors.zip` file. <br>
Drag and drop `colors` folder in your Xcode Assets tab or copy and paste in `Assets.xcassets` folder directly.


<br>

**5. Enjoy your time ☕️** <br>
Boom! Now you're ready to use color assets in your Xcode Project


<br>

How it works?
---
Each folder includes `Contents.json` which contains folder information.
And each `YourColorName.colorset` folder includes `Contents.json` which contains color information.
So the Xcode could understand where the folder is and what the color is.

<img src="https://user-images.githubusercontent.com/63496607/189515939-daa0af7f-27ca-4c7f-a734-ff263937076f.png" width="100%"></img>

