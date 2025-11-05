# 📝 Todo 应用 - Vue 3 + FastAPI

一个现代化的全栈待办事项应用，展示了 Vue 3 Composition API 与 FastAPI 的最佳实践。

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)

## ✨ 项目特点

### 🏗️ 架构设计
- ✅ **前后端分离** - 清晰的职责划分
- ✅ **单一数据源** - 后端为唯一真实数据源
- ✅ **RESTful API** - 标准的 HTTP 方法和状态码
- ✅ **组件化设计** - 可复用的 Vue 组件

### 🎨 现代化前端
- ✅ **Vue 3 Composition API** - 使用 `<script setup>` 语法糖
- ✅ **Composables** - 业务逻辑提取和复用
- ✅ **响应式系统** - ref、computed、reactive
- ✅ **TransitionGroup 动画** - 流畅的列表过渡效果
- ✅ **Tailwind CSS** - 实用优先的样式方案

### ⚡ 高性能后端
- ✅ **FastAPI** - 高性能异步框架
- ✅ **Pydantic** - 自动数据验证
- ✅ **类型注解** - 完整的类型提示
- ✅ **自动 API 文档** - Swagger UI 和 ReDoc

### 📚 完整文档
- ✅ [学习指南](./学习指南.md) - 1200+ 行详细教程
- ✅ [代码风格指南](./frontend/CODE-STYLE.md)
- ✅ [数据流设计](./frontend/DATA-FLOW.md)
- ✅ [现代化特性说明](./frontend/MODERN-FEATURES.md)

## 🚀 快速开始

### 环境要求

- Python 3.9+
- Node.js 16+
- npm 或 yarn

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd claude-web
```

#### 2. 启动后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
source venv/bin/activate  # Mac/Linux
# 或
venv\Scripts\activate     # Windows

# 安装依赖
pip install -r requirements.txt

# 启动服务器
python main.py
```

后端将运行在 `http://localhost:8000`

**API 文档**：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

#### 3. 启动前端

新开一个终端窗口：

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端将运行在 `http://localhost:5173`

## 📁 项目结构

```
claude-web/
├── backend/                    # FastAPI 后端
│   ├── main.py                # 主应用文件
│   ├── requirements.txt       # Python 依赖
│   └── venv/                  # 虚拟环境
│
├── frontend/                   # Vue 3 前端
│   ├── src/
│   │   ├── components/        # Vue 组件
│   │   │   ├── TodoForm.vue   # 表单组件
│   │   │   ├── TodoItem.vue   # 单项组件
│   │   │   ├── TodoList.vue   # 列表组件
│   │   │   └── TodoStats.vue  # 统计组件
│   │   ├── composables/       # 组合式函数
│   │   │   └── useTodos.js    # Todo 业务逻辑
│   │   ├── App.vue            # 根组件
│   │   ├── main.js            # 入口文件
│   │   └── index.css          # 全局样式
│   ├── CODE-STYLE.md          # 代码风格指南
│   ├── DATA-FLOW.md           # 数据流设计文档
│   ├── MODERN-FEATURES.md     # 现代化特性说明
│   └── package.json           # Node.js 依赖
│
├── 学习指南.md                 # 详细的学习教程
└── README.md                   # 本文件
```

## 🎯 核心功能

- ✅ 创建待办事项
- ✅ 查看待办事项列表
- ✅ 切换完成状态
- ✅ 删除待办事项
- ✅ 实时统计（总数、已完成、进行中、完成率）
- ✅ 流畅的动画效果

## 🛠️ 技术栈

### 后端
| 技术 | 版本 | 说明 |
|------|------|------|
| Python | 3.9+ | 编程语言 |
| FastAPI | 0.115+ | Web 框架 |
| Uvicorn | 0.32+ | ASGI 服务器 |
| Pydantic | 2.9+ | 数据验证 |

### 前端
| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5+ | 渐进式框架 |
| Vite | 5.4+ | 构建工具 |
| Tailwind CSS | 3.4+ | CSS 框架 |

## 📖 API 接口

### 基础 URL
```
http://localhost:8000/api
```

### 端点列表

| 方法 | 端点 | 说明 |
|------|------|------|
| `GET` | `/todos` | 获取所有待办事项 |
| `POST` | `/todos` | 创建新待办事项 |
| `PUT` | `/todos/{id}` | 切换完成状态 |
| `DELETE` | `/todos/{id}` | 删除待办事项 |

### 数据模型

**TodoCreate** (创建时)
```json
{
  "title": "string",
  "description": "string (可选)"
}
```

**Todo** (响应)
```json
{
  "id": "string (UUID)",
  "title": "string",
  "description": "string | null",
  "completed": "boolean"
}
```

## 🎨 界面预览

### 主界面
- 渐变背景（蓝色到靛蓝）
- 卡片式设计
- 响应式布局

### 交互特效
- ✨ 任务添加 - 淡入滑动动画
- ✨ 任务删除 - 淡出滑动动画
- ✨ 悬停效果 - 阴影过渡
- ✨ 统计面板 - 淡入淡出

## 💡 核心概念

### 1. 单一数据源原则

所有数据操作都遵循：**操作 → 刷新 → 显示**

```javascript
async function createTodo(data) {
  await fetch('/api/todos', { method: 'POST', ... })
  await fetchTodos()  // 从后端重新获取
}
```

**优势**：
- 前端永远显示后端的真实数据
- 不会出现数据不一致
- 代码简单易维护

详见：[数据流设计文档](./frontend/DATA-FLOW.md)

