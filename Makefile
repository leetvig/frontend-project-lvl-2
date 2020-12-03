link:
	npm link

install:
	npm install

publish:
	npm publish --dry-run

lint: 
	npx eslint .

lint-fix:
	npx eslint --fix .

test: 
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8