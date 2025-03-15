import React, { useEffect, useState } from "react";
import Flowchart from "../components/Flowchart";

const RoadmapPage = () => {
  const [scrapedData, setScrapedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/scraped-data")
      .then(response => response.json())
      .then(data => {
         console.log(data);
         setScrapedData(data);
      })
      .catch(error => console.error("Erreur de chargement des données", error));
  }, []);
  

  return (
    <div>
      <h1>Roadmap d'Apprentissage</h1>
      {scrapedData.length > 0 ? <Flowchart data={scrapedData} /> : <p>Chargement...</p>}
    </div>
  );
};

export default RoadmapPage;
