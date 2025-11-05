from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# 配置 CORS，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite 和 CRA 的默认端口
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据模型
class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class Todo(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    completed: bool = False

# 内存存储（实际项目中应使用数据库）
todos_db: List[Todo] = []

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Todo API"}

@app.get("/api/todos", response_model=List[Todo])
def get_todos():
    """获取所有待办事项"""
    return todos_db

@app.post("/api/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    """创建新的待办事项"""
    new_todo = Todo(
        id=str(uuid.uuid4()),
        title=todo.title,
        description=todo.description,
        completed=False
    )
    todos_db.append(new_todo)
    return new_todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str):
    """切换待办事项的完成状态"""
    for todo in todos_db:
        if todo.id == todo_id:
            todo.completed = not todo.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: str):
    """删除待办事项"""
    for i, todo in enumerate(todos_db):
        if todo.id == todo_id:
            deleted_todo = todos_db.pop(i)
            return {"message": "Todo deleted", "todo": deleted_todo}
    raise HTTPException(status_code=404, detail="Todo not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
