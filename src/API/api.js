/*
1. Creating a class
    List
    Item
2. Writing to DB
3. Reading from DB
4. Sign up
5. Sign in
6. Reset password
7. Relationships

https://www.back4app.com/docs/react/data-objects/relationships
*/
import Parse from 'parse';
const l = console.log

export async function signUp(username, password, email) {
    try {
        const user = await Parse.User.signUp(username, password, {email: email})
        l(user)
    } catch (error) {
        l(error)
    }
}

export async function signIn(username, password) {
    try {
        const user = await Parse.User.logIn(username, password)
        l(user)
    } catch (error) {
        l(error)
    }
}

export async function createList(name) {
const List = Parse.Object.extend("List")
const list = new List()
l(list)
let usersRelation = list.relation("users")
usersRelation.add(Parse.User.current())
list.set("name", name)
    try {
        const savedList = await list.save()
        l(savedList)
    } catch (error) {
        l(error)
    }
}

export async function addUserToList(username, listName) {
    const user = await getUser(username)
    const list = await getList(listName)
    l(list)
    let usersRelation = list.relation("users")
    usersRelation.add(user)
    l(usersRelation)
    try {
        const savedList = await list.save()
        l(savedList)
    } catch (error) {
        l(error)
    }
}


export async function removeUserFromList(username, listName) {
    const user = await getUser(username)
    const list = await getList(listName)
    l(list)
    let usersRelation = list.relation("users")
    usersRelation.remove(user)
    l(usersRelation)
    try {
        const savedList = await list.save()
        l(savedList)
    } catch (error) {
        l(error)
    }
}

async function getUser(username) {
    const query = new Parse.Query("User")
    query.equalTo("username", username)
    try {
        const user = await query.first()
        l("User from getUser:", user)
        return user
    } catch (error) {
        l(error)
    }
}

async function getList(listName) {
    const query = new Parse.Query("List")
    query.equalTo("name", listName)
    try {
        const list = await query.first()
        l("list from getList:", list)
        return list
    } catch (error) {
        l(error)
    }
}

export async function createItem(name, list) {
    const Item = Parse.Object.extend("Item")
    const item = new Item()
    item.set("name", name)
    let listsRelation = item.relation("lists")
    listsRelation.add(list)
    try {
        const savedItem = await item.save()
        l(savedItem)
    } catch (error) {
        l(error)
    }
}

// export async function removeItemFromList(itemName, listName) {
//     const list = getList(listName)
//     // const listsRelation = item.relation("lists")
    
//     try {
//         // l(listsRelation)    
//     } catch (error) {
        
//     }
// }

// async function getItem(itemName) {
//     const query = Parse.Query("Item")
//     query.equalTo("name", itemName)
//     try {
//         const item = await query.first()
//         l(item)
//         return item
//     } catch (error) {
//         l(error)
//     }
// }