# CodeBlockSender

Automatically wraps all your Discord messages in code blocks (` ``` `) with a simple toggle button. Built for BetterDiscord using the official plugin API and ZeresPluginLibrary.

## ✨ Features

- ✅ Automatically transforms sent messages into code blocks
- 🔘 Toggle on/off directly from the chat input bar
- 💾 Remembers your toggle state even after restarting Discord
- 💬 Minimal and non-intrusive UI
- 🧱 Clean and lightweight plugin using the BetterDiscord recommended structure

## 📦 Installation

1. Download the plugin file: `CodeBlockSender.plugin.js`
2. Place it into your BetterDiscord plugins folder:

   ```
   Windows: %appdata%\BetterDiscord\plugins\
   MacOS: ~/Library/Application Support/BetterDiscord/plugins/
   ```

3. Enable it in your BetterDiscord Plugin settings.

⚠️ This plugin requires [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9). If it's not installed, the plugin will prompt you to download it on load.

## 🛠️ Usage

- Once enabled, a `</>` button will appear next to your message input.
- When active, any message you send will be wrapped like this:

  ```
  your message here
  ```

- Click the button again to disable code block mode.
- Works in all text channels, DMs, and servers.

## 📁 File Structure

- `CodeBlockSender.plugin.js` – Main plugin file, self-contained
- No external assets or settings panels needed

## 💡 Customization Ideas (coming soon?)

- Language selector (e.g., ` ```js ` or ` ```python `)
- Ignore messages starting with specific characters (e.g., `/`, `!`)
- Support for server/channel-specific toggles
- Auto-disable in specific channels or contexts

## 📜 License

MIT License © YourName

## 🙏 Credits

- Developed using the [BetterDiscord Plugin API](https://docs.betterdiscord.app)
- Powered by [ZeresPluginLibrary](https://github.com/rauenzi/BDPluginLibrary)

## 💬 Questions or suggestions?

Open an issue or PR — contributions are welcome!

> "Because sometimes, every message is code if you believe hard enough." 💻