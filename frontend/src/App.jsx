import { useState, useEffect } from 'react';
import Header from './components/Header';
import ExamplesSection from './components/ExamplesSection';
import SearchResults from './components/SearchResults';
import './index.css';

function App() {
  const [searchParams, setSearchParams] = useState({
    query: '',
    threshold: 0.5,
    corpusModel: 'wikitext103 (0.1B) | glove-wiki-gigaword-300',
  });

  const corpusModelOptions = [
    'wikitext103 (0.1B) | glove-wiki-gigaword-300',
  ];

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || '';
    const threshold = parseFloat(urlParams.get('threshold')) || 0.5;
    const corpusModel = urlParams.get('corpus_model') || 'wikitext103 (0.1B) | glove-wiki-gigaword-300';

    if (query) {
      setSearchParams({ query, threshold, corpusModel });
    }
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('query', params.query);
    url.searchParams.set('threshold', params.threshold);
    url.searchParams.set('corpus_model', params.corpusModel);
    window.history.pushState({}, '', url);
  };

  return (
    <div style={{ backgroundColor: '#e8e8e8' }}>
      <Header onSearch={handleSearch} corpusModelOptions={corpusModelOptions} />
      
      <main id="main" style={{ backgroundColor: '#e8e8e8' }}>
        <div className="container py-2">
          <ExamplesSection />
          <SearchResults searchParams={searchParams} />
        </div>
      </main>
      
      <footer></footer>
    </div>
  );
}

export default App;
