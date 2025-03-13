import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { addUser, removeUser, users } from "./users";

beforeEach(() => {
    // reset tablicy przed każdym testem
    users.length = 0
})

afterEach(() => {
    console.log('test zakończony')
})

describe('zarządzanie użtkownikami', ()=>{
    test('dodawanie użytkownika', ()=> {
        addUser('alice'),
        expect(users).toContain('alice')
        expect(users.length).toBe(1) 
    })

    test('usuwanie użytkownika', ()=> {
        addUser('alice')
        addUser('bob')
        removeUser('bob')
        expect(users).not.toContain('Bob')
        expect(users.length).toBe(0)
    })
})