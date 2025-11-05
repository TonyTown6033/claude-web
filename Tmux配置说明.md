# 🎮 Tmux Command+b 配置说明

## ✅ 已完成的配置

### 1. Ghostty 终端配置
**文件**: `~/.config/ghostty/config`
- 添加了键绑定：`keybind = super+b=text:\x1b[24~`
- 将 **Command+b** 映射为发送 F12 键码

### 2. Tmux 配置
**文件**: `~/.tmux.conf`
- 移除了默认的 `Ctrl+b` 前缀
- 设置 **F12** 为前缀键（接收 Command+b）
- 配置了 Gruvbox Dark 主题的状态栏
- 添加了常用快捷键

---

## 🔄 如何应用配置

### 步骤 1：重启 Ghostty
完全退出 Ghostty，然后重新打开。

### 步骤 2：启动或重新加载 tmux

**如果 tmux 已经在运行**：
```bash
# 在 tmux 中按下旧的前缀键 Ctrl+b，然后输入：
:source-file ~/.tmux.conf
```

**如果 tmux 未运行**：
```bash
# 启动新的 tmux 会话
tmux

# 或者启动命名会话
tmux new -s mysession
```

---

## 🎯 测试配置

### 测试 1：检查前缀键
1. 打开 Ghostty
2. 启动 tmux：`tmux`
3. 按下 **Command+b**，然后按 **?**
4. 应该会显示所有快捷键列表

### 测试 2：创建新窗口
1. 按下 **Command+b**，然后按 **c**
2. 应该创建一个新的 tmux 窗口

### 测试 3：分割面板
1. 按下 **Command+b**，然后按 **|** （垂直分割）
2. 按下 **Command+b**，然后按 **-** （水平分割）

---

## 📚 常用快捷键

所有快捷键都需要先按 **Command+b**（前缀键），然后按下列键：

### 窗口管理
| 快捷键 | 功能 |
|--------|------|
| `Command+b` → `c` | 创建新窗口 |
| `Command+b` → `n` | 下一个窗口 |
| `Command+b` → `p` | 上一个窗口 |
| `Command+b` → `数字` | 切换到指定窗口 |
| `Command+b` → `,` | 重命名窗口 |
| `Command+b` → `&` | 关闭窗口 |

### 面板管理
| 快捷键 | 功能 |
|--------|------|
| `Command+b` → `\|` | 垂直分割面板 |
| `Command+b` → `-` | 水平分割面板 |
| `Command+b` → `h` | 切换到左边面板 |
| `Command+b` → `j` | 切换到下边面板 |
| `Command+b` → `k` | 切换到上边面板 |
| `Command+b` → `l` | 切换到右边面板 |
| `Command+b` → `x` | 关闭当前面板 |
| `Command+b` → `z` | 全屏/取消全屏当前面板 |

### 会话管理
| 快捷键 | 功能 |
|--------|------|
| `Command+b` → `d` | 分离会话 |
| `Command+b` → `s` | 列出所有会话 |
| `Command+b` → `$` | 重命名会话 |

### 其他
| 快捷键 | 功能 |
|--------|------|
| `Command+b` → `r` | 重新加载配置 |
| `Command+b` → `?` | 显示所有快捷键 |
| `Command+b` → `[` | 进入复制模式 |
| `Command+b` → `]` | 粘贴 |

---

## 🎨 状态栏说明

状态栏采用 Gruvbox Dark 配色，与你的 Ghostty 主题匹配。

**左侧**：显示会话名称
**右侧**：显示日期和时间
**窗口**：当前窗口高亮显示（黄色背景）

---

## 🔧 常见问题

### Q1: Command+b 没有反应？

**检查步骤**：
1. 确认已重启 Ghostty
2. 在终端中测试：按 Command+b，应该看不到任何输出（正常）
3. 检查 Ghostty 配置：
   ```bash
   cat ~/.config/ghostty/config | grep super+b
   ```
   应该显示：`keybind = super+b=text:\x1b[24~`

### Q2: 还是想用 Ctrl+b？

编辑 `~/.tmux.conf`，改为：
```conf
unbind C-b
set-option -g prefix C-b
bind-key C-b send-prefix
```

### Q3: Command+b 被系统占用？

检查 macOS 系统快捷键：
- 系统偏好设置 → 键盘 → 快捷键
- 查看是否有冲突

### Q4: 想测试 F12 是否发送正确？

在终端中运行：
```bash
cat
```
然后按 Command+b，应该看到：`^[[24~`（这是 F12 的键码）

按 Ctrl+C 退出 cat。

---

## 🚀 进阶配置

### 启用鼠标滚动

已默认启用，可以：
- 用鼠标点击切换面板
- 用鼠标拖动调整面板大小
- 用鼠标滚轮滚动历史记录

### 启用 macOS 剪贴板集成

安装工具：
```bash
brew install reattach-to-user-namespace
```

然后编辑 `~/.tmux.conf`，取消注释：
```conf
set -g default-command "reattach-to-user-namespace -l $SHELL"
```

### 安装 Tmux 插件管理器（TPM）

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

在 `~/.tmux.conf` 末尾添加：
```conf
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
run '~/.tmux/plugins/tpm/tpm'
```

---

## 📝 快速命令参考

### 终端命令

```bash
# 启动新会话
tmux

# 启动命名会话
tmux new -s work

# 列出所有会话
tmux ls

# 连接到会话
tmux attach -t work

# 杀死会话
tmux kill-session -t work

# 杀死所有会话
tmux kill-server
```

### 在 tmux 内部

按 **Command+b** 然后输入 `:` 进入命令模式，可以输入：

```
:source-file ~/.tmux.conf    # 重新加载配置
:list-keys                   # 列出所有快捷键
:list-commands               # 列出所有命令
:new-window                  # 创建新窗口
:split-window -h             # 垂直分割
```

---

## 💡 使用技巧

### 1. 快速分离和重新连接
```bash
# 在 tmux 中工作
# 按 Command+b 然后 d 分离

# 稍后重新连接
tmux attach
```

### 2. 复制模式（Vi 风格）
```
1. Command+b → [      # 进入复制模式
2. 移动光标（hjkl）
3. v                   # 开始选择
4. 移动选择文本
5. y                   # 复制
6. Command+b → ]      # 粘贴
```

### 3. 同步所有面板
```
Command+b → :setw synchronize-panes on
# 现在所有面板会同时执行相同命令
# 再次执行切换到 off 关闭
```

### 4. 调整面板大小
```
Command+b → H/J/K/L    # 持续按住调整大小
```

---

## 🎉 完成！

现在你可以使用 **Command+b** 作为 tmux 前缀键了！

**测试一下**：
1. 打开 Ghostty
2. 运行 `tmux`
3. 按 **Command+b** 然后按 **c** 创建新窗口
4. 按 **Command+b** 然后按 **|** 垂直分割
5. 享受你的新配置！🚀

---

**配置文件位置**：
- Ghostty: `~/.config/ghostty/config`
- Tmux: `~/.tmux.conf`

需要调整配置随时编辑这些文件，然后重新加载即可！
