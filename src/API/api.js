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
// const l = () => {}

export async function signUp(username, password, email) {
    try {
        const user = await Parse.User.signUp(username, password, {email: email})
        l("SignUp():",user)
    } catch (error) {
        l("SignUp():",error)
    }
}

export async function signIn(username, password) {
    try {
        const user = await Parse.User.logIn(username, password)
        l("SignIn():",user)
    } catch (error) {
        l("SignIn():",error)
    }
}

export async function signOut() {
    try {
        const success = Parse.User.logOut()
        l("SignOut():",success)
    } catch (error) {
        l("SignOut():",error)
    }
}

export async function createList(name) {
const List = Parse.Object.extend("List")
const list = new List()
// l(list)
let usersRelation = list.relation("users")
usersRelation.add(Parse.User.current())
list.set("name", name)
    try {
        const savedList = await list.save()
        l("CreateList(): ",savedList)
        return savedList
    } catch (error) {
        l("CreateList(): ",error)
    }
}

export async function addUserToList(username, list) {
    const user = await getUser(username)
    // l(list)
    let usersRelation = list.relation("users")
    usersRelation.add(user)
    try {
        const savedList = await list.save()
        l("addUserToList(): ",savedList)
    } catch (error) {
        l("addUserToList(): ",error)
    }
}

export async function getCurrentUserLists() {
    const query = new Parse.Query("List")
    query.include("users", Parse.User.current())
    try {
        const lists = await query.find()
        l("getCurrentUserLists(): ",lists)
        return lists
    } catch (error) {
        l("getCurrentUserLists(): ",error)
    }
}

export async function removeUserFromList(username, listId) {
    const user = await getUser(username)
    const list = await getListObject(listId)
    let usersRelation = list.relation("users")
    usersRelation.remove(user)
    // l(usersRelation)
    try {
        const savedList = await list.save()
        l("removeUserFromList(): ",savedList)
    } catch (error) {
        l("removeUserFromList(): ",error)
    }
}

async function getListObject(listId) {
    const listQuery = new Parse.Query("List")
    listQuery.equalTo("objectId", listId)
    try {
        const list = await listQuery.first()
        l("getListObject(): ",list)
        return list
    } catch (error) {
        l("getListObject(): ",error)
    }
}

export async function deleteList(list) {
    try {
        const success = list.destroy()
        l("deleteList(): ",success)
        return true
    } catch (error) {
        l("deleteList(): ",error)
        return false
    }
}

async function getUser(username) {
    const query = new Parse.Query("User")
    query.equalTo("username", username)
    try {
        const user = await query.first()
        l("getUser():", user)
        return user
    } catch (error) {
        l("getUser(): ",error)
    }
}

export async function getListItems(list) {
    const itemsQuery = new Parse.Query("Item")
    itemsQuery.equalTo("lists", list)
    try {
        const items = await itemsQuery.find()
        l("getListItems():", items)
        return items
    } catch (error) {
        l("getListItems():",error)
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
        l("createItem(): ",savedItem)
        return savedItem
    } catch (error) {
        l("createItem(): ",error)
        return false
    }
}

export async function removeItemFromList(item, list) {
    let listsRelation = item.relation("lists")
    listsRelation.remove(list)
    l(listsRelation)
    try {
        const savedItem = await item.save()
        l("removeItemFromList(): ",savedItem)
        return item
    } catch (error) {
        l("removeItemFromList(): ",error)
        return false
    }
}

async function getItem(itemId) {
    const query = new Parse.Query("Item")
    query.equalTo("objectId", itemId)
    try {
        const item = await query.first()
        l("getItem(): ",item)
        return item
    } catch (error) {
        l("getItem(): ",error)
    }
}