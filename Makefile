test:
	@./node_modules/mocha/bin/_mocha -R $(REPORTER)

.PHONY: test