#!/bin/bash
LOCAL_DIR="./out"
aws s3 sync $LOCAL_DIR s3://$BUCKET_NAME/ --exclude "*.html"

find "$LOCAL_DIR" -type f -name "*.html" | while read -r file; do
  base_filename=$(basename "$file" .html)
  aws s3 cp "$file" "s3://$BUCKET_NAME/$base_filename" --content-type "text/html"
done

aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"