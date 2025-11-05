# 🎨 Neovide 配置说明

## ✅ 已完成的配置

### 1. 字体设置
- **字体**: JetBrainsMono Nerd Font Mono
- **大小**: 16（可以根据需要调整）
- **位置**: `~/.config/nvim/lua/config/neovide.lua` 第2行

### 2. 暗色主题
- **主题**: TokyoNight Night（最深的暗色变体）
- **特点**: 深色背景，高对比度，护眼
- **位置**: `~/.config/nvim/lua/plugins/theme.lua`

### 3. 其他优化
- 透明度调整为 0.95（更清晰）
- 记住窗口大小
- 优化了刷新率设置
- 添加了 Cmd+C 复制快捷键

---

## 🔄 如何应用配置

重启 Neovide 或在 Neovide 中执行：
```vim
:source ~/.config/nvim/init.lua
```

---

## ⚙️ 个性化调整

### 调整字体大小

编辑 `~/.config/nvim/lua/config/neovide.lua` 第2行：

```lua
vim.o.guifont = "JetBrainsMono Nerd Font Mono:h16"
                                              ↑
                                           改这里的数字
```

**推荐大小**：
- `h12` - 小号（适合大屏幕）
- `h14` - 中号（平衡）
- `h16` - 大号（当前设置，舒适阅读）
- `h18` - 特大号（高分辨率屏幕）
- `h20` - 超大号

### 调整透明度

编辑 `~/.config/nvim/lua/config/neovide.lua` 第18行：

```lua
vim.g.neovide_opacity = 0.95  -- 0.0 完全透明, 1.0 完全不透明
```

**推荐值**：
- `1.0` - 完全不透明（最清晰）
- `0.95` - 几乎不透明（当前设置）
- `0.9` - 轻微透明
- `0.8` - 中等透明

### 切换主题风格

TokyoNight 有三种暗色风格，编辑 `~/.config/nvim/lua/plugins/theme.lua` 第11行：

```lua
style = "night",  -- 可选: "storm", "moon", "night"
```

**风格对比**：
- `night` - 最深暗色（当前设置，纯黑背景）
- `storm` - 中等暗色（深蓝灰背景）
- `moon` - 柔和暗色（深紫灰背景）

### 更换字体

如果想使用其他字体，编辑 `~/.config/nvim/lua/config/neovide.lua` 第2行：

**系统中可用的等宽字体**：
```lua
vim.o.guifont = "JetBrainsMono Nerd Font Mono:h16"  -- 当前
vim.o.guifont = "SF Mono:h16"                        -- macOS 系统字体
vim.o.guifont = "Andale Mono:h16"                    -- 经典等宽字体
```

---

## 🎯 其他可选配置

### 全屏启动

在 `~/.config/nvim/lua/config/neovide.lua` 添加：

```lua
vim.g.neovide_fullscreen = true
```

### 调整行间距

```lua
vim.o.linespace = 2  -- 增加行间距（像素）
```

### 禁用光标动画

如果觉得光标动画太花哨：

```lua
vim.g.neovide_cursor_animation_length = 0.0  -- 禁用动画
vim.g.neovide_cursor_trail_length = 0.0      -- 禁用拖尾
```

### 调整窗口边距（padding）

如果想要更多呼吸空间：

```lua
vim.g.neovide_padding_top = 10
vim.g.neovide_padding_bottom = 10
vim.g.neovide_padding_right = 10
vim.g.neovide_padding_left = 10
```

---

## 📍 配置文件位置总览

```
~/.config/nvim/
├── init.lua                      # 主配置入口
├── lua/
│   ├── config/
│   │   ├── neovide.lua          # ✅ Neovide 专用配置
│   │   ├── options.lua          # Neovim 选项
│   │   └── keymaps.lua          # 快捷键映射
│   └── plugins/
│       └── theme.lua            # ✅ 主题配置
```

---

## 🚀 快捷键提醒

### macOS 专用快捷键（已配置）

- `Cmd + V` - 粘贴（Normal 和 Insert 模式）
- `Cmd + C` - 复制（Visual 模式）

### Neovide 内置快捷键

- `Cmd + =` - 放大字体
- `Cmd + -` - 缩小字体
- `Cmd + 0` - 重置字体大小

---

## 🎨 主题预览

### TokyoNight Night (当前主题)

**特点**：
- 深邃的黑色背景 (#1a1b26)
- 高对比度
- 护眼且专业
- 语法高亮色彩丰富

**适合场景**：
- 长时间编程
- 夜间工作
- 喜欢纯黑背景

---

## 💡 小贴士

1. **字体太小看不清？**
   - 将 `h16` 改为 `h18` 或 `h20`

2. **主题不够黑？**
   - 确保使用 `style = "night"`
   - 将透明度设为 `1.0`

3. **想要更多主题选择？**
   - Catppuccin Mocha（柔和暗色）
   - Gruvbox Dark（复古暗色）
   - Nord（冷色调暗色）
   - OneDark（VS Code 风格）

4. **配置不生效？**
   - 重启 Neovide
   - 或在 Neovide 中执行 `:source ~/.config/nvim/init.lua`

5. **想恢复默认配置？**
   - 备份在 `~/.config/nvim/` 的配置文件
   - 删除相关配置行即可

---

## 📸 效果预览

重启 Neovide 后，你将看到：

✅ 更大更清晰的字体（16号）
✅ 深邃的暗色主题（TokyoNight Night）
✅ 优化的透明度和对比度
✅ 流畅的光标动画
✅ 专业的编程体验

---

## 🆘 遇到问题？

### 字体不显示？

检查字体是否安装：
```bash
fc-list | grep -i jetbrains
```

如果没有，使用 Homebrew 安装：
```bash
brew tap homebrew/cask-fonts
brew install --cask font-jetbrains-mono-nerd-font
```

### 主题颜色异常？

确保 TokyoNight 插件已安装，在 Neovide 中执行：
```vim
:Lazy sync
```

### 配置文件位置错误？

确认配置文件路径：
```bash
ls -la ~/.config/nvim/lua/config/neovide.lua
ls -la ~/.config/nvim/lua/plugins/theme.lua
```

---

**配置完成！享受舒适的编程体验！** 🎉
