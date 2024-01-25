// Import knihoven a komponent pro domovskou stránku

import { 
  IonAvatar,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonImg, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonSearchbar, 
  IonSelect, 
  IonSelectOption, 
  IonTitle, 
  IonToolbar, 
  useIonAlert,
  useIonLoading
} from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react'; 
import { gameControllerOutline, tvOutline, videocamOutline } from 'ionicons/icons'

const Home: React.FC = () => {
  // Import hooku pro komunikaci s API
  const { searchData } = useApi()

  // Stavy pro uchování hledaného termínu, typu vyhledávání a výsledků
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Hooky pro vytváření alertu a loading indikátoru
  const [presentAlert] = useIonAlert()
  const [loading, dismiss] = useIonLoading()

  // Efekt pro vyhledávání dat při změně termínu nebo typu vyhledávání
  useEffect(() => {
    // Kontrola prázdného termínu
    if(searchTerm === '') {
      setResults([])
      return
    }

    // Funkce pro načítání dat
    const loadData = async() =>{
      // Zobrazení loading indikátoru
      await loading()

      // Volání API pro vyhledání dat
      const result: any = await searchData(searchTerm, type)
      console.log('🚀 ~ file: Home.tsx:31 ~ LoadData ~ result',result)

      // Skrytí loading indikátoru
      await dismiss()
      // Zpracování výsledků
      if(result?.Error){
        presentAlert(result.Error)
      }
      else {
        setResults(result.Search)
      }
    }
    // Zavolání funkce pro načítání dat
    loadData();
  },[searchTerm, type]);

  // Renderování komponenty domovské stránky
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar 
        value={searchTerm} 
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}
        > </IonSearchbar>

        <IonItem>
          <IonLabel>Select SearchType</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList>
            {results.map((item: SearchResult) => (
              <IonItem 
              button 
              key={item.imdbID} 
              routerLink={`/movies/${item.imdbID}`}>
                
                <IonAvatar slot="start">
                  <IonImg src={item.Poster}/>
                </IonAvatar>
                <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

                  {item.Type === 'movie' && <IonIcon slot='end' icon={videocamOutline}/>}
                  {item.Type === 'series' && <IonIcon slot='end' icon={tvOutline}/>}
                  {item.Type === 'game' && <IonIcon slot='end' icon={gameControllerOutline}/>}

              </IonItem>
            ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
