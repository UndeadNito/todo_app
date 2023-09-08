const initTodos = (): Todo[] =>{
    const todosString = localStorage.getItem('todos')

    if (todosString === null) {
        localStorage.setItem('todos', JSON.stringify(DefaultTodos))
        return DefaultTodos;
    }

    try{
        return JSON.parse(todosString);
    }
    catch{
        return ErrorTodos;
    }
}

const DefaultTodos: Todo[] = [
    {
        id: '0',
        title: '<- mark todo as done',
        done: false,
    },
    {
        id: '1',
        title: 'delete Todo ->',
        done: false,
    },
    {
        id: '2',
        title: 'redact todo right here',
        done: false,
    },
    {
        id: '3',
        title: 'filter todos using field above',
        done: false,
    },
    {
        id: '4',
        title: 'enter todo title to the search field and press "+" button to add todo',
        done: false,
    },
    {
        id: '5',
        title: 'your todos saves once a minute. Check save state in a sticker at the "+" button',
        done: false,
    },
    {
        id: '6',
        title: 'save your data right now by clicking the sticker',
        done: false,
    },
]

const ErrorTodos: Todo[] =[
    {
        id: '0',
        title: 'Your todos got corrupted for some reason',
        done: false,
    },
    {
        id: '1',
        title: 'but the last todos state is still on your pc.',
        done: false,
    },
    {
        id: 'imp',
        title: 'DON\'T REDACT THIS TODOS OR THEY OVERRIDE YOUR DATA',
        done: false,
    },
    {
        id: '2',
        title: 'You might try to find it:',
        done: false,
    },
    {
        id: '3',
        title: '1: Press right mouse button and choose "Inspect"',
        done: false,
    },
    {
        id: '4',
        title: 'on the side of your screen appeared inspector',
        done: false,
    },
    {
        id: '5',
        title: '2: at the top choose tab "Application" (by default active "Elements" tab)',
        done: false,
    },
    {
        id: '6',
        title: '3: find field "local storage" and open it\'s sub-element',
        done: false,
    },
    {
        id: '7',
        title: 'now at the right side appeared tab with "text | text" elements',
        done: false,
    },
    {
        id: '8',
        title: 'finally, element with key "todos" contains your data',
        done: false,
    },
    {
        id: '9',
        title: '4:copy the data and try to fix it or just create new todos with same titles',
        done: false,
    },
]

export default initTodos