# 🔴 Markdown 红线完全解决方案

## ✅ 已完成的强化配置

### 1. 完全禁用 Markdown LSP
**文件**: `~/.config/nvim/lua/plugins/markdown.lua`
- ❌ marksman LSP（完全禁用）
- ❌ ltex 语法检查（完全禁用）

### 2. 自动清理脚本
**文件**: `~/.config/nvim/lua/config/markdown-disable.lua`
- 打开 Markdown 文件时自动：
  - 禁用所有诊断
  - 关闭拼写检查
  - 停止 LSP 客户端
  - 清除诊断高亮
  - 清除拼写检查高亮

### 3. 全局拼写检查禁用
**文件**: `~/.config/nvim/lua/config/options.lua`
- 禁用拼写检查
- 清除拼写检查高亮样式

### 4. 手动清理命令
**文件**: `~/.config/nvim/lua/config/markdown-commands.lua`
- 新增命令和快捷键

---

## 🔄 立即应用

### 方法 1：重启 Neovide（推荐）
完全退出 Neovide，然后重新打开。

### 方法 2：重新加载配置
在 Neovide 中执行：
```vim
:source ~/.config/nvim/init.lua
```

### 方法 3：完全清理并重启
在 Neovide 中执行：
```vim
:LspStop
:source ~/.config/nvim/init.lua
```

---

## 🎯 如果还有红线

### 手动清理命令

打开 Markdown 文件后，使用以下任一方法：

#### 方法 1：命令
```vim
:ClearMarkdownDiag
```

#### 方法 2：快捷键
按下：**空格键 + m + d**
```
Space + md
```

#### 方法 3：手动执行
在 Neovide 中执行：
```vim
:set nospell
:lua vim.diagnostic.disable(0)
:LspStop
```

---

## 🔍 检查配置

### 1. 检查 LSP 状态
```vim
:LspInfo
```
应该看到 Markdown 文件没有附加任何 LSP 客户端。

### 2. 检查诊断状态
```vim
:lua print(vim.diagnostic.is_disabled(0))
```
应该显示 `true`（已禁用）。

### 3. 检查拼写检查
```vim
:set spell?
```
应该显示 `nospell`。

---

## 🎨 红线类型识别

Markdown 文件中的红线可能来自：

### 1. **拼写检查红线**（波浪线）
- 原因：英文单词拼写错误
- 解决：`:set nospell` 或按 `Space + md`

### 2. **LSP 诊断红线**（直线/波浪线）
- 原因：marksman 或 ltex 语法检查
- 解决：`:LspStop` 或按 `Space + md`

### 3. **Treesitter 高亮**（不是红线）
- 原因：语法高亮
- 这个不需要关闭

---

## 📋 快速操作清单

如果打开 Markdown 文件后还有红线，按顺序执行：

```vim
" 1. 关闭拼写检查
:set nospell

" 2. 禁用诊断
:lua vim.diagnostic.disable(0)

" 3. 停止 LSP
:LspStop

" 4. 清除高亮
:highlight clear SpellBad

" 5. 或者直接使用快捷键
" 按：Space + md
```

---

## 🛠️ 终极解决方案

如果上述方法都不行，在 Markdown 文件中手动执行这段代码：

```vim
:lua << EOF
local bufnr = vim.api.nvim_get_current_buf()
vim.diagnostic.disable(bufnr)
vim.diagnostic.reset(nil, bufnr)
vim.opt_local.spell = false
for _, client in ipairs(vim.lsp.get_clients({bufnr=bufnr})) do
  vim.lsp.stop_client(client.id)
end
vim.cmd([[
  highlight clear SpellBad
  highlight clear DiagnosticUnderlineError
]])
print("✅ 已清除所有红线")
EOF
```

---

## 📝 配置文件清单

确保以下文件都已正确配置：

```
~/.config/nvim/
├── init.lua                           ✅ 已修改（加载所有配置）
├── lua/
│   ├── config/
│   │   ├── options.lua               ✅ 已修改（禁用拼写检查）
│   │   ├── markdown-disable.lua      ✅ 新建（自动清理）
│   │   └── markdown-commands.lua     ✅ 新建（手动命令）
│   └── plugins/
│       └── markdown.lua              ✅ 已修改（禁用 LSP）
```

---

## 💡 实用技巧

### 临时启用拼写检查（需要时）
```vim
:set spell
```

### 查看当前 Markdown 文件的诊断
```vim
:lua vim.diagnostic.enable()
:lua vim.diagnostic.show()
```

### 重新启用 LSP（需要时）
```vim
:LspStart
```

---

## 🔧 调试步骤

如果红线仍然存在，按以下步骤调试：

### 1. 识别红线类型
- 看红线样式：波浪线 vs 直线
- 悬停查看：移动光标到红线上等待提示

### 2. 检查高亮组
```vim
:Inspect
```
在红线处执行，查看高亮组名称。

### 3. 清除特定高亮组
```vim
:highlight clear <高亮组名称>
```

### 4. 查看所有高亮组
```vim
:highlight
```

### 5. 重置所有高亮
```vim
:highlight clear
:source ~/.config/nvim/init.lua
```

---

## 🆘 最后手段

如果所有方法都不行，执行：

```vim
" 1. 停止所有 LSP
:LspStop

" 2. 清除所有高亮
:highlight clear

" 3. 关闭拼写检查
:set nospell

" 4. 禁用所有诊断
:lua vim.diagnostic.disable()

" 5. 重新加载配色方案（不加载诊断）
:colorscheme tokyonight-night

" 6. 保持清爽
:set nohlsearch
```

然后将这些命令保存为快捷键，添加到 `~/.config/nvim/lua/config/keymaps.lua`：

```lua
vim.keymap.set("n", "<leader>mc", function()
  vim.cmd("LspStop")
  vim.cmd("highlight clear")
  vim.opt.spell = false
  vim.diagnostic.disable()
  print("✅ 完全清除")
end, { desc = "完全清除所有诊断和高亮" })
```

---

## 📸 预期效果

**配置成功后**：
- ✅ Markdown 文件打开时无红线
- ✅ 无拼写检查提示
- ✅ 无语法错误提示
- ✅ 清爽的编辑体验

**保留功能**：
- ✅ 语法高亮
- ✅ 代码块高亮
- ✅ 标题样式
- ✅ 列表格式

---

## ⚠️ 注意事项

1. **LSP 被禁用**
   - marksman 和 ltex 不会启动
   - 失去自动补全功能
   - 失去代码跳转功能

2. **拼写检查关闭**
   - 不会提示拼写错误
   - 适合中英混合文档

3. **可随时恢复**
   - 注释掉相关配置
   - 重启 Neovide 即可恢复

---

## ✨ 快捷键总结

| 快捷键 | 功能 |
|--------|------|
| `Space + md` | 清除 Markdown 诊断 |
| `:ClearMarkdownDiag` | 手动清除诊断 |
| `:set nospell` | 关闭拼写检查 |
| `:LspStop` | 停止 LSP |
| `:Inspect` | 查看当前位置的高亮信息 |

---

## 🎉 完成！

按照上述步骤操作后，Markdown 文件应该完全没有红线了。

如果还有问题，可能是其他插件的影响，请提供：
1. 红线的具体位置
2. `:Inspect` 的输出
3. `:LspInfo` 的输出

以便进一步诊断。

---

**祝你编辑愉快！** 📝✨
