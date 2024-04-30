import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: String
  title: String
  description?: String
  status: Status
}

export type State = {
  tasks: Task[]
}

export type Action = {
  addTask: (title: string, description?: string) => void
  removeTask: (id: string) => void
  updateTask: (id: string, status: Status) => void
}

export const useTaskStore = create<State & Action>()(set => ({
  tasks: [],
  addTask: (title: string, description?: string) =>
    set(state => ({
      tasks: [
        ...state.tasks,
        { id: uuid(), title, description, status: 'TODO' }
      ]
    })),
  removeTask: (id: string) =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  updateTask: (id: string, status) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    }))
}))
