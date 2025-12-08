
source .venv/bin/activate


python src/download_corpora.py --dataset-name wikitext-103-raw-v1-train
python src/indexing.py \
    --backend gensim \
    --model glove-wiki-gigaword-300 \
    --index corpora/glove-wiki-gigaword-300_wikitext-103-raw-v1-train.h5 \
    --num_workers 2 \
    --buffer_size 10000 \
    --chunk_size 1024 \
    corpora/wikitext-103-raw-v1-train.txt
