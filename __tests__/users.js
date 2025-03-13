export const users = []

export function addUser(name) {
    users.push(name)
}

export function removeUser(name) {
    const index = users.indexOf(name)
    if(index !==1) users.splice(index, 1)
}