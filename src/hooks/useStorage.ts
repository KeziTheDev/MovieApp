import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// Konstanta pro klíč používaný při ukládání a načítání dat ze Storage
const TODOS_KEY = 'my-todos'

// Rozhraní pro položky
export interface TodoItem {
    task: string;
    created: number;
    status: number;
    id: string;
}

// Hook pro práci s lokálním úložištěm
export function useStorage(){
        // Stav pro uchování instance Storage a seznamu úkolů
const [store, setStore] = useState<Storage>();
const [todos, setTodos] = useState<TodoItem[]>([]);

        // Efekt pro inicializaci Storage při načtení komponenty
    useEffect(() => {
        const initStorage = async () => {
            // Vytvoření nové instance Storage s určeným názvem a prioritou ovladačů
            const newStore = new Storage({
                name: 'moviedb',
                driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            });
            // Přidání ovladače pro CordovaSQLiteDriver
            await newStore.defineDriver(CordovaSQLiteDriver);

            // Vytvoření a nastavení instance Storage
            const store = await newStore.create();
            setStore(store);

            // Načtení uložených úkolů a aktualizace stavu
            const storedTodos = await store.get(TODOS_KEY) || [];
            console.log('LOADED: ', storedTodos);
            setTodos(storedTodos)
        }
        // Zavolání inicializační funkce
        initStorage();
    }, []);     // Efekt se spustí pouze při načtení komponenty

        // Funkce pro přidání nové položky
    const addTodo = async (task: string) => {
        const newTodo = {
            task,
            created: new Date().getTime(),
            status: 0,
            id: ''+ new Date().getTime()
        }
        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        console.log(updatedTodos);
        store?.set(TODOS_KEY, updatedTodos); 
    }
    // Funkce pro aktualizaci stavu položky
    const updateTodoStatus = async(id: string, status: number) => {
        const toUpdate = [...todos];
        let todo = toUpdate.filter(todo=> todo.id === id)[0];
        todo.status = status;
        setTodos(toUpdate)
        return store?.set(TODOS_KEY, toUpdate)
    }
    // Funkce pro odstranění položky
    const removeTodo = async(id: string) => {
        const toUpdate = todos.filter(todo=> todo.id !== id);
        setTodos(toUpdate)
        return store?.set(TODOS_KEY, toUpdate)
    }

    // Vrací objekt s aktuálním seznamem úkolů a funkcemi pro manipulaci s nimi
    return {
        todos,
        addTodo,
        updateTodoStatus,
        removeTodo
    }

}