test:
	@./node_modules/mocha/bin/_mocha -R $(REPORTER)

lint:
	node -e 'console.log(`$${JSON.stringify({ words: \
		require("./lib/lang.json").words.map(it => it.toLowerCase()).sort() \
	}, null, 2)}`)' > lib/linted.json
	# We use a temporary file because the redirect (>) overwrites lib/lang.json
	# to be blank before the require() is evaluated, so we get an "Unexpected end
	# of JSON input"
	cp lib/linted.json lib/lang.json
	rm lib/linted.json

.PHONY: test lint