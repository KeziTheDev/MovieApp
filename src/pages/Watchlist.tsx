import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonLabel,
} from '@ionic/react'
import { useStorage } from '../hooks/useStorage'
import { useRef, useState } from 'react';
import { arrowUndoOutline, checkmarkDoneOutline } from 'ionicons/icons';
import './Watchlist.css';

const Watchlist: React.FC = () => {
    const { todos, addTodo, updateTodoStatus, removeTodo} = useStorage();
    const [task, setTask] = useState('')
    const ionList = useRef(null as any);

    const createTodo = async() => {
        await addTodo(task);
        setTask('')
    }
    const updateStatus = async(id: string, status: number) => {
        await updateTodoStatus(id, status)
        ionList.current.closeSlidingItems()
    }
    const deleteTodo = async (id: string) => {
        await removeTodo(id)
        ionList.current.closeSlidingItems()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Your Watchlist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonInput value={task} onIonChange={(e) => setTask(e.detail.value!)} placeholder='Enter..'></IonInput>
                    <IonButton slot='end' onClick={() => createTodo()} fill='clear'>Add</IonButton>
                </IonItem>
                <IonList ref={ionList}>
                    {todos.map((todo, key) => (
                        <IonItemSliding key={key}>
                            <IonItem className={todo.status === 1 ? 'done' : ''}> 
                                <IonLabel>{todo.task}</IonLabel>
                                
                            </IonItem>
                            <IonItemOptions side='start'>
                                <IonItemOption color='danger' onClick={() => deleteTodo(todo.id)}>
                                    Delete
                                </IonItemOption>
                            </IonItemOptions>

                            <IonItemOptions side='end'>
                                <IonItemOption color='medium' onClick={() => updateStatus(todo.id, 0)}>
                                    <IonIcon icon={arrowUndoOutline}></IonIcon>
                                </IonItemOption>
                                <IonItemOption color='success' onClick={() => updateStatus(todo.id, 1)}>
                                    <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Watchlist