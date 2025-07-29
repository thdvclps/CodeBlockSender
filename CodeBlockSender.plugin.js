/**
 * @name CodeBlockSender
 * @author thdvclps
 * @version 1.0.0
 * @description Automatically wraps your messages in codeblocks. Toggle on/off via chat button.
 * @source https://github.com/thdvclps/codeblocksender
 * @updateUrl https://github.com/thdvclps/codeblocksender/raw/main/CodeBlockSender.plugin.js
 */

module.exports = (() => {
    const config = {
        info: {
            name: "CodeBlockSender",
            authors: [{ name: "Thiago", github_username: "thdvclps" }],
            version: "1.0.0",
            description: "Automatically wraps messages in codeblocks with a toggle button.",
        },
        defaultConfig: [],
        changelog: [],
        main: "index.js"
    };

    return !global.ZeresPluginLibrary ? class {
        load() {
            BdApi.showConfirmationModal(
                "Missing Library",
                `The plugin "${config.info.name}" requires ZeresPluginLibrary. Please click "Download Now" to install it.`,
                {
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (err, res, body) => {
                            if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                            await BdApi.Plugins.install("ZeresPluginLibrary", body);
                        });
                    }
                }
            );
        }
        start() {}
        stop() {}
    } : (([Plugin, Library]) => {
        const { Patcher, WebpackModules, PluginUtilities, Toasts } = Library;

        return class CodeBlockSender extends Plugin {
            constructor() {
                super();
                this.pluginName = config.info.name;
                this.settingsKey = "codeblock-enabled";
                this.interval = null;
            }

            onStart() {
                this.enabled = PluginUtilities.loadData(this.pluginName, this.settingsKey) ?? true;
                this.patchSendMessage();
                this.injectToggleButton();
            }

            onStop() {
                this.removeToggleButton();
                Patcher.unpatchAll(this.pluginName);
            }

            patchSendMessage() {
                const MessageEvents = WebpackModules.getByProps("sendMessage");

                Patcher.before(this.pluginName, MessageEvents, "sendMessage", (_, [, msg]) => {
                    if (!this.enabled) return;
                    if (!msg.content.startsWith("```")) {
                        msg.content = `\`\`\`\n${msg.content}\n\`\`\``;
                    }
                });
            }

            injectToggleButton() {
                const getTextarea = () => document.querySelector("[class*='textArea']");

                const createButton = () => {
                    const btn = document.createElement("button");
                    btn.innerText = "</>";
                    btn.style = `
                        margin-left: 8px;
                        padding: 4px 8px;
                        border-radius: 4px;
                        background-color: ${this.enabled ? "#5865f2" : "#4f545c"};
                        color: white;
                        border: none;
                        cursor: pointer;
                        font-size: 12px;
                    `;
                    btn.title = "Toggle codeblock sender";
                    btn.onclick = () => {
                        this.enabled = !this.enabled;
                        btn.style.backgroundColor = this.enabled ? "#5865f2" : "#4f545c";
                        PluginUtilities.saveData(this.pluginName, this.settingsKey, this.enabled);
                        Toasts.show(`CodeBlockSender ${this.enabled ? "enabled" : "disabled"}`, { type: "info" });
                    };
                    btn.id = "codeblock-toggle-btn";
                    return btn;
                };

                const tryInject = () => {
                    const container = getTextarea();
                    if (!container || document.getElementById("codeblock-toggle-btn")) return;

                    const btn = createButton();
                    container.appendChild(btn);
                };

                this.interval = setInterval(tryInject, 1000);
            }

            removeToggleButton() {
                clearInterval(this.interval);
                const btn = document.getElementById("codeblock-toggle-btn");
                if (btn) btn.remove();
            }
        };
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
