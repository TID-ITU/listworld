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
// const l = console.log
const l = () => {}

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

export async function signOut() {
    Parse.User.logOut()
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
        l("Created list: ",savedList)
        return savedList
    } catch (error) {
        l(error)
    }
}

export async function addUserToList(username, list) {
    const user = await getUser(username)
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

export async function getCurrentUserLists() {
    l(Parse.User.current())
    const query = new Parse.Query("List")
    query.include("users", Parse.User.current())
    try {
        const lists = await query.find()
        l(lists)
        return lists
    } catch (error) {
        l(error)
    }
}

export async function removeUserFromList(username, listId) {
    const user = await getUser(username)
    const list = await getListObject(listId)
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

async function getListObject(listId) {
    const listQuery = new Parse.Query("List")
    listQuery.equalTo("objectId", listId)
    try {
        const list = await listQuery.first()
        return list
    } catch (error) {
        l(error)
    }
}

export async function deleteList(list) {
    try {
        list.destroy()
        return true
    } catch (error) {
        return false
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

export async function parseListObject(list) {
    const itemsQuery = new Parse.Query("Item")
    itemsQuery.equalTo("lists", list)
    const name = list.get("name")
    try {
        const items = await itemsQuery.find()
        const array = items.map(item => {return {name: item.get("name"), id: item.id}})
        l("list from getList:", array, name)
        return {name: name, items: array}
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
        return savedItem.id
    } catch (error) {
        l(error)
        return false
    }
}

export async function removeItemFromList(itemId, list) {
    const item = await getItem(itemId)
    let listsRelation = item.relation("lists")
    listsRelation.remove(list)
    l(listsRelation)
    try {
        const savedItem = await item.save()
        l(savedItem)
        return true
    } catch (error) {
        l(error)
        return false
    }
}

async function getItem(itemId) {
    const query = new Parse.Query("Item")
    query.equalTo("objectId", itemId)
    try {
        const item = await query.first()
        l(item)
        return item
    } catch (error) {
        l(error)
    }
}