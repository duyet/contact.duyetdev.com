git commit -am "Save local changes"
git checkout -B gh-pages
git add -f build
echo "contact.duyetdev.com" > CNAME
git commit -am "Rebuild website"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