### 2. Composables 架构

将业务逻辑提取到可复用的组合式函数：

```javascript
// composables/useTodos.js
export function useTodos() {
  const todos = ref([])
  const loading = ref(false)

  async function fetchTodos() { /* ... */ }
  async function createTodo(data) { /* ... */ }

  return { todos, loading, fetchTodos, createTodo }
}
```

**优势**：
- 逻辑复用
- 代码组织清晰
- 易于测试

详见：[现代化特性说明](./frontend/MODERN-FEATURES.md)

### 3. 组件化设计

将 UI 拆分为小型、可复用的组件：

- **TodoForm** - 负责输入
- **TodoList** - 负责展示列表
- **TodoItem** - 负责单项展示
- **TodoStats** - 负责统计信息

每个组件职责单一，易于维护。

## 🔧 开发指南

### 前端开发

```bash
cd frontend

# 开发模式（热重载）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 后端开发

```bash
cd backend

# 启动开发服务器（自动重载）
uvicorn main:app --reload

# 或直接运行
python main.py
```

### 代码风格

本项目遵循统一的代码风格：

- ✅ 使用 `function` 声明而非箭头函数（主要函数）
- ✅ 中文注释和错误提示
- ✅ 保持代码风格一致性

详见：[代码风格指南](./frontend/CODE-STYLE.md)

## 📚 学习资源

### 📖 项目文档（按难度排序）

#### 🌟 新手必读

1. **[BEGINNER.md](./BEGINNER.md)** - 🎓 初学者完全指南
   - 零基础也能看懂
   - 详细的安装步骤
   - 手把手教学
   - 常见错误解决
   - 包含练习任务

2. **[SIMPLE-VERSION.md](./frontend/SIMPLE-VERSION.md)** - 🎯 简化版本参考
   - 单文件版本（仅100行）
   - 对比简化版vs完整版
   - 适合快速理解概念

#### 📖 进阶学习

3. **[学习指南.md](./学习指南.md)** - 📚 完整教程（1200+行）
   - 技术栈详解
   - 后端 FastAPI 逐行解析
   - 前端 Vue 3 详细说明
   - 数据流程图
   - 学习路径建议

#### 🔧 技术深入

4. **[CODE-STYLE.md](./frontend/CODE-STYLE.md)** - 代码风格指南
   - 为什么使用 `function` 声明
   - 何时使用箭头函数
   - 完整对比表

5. **[DATA-FLOW.md](./frontend/DATA-FLOW.md)** - 数据流设计
   - 单一数据源原则
   - 架构对比
   - 性能考虑

6. **[MODERN-FEATURES.md](./frontend/MODERN-FEATURES.md)** - 现代化特性
   - Composables 详解
   - 组件化设计
   - TransitionGroup 动画

### 官方文档

- [Vue 3 中文文档](https://cn.vuejs.org/)
- [FastAPI 中文文档](https://fastapi.tiangolo.com/zh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🎓 适合人群

### 🌟 初学者友好！

本项目特别适合：
- ✅ **编程初学者** - 提供了详细的初学者指南
- ✅ 学习 Vue 3 Composition API
- ✅ 了解前后端分离架构
- ✅ 掌握 FastAPI 基础用法
- ✅ 理解现代前端工程化

### 📚 三个学习等级

1. **🟢 入门级** - 阅读 [BEGINNER.md](./BEGINNER.md)
   - 手把手教学
   - 从零开始
   - 常见错误解决

2. **🟡 进阶级** - 阅读 [学习指南.md](./学习指南.md)
   - 技术详解
   - 最佳实践
   - 架构设计

3. **🔴 参考级** - 阅读技术文档
   - [CODE-STYLE.md](./frontend/CODE-STYLE.md)
   - [DATA-FLOW.md](./frontend/DATA-FLOW.md)
   - [MODERN-FEATURES.md](./frontend/MODERN-FEATURES.md)

## 🚧 待扩展功能

以下是一些可以实践的扩展功能：

### 基础功能
- [ ] 任务编辑
- [ ] 任务搜索
- [ ] 任务过滤（全部/已完成/未完成）
- [ ] 任务优先级

### 进阶功能
- [ ] 用户认证
- [ ] 数据持久化（数据库）
- [ ] 任务分类
- [ ] 拖拽排序
- [ ] 本地存储

### 技术优化
- [ ] TypeScript 支持
- [ ] 单元测试
- [ ] E2E 测试
- [ ] PWA 支持
- [ ] 国际化（i18n）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

## 💬 常见问题

### Q: 为什么每次操作后都重新获取数据？
A: 这是**单一数据源原则**。后端是唯一的真实数据源，前端每次操作后重新获取，确保显示的永远是最新、最准确的数据。详见 [DATA-FLOW.md](./frontend/DATA-FLOW.md)

### Q: 为什么使用 `function` 声明而不是箭头函数？
A: 为了代码风格一致性和可读性。传统函数声明更直观、调试友好。详见 [CODE-STYLE.md](./frontend/CODE-STYLE.md)

### Q: 什么是 Composables？
A: Composables 是 Vue 3 中用于提取和复用有状态逻辑的函数，类似 React 的自定义 Hooks。详见 [MODERN-FEATURES.md](./frontend/MODERN-FEATURES.md)

### Q: 数据存储在哪里？
A: 目前使用**内存存储**（`todos_db` 列表），服务器重启后数据会丢失。适合学习，生产环境应使用数据库。

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**

**📖 建议先阅读 [学习指南.md](./学习指南.md) 深入了解项目。**
