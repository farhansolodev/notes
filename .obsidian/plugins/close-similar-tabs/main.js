/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CST
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// node_modules/monkey-around/mjs/index.js
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const original = obj[method], hadOwn = obj.hasOwnProperty(method);
  let current = createWrapper(original);
  if (original)
    Object.setPrototypeOf(current, original);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, original || Function);
  }
}

// src/logs.ts
function debug(...args) {
  args.forEach((arg) => {
    if (typeof arg === "string") {
      console.debug(arg);
    } else {
      const variableName = Object.keys(arg)[0];
      console.debug(`${variableName}: ${arg[variableName]}`);
    }
  });
}

// src/settings.ts
var import_obsidian = require("obsidian");
var CSTSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h1", { text: "Close Similar Tabs" });
    const content = `
		<p>
		Repository: \u{1F334} <a href="https://github.com/1C0D/Obsidian-Close-Similar-Tabs">1C0D/Obsidian-Close-Similar-Tabs</a> \u{1F334}
		</p>
		`;
    containerEl.createDiv("", (el) => {
      el.innerHTML = content;
    });
    new import_obsidian.Setting(containerEl).setName("Quick switch").setDesc("Enable/disable Close Similar Tabs").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.switch).onChange((value) => {
        this.plugin.settings.switch = value;
        this.plugin.saveSettings();
        const message = this.plugin.settings.switch ? "Close similar tabs ON" : "Close similar tabs OFF";
        new import_obsidian.Notice(`${message}`);
      });
    });
    new import_obsidian.Setting(containerEl).setName("Close by window").setDesc(
      "Select whether the plugin will only close similar tabs within the same window, or throughout all open windows."
    ).addDropdown((dropdown) => {
      dropdown.addOptions({
        current: "Current window only",
        all: "All windows"
      }).setValue(this.plugin.settings.byWindow).onChange(async (value) => {
        if (value === "all" || value === "current") {
          this.plugin.settings.byWindow = value;
          this.plugin.saveSettings();
        }
      });
    });
    containerEl.createEl("p", {
      text: `options about not having several empty tabs and pinned tabs are getting back soon`
    });
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  byWindow: "current",
  switch: true
};
var CST = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    await this.saveSettings();
    this.addSettingTab(new CSTSettingsTab(this.app, this));
    this.link = false;
    const { openLinkPatched, openFilePatched } = this.openLinkWrapper(this);
    this.register(openLinkPatched);
    this.register(openFilePatched);
    this.addCommand({
      id: "quick-switch",
      name: "Switch",
      callback: async () => {
        this.settings.switch = !this.settings.switch;
        const message = this.settings.switch ? "Close similar tabs ON" : "Close similar tabs OFF";
        new import_obsidian2.Notice(`${message}`);
        await this.saveSettings();
      }
    });
  }
  openLinkWrapper(plugin) {
    const openLinkPatched = around(import_obsidian2.Workspace.prototype, {
      openLinkText(oldOpenLinkText) {
        return async function(...args) {
          if (!plugin.settings.switch) {
            oldOpenLinkText.apply(this, args);
            return;
          }
          console.debug("Open Link");
          plugin.link = true;
          setTimeout(async () => {
            plugin.link = false;
          }, 400);
          debug({ args });
          let result;
          let [linktext, sourcePath, newLeaf, OpenViewState] = args;
          if (linktext == null ? void 0 : linktext.includes(
            sourcePath.split(".").slice(0, -1).join(".")
          )) {
            newLeaf = false;
            oldOpenLinkText.apply(this, [
              linktext,
              sourcePath,
              newLeaf,
              OpenViewState
            ]);
            result = 1;
          } else {
            const activeLeaf = plugin.getActiveLeaf();
            const {
              isMainWindow: isMainWindowActive,
              rootSplit: rootSplitActive,
              el: activeEl
            } = plugin.getLeafProperties(activeLeaf);
            if (!rootSplitActive && isMainWindowActive)
              return;
            result = plugin.iterate(
              plugin,
              activeEl,
              linktext,
              newLeaf
            );
          }
          if (!result) {
            oldOpenLinkText.apply(this, args);
          }
          return;
        };
      }
    });
    const openFilePatched = around(import_obsidian2.WorkspaceLeaf.prototype, {
      //@ts-ignore
      openFile(oldOpenFile) {
        return function(...args) {
          if (!plugin.settings.switch) {
            oldOpenFile.apply(this, args);
            return;
          }
          console.debug("Open File");
          console.log(...args);
          const [file, openState] = args;
          let result;
          if (!plugin.link) {
            const activeLeaf = plugin.getActiveLeaf();
            const {
              isMainWindow: isMainWindowActive,
              rootSplit: rootSplitActive,
              el: activeEl
            } = plugin.getLeafProperties(activeLeaf);
            if (!rootSplitActive && isMainWindowActive)
              return;
            result = plugin.iterate(plugin, activeEl, file.path);
          }
          if (!result) {
            oldOpenFile && oldOpenFile.apply(this, args);
          }
          return;
        };
      }
    });
    return {
      openLinkPatched,
      openFilePatched
    };
  }
  delActive() {
    const activeLeaf = this.getActiveLeaf();
    activeLeaf == null ? void 0 : activeLeaf.detach();
  }
  getActiveLeaf() {
    return app.workspace.getLeaf();
  }
  getLeafProperties(leaf, notActive = false) {
    const isMainWindow = leaf.view.containerEl.win === window;
    const rootSplit = leaf.getRoot() === this.app.workspace.rootSplit;
    const el = leaf.parentSplit.containerEl;
    if (notActive) {
      const isSameWindow = leaf.view.containerEl.win == activeWindow;
      return { isMainWindow, rootSplit, el, isSameWindow };
    }
    return { isMainWindow, rootSplit, el };
  }
  iterate(plugin, activeEl, target, newLeaf) {
    let result;
    app.workspace.iterateAllLeaves((leaf) => {
      var _a, _b;
      const {
        isMainWindow: isMainWindowDupli,
        rootSplit: rootSplitDupli,
        el: dupliEl,
        isSameWindow: isSameWindowDupli
      } = this.getLeafProperties(leaf, true);
      if (isMainWindowDupli && !rootSplitDupli || //not sidebars
      isSameWindowDupli && activeEl != dupliEl || //split window
      !isSameWindowDupli && this.settings.byWindow === "current") {
        return;
      }
      const viewState = leaf.getViewState();
      if ((_b = (_a = viewState.state) == null ? void 0 : _a.file) == null ? void 0 : _b.includes(target)) {
        if (!newLeaf)
          plugin.delActive();
        const cursPos = leaf.getEphemeralState();
        app.workspace.setActiveLeaf(leaf);
        leaf.setEphemeralState(cursPos);
        result = 1;
      }
    });
    return result;
  }
  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAibm9kZV9tb2R1bGVzL21vbmtleS1hcm91bmQvbWpzL2luZGV4LmpzIiwgInNyYy9sb2dzLnRzIiwgInNyYy9zZXR0aW5ncy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIFdvcmtzcGFjZSwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBhcm91bmQgfSBmcm9tIFwibW9ua2V5LWFyb3VuZFwiO1xyXG5pbXBvcnQgeyBkZWJ1ZyB9IGZyb20gXCIuL2xvZ3NcIjtcclxuaW1wb3J0IHsgQ1NUU2V0dGluZ3NUYWIgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBhcHAge1xyXG5cdFx0d29ya3NwYWNlOiBXb3Jrc3BhY2U7XHJcblx0fVxyXG59XHJcblxyXG5pbnRlcmZhY2UgQ1NUU2V0dGluZ3Mge1xyXG5cdGJ5V2luZG93OiBcImN1cnJlbnRcIiB8IFwiYWxsXCI7XHJcblx0c3dpdGNoOiBib29sZWFuO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBDU1RTZXR0aW5ncyA9IHtcclxuXHRieVdpbmRvdzogXCJjdXJyZW50XCIsXHJcblx0c3dpdGNoOiB0cnVlLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NUIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRzZXR0aW5nczogQ1NUU2V0dGluZ3M7XHJcblx0bGluazogYm9vbGVhbjtcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IENTVFNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XHJcblx0XHR0aGlzLmxpbmsgPSBmYWxzZTtcclxuXHRcdGNvbnN0IHsgb3BlbkxpbmtQYXRjaGVkLCBvcGVuRmlsZVBhdGNoZWQgfSA9IHRoaXMub3BlbkxpbmtXcmFwcGVyKHRoaXMpO1xyXG5cdFx0dGhpcy5yZWdpc3RlcihvcGVuTGlua1BhdGNoZWQpO1xyXG5cdFx0dGhpcy5yZWdpc3RlcihvcGVuRmlsZVBhdGNoZWQpO1xyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6IFwicXVpY2stc3dpdGNoXCIsXHJcblx0XHRcdG5hbWU6IFwiU3dpdGNoXCIsXHJcblx0XHRcdGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zd2l0Y2ggPSAhdGhpcy5zZXR0aW5ncy5zd2l0Y2g7XHJcblx0XHRcdFx0Y29uc3QgbWVzc2FnZSA9IHRoaXMuc2V0dGluZ3Muc3dpdGNoXHJcblx0XHRcdFx0XHQ/IFwiQ2xvc2Ugc2ltaWxhciB0YWJzIE9OXCJcclxuXHRcdFx0XHRcdDogXCJDbG9zZSBzaW1pbGFyIHRhYnMgT0ZGXCI7XHJcblx0XHRcdFx0bmV3IE5vdGljZShgJHttZXNzYWdlfWApO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9wZW5MaW5rV3JhcHBlcihwbHVnaW46IENTVCkge1xyXG5cdFx0Y29uc3Qgb3BlbkxpbmtQYXRjaGVkID0gYXJvdW5kKFdvcmtzcGFjZS5wcm90b3R5cGUsIHtcclxuXHRcdFx0b3BlbkxpbmtUZXh0KG9sZE9wZW5MaW5rVGV4dCkge1xyXG5cdFx0XHRcdHJldHVybiBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xyXG5cdFx0XHRcdFx0aWYgKCFwbHVnaW4uc2V0dGluZ3Muc3dpdGNoKSB7XHJcblx0XHRcdFx0XHRcdG9sZE9wZW5MaW5rVGV4dC5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcIk9wZW4gTGlua1wiKTtcclxuXHRcdFx0XHRcdHBsdWdpbi5saW5rID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4ubGluayA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSwgNDAwKTtcclxuXHRcdFx0XHRcdGRlYnVnKHsgYXJncyB9KTsgLy9hcmdzOiAyMDIzLTExLTA1LDIwMjMtMTEtMTkubWQsdGFiXHJcblx0XHRcdFx0XHRsZXQgcmVzdWx0O1xyXG5cdFx0XHRcdFx0bGV0IFtsaW5rdGV4dCwgc291cmNlUGF0aCwgbmV3TGVhZiwgT3BlblZpZXdTdGF0ZV0gPSBhcmdzO1xyXG5cclxuXHRcdFx0XHRcdC8vIHx8IGN0cmwgbGluayB0byB0aGUgc2FtZSBwYWdlXHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdGxpbmt0ZXh0Py5pbmNsdWRlcyhcclxuXHRcdFx0XHRcdFx0XHRzb3VyY2VQYXRoLnNwbGl0KFwiLlwiKS5zbGljZSgwLCAtMSkuam9pbihcIi5cIilcclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdG5ld0xlYWYgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0b2xkT3BlbkxpbmtUZXh0LmFwcGx5KHRoaXMsIFtcclxuXHRcdFx0XHRcdFx0XHRsaW5rdGV4dCxcclxuXHRcdFx0XHRcdFx0XHRzb3VyY2VQYXRoLFxyXG5cdFx0XHRcdFx0XHRcdG5ld0xlYWYsXHJcblx0XHRcdFx0XHRcdFx0T3BlblZpZXdTdGF0ZSxcclxuXHRcdFx0XHRcdFx0XSk7XHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDE7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBhY3RpdmVMZWFmID0gcGx1Z2luLmdldEFjdGl2ZUxlYWYoKTtcclxuXHRcdFx0XHRcdFx0Y29uc3Qge1xyXG5cdFx0XHRcdFx0XHRcdGlzTWFpbldpbmRvdzogaXNNYWluV2luZG93QWN0aXZlLFxyXG5cdFx0XHRcdFx0XHRcdHJvb3RTcGxpdDogcm9vdFNwbGl0QWN0aXZlLFxyXG5cdFx0XHRcdFx0XHRcdGVsOiBhY3RpdmVFbCxcclxuXHRcdFx0XHRcdFx0fSA9IHBsdWdpbi5nZXRMZWFmUHJvcGVydGllcyhhY3RpdmVMZWFmKTtcclxuXHRcdFx0XHRcdFx0Ly8gYXZvaWQgbGVmdCByaWdodCBzcGxpdHNcclxuXHRcdFx0XHRcdFx0aWYgKCFyb290U3BsaXRBY3RpdmUgJiYgaXNNYWluV2luZG93QWN0aXZlKSByZXR1cm47XHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBsdWdpbi5pdGVyYXRlKFxyXG5cdFx0XHRcdFx0XHRcdHBsdWdpbixcclxuXHRcdFx0XHRcdFx0XHRhY3RpdmVFbCxcclxuXHRcdFx0XHRcdFx0XHRsaW5rdGV4dCxcclxuXHRcdFx0XHRcdFx0XHRuZXdMZWFmIGFzIGJvb2xlYW5cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoIXJlc3VsdCkge1xyXG5cdFx0XHRcdFx0XHRvbGRPcGVuTGlua1RleHQuYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IG9wZW5GaWxlUGF0Y2hlZCA9IGFyb3VuZChXb3Jrc3BhY2VMZWFmLnByb3RvdHlwZSwge1xyXG5cdFx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdFx0b3BlbkZpbGUob2xkT3BlbkZpbGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuXHRcdFx0XHRcdGlmICghcGx1Z2luLnNldHRpbmdzLnN3aXRjaCkge1xyXG5cdFx0XHRcdFx0XHRvbGRPcGVuRmlsZS5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcIk9wZW4gRmlsZVwiKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xyXG5cdFx0XHRcdFx0Y29uc3QgW2ZpbGUsIG9wZW5TdGF0ZV0gPSBhcmdzO1xyXG5cdFx0XHRcdFx0bGV0IHJlc3VsdDtcclxuXHRcdFx0XHRcdGlmICghcGx1Z2luLmxpbmspIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgYWN0aXZlTGVhZiA9IHBsdWdpbi5nZXRBY3RpdmVMZWFmKCk7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHtcclxuXHRcdFx0XHRcdFx0XHRpc01haW5XaW5kb3c6IGlzTWFpbldpbmRvd0FjdGl2ZSxcclxuXHRcdFx0XHRcdFx0XHRyb290U3BsaXQ6IHJvb3RTcGxpdEFjdGl2ZSxcclxuXHRcdFx0XHRcdFx0XHRlbDogYWN0aXZlRWwsXHJcblx0XHRcdFx0XHRcdH0gPSBwbHVnaW4uZ2V0TGVhZlByb3BlcnRpZXMoYWN0aXZlTGVhZik7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIXJvb3RTcGxpdEFjdGl2ZSAmJiBpc01haW5XaW5kb3dBY3RpdmUpIHJldHVybjtcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcGx1Z2luLml0ZXJhdGUocGx1Z2luLCBhY3RpdmVFbCwgZmlsZS5wYXRoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBjdHJsIGxpbmsgdG8gdGhlIHNhbWUgcGFnZVxyXG5cdFx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0b2xkT3BlbkZpbGUgJiYgb2xkT3BlbkZpbGUuYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0b3BlbkxpbmtQYXRjaGVkLFxyXG5cdFx0XHRvcGVuRmlsZVBhdGNoZWQsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZGVsQWN0aXZlKCkge1xyXG5cdFx0Y29uc3QgYWN0aXZlTGVhZiA9IHRoaXMuZ2V0QWN0aXZlTGVhZigpO1xyXG5cdFx0YWN0aXZlTGVhZj8uZGV0YWNoKCk7XHJcblx0fVxyXG5cclxuXHRnZXRBY3RpdmVMZWFmKCkge1xyXG5cdFx0cmV0dXJuIGFwcC53b3Jrc3BhY2UuZ2V0TGVhZigpO1xyXG5cdH1cclxuXHJcblx0Z2V0TGVhZlByb3BlcnRpZXMoXHJcblx0XHRsZWFmOiBXb3Jrc3BhY2VMZWFmIHwgbnVsbCxcclxuXHRcdG5vdEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0KToge1xyXG5cdFx0aXNNYWluV2luZG93OiBib29sZWFuO1xyXG5cdFx0cm9vdFNwbGl0OiBib29sZWFuO1xyXG5cdFx0ZWw6IEhUTUxFbGVtZW50O1xyXG5cdFx0aXNTYW1lV2luZG93PzogYm9vbGVhbjtcclxuXHR9IHtcclxuXHRcdGNvbnN0IGlzTWFpbldpbmRvdyA9IGxlYWYhLnZpZXcuY29udGFpbmVyRWwud2luID09PSB3aW5kb3c7XHJcblx0XHRjb25zdCByb290U3BsaXQgPSBsZWFmIS5nZXRSb290KCkgPT09IHRoaXMuYXBwLndvcmtzcGFjZS5yb290U3BsaXQ7XHJcblx0XHRjb25zdCBlbCA9IChsZWFmIGFzIGFueSkhLnBhcmVudFNwbGl0LmNvbnRhaW5lckVsO1xyXG5cdFx0aWYgKG5vdEFjdGl2ZSkge1xyXG5cdFx0XHRjb25zdCBpc1NhbWVXaW5kb3cgPSBsZWFmIS52aWV3LmNvbnRhaW5lckVsLndpbiA9PSBhY3RpdmVXaW5kb3c7XHJcblx0XHRcdHJldHVybiB7IGlzTWFpbldpbmRvdywgcm9vdFNwbGl0LCBlbCwgaXNTYW1lV2luZG93IH07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geyBpc01haW5XaW5kb3csIHJvb3RTcGxpdCwgZWwgfTtcclxuXHR9XHJcblxyXG5cdGl0ZXJhdGUoXHJcblx0XHRwbHVnaW46IENTVCxcclxuXHRcdGFjdGl2ZUVsOiBIVE1MRWxlbWVudCxcclxuXHRcdHRhcmdldDogc3RyaW5nLFxyXG5cdFx0bmV3TGVhZj86IGJvb2xlYW5cclxuXHQpIHtcclxuXHRcdGxldCByZXN1bHQ7XHJcblx0XHRhcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMoKGxlYWYpID0+IHtcclxuXHRcdFx0Y29uc3Qge1xyXG5cdFx0XHRcdGlzTWFpbldpbmRvdzogaXNNYWluV2luZG93RHVwbGksXHJcblx0XHRcdFx0cm9vdFNwbGl0OiByb290U3BsaXREdXBsaSxcclxuXHRcdFx0XHRlbDogZHVwbGlFbCxcclxuXHRcdFx0XHRpc1NhbWVXaW5kb3c6IGlzU2FtZVdpbmRvd0R1cGxpLFxyXG5cdFx0XHR9ID0gdGhpcy5nZXRMZWFmUHJvcGVydGllcyhsZWFmLCB0cnVlKTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdChpc01haW5XaW5kb3dEdXBsaSAmJiAhcm9vdFNwbGl0RHVwbGkpIHx8IC8vbm90IHNpZGViYXJzXHJcblx0XHRcdFx0KGlzU2FtZVdpbmRvd0R1cGxpICYmIGFjdGl2ZUVsICE9IGR1cGxpRWwpIHx8IC8vc3BsaXQgd2luZG93XHJcblx0XHRcdFx0KCFpc1NhbWVXaW5kb3dEdXBsaSAmJiB0aGlzLnNldHRpbmdzLmJ5V2luZG93ID09PSBcImN1cnJlbnRcIikgLy9ub3Qgc2FtZSB3aW5kb3dcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHZpZXdTdGF0ZSA9IGxlYWYuZ2V0Vmlld1N0YXRlKCk7XHJcblx0XHRcdGlmICh2aWV3U3RhdGUuc3RhdGU/LmZpbGU/LmluY2x1ZGVzKHRhcmdldCkpIHtcclxuXHRcdFx0XHRpZiAoIW5ld0xlYWYpIHBsdWdpbi5kZWxBY3RpdmUoKTtcclxuXHRcdFx0XHRjb25zdCBjdXJzUG9zID0gbGVhZi5nZXRFcGhlbWVyYWxTdGF0ZSgpOyAvL2V4aXN0aW5nIGxlYWYgY3Vyc29yIHBvc1xyXG5cdFx0XHRcdGFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihsZWFmKTtcclxuXHRcdFx0XHRsZWFmLnNldEVwaGVtZXJhbFN0YXRlKGN1cnNQb3MpO1xyXG5cdFx0XHRcdHJlc3VsdCA9IDE7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfU0VUVElOR1MsIC4uLihhd2FpdCB0aGlzLmxvYWREYXRhKCkpIH07XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxufVxyXG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGFyb3VuZChvYmosIGZhY3Rvcmllcykge1xuICAgIGNvbnN0IHJlbW92ZXJzID0gT2JqZWN0LmtleXMoZmFjdG9yaWVzKS5tYXAoa2V5ID0+IGFyb3VuZDEob2JqLCBrZXksIGZhY3Rvcmllc1trZXldKSk7XG4gICAgcmV0dXJuIHJlbW92ZXJzLmxlbmd0aCA9PT0gMSA/IHJlbW92ZXJzWzBdIDogZnVuY3Rpb24gKCkgeyByZW1vdmVycy5mb3JFYWNoKHIgPT4gcigpKTsgfTtcbn1cbmZ1bmN0aW9uIGFyb3VuZDEob2JqLCBtZXRob2QsIGNyZWF0ZVdyYXBwZXIpIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IG9ialttZXRob2RdLCBoYWRPd24gPSBvYmouaGFzT3duUHJvcGVydHkobWV0aG9kKTtcbiAgICBsZXQgY3VycmVudCA9IGNyZWF0ZVdyYXBwZXIob3JpZ2luYWwpO1xuICAgIC8vIExldCBvdXIgd3JhcHBlciBpbmhlcml0IHN0YXRpYyBwcm9wcyBmcm9tIHRoZSB3cmFwcGluZyBtZXRob2QsXG4gICAgLy8gYW5kIHRoZSB3cmFwcGluZyBtZXRob2QsIHByb3BzIGZyb20gdGhlIG9yaWdpbmFsIG1ldGhvZFxuICAgIGlmIChvcmlnaW5hbClcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGN1cnJlbnQsIG9yaWdpbmFsKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yod3JhcHBlciwgY3VycmVudCk7XG4gICAgb2JqW21ldGhvZF0gPSB3cmFwcGVyO1xuICAgIC8vIFJldHVybiBhIGNhbGxiYWNrIHRvIGFsbG93IHNhZmUgcmVtb3ZhbFxuICAgIHJldHVybiByZW1vdmU7XG4gICAgZnVuY3Rpb24gd3JhcHBlciguLi5hcmdzKSB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYmVlbiBkZWFjdGl2YXRlZCBhbmQgYXJlIG5vIGxvbmdlciB3cmFwcGVkLCByZW1vdmUgb3Vyc2VsdmVzXG4gICAgICAgIGlmIChjdXJyZW50ID09PSBvcmlnaW5hbCAmJiBvYmpbbWV0aG9kXSA9PT0gd3JhcHBlcilcbiAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gY3VycmVudC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAvLyBJZiBubyBvdGhlciBwYXRjaGVzLCBqdXN0IGRvIGEgZGlyZWN0IHJlbW92YWxcbiAgICAgICAgaWYgKG9ialttZXRob2RdID09PSB3cmFwcGVyKSB7XG4gICAgICAgICAgICBpZiAoaGFkT3duKVxuICAgICAgICAgICAgICAgIG9ialttZXRob2RdID0gb3JpZ2luYWw7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ialttZXRob2RdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBvcmlnaW5hbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gRWxzZSBwYXNzIGZ1dHVyZSBjYWxscyB0aHJvdWdoLCBhbmQgcmVtb3ZlIHdyYXBwZXIgZnJvbSB0aGUgcHJvdG90eXBlIGNoYWluXG4gICAgICAgIGN1cnJlbnQgPSBvcmlnaW5hbDtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHdyYXBwZXIsIG9yaWdpbmFsIHx8IEZ1bmN0aW9uKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZGVkdXBlKGtleSwgb2xkRm4sIG5ld0ZuKSB7XG4gICAgY2hlY2tba2V5XSA9IGtleTtcbiAgICByZXR1cm4gY2hlY2s7XG4gICAgZnVuY3Rpb24gY2hlY2soLi4uYXJncykge1xuICAgICAgICByZXR1cm4gKG9sZEZuW2tleV0gPT09IGtleSA/IG9sZEZuIDogbmV3Rm4pLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhZnRlcihwcm9taXNlLCBjYikge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4oY2IsIGNiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoYXN5bmNGdW5jdGlvbikge1xuICAgIGxldCBsYXN0UnVuID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgZnVuY3Rpb24gd3JhcHBlciguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBsYXN0UnVuID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICBhZnRlcihsYXN0UnVuLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXN5bmNGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKS50aGVuKHJlcywgcmVqKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd3JhcHBlci5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxhc3RSdW4gPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHsgYWZ0ZXIobGFzdFJ1biwgcmVzKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gbG9nKC4uLmFyZ3M6IGFueVtdKSB7XHJcblx0YXJncy5mb3JFYWNoKChhcmcpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFyZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YXJpYWJsZU5hbWUgPSBPYmplY3Qua2V5cyhhcmcpWzBdO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgJHt2YXJpYWJsZU5hbWV9OiAke2FyZ1t2YXJpYWJsZU5hbWVdfWApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVidWcoLi4uYXJnczogYW55W10pIHtcclxuXHRhcmdzLmZvckVhY2goKGFyZykgPT4ge1xyXG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhhcmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgdmFyaWFibGVOYW1lID0gT2JqZWN0LmtleXMoYXJnKVswXTtcclxuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgJHt2YXJpYWJsZU5hbWV9OiAke2FyZ1t2YXJpYWJsZU5hbWVdfWApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiIsICJpbXBvcnQgeyBBcHAsIE5vdGljZSwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgTXlQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENTVFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHB1YmxpYyBwbHVnaW46IE15UGx1Z2luKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDFcIiwgeyB0ZXh0OiBcIkNsb3NlIFNpbWlsYXIgVGFic1wiIH0pO1xyXG5cdFx0Y29uc3QgY29udGVudCA9IGBcclxuXHRcdDxwPlxyXG5cdFx0UmVwb3NpdG9yeTogXHVEODNDXHVERjM0IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vMUMwRC9PYnNpZGlhbi1DbG9zZS1TaW1pbGFyLVRhYnNcIj4xQzBEL09ic2lkaWFuLUNsb3NlLVNpbWlsYXItVGFiczwvYT4gXHVEODNDXHVERjM0XHJcblx0XHQ8L3A+XHJcblx0XHRgO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZURpdihcIlwiLCAoZWw6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcblx0XHRcdGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoXCJRdWljayBzd2l0Y2hcIilcclxuXHRcdFx0LnNldERlc2MoXCJFbmFibGUvZGlzYWJsZSBDbG9zZSBTaW1pbGFyIFRhYnNcIilcclxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XHJcblx0XHRcdFx0dG9nZ2xlXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3dpdGNoKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zd2l0Y2ggPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zd2l0Y2hcclxuXHRcdFx0XHRcdFx0XHQ/IFwiQ2xvc2Ugc2ltaWxhciB0YWJzIE9OXCJcclxuXHRcdFx0XHRcdFx0XHQ6IFwiQ2xvc2Ugc2ltaWxhciB0YWJzIE9GRlwiO1xyXG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGAke21lc3NhZ2V9YCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKFwiQ2xvc2UgYnkgd2luZG93XCIpXHJcblx0XHRcdC5zZXREZXNjKFxyXG5cdFx0XHRcdFwiU2VsZWN0IHdoZXRoZXIgdGhlIHBsdWdpbiB3aWxsIG9ubHkgY2xvc2Ugc2ltaWxhciB0YWJzIHdpdGhpbiB0aGUgc2FtZSB3aW5kb3csIG9yIHRocm91Z2hvdXQgYWxsIG9wZW4gd2luZG93cy5cIlxyXG5cdFx0XHQpXHJcblx0XHRcdC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcclxuXHRcdFx0XHRkcm9wZG93blxyXG5cdFx0XHRcdFx0LmFkZE9wdGlvbnMoe1xyXG5cdFx0XHRcdFx0XHRjdXJyZW50OiBcIkN1cnJlbnQgd2luZG93IG9ubHlcIixcclxuXHRcdFx0XHRcdFx0YWxsOiBcIkFsbCB3aW5kb3dzXCIsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmJ5V2luZG93KVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gXCJhbGxcIiB8fCB2YWx1ZSA9PT0gXCJjdXJyZW50XCIpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5ieVdpbmRvdyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJwXCIsIHtcclxuXHRcdFx0dGV4dDogYG9wdGlvbnMgYWJvdXQgbm90IGhhdmluZyBzZXZlcmFsIGVtcHR5IHRhYnMgYW5kIHBpbm5lZCB0YWJzIGFyZSBnZXR0aW5nIGJhY2sgc29vbmAsXHJcblx0XHR9KTtcclxuXHR9XHJcbn1c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
