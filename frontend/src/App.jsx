import { useState } from 'react';
import Header from './components/Header';
import ExamplesSection from './components/ExamplesSection';
import SearchResults from './components/SearchResults';
import './index.css';

function App() {
  const [searchParams, setSearchParams] = useState(() => {
    // Initialize from URL on mount
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || '';
    const threshold = parseFloat(urlParams.get('threshold')) || 0.5;
    const corpusModel = urlParams.get('corpus_model') || 'wikitext103 (0.1B) | glove-wiki-gigaword-300';
    
    return { query, threshold, corpusModel };
  });

  const corpusModelOptions = [
    'wikitext103 (0.1B) | glove-wiki-gigaword-300',
  ];

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
