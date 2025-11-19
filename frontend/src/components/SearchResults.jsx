import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function SearchResults({ searchParams }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [tokenEnd, setTokenEnd] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (searchParams.query) {
      // Reset state for new search
      setResults([]);
      setTokenEnd(0);
      setError(null);
      performSearch(0, false);
    }
  }, [searchParams]);

  const performSearch = async (start, isLoadMore = false) => {
    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const url = `/search?query=${encodeURIComponent(searchParams.query)}&threshold=${
        searchParams.threshold
      }&corpus_model=${encodeURIComponent(searchParams.corpusModel)}&start=${start}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        setIsLoadingMore(false);
        return;
      }

      const result = data.result;

      if (start === 0) {
        setTotalHits(result.total_hits);
        setSearchTime(result.search_time);
      }

      setResults((prevResults) =>
        isLoadMore ? [...prevResults, ...result.html_lines] : result.html_lines
      );
      setTokenEnd(result.end_line);
      setHasMore(result.result_truncated);
    } catch (err) {
      setError('An error occurred during search');
      console.error(err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    performSearch(tokenEnd, true);
  };

  if (!searchParams.query) {
    return (
      <div className="row">
        <div className="col-12 card border-light mt-2">
          <div className="row align-items-center">
            <div className="col-6">
              <p className="h2 pt-2 ps-3">Available Settings</p>
            </div>
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th>Language</th>
                <th>Embeddings</th>
                <th>Corpus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>English</td>
                <td>
                  <a
                    href="https://nlp.stanford.edu/projects/glove/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    glove-wiki-gigaword-300
                  </a>
                </td>
                <td>
                  <a
                    href="https://huggingface.co/datasets/Salesforce/wikitext"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    wikitext-103-raw-v1 (0.1B Tokens)
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12 card border-light mt-2" id="result">
        <div className="row align-items-center">
          <div className={error ? 'col-12' : 'col-6'}>
            <p className="h2 pt-2 ps-3">
              Results
              <br />
              <span className="h6 text-danger" id="notice">
                {error}
              </span>
            </p>
          </div>
          {!error && (
            <div className="col-6 d-flex justify-content-end">
              <div className="text-start my-2">
                {loading && <LoadingSpinner />}
                {!loading && totalHits > 0 && (
                  <span style={{ whiteSpace: 'pre' }}>
                    Hits:&#009;&#009;&#009;{totalHits}
                    <br />
                    Search Time:&#009;{searchTime.toFixed(3)} sec
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <table className="table w-100">
          <tbody id="result_tbody">
            {results.map((html, index) => (
              <tr key={index} className="result-row">
                <td dangerouslySetInnerHTML={{ __html: html }} />
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && !isLoadingMore && (
          <button
            className="btn btn-success mb-4"
            id="load-more"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
        {isLoadingMore && (
          <div className="text-center mb-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <a href="#" className="stt"></a>
    </div>
  );
}

export default SearchResults;
