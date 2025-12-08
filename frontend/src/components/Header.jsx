import { useState } from 'react';

function Header({ onSearch, corpusModelOptions }) {
  const [query, setQuery] = useState('');
  const [threshold, setThreshold] = useState(0.5);
  const [corpusModel, setCorpusModel] = useState('wikitext103 (0.1B) | glove-wiki-gigaword-300');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (threshold < 0.35) {
      const confirmation = window.confirm(
        'Warning: Low threshold value may result in slow performance'
      );
      if (!confirmation) {
        return;
      }
    }
    onSearch({ query, threshold, corpusModel });
  };

  return (
    <header>
      <nav
        id="header"
        className="navbar navbar-expand-md navbar-light shadow-sm fixed-top"
        style={{ backgroundColor: '#b6c072'
         }}
      >
        <div className="container px-0">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-4" id="logo_div">
              <a className="navbar-brand" href="/">
                <img src="/images/banner.svg" alt="" id="logo" />
              </a>
            </div>
            <div className="col-12 col-md-8">
              <form className="" role="search" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      size="200"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-success" type="submit" id="btn-submit">
                      Search
                    </button>
                  </div>
                </div>
                <div id="advanced-fields">
                  <div className="d-flex mt-2">
                    <select
                      className="form-select align-self-center"
                      aria-label="Default select example"
                      id="corpus_model_selector"
                      value={corpusModel}
                      onChange={(e) => setCorpusModel(e.target.value)}
                    >
                      {corpusModelOptions.map((option, index) => (
                        <option
                          key={index}
                          value={option}
                          disabled={option.includes('-----')}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex mt-2">
                    <label
                      htmlFor="threshold_slider"
                      className="align-middle align-self-center my-0"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Threshold: <span>{threshold}</span>
                    </label>
                    <input
                      type="range"
                      id="threshold_slider"
                      min="0"
                      max="1"
                      value={threshold}
                      step="0.01"
                      className="form-range align-self-center ms-2"
                      onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
