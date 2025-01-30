export type Filter = 'All' | 'Active' | 'Completed'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TodoList = {
    id: string
    title: string
    filter: Filter
}

export type TasksObj = {
    [key: string]: Task[]
}
