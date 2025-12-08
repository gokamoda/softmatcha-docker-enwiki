function ExamplesSection() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 mx-2 card border-light pb-2">
        <div className="row">
          <div className="col-12">
            <h2 className="ps-3">Examples</h2>
            <a
              href="/?query=Theorem+1&corpus_model=wikitext103+%280.1B%29+%7C+glove-wiki-gigaword-300&threshold=0.5"
              className="btn btn-outline-success mt-2"
            >
              theorem 1
            </a>
            <a
              href="/?query=march+1+%2C+2016&corpus_model=wikitext103+%280.1B%29+%7C+glove-wiki-gigaword-300&threshold=0.5"
              className="btn btn-outline-success mt-2"
            >
              march 1, 2016
            </a>
            <a
              href="/?query=John+was+born+in+&corpus_model=wikitext103+%280.1B%29+%7C+glove-wiki-gigaword-300&threshold=0.5"
              className="btn btn-outline-success mt-2"
            >
              John was born in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamplesSection;
